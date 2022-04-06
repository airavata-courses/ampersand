# Imports
import os
import re
import numpy as np
import pandas as pd
import xarray as xr
import matplotlib.pyplot as plt
from datetime import datetime, timedelta
from calendar import monthrange
from .opendap_download.multi_processing_download import DownloadManager
from .merra_plotting import Plotting
import logging

####### INPUTS - CHANGE THESE #########
username = 'dhruti_patel' # Username for MERRA download account
password = 'Ampersand@123' # Password for MERRA download account
years = [] # List of years for which data will be downloaded
field_id = 'T2M' # ID of field in MERRA-2 - find ID here: https://gmao.gsfc.nasa.gov/pubs/docs/Bosilovich785.pdf 
field_name = 'temperature' # Name of field to be stored with downloaded data (can use any name you like)
database_name = 'M2I1NXASM' # Name of database in which field is stored, can be looked up by ID here: https://gmao.gsfc.nasa.gov/pubs/docs/Bosilovich785.pdf 
database_id = 'inst1_2d_asm_Nx' # ID of database database in which field is stored, also can be looked up by ID here: https://gmao.gsfc.nasa.gov/pubs/docs/Bosilovich785.pdf 
locs = [] # List of locations for which data will be downloaded. Each location is a three-tuple, consisting of name (string), latitude, and longitude floats)
conversion_function = lambda x: x - 273.15 # Unit conversion function to be applied to daily data. Here is the unit conversion for temperature from Kelvin to Celsius. 
aggregator = 'mean' # Method by which data will be aggregated over days and weeks. Can be "sum", "mean", "min", or "max" (for example, mean will download hourly data, mean daily data, and mean weekly data)

####### CONSTANTS - DO NOT CHANGE BELOW THIS LINE #######
lat_coords = np.arange(0, 361, dtype=int)
lon_coords = np.arange(0, 576, dtype=int)
database_url = 'https://goldsmr4.gesdisc.eosdis.nasa.gov/opendap/MERRA2/' + database_name + '.5.12.4/'
NUMBER_OF_CONNECTIONS = 5

####### DOWNLOAD DATA #########
# Translate lat/lon into coordinates that MERRA-2 understands
def translate_lat_to_geos5_native(latitude):
    """
    The source for this formula is in the MERRA2 
    Variable Details - File specifications for GEOS pdf file.
    The Grid in the documentation has points from 1 to 361 and 1 to 576.
    The MERRA-2 Portal uses 0 to 360 and 0 to 575.
    latitude: float Needs +/- instead of N/S
    """
    return ((latitude + 90) / 0.5)

def translate_lon_to_geos5_native(longitude):
    """See function above"""
    return ((longitude + 180) / 0.625)

def find_closest_coordinate(calc_coord, coord_array):
    """
    Since the resolution of the grid is 0.5 x 0.625, the 'real world'
    coordinates will not be matched 100% correctly. This function matches 
    the coordinates as close as possible. 
    """
    # np.argmin() finds the smallest value in an array and returns its
    # index. np.abs() returns the absolute value of each item of an array.
    # To summarize, the function finds the difference closest to 0 and returns 
    # its index. 
    index = np.abs(coord_array-calc_coord).argmin()
    return coord_array[index]

def translate_year_to_file_number(year):
    """
    The file names consist of a number and a meta data string. 
    The number changes over the years. 1980 until 1991 it is 100, 
    1992 until 2000 it is 200, 2001 until 2010 it is  300 
    and from 2011 until now it is 400.
    """
    file_number = ''
    
    if year >= 1980 and year < 1992:
        file_number = '100'
    elif year >= 1992 and year < 2001:
        file_number = '200'
    elif year >= 2001 and year < 2011:
        file_number = '300'
    elif year >= 2011:
        file_number = '400'
    else:
        raise Exception('The specified year is out of range.')
    return file_number

def generate_url_params(parameter, time_para, lat_para, lon_para):
    """Creates a string containing all the parameters in query form"""
    parameter = map(lambda x: x + time_para, parameter)
    parameter = map(lambda x: x + lat_para, parameter)
    parameter = map(lambda x: x + lon_para, parameter)
    return ','.join(parameter)
    
def generate_download_links(download_years, base_url, dataset_name, url_params):
    """
    Generates the links for the download. 
    download_years: The years you want to download as array. 
    dataset_name: The name of the data set. For example tavg1_2d_slv_Nx
    """
    urls = []
    for y in download_years: 
        y_str = str(y)
        file_num = translate_year_to_file_number(y)
        for m in range(1,13):
            m_str = str(m).zfill(2)
            _, nr_of_days = monthrange(y, m)
            for d in range(1,nr_of_days+1):
                d_str = str(d).zfill(2)
                # Create the file name string
                file_name = 'MERRA2_{num}.{name}.{y}{m}{d}.nc4'.format(
                    num=file_num, name=dataset_name, 
                    y=y_str, m=m_str, d=d_str)
                # Create the query
                query = '{base}{y}/{m}/{name}.nc4?{params}'.format(
                    base=base_url, y=y_str, m=m_str, 
                    name=file_name, params=url_params)
                urls.append(query)
    return urls

def extract_date(data_set):
    """
    Extracts the date from the filename before merging the datasets. 
    """ 
    if 'HDF5_GLOBAL.Filename' in data_set.attrs:
        f_name = data_set.attrs['HDF5_GLOBAL.Filename']
    elif 'Filename' in data_set.attrs:
        f_name = data_set.attrs['Filename']
    else: 
        raise AttributeError('The attribute name has changed again!')
    # find a match between "." and ".nc4" that does not have "." .
    exp = r'(?<=\.)[^\.]*(?=\.nc4)'
    res = re.search(exp, f_name).group(0)
    # Extract the date. 
    y, m, d = res[0:4], res[4:6], res[6:8]
    date_str = ('%s-%s-%s' % (y, m, d))
    data_set = data_set.assign(date=date_str)
    return data_set

def satellite_image_download(year, location_name, latitude, longitude):
    years.append(year)
    locs.append((location_name, latitude, longitude))
    # years.append(year)
    # locs.append((location_name, longitude, latitude))
    print('DOWNLOADING DATA FROM MERRA')
    print('Predicted time: ' + str(len(years)*len(locs)*6) + ' minutes')
    print('=====================')
    logging.info("Downloding data")
    for loc, lat, lon in locs:
        print('Downloading ' + field_name + ' data for ' + loc)
        # Translate the coordinates that define your area to grid coordinates.
        lat_coord = translate_lat_to_geos5_native(lat)
        lon_coord = translate_lon_to_geos5_native(lon)
        # Find the closest coordinate in the grid.
        lat_closest = find_closest_coordinate(lat_coord, lat_coords)
        lon_closest = find_closest_coordinate(lon_coord, lon_coords)
        # Generate URLs for scraping
        requested_lat = '[{lat}:1:{lat}]'.format(lat=lat_closest)
        requested_lon = '[{lon}:1:{lon}]'.format(lon=lon_closest)
        parameter = generate_url_params([field_id], '[0:1:23]', requested_lat, requested_lon)
        generated_URL = generate_download_links(years, database_url, database_id, parameter)
        download_manager = DownloadManager()
        download_manager.set_username_and_password(username, password)
        download_manager.download_path = field_name + '/' + loc
        download_manager.download_urls = generated_URL
        download_manager.start_download(NUMBER_OF_CONNECTIONS)

    ######### OPEN, CLEAN, MERGE, MERGE DATA AND WRITE CSVS ##########
    # Open nc4 files as dataframes, perform aggregations and save as CSV files
    print('CLEANING AND MERGING DATA')
    print('Predicted time: ' + str(len(years)*len(locs)*0.1) + ' minutes')
    print('=====================')
    logging.info("Cleaning and Merging data")
    for loc, lat, lon in locs:
        print('Cleaning and merging ' + field_name + ' data for ' + loc)
        dfs = []
        for file in os.listdir(field_name + '/' + loc):
            if '.nc4' in file:
                try:
                    with xr.open_mfdataset(field_name + '/' + loc + '/' + file, preprocess=extract_date) as df:
                        dfs.append(df.to_dataframe())
                except:
                    print('Issue with file ' + file)
        df_hourly = pd.concat(dfs)
        df_hourly['time'] = df_hourly.index.get_level_values(level=2)
        df_hourly.columns = [field_name, 'date', 'time']
        df_hourly[field_name] = df_hourly[field_name].apply(conversion_function)
        df_hourly['date'] = pd.to_datetime(df_hourly['date'])
        df_hourly.to_csv(field_name + '/' + loc + '_hourly.csv', header=[field_name, 'date', 'time'], index=False)
        df_hourly = pd.read_csv(field_name + '/' + loc + '_hourly.csv')
        df_daily = df_hourly.groupby('date').agg(aggregator)
        df_daily = df_daily.drop('time', axis=1)
        df_daily['date'] = df_daily.index
        df_daily.to_csv(field_name + '/' + loc + '_daily.csv', header=[field_name, 'date'], index=False)
        df_weekly = df_daily
        df_weekly['Week'] = pd.to_datetime(df_weekly['date']).apply(lambda x: x.isocalendar()[1])
        df_weekly['Year'] = pd.to_datetime(df_weekly['date']).apply(lambda x: x.year)
        df_weekly = df_weekly.groupby(['Year', 'Week']).agg(aggregator)
        df_weekly['Year'] = df_weekly.index.get_level_values(0)
        df_weekly['Week'] = df_weekly.index.get_level_values(1)
        df_weekly.to_csv(field_name + '/' + loc + '_weekly.csv', index=False)

    print('FINISHED')

def satellite_image_plot(year, location):
    logging.info("Plotting data")
    plotting = Plotting()
    plotting.plot_satellite(year,location)
    print("Finished Plotting")


# satellite_image_download(2015, 'india', 20.5937, 78.9629 )
# satellite_image_plot(2015, 'india')
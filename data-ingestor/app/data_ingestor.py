from tokenize import String
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

import requests
import nexradaws
import cloudinary
import cloudinary.uploader

from threading import Thread

from .merra_scraping import *
import logging

conn = nexradaws.NexradAwsInterface()

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/fileurl/{year}/{month}/{day}/{radar_station}/{time}")
async def getURL(year, month, day, radar_station, time):
    availscans = conn.get_avail_scans(year, month, day, radar_station)
    fileName = availscans[0:1][0].filename
    uri = "https://noaa-nexrad-level2.s3.amazonaws.com/"+year+"/"+month+"/"+day+"/"+radar_station+"/"+fileName
    return {"url":uri,"file_name":fileName}

@app.get("/satellite/{year}/{location}/{latitude}/{longitude}")
async def getSatellite(year, location, latitude, longitude):
    logging.info("sent request for downloading")
    satellite_image_download(int(year), location, float(latitude), float(longitude))
    logging.info("sent request for plotting")
    satellite_image_plot(int(year), location)
    plot_url = upload_plot(location+year)
    return {"cloud_plot_url": plot_url["secure_url"]}

def upload_plot(file_name):
    cloudinary.config( 
    cloud_name = "airavata-ampersand", 
    api_key = "125437764849963", 
    api_secret = "qA2t96zRI1JuU8RoO1Eqe0iDySI")

    plot_url = cloudinary.uploader.upload("test.png",public_id = file_name)

    return plot_url

# main.py

from tokenize import String
from fastapi import FastAPI
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware

import matplotlib.pyplot as plt
import pyart
import gzip
import requests
import cloudinary
import cloudinary.uploader

def plot_radar(isGZ):
    # extract gzip file and open the file, create the displays and figure
    if isGZ:
        filename = gzip.open("test.gz")
        radar = pyart.io.read_nexrad_archive(filename)
    else:
        radar = pyart.io.read_nexrad_archive("test.gz")
    display = pyart.graph.RadarDisplay(radar)
    fig = plt.figure(figsize=(6, 5))

    # plot super resolution reflectivity
    ax = fig.add_subplot(111)
    display.plot('reflectivity', 0, title='NEXRAD Reflectivity',
                vmin=-32, vmax=64, colorbar_label='', ax=ax)
    display.plot_range_ring(radar.range['data'][-1]/1000., ax=ax)
    display.set_limits(xlim=(-500, 500), ylim=(-500, 500), ax=ax)
    #plt.show()
    plt.savefig("test.png")

class userURL(BaseModel):
    user_id : str
    url : str
    file_name : str

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/plot")
async def plot(fileURL : userURL):
    isGZ = False
    data_file = requests.get(fileURL.url)
    # print(data_file.headers)
    with open("test.gz", "wb") as f: 
        f.write(data_file.content)
    if fileURL.file_name[-3:] == '.gz':
        # print(fileURL.file_name[-3:])
        isGZ = True
    plot_radar(isGZ)
    plot_url = upload_plot(fileURL.file_name)
    return {"cloud_plot_url": plot_url["secure_url"]}

def upload_plot(file_name):
    cloudinary.config( 
    cloud_name = "airavata-ampersand", 
    api_key = "125437764849963", 
    api_secret = "qA2t96zRI1JuU8RoO1Eqe0iDySI")

    plot_url = cloudinary.uploader.upload("test.png",public_id = file_name)

    return plot_url
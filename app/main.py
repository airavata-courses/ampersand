# main.py

from tokenize import String
from fastapi import FastAPI
from pydantic import BaseModel

import matplotlib.pyplot as plt
import pyart
import gzip
import requests

def plot_radar():
    # extract gzip file and open the file, create the displays and figure
    filename = gzip.open("test.gz")
    radar = pyart.io.read_nexrad_archive(filename)
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

app = FastAPI()

@app.post("/plot")
async def plot(fileURL : userURL):
    data_file = requests.get(fileURL.url)
    # print(data_file.status_code)
    # print(data_file.headers)
    with open("test.gz", "wb") as f: 
        f.write(data_file.content)
    plot_radar()
    return {"message": "data plotted for the url."}
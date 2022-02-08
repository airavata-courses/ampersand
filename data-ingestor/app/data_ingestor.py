from tokenize import String
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

import requests
import nexradaws

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

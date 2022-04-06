import React, {useState} from 'react'
import 'mapbox-gl/dist/mapbox-gl.css';
import mapboxgl from 'mapbox-gl';
import '../Radar.css';
import DatePicker from "react-datepicker";
import TimePicker from "rc-time-picker";
import 'rc-time-picker/assets/index.css';
import moment from "moment";
import "react-datepicker/dist/react-datepicker.css";
import Axios from 'axios'

document.title = "Dashboard";

const params = new URLSearchParams(window.location.search);
var username = params.get("username");

var Radar_Station = ""
var reqDateYYYY = ""
var reqDateMM = ""
var reqDateDD = ""

var reqStartTimeHH = ""
var reqStartTimeMM = ""
var reqStartTimeSS = ""

var reqEndTimeHH = ""
var reqEndTimeMM = ""
var reqEndTimeSS = ""

// MapBox API
document.addEventListener('readystatechange', function() {

    // all of your map code here
	mapboxgl.accessToken = 'pk.eyJ1IjoibmthbWJsZSIsImEiOiJjbDFsa2MxdmIwYmd1M3FyendscHEwemN1In0.IdIJN8xZHt4l3bsN0gxlMA';
    const map = new mapboxgl.Map({
        container: 'map2',
        style: 'mapbox://styles/mapbox/light-v10',
        center: [-96, 37.8],
        zoom: 2
    });
    
    // Radar Stations can be configured here
    map.on('load', () => {
        // Add an image to use as a custom marker
        map.loadImage(
            'https://docs.mapbox.com/mapbox-gl-js/assets/custom_marker.png',
            (error, image) => {
                if (error) throw error;
                map.addImage('custom-marker', image);

                // Add a GeoJSON source with Radar Station points
                map.addSource('points', {
                    'type': 'geojson',
                    'data': {
                        'type': 'FeatureCollection',
                        'features': [

                            {   
                                'type': 'Feature',
                                'geometry': {
                                    'type': 'Point',
                                    'coordinates': [-66.0780644, 18.1155998]
                                },
                                'properties': {
                                    'id': 'TJUA',
                                    'description': 'San Juan, PR'
                                }
                            },
                            
                            {
                                'id': 'KCBW',
                                'type': 'Feature',
                                'geometry': {
                                    'type': 'Point',
                                    'coordinates': [-67.8066033, 46.0391944]
                                },
                                'properties': {
                                    'id':'KCBW',
                                    'desciption': 'Loring AFB, ME'
                                }
                            },

                            {
                                'id': 'KGYX',
                                'type': 'Feature',
                                'geometry': {
                                    'type': 'Point',
                                    'coordinates': [-70.2565545, 43.8913555]
                                },
                                'properties': {
                                    'id':'KGYX',
                                    'description': 'Portland, ME'
                                }
                            },

                            {
                                'id': 'KVTX',
                                'type': 'Feature',
                                'geometry': {
                                    'type': 'Point',
                                    'coordinates': [-119.1795641, 34.4116386]
                                },
                                'properties': {
                                    'id':'KVTX',
                                    'description': 'Los Angeles, CA'
                                }
                            },

                            {
                                'id': 'KIND',
                                'type': 'Feature',
                                'geometry': {
                                    'type': 'Point',
                                    'coordinates': [-86.2803675, 39.7074962]
                                },
                                'properties': {
                                    'id':'KIND',
                                    'description': 'Indianapolis, IN'
                                }
                            },
                        ]
                    }
                });

                // Add a symbol layer
                map.addLayer({
                    'id': 'points',
                    'type': 'symbol',
                    'source': 'points',
                    'layout': {
                        'icon-image': 'custom-marker',
                        // get the title name from the source's "title" property
                        'text-field': ['get', 'title'],
                        'text-font': [
                            'Open Sans Semibold',
                            'Arial Unicode MS Bold'
                        ],
                        'text-offset': [0, 1.25],
                        'text-anchor': 'top'
                    }
                });
            }
        );
    });

    map.on('click', function (e){
        
        var features = map.queryRenderedFeatures(e.point, { layers: ['points'] });

        if (!features.length) {
            return;
        }
    
        var feature = features[0];
        Radar_Station = feature.properties.id
        
        console.log(Radar_Station)
    })


 }, false);

function RadarMap(){
    
    const [checkInDate, setCheckInDate] = useState(null);
    const [startTime, setStartTime] = useState(null);
    const [endTime, setEndTime] = useState(null);
    
    function handleCheckInDate(date){
        setCheckInDate(date);
    }

    function handleStartTime(stime){
        setStartTime(stime);
      };

    function handleEndTime(etime){
        setEndTime(etime);
      };
    
    function hover_down(){
        let e = document.getElementById("graph_image")
        e.scrollIntoView({
            block: 'end',
            behavior: 'smooth',
            inline: 'center'
          });
        window.open("#graph_image", "_self")
        submit()
    }

    function submit(){
        // checking username
        if(username === "" || username == null){
            username = "guest"
        }

        if(Radar_Station === ""){
            // alert("Select a Radar Station")
            // return
            Radar_Station = "KIND"
        }
        
        console.log(username, Radar_Station)
        console.log("Date",reqDateYYYY, reqDateMM, reqDateDD)
        console.log("Start Time",reqStartTimeHH, reqStartTimeMM, reqStartTimeSS)
        console.log("End Time",reqEndTimeHH, reqEndTimeMM, reqEndTimeSS)

        Axios.post("http://localhost:3001/users", {
            username: username,
            reqRadar: Radar_Station,
            reqDateYYYY: reqDateYYYY, 
            reqDateMM: reqDateMM,
            reqDateDD: reqDateDD,
            reqStartTimeHH: reqStartTimeHH,
            reqStartTimeMM: reqStartTimeMM,
            reqStartTimeSS: reqStartTimeSS,
            reqEndTimeHH: reqEndTimeHH,
            reqEndTimeMM: reqEndTimeMM,
            reqEndTimeSS: reqEndTimeSS
        })
        .then(res =>{
            var cloud_image_url = res.data.cloud_image_url
            console.log(res.data)
            // console.log(res.data.message, cloud_image_url)
            document.getElementById("graph_image").src = cloud_image_url
            // document.getElementById("user_form").reset()
        })

        alert("Your Request is in Process. Please wait for a few seconds.")

    }

    reqDateYYYY = moment(checkInDate).format("YYYY")
    reqDateMM = moment(checkInDate).format("MM")
    reqDateDD = moment(checkInDate).format("DD")

    reqStartTimeHH = moment(startTime).format("hh")
    reqStartTimeMM = moment(startTime).format("mm")
    reqStartTimeSS = moment(startTime).format("ss")

    reqEndTimeHH = moment(endTime).format("hh")
    reqEndTimeMM = moment(endTime).format("mm")
    reqEndTimeSS = moment(endTime).format("ss")

    return(
        <div>
            <center>
                <div>
                    <h3 style={{color:"whitesmoke"}}>Select Radar Station from the Map</h3>
                    <div id="map2"></div>

                    <br/><br/>
                    <div className="input-container">
                        <div>
                        <label  style={{color:"whitesmoke"}}>Pick a Date</label>
                        <DatePicker
                            selected={checkInDate}
                            maxDate={new Date()}
                            onChange={(e) => handleCheckInDate(e)}
                        />
                        <br/><br/>
                        <label  style={{color:"whitesmoke"}}>Select Time Range</label>
                        <br/><br/>
                        <TimePicker
                            selected={startTime}
                            placeholder="Select Start Time"
                            showSecond={true}
                            focusOnOpen={true}
                            onChange={(e) => handleStartTime(e)}
                        />
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        <TimePicker
                            selected={endTime}
                            placeholder="Select End Time"
                            focusOnOpen={true}
                            showSecond={true}
                            onChange={(e) => handleEndTime(e)}
                        />
                        </div>
                    </div>
                    <br/><br/>
                    <input style={{ height: "40px" , width: "350px" }} placeholder="submit" name="submit" id="submit" type="submit" value="CREATE GRAPH" onClick={hover_down}/>
                    <br/><br/><br/><br/><br/><hr/><br/><br/><br/>
                    
                    <h3  style={{color:"whitesmoke"}}>Your Results will be displayed over here</h3>
                    <img id="graph_image" src="" style={{height: "500px" , width: "600px"}}/>
                </div>
            </center>
        </div>
    );
}

export default RadarMap;
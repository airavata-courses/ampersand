import React, {useState} from 'react'
import 'mapbox-gl/dist/mapbox-gl.css';
import mapboxgl from 'mapbox-gl';
import '../Radar.css';
import DatePicker from "react-datepicker";
import TimePicker from "rc-time-picker";
import 'rc-time-picker/assets/index.css';
import moment from "moment";
import "react-datepicker/dist/react-datepicker.css";

document.addEventListener('readystatechange', function() {

    var Radar_Station = ""

    // all of your map code here
	mapboxgl.accessToken = 'pk.eyJ1IjoibmthbWJsZSIsImEiOiJjbDFsa2MxdmIwYmd1M3FyendscHEwemN1In0.IdIJN8xZHt4l3bsN0gxlMA';
    const map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/mapbox/light-v10',
        center: [-96, 37.8],
        zoom: 2
    });

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
    
    const handleCheckInDate = (date) => {
        setCheckInDate(date);
      };

    const handleStartTime = (stime) => {
        setStartTime(stime);
      };

    const handleEndTime = (etime) => {
        setEndTime(etime);
      };

    var reqDateYYYY = moment(checkInDate).format("YYYY")
    var reqDateMM = moment(checkInDate).format("MM")
    var reqDateDD = moment(checkInDate).format("DD")

    var reqStartTimeHH = moment(startTime).format("hh")
    var reqStartTimeMM = moment(startTime).format("mm")
    var reqStartTimeSS = moment(startTime).format("ss")

    var reqEndTimeHH = moment(endTime).format("hh")
    var reqEndTimeMM = moment(endTime).format("mm")
    var reqEndTimeSS = moment(endTime).format("ss")

    // console.log(reqDateYYYY, reqDateMM, reqDateDD)
    // console.log(reqStartTimeHH, reqStartTimeMM, reqStartTimeSS)
    // console.log(reqEndTimeHH, reqEndTimeMM, reqEndTimeSS)

    return(
        <div>
            <center>
                <div>
                    <h3>Select Radar Station from the Map</h3>
                    <div id="map"></div>

                    <br/><br/>
                    <div className="input-container">
                        <div>
                        <label>Pick a Date</label>
                        <DatePicker
                            selected={checkInDate}
                            maxDate={new Date()}
                            onChange={handleCheckInDate}
                        />
                        <br/><br/>
                        <label>Select Time Range</label>
                        <br/><br/>
                        <TimePicker
                            selected={startTime}
                            placeholder="Select Start Time"
                            showSecond={true}
                            focusOnOpen={true}
                            onChange={handleStartTime}
                        />
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        <TimePicker
                            selected={endTime}
                            placeholder="Select End Time"
                            focusOnOpen={true}
                            showSecond={true}
                            onChange={handleEndTime}
                        />
                        </div>
                    </div>
                    <br/><br/>
                    <input style={{ height: "40px" , width: "350px" }} placeholder="submit" name="submit" id="submit" type="submit" value="CREATE GRAPH" />

                </div>
            </center>
        </div>
    );
}

export default RadarMap;
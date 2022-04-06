import React, {useState} from 'react'
import 'mapbox-gl/dist/mapbox-gl.css';
import mapboxgl from 'mapbox-gl';
import DatePicker from "react-datepicker";
import moment from "moment";
import "react-datepicker/dist/react-datepicker.css";
import '../Merra.css';

var YYYY = ""
var Longitude = ""
var Latitude = ""

document.addEventListener('readystatechange', function() {

    // all of your map code here
	mapboxgl.accessToken = 'pk.eyJ1IjoibmthbWJsZSIsImEiOiJjbDFtdDBnbHIwbnV0M2pvYmw2bzFucDltIn0.C6fDN9It7tXCMUr9AZjeJQ';

    // const coordinates = document.getElementById('coordinates');
    const map = new mapboxgl.Map({
        container: 'map1',
        style: 'mapbox://styles/mapbox/streets-v11',
        center: [0, 0],
        zoom: 2
    });

    const marker = new mapboxgl.Marker({
        draggable: true
    })
        .setLngLat([0, 0])
        .addTo(map);

    function onDragEnd() {
        const lngLat = marker.getLngLat();
        // coordinates.style.display = 'block';
        // coordinates.innerHTML = `Longitude: ${lngLat.lng}<br />Latitude: ${lngLat.lat}`;
        Longitude = lngLat.lng
        Latitude = lngLat.lat
        console.log(Longitude, Latitude)
    }

    marker.on('dragend', onDragEnd);
});

function MerraMap(){
    const [startDate, setStartDate] = useState(null);

    const handleStartDate = (date) => {
        setStartDate(date);
      };
    
    YYYY = moment(startDate).format("YYYY")

    console.log(YYYY)

    return(
        <div>
            <center>
                <div>
                    <h3>Drag and Drop Pin on any location</h3>
                    <div id="map1"></div>
                    <br/><br/>
                    <div className="input-container">
                        <div>
                        <label>Pick a Date</label>
                        <DatePicker
                            selected={startDate}
                            onChange={handleStartDate}
                            showYearPicker
                            maxDate={new Date()}
                            dateFormat="yyyy"
                            yearItemNumber={6}
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

export default MerraMap;
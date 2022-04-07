import React, {useState} from 'react'
import 'mapbox-gl/dist/mapbox-gl.css';
import mapboxgl from 'mapbox-gl';
import DatePicker from "react-datepicker";
import moment from "moment";
import "react-datepicker/dist/react-datepicker.css";
import '../Merra.css';
import Axios from 'axios'

var YYYY = ""
var place = "Home"
var Longitude = ""
var Latitude = ""

document.title = "Dashboard";

const params = new URLSearchParams(window.location.search);
var username = params.get("username");

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

        // var url =  "https://api.mapbox.com/geocoding/v5/mapbox.places/"-73.989,40.733 + ".json?types=address&access_token=pk.eyJ1IjoibmthbWJsZSIsImEiOiJjbDFtdDBnbHIwbnV0M2pvYmw2bzFucDltIn0.C6fDN9It7tXCMUr9AZjeJQ"
        
        alert("You have Selected ->", " Longitude:", Longitude, " Latitude:", Latitude)
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

    function hover_down(){
        // let e = document.getElementById("graph_image")
        // e.scrollIntoView({
        //     block: 'end',
        //     behavior: 'smooth',
        //     inline: 'center'
        //   });
        // window.open("#graph_image", "_self")
        submit()
    }

    function submit(){
        // checking username
        if(username === "" || username == null){
            username = "guest"
        }

        if(Longitude === ""){
            // alert("Drag The Pointer for Location")
            // return
            Longitude = "73.86012344753391"
        }

        if(Latitude === ""){
            // alert("Drag The Pointer for Location")
            // return
            Latitude = "18.523211555360163"
        }
        
        Axios.post("http://localhost:3001/merra", {
            username: username,
            place: place,
            longitude: Longitude,
            latitude: Latitude,
            yyyy: YYYY
        })
        .then(res =>{
            var cloud_image_url = res.data.cloud_image_url
            console.log(res.data)
            // console.log(res.data.message, cloud_image_url)
            // document.getElementById("graph_image").src = cloud_image_url
            // document.getElementById("user_form").reset()
        })

        alert("Your Request is in Process. Please wait for a few seconds.")
    }

    return(
        <div>
            <center>
                <div>
                    <h3  style={{color:"whitesmoke"}}>Drag and Drop Pin on any location</h3>
                    <div id="map1"></div>
                    <br/><br/>
                    <div className="input-container">
                        <div>
                        <label  style={{color:"whitesmoke"}}>Pick a Date</label>
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
                    <input style={{ height: "40px" , width: "350px" }} placeholder="submit" name="submit" id="submit" type="submit" value="CREATE GRAPH" onClick={hover_down}/>
                    {/* <br/><br/><br/><br/><br/><hr/><br/><br/><br/>
                    
                    <h3  style={{color:"whitesmoke"}}>Your Results will be displayed over here</h3>
                    <img id="graph_image" src="" style={{height: "500px" , width: "600px"}}/> */}
                </div>
            </center>
        </div>
    );
}

export default MerraMap;
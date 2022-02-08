import React, { useState } from 'react'
import Axios from 'axios'
import { useEffect } from 'react';
import axios from 'axios';

var radar_data = ""

function PostForm(){
    document.title = "Dashboard";
    var url = "http://localhost:3001/users"
    var radar_url = "http://localhost:8080/radarstation?city="
    
    var rradar = ""
    
    // for data ingestor and data plotting requests
    var py_url = "http://localhost:81/fileurl/"
    var pl_url = "http://localhost:82/plot/"
    var nexrad_aws_url = ""
    var aws_f_name = ""
    var cloud_image_url = ""
    var ses_id = ""
    var patch_url = ""

    const [name, setName] = useState('');
    
    useEffect(async () => {
      const result = await axios.get('http://localhost:5001/greetme', {
        withCredentials: true
      });
      const aname = (result.data.fullName).replace(" ", "")
      setName(aname);
    });

    const [data, setData] = useState({
        username: name,
        reqRadar: "",
        reqDateYYYY: "", 
        reqDateMM: "",
        reqDateDD: "",
        reqStartTimeHH: "",
        reqStartTimeMM: "",
        reqStartTimeSS: "",
        reqEndTimeHH: "",
        reqEndTimeMM: "",
        reqEndTimeSS: ""
    })

    function rad(){
        if((document.getElementById("reqRadar").value) != ""){
            rradar = document.getElementById("reqRadar").value
            radar_url = radar_url + rradar

            // radar station name microservice
            Axios.get(radar_url, {headers:{
                "authorization" : 'token' , 'Access-Control-Allow-Origin': "*"
            }})
            .then(res =>{
                radar_data = res.data
                console.log("adhi",radar_data)
            })
        }
    }

    function submit(e){
        e.preventDefault();
        
        if(radar_data == ""){
            radar_data = "KBMX"
        }

        console.log("nantar",radar_data)
        
        Axios.post(url, {
            username: name,
            reqRadar: radar_data,
            reqDateYYYY: data.reqDateYYYY, 
            reqDateMM: data.reqDateMM,
            reqDateDD: data.reqDateDD,
            reqStartTimeHH: data.reqStartTimeHH,
            reqStartTimeMM: data.reqStartTimeMM,
            reqStartTimeSS: data.reqStartTimeSS,
            reqEndTimeHH: data.reqEndTimeHH,
            reqEndTimeMM: data.reqEndTimeMM,
            reqEndTimeSS: data.reqEndTimeSS
        })
        .then(res =>{
            console.log(res.data)
            console.log(res.data._id)
            // console.log("sometime it is possible")
            ses_id = res.data._id
            patch_url = url+'/'+ses_id
            console.log(patch_url)
        })

        alert("Your Request is in Process. Please wait for 3-5 seconds.")

        // for data ingestor request
        // const radar = (data.reqRadar).toUpperCase()

        const rem_url = data.reqDateYYYY + '/' + data.reqDateMM + '/' + data.reqDateDD + '/' + radar_data + '/' + data.reqStartTimeHH + data.reqStartTimeMM
        console.log(py_url + rem_url)

        Axios.get(py_url+rem_url, {
        })
        .then(res => {
            console.log(res.data.url, res.data.file_name)
            nexrad_aws_url = res.data.url
            aws_f_name = res.data.file_name
            console.log("updated url's",nexrad_aws_url, aws_f_name)

            // for data plotting request
            axios.post(pl_url, {
                user_id: ses_id, 
                url: nexrad_aws_url,
                file_name: aws_f_name
            })
            .then(res =>{
                console.log(res.data.cloud_plot_url)
                cloud_image_url = res.data.cloud_plot_url
                
                console.log("success is a journey")
                document.getElementById("graph_image").src = cloud_image_url
                console.log(patch_url, ses_id, nexrad_aws_url, aws_f_name, cloud_image_url)

                // updating the database
                axios.patch(patch_url, {
                    id: ses_id, 
                    aws_url: nexrad_aws_url,
                    aws_fname: aws_f_name,
                    cloud_url: cloud_image_url
                })
                .then(res =>{
                    console.log(res.data)  
                })
            })
        })
        
    }

    function handle(e){
        const newdata = {...data}
        newdata[e.target.id] = e.target.value
        setData(newdata)
        console.log(newdata)
        // console.log(e.target.value)
        // rad(e.target.value)
    }

    function request(){
        window.open( "/user/request" + "/?name=" + name);
    }

    return (
        <div>
            <hr></hr>
            <h1>WEATHER DASHBOARD</h1>
            <h2>Welcome <b onChange={(e) => handle(e)} id="username" value={name}>{name}</b></h2>
            <hr></hr>
            
            <button style={{ height: "40px" , width: "200px", position:"absolute", right:"0", marginRight:"300px"}} onClick={request}>USER HISTORY</button>
            <a href='http://localhost:3000'><button style={{ height: "40px" , width: "200px", position:"absolute", right:"0", marginRight:"20px"}}>LOGOUT</button></a>
            
            <br/><br/><br/><br/>

            <img id="graph_image" src="" style={{height: "500px" , width: "600px", position:"absolute", left:"0", marginLeft:"700px"}}/>
            
            <form onSubmit={(e)=> submit(e)} style={{position:"absolute", left:"0", marginLeft:"100px"}}>
                    {/* <input style={{ height: "40px" , width: "200px" }} onChange={(e) => handle(e)} id="username" value={data.username} type="text" id="username" placeholder="username" name="username" required /> */}
                    <h2>Select Radars by State</h2>
                    <select style={{ height: "40px" , width: "200px" }} onChange={(e) => handle(e)} onClick={rad} id="reqRadar" value={data.reqRadar}  type="text" id="reqRadar" placeholder="reqRadar" name="reqRadar" required>
                        <option value="">Radars by State</option>
                        <option value=""></option>
                            <option value="">--Alabama</option>
                                <option value="Birmingham">Birmingham</option>
                                <option value="E. Alabama">E. Alabama</option>
                                <option value="Fort Rucker">Fort Rucker</option>
                                <option value="Mobile">Mobile</option>
                                <option value="Nrn. Alabama">Nrn. Alabama</option>
                        <option value=""></option>
                            <option value="">--Alaska</option>
                                <option value="Bethel">Bethel</option>
                                <option value="Biorka Is.">Biorka Is.</option>
                                <option value="Fairbanks">Fairbanks</option>
                                <option value="Kenai">Kenai</option>
                                <option value="King Salmon">King Salmon</option>
                                <option value="Middleton Is.">Middleton Is.</option>
                                <option value="paNomeec">Nome</option>
                                <option value="Pedro Dome">Pedro Dome</option>
                                <option value="Sitka">Sitka</option>
                        {/* <option value=""></option>
                            <option value="">--Arizona</option>
                                <option value="Flagstaff">Flagstaff</option>
                                <option value="Phoenix">Phoenix</option>
                                <option value="Tucson">Tucson</option>
                                <option value="Yuma">Yuma</option>
                        <option value=""></option>
                            <option value="">--Arkansas</option>
                                <option value="Little Rock">Little Rock</option>
                                <option value="W. Ark./Ft. Smith">W. Ark./Ft. Smith</option>
                        <option value=""></option>
                            <option value="">--California</option>
                                <option value="Beale AFB">Beale AFB</option>
                                <option value="Edwards AFB">Edwards AFB</option>
                                <option value="Eureka">Eureka</option>
                                <option value="Hanford">Hanford</option>
                                <option value="Los Angeles">Los Angeles</option>
                                <option value="Sacramento">Sacramento</option>
                                <option value="San Diego">San Diego</option>
                                <option value="San Francisco">San Francisco</option>
                                <option value="San Joaquin Vly.">San Joaquin Vly.</option>
                                <option value="Santa Ana Mtns">Santa Ana Mtns</option>
                                <option value="Vandenberg AFB">Vandenberg AFB</option>
                        <option value=""></option>
                            <option value="">--Colorado</option>
                                <option value="Denver/Boulder">Denver/Boulder</option>
                                <option value="Grand Junction">Grand Junction</option>
                                <option value="Pueblo">Pueblo</option>
                        <option value=""></option>
                            <option value="">--Delaware</option>
                                <option value="Dover AFB">Dover AFB</option>
                        <option value=""></option>
                            <option value="">--Florida</option>
                                <option value="Eglin AFB">Eglin AFB</option>
                                <option value="Jacksonville">Jacksonville</option>
                                <option value="Key West">Key West</option>
                                <option value="Melbourne">Melbourne</option>
                                <option value="Miami">Miami</option>
                                <option value="NW Florida">NW Florida</option>
                                <option value="Tallahassee">Tallahassee</option>
                                <option value="Tampa Bay Area">Tampa Bay Area</option>
                        <option value=""></option>
                            <option value="">--Georgia</option>
                                <option value="Atlanta">Atlanta</option>
                                <option value="Moody AFB">Moody AFB</option>
                                <option value="Peachtree City">Peachtree City</option>
                                <option value="Robins AFB">Robins AFB</option>
                        <option value=""></option>
                            <option value="">--Guam</option>
                                <option value="Andersen AFB">Andersen AFB</option>
                        <option value=""></option>
                            <option value="">--Hawaii</option>
                                <option value="Kauai">Kauai</option>
                                <option value="Kohala">Kohala</option>
                                <option value="Molokai">Molokai</option>
                                <option value="South Shore">South Shore</option>
                        <option value=""></option>
                            <option value="">--Idaho</option>
                                <option value="Boise">Boise</option>
                                <option value="Pocatello">Pocatello</option>
                        <option value=""></option>
                            <option value="">--Illinois</option>
                                <option value="Central IL">Central IL</option>
                                <option value="Chicago">Chicago</option>
                        <option value=""></option>
                            <option value="">--Indiana</option>
                                <option value="Evansville">Evansville</option>
                                <option value="Indianapolis">Indianapolis</option>
                                <option value="Nrn. Indiana">Nrn. Indiana</option>
                        <option value=""></option>
                            <option value="">--Iowa</option>
                                <option value="Des Moines">Des Moines</option>
                                <option value="Quad Cities">Quad Cities</option>
                        <option value=""></option>
                            <option value="">--Kansas</option>
                                <option value="Dodge City">Dodge City</option>
                                <option value="Goodland">Goodland</option>
                                <option value="Topeka">Topeka</option>
                                <option value="Wichita">Wichita</option>
                        <option value=""></option>
                            <option value="">--Kentucky</option>
                                <option value="Fort Cambell">Fort Cambell</option>
                                <option value="Jackson">Jackson</option>
                                <option value="Louisville">Louisville</option>
                                <option value="Paducah">Paducah</option>
                                <option value=""></option>
                            <option value="">--Louisiana</option>
                                <option value="Fort Polk">Fort Polk</option>
                                <option value="Lake Charles">Lake Charles</option>
                                <option value="New Orleans">New Orleans</option>
                                <option value="Shreveport">Shreveport</option>
                        <option value=""></option>
                            <option value="">--Maine</option>
                                <option value="Caribou">Caribou</option>
                                <option value="Portland">Portland</option>
                        <option value=""></option>
                            <option value="">--Maryland</option>
                                <option value="Baltimore">Baltimore</option>
                        <option value=""></option>
                            <option value="">--Massachusetts</option>
                                <option value="Boston">Boston</option>
                        <option value=""></option>
                            <option value="">--Michigan</option>
                                <option value="Detroit">Detroit</option>
                                <option value="Gaylord">Gaylord</option>
                                <option value="Grand Rapids">Grand Rapids</option>
                                <option value="Marquette">Marquette</option>
                        <option value=""></option>
                            <option value="">--Minnesota</option>
                                <option value="Duluth">Duluth</option>
                                <option value="Minneapolis">Minneapolis</option>
                        <option value=""></option>
                            <option value="">--Mississippi</option>
                                <option value="Columbus AFB">Columbus AFB</option>
                                <option value="Brandon/Jackson">Brandon/Jackson</option>
                        <option value=""></option>
                            <option value="">--Missouri</option>
                                <option value="Kansas City">Kansas City</option>
                                <option value="Springfield">Springfield</option>
                                <option value="St. Louis">St. Louis</option>
                        <option value=""></option>
                            <option value="">--Montana</option>
                                <option value="Billings">Billings</option>
                                <option value="Glasgow">Glasgow</option>
                                <option value="Great Falls">Great Falls</option>
                                <option value="Missoula">Missoula</option>
                        <option value=""></option>
                            <option value="">--Nebraska</option>
                                <option value="Hastings">Hastings</option>
                                <option value="North Platte">North Platte</option>
                                <option value="Omaha">Omaha</option>
                        <option value=""></option>
                            <option value="">--Nevada</option>
                                <option value="Elko">Elko</option>
                                <option value="Las Vegas">Las Vegas</option>
                                <option value="Reno">Reno</option>
                        <option value=""></option>
                            <option value="">--New Jersey</option>
                                <option value="Mt. Holly">Mt. Holly</option>
                        <option value=""></option>
                            <option value="">--New Mexico</option>
                                <option value="Albuquerque">Albuquerque</option>
                                <option value="Cannon AFB">Cannon AFB</option>
                                <option value="Holloman AFB">Holloman AFB</option>
                        <option value=""></option>
                            <option value="">--New York</option>
                                <option value="Albany">Albany</option>
                                <option value="Binghamton">Binghamton</option>
                                <option value="Buffalo">Buffalo</option>
                                <option value="Montague">Montague</option>
                                <option value="New York City">New York City</option>
                                <option value="Upton">Upton</option>
                        <option value=""></option>
                            <option value="">--North Carolina</option>
                                <option value="Durham">Durham</option>
                                <option value="Morehead City">Morehead City</option>
                                <option value="Raleigh">Raleigh</option>
                                <option value="Wilmington">Wilmington</option>
                        <option value=""></option>
                            <option value="">--North Dakota</option>
                                <option value="Bismarck">Bismarck</option>
                                <option value="Grand Forks">Grand Forks</option>
                                <option value="Minot AFB">Minot AFB</option>
                        <option value=""></option>
                            <option value="">--Ohio</option>
                                <option value="Cincinnati">Cincinnati</option>
                                <option value="Cleveland">Cleveland</option>
                                <option value="Dayton">Dayton</option>
                                <option value="Wilmington">Wilmington</option>
                        <option value=""></option>
                            <option value="">--Oklahoma</option>
                                <option value="Frederick">Frederick</option>
                                <option value="Oklahoma City">Oklahoma City</option>
                                <option value="Tulsa">Tulsa</option>
                                <option value="Vance AFB">Vance AFB</option>
                        <option value=""></option>
                            <option value="">--Oregon</option>
                                <option value="Medford">Medford</option>
                                <option value="Pendleton">Pendleton</option>
                                <option value="Portland">Portland</option>
                        <option value=""></option>
                            <option value="">--Pennsylvania</option>
                                <option value="Philadelphia">Philadelphia</option>
                                <option value="Pittsburgh">Pittsburgh</option>
                                <option value="State College">State College</option>
                        <option value=""></option>
                            <option value="">--Puerto Rico</option>
                                <option value="Puerto Rico/V.I.">Puerto Rico/V.I.</option>
                        <option value=""></option>
                            <option value="">--South Carolina</option>
                                <option value="Charleston">Charleston</option>
                                <option value="Columbia">Columbia</option>
                                <option value="Greenville">Greenville</option>
                                <option value="Spartanburg">Spartanburg</option>
                                <option value="Greer">Greer</option>
                        <option value=""></option>
                            <option value="">--South Dakota</option>
                                <option value="Aberdeen">Aberdeen</option>
                                <option value="Rapid City">Rapid City</option>
                                <option value="Sioux falls">Sioux falls</option>
                        <option value=""></option>
                            <option value="">--Tennessee</option>
                                <option value="Knoxville">Knoxville</option>
                                <option value="Memphis">Memphis</option>
                                <option value="Morristown">Morristown</option>
                                <option value="Nashville">Nashville</option>
                                <option value="Tri Cities">Tri Cities</option>
                        <option value=""></option>
                            <option value="">--Texas</option>
                                <option value="Amarillo">Amarillo</option>
                                <option value="Austin">Austin</option>
                                <option value="Brownsville">Brownsville</option>
                                <option value="Central Texas">Central Texas</option>
                                <option value="Corpus Christi">Corpus Christi</option>
                                <option value="Dallas">Dallas</option>
                                <option value="Dyess AFB">Dyess AFB</option>
                                <option value="El Paso">El Paso</option>
                                <option value="Fort Worth">Fort Worth</option>
                                <option value="Galveston">Galveston</option>
                                <option value="Houston">Houston</option>
                                <option value="Laughlin AFB">Laughlin AFB</option>
                                <option value="Lubbock">Lubbock</option>
                                <option value="Midland/Odessa">Midland/Odessa</option>
                                <option value="San Angelo">San Angelo</option>
                                <option value="San Antonio">San Antonio</option>
                        <option value=""></option>
                            <option value="">--Utah</option>
                                <option value="Cedar City">Cedar City</option>
                                <option value="Salt Lake City">Salt Lake City</option>
                        <option value=""></option>
                            <option value="">--Vermont</option>
                                <option value="Burlington">Burlington</option>
                        <option value=""></option>
                            <option value="">--Virginia</option>
                                <option value="Blacksburg">Blacksburg</option>
                                <option value="Norfolk">Norfolk</option>
                                <option value="Richmond">Richmond</option>
                                <option value="Roanoke">Roanoke</option>
                                <option value="Sterling">Sterling</option>
                                <option value="Wakefield">Wakefield</option>
                        <option value=""></option>
                            <option value="">--Washington</option>
                                <option value="Seattle">Seattle</option>
                                <option value="Spokane">Spokane</option>
                                <option value="Tacoma">Tacoma</option>
                                <option value="Langley Hill">Langley Hill</option>
                        <option value=""></option>
                            <option value="">--Washington DC</option>
                                <option value="Washington">Washington</option>
                        <option value=""></option>
                            <option value="">--West Virginia</option>
                                <option value="Charleston">Charleston</option>
                        <option value=""></option>
                            <option value="">--Wisconsin</option>
                                <option value="Green Bay">Green Bay</option>
                                <option value="La Crosse">La Crosse</option>
                                <option value="Milwaukee">Milwaukee</option>
                        <option value=""></option>
                            <option value="">--Wyoming</option>
                                <option value="Cheyenne">Cheyenne</option>
                                <option value="Riverton">Riverton</option>
                        
                        
                        <option value=""></option>
                            <option value="">--South Korea	</option>
                        
                        <option value="Kunsan">Kunsan</option>
                        <option value="Camp Humphrey">Camp Humphreys</option>
                        <option value=""></option> */}
                    </select>

                    <h2>Select Date</h2>
                    <select style={{ height: "40px" , width: "50px" }} onChange={(e) => handle(e)} id="reqDateMM" value={data.reqDateMM} type="text" placeholder="reqDateMM" id="reqDateMM" name="reqDateMM" required> 
                        <option hidden> MM </option> 
                            <option value="01" > 01 </option> 
                            <option value="02" > 02 </option> 
                            <option value="03" > 03 </option> 
                            <option value="04" > 04 </option> 
                            <option value="05" > 05 </option> 
                            <option value="06" > 06 </option> 
                            <option value="07" > 07 </option> 
                            <option value="08" > 08 </option> 
                            <option value="09" > 09 </option> 
                            <option value="10" > 10 </option> 
                            <option value="11" > 11 </option> 
                            <option value="12" > 12 </option> 
                    </select> &nbsp;&nbsp;&nbsp;

                    <select style={{ height: "40px" , width: "50px" }} onChange={(e) => handle(e)} id="reqDateDD" value={data.reqDateDD} type="text" placeholder="reqDateDD" id="reqDateDD" name="reqDateDD" required> 
                        <option hidden> DD </option> 
                            <option value="01" > 01 </option> 
                            <option value="02" > 02 </option> 
                            <option value="03" > 03 </option> 
                            <option value="04" > 04 </option> 
                            <option value="05" > 05 </option> 
                            <option value="06" > 06 </option> 
                            <option value="07" > 07 </option> 
                            <option value="08" > 08 </option> 
                            <option value="09" > 09 </option> 
                            <option value="10" > 10 </option> 
                            <option value="11" > 11 </option> 
                            <option value="12" > 12 </option> 
                            <option value="13" > 13 </option> 
                            <option value="14" > 14 </option> 
                            <option value="15" > 15 </option> 
                            <option value="16" > 16 </option> 
                            <option value="17" > 17 </option> 
                            <option value="18" > 18 </option> 
                            <option value="19" > 19 </option> 
                            <option value="20" > 20 </option> 
                            <option value="21" > 21 </option> 
                            <option value="22" > 22 </option> 
                            <option value="23" > 23 </option> 
                            <option value="24" > 24 </option> 
                            <option value="25" > 25 </option> 
                            <option value="26" > 26 </option> 
                            <option value="27" > 27 </option> 
                            <option value="28" > 28 </option> 
                            <option value="29" > 29 </option> 
                            <option value="30" > 30 </option> 
                            <option value="31" > 31 </option> 
                    </select> &nbsp;&nbsp;&nbsp;

                    <select style={{ height: "40px" , width: "70px" }} onChange={(e) => handle(e)} id="reqDateYYYY" value={data.reqDateYYYY} type="text" id="reqDateYYYY" placeholder="reqDateYYYY" name="reqDateYYYY" required> 
                        <option hidden> YYYY </option> 
{/*<option value="1993" > 1993 </option> 
                            <option value="1994" > 1994 </option> 
                            <option value="1995" > 1995 </option> 
                            <option value="1996" > 1996 </option> 
                            <option value="1997" > 1997 </option> 
                            <option value="1998" > 1998 </option> 
                            <option value="1999" > 1999 </option> 
                            <option value="2000" > 2000 </option> 
                            <option value="2001" > 2001 </option> 
                            <option value="2002" > 2002 </option> 
                            <option value="2003" > 2003 </option> 
                            <option value="2004" > 2004 </option> 
                            <option value="2005" > 2005 </option> 
                            <option value="2006" > 2006 </option> 
                            <option value="2007" > 2007 </option> 
                            <option value="2008" > 2008 </option> 
                            <option value="2009" > 2009 </option> 
                            <option value="2010" > 2010 </option> 
                            <option value="2011" > 2011 </option> 
                            <option value="2012" > 2012 </option> 
                            <option value="2013" > 2013 </option> 
                            <option value="2014" > 2014 </option> */}
                            <option value="2015" > 2015 </option> 
                            <option value="2016" > 2016 </option> 
                            <option value="2017" > 2017 </option> 
                            <option value="2018" > 2018 </option> 
                            <option value="2019" > 2019 </option> 
                            <option value="2020" > 2020 </option> 
                            <option value="2021" > 2021 </option> 
                            <option value="2022" > 2022 </option> 
                    </select>

                    <h2>Select Start Time</h2>
                    <select style={{ height: "40px" , width: "50px" }} onChange={(e) => handle(e)} id="reqStartTimeHH" value={data.reqStartTimeHH} type="text" placeholder="reqStartTimeHH" id="reqStartTimeHH" name="reqStartTimeHH" required> 
                        <option hidden> HH </option> 
                            <option value="00" > 00 </option> 
                            <option value="01" > 01 </option> 
                            <option value="02" > 02 </option> 
                            <option value="03" > 03 </option> 
                            <option value="04" > 04 </option> 
                            <option value="05" > 05 </option> 
                            <option value="06" > 06 </option> 
                            <option value="07" > 07 </option> 
                            <option value="08" > 08 </option> 
                            <option value="09" > 09 </option> 
                            <option value="10" > 10 </option> 
                            <option value="11" > 11 </option> 
                            <option value="12" > 12 </option>
                            <option value="13" > 13 </option> 
                            <option value="14" > 14 </option> 
                            <option value="15" > 15 </option> 
                            <option value="16" > 16 </option> 
                            <option value="17" > 17 </option> 
                            <option value="18" > 18 </option> 
                            <option value="19" > 19 </option> 
                            <option value="20" > 20 </option> 
                            <option value="21" > 21 </option> 
                            <option value="22" > 22 </option> 
                            <option value="23" > 23 </option> 
                    </select>&nbsp;&nbsp;&nbsp;
                    
                    <select style={{ height: "40px" , width: "50px" }} onChange={(e) => handle(e)} id="reqStartTimeMM" value={data.reqStartTimeMM} type="text" id="reqStartTimeMM" placeholder="reqStartTimeMM" name="reqStartTimeMM" required> 
                        <option hidden> MM </option> 
                            <option value="00">00</option>
                            <option value="01">01</option>
                            <option value="02">02</option>
                            <option value="03">03</option>
                            <option value="04">04</option>
                            <option value="05">05</option>
                            <option value="06">06</option>
                            <option value="07">07</option>
                            <option value="08">08</option>
                            <option value="09">09</option>
                            <option value="10">10</option>
                            <option value="11">11</option>
                            <option value="12">12</option>
                            <option value="13">13</option>
                            <option value="14">14</option>
                            <option value="15">15</option>
                            <option value="16">16</option>
                            <option value="17">17</option>
                            <option value="18">18</option>
                            <option value="19">19</option>
                            <option value="20">20</option>
                            <option value="21">21</option>
                            <option value="22">22</option>
                            <option value="23">23</option>
                            <option value="24">24</option>
                            <option value="25">25</option>
                            <option value="26">26</option>
                            <option value="27">27</option>
                            <option value="28">28</option>
                            <option value="29">29</option>
                            <option value="30">30</option>
                            <option value="31">31</option>
                            <option value="32">32</option>
                            <option value="33">33</option>
                            <option value="34">34</option>
                            <option value="35">35</option>
                            <option value="36">36</option>
                            <option value="37">37</option>
                            <option value="38">38</option>
                            <option value="39">39</option>
                            <option value="40">40</option>
                            <option value="41">41</option>
                            <option value="42">42</option>
                            <option value="43">43</option>
                            <option value="44">44</option>
                            <option value="45">45</option>
                            <option value="46">46</option>
                            <option value="47">47</option>
                            <option value="48">48</option>
                            <option value="49">49</option>
                            <option value="50">50</option>
                            <option value="51">51</option>
                            <option value="52">52</option>
                            <option value="53">53</option>
                            <option value="54">54</option>
                            <option value="55">55</option>
                            <option value="56">56</option>
                            <option value="57">57</option>
                            <option value="58">58</option>
                            <option value="59">59</option> 
                    </select>&nbsp;&nbsp;&nbsp;

                    <select style={{ height: "40px" , width: "50px" }} onChange={(e) => handle(e)} id="reqStartTimeSS" value={data.reqStartTimeSS} type="text" id="reqStartTimeSS" placeholder="reqStartTimeSS" name="reqStartTimeSS" required> 
                        <option hidden> SS </option> 
                        <option value="00">00</option>
                        <option value="01">01</option>
                        <option value="02">02</option>
                        <option value="03">03</option>
                        <option value="04">04</option>
                        <option value="05">05</option>
                        <option value="06">06</option>
                        <option value="07">07</option>
                        <option value="08">08</option>
                        <option value="09">09</option>
                        <option value="10">10</option>
                        <option value="11">11</option>
                        <option value="12">12</option>
                        <option value="13">13</option>
                        <option value="14">14</option>
                        <option value="15">15</option>
                        <option value="16">16</option>
                        <option value="17">17</option>
                        <option value="18">18</option>
                        <option value="19">19</option>
                        <option value="20">20</option>
                        <option value="21">21</option>
                        <option value="22">22</option>
                        <option value="23">23</option>
                        <option value="24">24</option>
                        <option value="25">25</option>
                        <option value="26">26</option>
                        <option value="27">27</option>
                        <option value="28">28</option>
                        <option value="29">29</option>
                        <option value="30">30</option>
                        <option value="31">31</option>
                        <option value="32">32</option>
                        <option value="33">33</option>
                        <option value="34">34</option>
                        <option value="35">35</option>
                        <option value="36">36</option>
                        <option value="37">37</option>
                        <option value="38">38</option>
                        <option value="39">39</option>
                        <option value="40">40</option>
                        <option value="41">41</option>
                        <option value="42">42</option>
                        <option value="43">43</option>
                        <option value="44">44</option>
                        <option value="45">45</option>
                        <option value="46">46</option>
                        <option value="47">47</option>
                        <option value="48">48</option>
                        <option value="49">49</option>
                        <option value="50">50</option>
                        <option value="51">51</option>
                        <option value="52">52</option>
                        <option value="53">53</option>
                        <option value="54">54</option>
                        <option value="55">55</option>
                        <option value="56">56</option>
                        <option value="57">57</option>
                        <option value="58">58</option>
                        <option value="59">59</option>
                    </select>

                    <h2>Select End Time</h2>
                    <select style={{ height: "40px" , width: "50px" }} onChange={(e) => handle(e)} id="reqEndTimeHH" value={data.reqEndTimeHH}  type="text" id="reqEndTimeHH" placeholder="reqEndTimeHH" name="reqEndTimeHH" required> 
                        <option hidden> HH </option> 
                            <option value="00" > 00 </option> 
                            <option value="01" > 01 </option> 
                            <option value="02" > 02 </option> 
                            <option value="03" > 03 </option> 
                            <option value="04" > 04 </option> 
                            <option value="05" > 05 </option> 
                            <option value="06" > 06 </option> 
                            <option value="07" > 07 </option> 
                            <option value="08" > 08 </option> 
                            <option value="09" > 09 </option> 
                            <option value="10" > 10 </option> 
                            <option value="11" > 11 </option> 
                            <option value="12" > 12 </option>
                            <option value="13" > 13 </option> 
                            <option value="14" > 14 </option> 
                            <option value="15" > 15 </option> 
                            <option value="16" > 16 </option> 
                            <option value="17" > 17 </option> 
                            <option value="18" > 18 </option> 
                            <option value="19" > 19 </option> 
                            <option value="20" > 20 </option> 
                            <option value="21" > 21 </option> 
                            <option value="22" > 22 </option> 
                            <option value="23" > 23 </option> 
                    </select>&nbsp;&nbsp;&nbsp;
                    
                    <select style={{ height: "40px" , width: "50px" }} onChange={(e) => handle(e)} id="reqEndTimeMM" value={data.reqEndTimeMM}  type="text" id="reqEndTimeMM" placeholder="reqEndTimeMM" name="reqEndTimeMM" required> 
                        <option hidden> MM </option> 
                            <option value="00">00</option>
                            <option value="01">01</option>
                            <option value="02">02</option>
                            <option value="03">03</option>
                            <option value="04">04</option>
                            <option value="05">05</option>
                            <option value="06">06</option>
                            <option value="07">07</option>
                            <option value="08">08</option>
                            <option value="09">09</option>
                            <option value="10">10</option>
                            <option value="11">11</option>
                            <option value="12">12</option>
                            <option value="13">13</option>
                            <option value="14">14</option>
                            <option value="15">15</option>
                            <option value="16">16</option>
                            <option value="17">17</option>
                            <option value="18">18</option>
                            <option value="19">19</option>
                            <option value="20">20</option>
                            <option value="21">21</option>
                            <option value="22">22</option>
                            <option value="23">23</option>
                            <option value="24">24</option>
                            <option value="25">25</option>
                            <option value="26">26</option>
                            <option value="27">27</option>
                            <option value="28">28</option>
                            <option value="29">29</option>
                            <option value="30">30</option>
                            <option value="31">31</option>
                            <option value="32">32</option>
                            <option value="33">33</option>
                            <option value="34">34</option>
                            <option value="35">35</option>
                            <option value="36">36</option>
                            <option value="37">37</option>
                            <option value="38">38</option>
                            <option value="39">39</option>
                            <option value="40">40</option>
                            <option value="41">41</option>
                            <option value="42">42</option>
                            <option value="43">43</option>
                            <option value="44">44</option>
                            <option value="45">45</option>
                            <option value="46">46</option>
                            <option value="47">47</option>
                            <option value="48">48</option>
                            <option value="49">49</option>
                            <option value="50">50</option>
                            <option value="51">51</option>
                            <option value="52">52</option>
                            <option value="53">53</option>
                            <option value="54">54</option>
                            <option value="55">55</option>
                            <option value="56">56</option>
                            <option value="57">57</option>
                            <option value="58">58</option>
                            <option value="59">59</option> 
                    </select>&nbsp;&nbsp;&nbsp;

                    <select style={{ height: "40px" , width: "50px" }} onChange={(e) => handle(e)} id="reqEndTimeSS" value={data.reqEndTimeSS}  type="text" placeholder="reqEndTimeSS" id="reqEndTimeSS" name="reqEndTimeSS" required> 
                        <option hidden> SS </option> 
                        <option value="00">00</option>
                        <option value="01">01</option>
                        <option value="02">02</option>
                        <option value="03">03</option>
                        <option value="04">04</option>
                        <option value="05">05</option>
                        <option value="06">06</option>
                        <option value="07">07</option>
                        <option value="08">08</option>
                        <option value="09">09</option>
                        <option value="10">10</option>
                        <option value="11">11</option>
                        <option value="12">12</option>
                        <option value="13">13</option>
                        <option value="14">14</option>
                        <option value="15">15</option>
                        <option value="16">16</option>
                        <option value="17">17</option>
                        <option value="18">18</option>
                        <option value="19">19</option>
                        <option value="20">20</option>
                        <option value="21">21</option>
                        <option value="22">22</option>
                        <option value="23">23</option>
                        <option value="24">24</option>
                        <option value="25">25</option>
                        <option value="26">26</option>
                        <option value="27">27</option>
                        <option value="28">28</option>
                        <option value="29">29</option>
                        <option value="30">30</option>
                        <option value="31">31</option>
                        <option value="32">32</option>
                        <option value="33">33</option>
                        <option value="34">34</option>
                        <option value="35">35</option>
                        <option value="36">36</option>
                        <option value="37">37</option>
                        <option value="38">38</option>
                        <option value="39">39</option>
                        <option value="40">40</option>
                        <option value="41">41</option>
                        <option value="42">42</option>
                        <option value="43">43</option>
                        <option value="44">44</option>
                        <option value="45">45</option>
                        <option value="46">46</option>
                        <option value="47">47</option>
                        <option value="48">48</option>
                        <option value="49">49</option>
                        <option value="50">50</option>
                        <option value="51">51</option>
                        <option value="52">52</option>
                        <option value="53">53</option>
                        <option value="54">54</option>
                        <option value="55">55</option>
                        <option value="56">56</option>
                        <option value="57">57</option>
                        <option value="58">58</option>
                        <option value="59">59</option>
                    </select>
                    <br></br><br></br>
                    <input style={{ height: "40px" , width: "350px" }} placeholder="submit" name="submit" id="submit" type="submit" value="CREATE GRAPH" />
            </form>
        </div>
    );
}

export default PostForm

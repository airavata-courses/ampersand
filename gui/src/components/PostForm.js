import React, { useState } from 'react'
import Axios from 'axios'
import { useEffect } from 'react';
import axios from 'axios';

// global scope :: radar data
// var radar_data = ""

function PostForm(){
    document.title = "Dashboard";
    // var r_radar = ""

    const [name, setName] = useState('');

    useEffect(async () => {
        // gateway call for username
        const greet_url = await axios.get('http://localhost:30001/greetme');
        const result = await axios.get(greet_url.data.url, {
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

    // function rad(){
    //     if((document.getElementById("reqRadar").value) !== ""){
    //         r_radar = document.getElementById("reqRadar").value

    //         // console.log(r_radar)

    //         // radar station name microservice via gateway
    //         axios.post("http://localhost:30001/radar", {
    //             rradar: r_radar
    //         })
    //         .then(res =>{
    //             // console.log("sab", r_radar)
    //             radar_data = res.data.rad
    //             // console.log("adhi",radar_data)
    //         })
    //     }
    // }

    function submit(e){
        e.preventDefault();
        
        // if(radar_data === ""){
        //     radar_data = "KBMX"
        // }

        // console.log("nantar",radar_data)
        
        Axios.post("http://localhost:3001/users", {
            username: name,
            reqRadar: data.reqRadar,
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
            var cloud_image_url = res.data.cloud_image_url
            // console.log(res.data)
            // console.log(res.data.message, cloud_image_url)
            document.getElementById("graph_image").src = cloud_image_url
            // document.getElementById("user_form").reset()
        })

        alert("Your Request is in Process. Please wait for 3-5 seconds.")
        
    }

    function handle(e){
        const newdata = {...data}
        newdata[e.target.id] = e.target.value
        setData(newdata)
        // console.log(newdata)
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
            <a href='http://localhost:30000'><button style={{ height: "40px" , width: "200px", position:"absolute", right:"0", marginRight:"20px"}}>LOGOUT</button></a>
            
            <br/><br/><br/><br/>

            <img id="graph_image" src="" style={{height: "500px" , width: "600px", position:"absolute", left:"0", marginLeft:"700px"}}/>
            
            <form onSubmit={(e)=> submit(e)} style={{position:"absolute", left:"0", marginLeft:"100px"}} id={"user_form"}>
                    {/* <input style={{ height: "40px" , width: "200px" }} onChange={(e) => handle(e)} id="username" value={data.username} type="text" id="username" placeholder="username" name="username" required /> */}
                    <h2>Select Radars by State</h2>
                    <select style={{ height: "40px" , width: "200px" }} onChange={(e) => handle(e)} id="reqRadar" value={data.reqRadar}  type="text" placeholder="reqRadar" name="reqRadar" required>
                    <option value="">Radars by State</option>
                    <option value=""></option>
                            <option value="">--Alabama</option>
                            <option value="KBMX">Birmingham</option>
                            <option value="KMXX">E. Alabama</option>
                            <option value="KEOX">Fort Rucker</option>
                            <option value="KMOB">Mobile</option>
                            <option value="KHTX">Nrn. Alabama</option>
                    <option value=""></option>
                            <option value="">--Alaska</option>
                            <option value="PABC">Bethel</option>
                            <option value="PACG">Biorka Is.</option>
                            <option value="PAPD">Fairbanks</option>
                            <option value="PAHG">Kenai</option>
                            <option value="PAKC">King Salmon</option>
                            <option value="PAIH">Middleton Is.</option>
                            <option value="PAEC">Nome</option>
                            <option value="PAPD">Pedro Dome</option>
                            <option value="PACG">Sitka</option>
                    <option value=""></option>
                            <option value="">--Arizona</option>
                            <option value="KFSX">Flagstaff</option>
                            <option value="KIWA">Phoenix</option>
                            <option value="KEMX">Tucson</option>
                            <option value="KYUX">Yuma</option>
                    <option value=""></option>
                            <option value="">--Arkansas</option>
                        <option value="KLZK">Little Rock</option>
                        <option value="KSRX">W. Ark./Ft. Smith</option>
                    <option value=""></option>
                            <option value="">--California</option>
                            <option value="KBBX">Beale AFB</option>
                            <option value="KEYX">Edwards AFB</option>
                            <option value="KBHX">Eureka</option>
                            <option value="KHNX">Hanford</option>
                            <option value="KVTX">Los Angeles</option>
                            <option value="KDAX">Sacramento</option>
                            <option value="KNKX">San Diego</option>
                            <option value="KMUX">San Francisco</option>
                            <option value="KHNX">San Joaquin Vly.</option>
                            <option value="KSOX">Santa Ana Mtns</option>
                            <option value="KVBX">Vandenberg AFB</option>
                    <option value=""></option>
                            <option value="">--Colorado</option>
                            <option value="KFTG">Denver/Boulder</option>
                            <option value="KGJX">Grand Junction</option>
                            <option value="KPUX">Pueblo</option>
                    <option value=""></option>
                            <option value="">--Delaware</option>
                            <option value="KDOX">Dover AFB</option>
                    <option value=""></option>
                            <option value="">--Florida</option>
                            <option value="KEVX">Eglin AFB</option>
                            <option value="KJAX">Jacksonville</option>
                            <option value="KBYX">Key West</option>
                            <option value="KMLB">Melbourne</option>
                            <option value="KAMX">Miami</option>
                            <option value="KEVX">NW Florida</option>
                            <option value="KTLH">Tallahassee</option>
                            <option value="KTBW">Tampa Bay Area</option>
                    <option value=""></option>
                        <option value="">--Georgia</option>
                            <option value="KFFC">Atlanta</option>
                            <option value="KVAX">Moody AFB</option>
                            <option value="KFFC">Peachtree City</option>
                            <option value="KJGX">Robins AFB</option>
                    <option value=""></option>
                        <option value="">--Guam</option>
                            <option value="PGUA">Andersen AFB</option>
                    <option value=""></option>
                        <option value="">--Hawaii</option>
                            <option value="PHKI">Kauai</option>
                            <option value="PHKM">Kohala</option>
                            <option value="PHMO">Molokai</option>
                            <option value="PHWA">South Shore</option>
                    <option value=""></option>
                        <option value="">--Idaho</option>
                            <option value="KCBX">Boise</option>
                            <option value="KSFX">Pocatello</option>
                    <option value=""></option>
                        <option value="">--Illinois</option>
                            <option value="KILX">Central IL</option>
                            <option value="KLOT">Chicago</option>
                    <option value=""></option>
                        <option value="">--Indiana</option>
                            <option value="KVWX">Evansville</option>
                            <option value="KIND">Indianapolis</option>
                            <option value="KIWX">Nrn. Indiana</option>
                    <option value=""></option>
                        <option value="">--Iowa</option>
                            <option value="KDMX">Des Moines</option>
                            <option value="KDVN">Quad Cities</option>
                    <option value=""></option>
                        <option value="">--Kansas</option>
                            <option value="KDDC">Dodge City</option>
                            <option value="KGLD">Goodland</option>
                            <option value="KTWX">Topeka</option>
                            <option value="KICT">Wichita</option>
                    <option value=""></option>
                        <option value="">--Kentucky</option>
                            <option value="KHPX">Fort Cambell</option>
                            <option value="KJKL">Jackson</option>
                            <option value="KLVX">Louisville</option>
                            <option value="KPAH">Paducah</option>
                            <option value=""></option>
                        <option value="">--Louisiana</option>
                            <option value="KPOE">Fort Polk</option>
                            <option value="KLCH">Lake Charles</option>
                            <option value="KLIX">New Orleans</option>
                            <option value="KSHV">Shreveport</option>
                    <option value=""></option>
                        <option value="">--Maine</option>
                            <option value="KCBW">Caribou</option>
                            <option value="KGYX">Portland</option>
                    <option value=""></option>
                        <option value="">--Maryland</option>
                            <option value="KLWX">Baltimore</option>
                    <option value=""></option>
                        <option value="">--Massachusetts</option>
                            <option value="KBOX">Boston</option>
                    <option value=""></option>
                        <option value="">--Michigan</option>
                            <option value="KDTX">Detroit</option>
                            <option value="KAPX">Gaylord</option>
                            <option value="KGRR">Grand Rapids</option>
                            <option value="KMQT">Marquette</option>
                    <option value=""></option>
                        <option value="">--Minnesota</option>
                            <option value="KDLH">Duluth</option>
                            <option value="KMPX">Minneapolis</option>
                    <option value=""></option>
                        <option value="">--Mississippi</option>
                            <option value="KGWX">Columbus AFB</option>
                            <option value="KDGX">Brandon/Jackson</option>
                    <option value=""></option>
                        <option value="">--Missouri</option>
                            <option value="KEAX">Kansas City</option>
                            <option value="KSGF">Springfield</option>
                            <option value="KLSX">St. Louis</option>
                    <option value=""></option>
                        <option value="">--Montana</option>
                            <option value="KBLX">Billings</option>
                            <option value="KGGW">Glasgow</option>
                            <option value="KTFX">Great Falls</option>
                            <option value="KMSX">Missoula</option>
                    <option value=""></option>
                        <option value="">--Nebraska</option>
                            <option value="KUEX">Hastings</option>
                            <option value="KLNX">North Platte</option>
                            <option value="KOAX">Omaha</option>
                    <option value=""></option>
                        <option value="">--Nevada</option>
                            <option value="KLRX">Elko</option>
                            <option value="KESX">Las Vegas</option>
                            <option value="KRGX">Reno</option>
                    <option value=""></option>
                        <option value="">--New Jersey</option>
                            <option value="KDIX">Mt. Holly</option>
                    <option value=""></option>
                        <option value="">--New Mexico</option>
                            <option value="KABX">Albuquerque</option>
                            <option value="KFDX">Cannon AFB</option>
                            <option value="KHDX">Holloman AFB</option>
                    <option value=""></option>
                        <option value="">--New York</option>
                            <option value="KENX">Albany</option>
                            <option value="KBGM">Binghamton</option>
                            <option value="KBUF">Buffalo</option>
                            <option value="KTYX">Montague</option>
                            <option value="KOKX">New York City</option>
                            <option value="KOKX">Upton</option>
                    <option value=""></option>
                        <option value="">--North Carolina</option>
                            <option value="KRAX">Durham</option>
                            <option value="KMHX">Morehead City</option>
                            <option value="KRAX">Raleigh</option>
                            <option value="KLTX">Wilmington</option>
                    <option value=""></option>
                        <option value="">--North Dakota</option>
                            <option value="KBIS">Bismarck</option>
                            <option value="KMVX">Grand Forks</option>
                            <option value="KMBX">Minot AFB</option>
                    <option value=""></option>
                        <option value="">--Ohio</option>
                            <option value="KILN">Cincinnati</option>
                            <option value="KCLE">Cleveland</option>
                            <option value="KILN">Dayton</option>
                            <option value="KILN">Wilmington</option>
                    <option value=""></option>
                        <option value="">--Oklahoma</option>
                            <option value="KFDR">Frederick</option>
                            <option value="KTLX">Oklahoma City</option>
                            <option value="KINX">Tulsa</option>
                            <option value="KVNX">Vance AFB</option>
                    <option value=""></option>
                        <option value="">--Oregon</option>
                            <option value="KMAX">Medford</option>
                            <option value="KPDT">Pendleton</option>
                            <option value="KRTX">Portland</option>
                    <option value=""></option>
                        <option value="">--Pennsylvania</option>
                            <option value="KDIX">Philadelphia</option>
                            <option value="KPBZ">Pittsburgh</option>
                            <option value="KCCX">State College</option>
                    <option value=""></option>
                        <option value="">--Puerto Rico</option>
                            <option value="TJUA">Puerto Rico/V.I.</option>
                    <option value=""></option>
                        <option value="">--South Carolina</option>
                            <option value="KCLX">Charleston</option>
                            <option value="KCAE">Columbia</option>
                            <option value="KGSP">Greenville</option>
                            <option value="KGSP">Spartanburg</option>
                            <option value="KGSP">Greer</option>
                    <option value=""></option>
                        <option value="">--South Dakota</option>
                            <option value="KABR">Aberdeen</option>
                            <option value="KUDX">Rapid City</option>
                            <option value="KFSD">Sioux falls</option>
                    <option value=""></option>
                        <option value="">--Tennessee</option>
                            <option value="KMRX">Knoxville</option>
                            <option value="KNQA">Memphis</option>
                            <option value="KMRX">Morristown</option>
                            <option value="KOHX">Nashville</option>
                            <option value="KMRX">Tri Cities</option>
                    <option value=""></option>
                        <option value="">--Texas</option>
                            <option value="KAMA">Amarillo</option>
                            <option value="KEWX">Austin</option>
                            <option value="KBRO">Brownsville</option>
                            <option value="KGRK">Central Texas</option>
                            <option value="KCRP">Corpus Christi</option>
                            <option value="KFWS">Dallas</option>
                            <option value="KDYX">Dyess AFB</option>
                            <option value="KEPZ">El Paso</option>
                            <option value="KFWS">Fort Worth</option>
                            <option value="KHGX">Galveston</option>
                            <option value="KHGX">Houston</option>
                            <option value="KDFX">Laughlin AFB</option>
                            <option value="KLBB">Lubbock</option>
                            <option value="KMAF">Midland/Odessa</option>
                            <option value="KSJT">San Angelo</option>
                            <option value="KEWX">San Antonio</option>
                    <option value=""></option>
                        <option value="">--Utah</option>
                            <option value="KICX">Cedar City</option>
                            <option value="KMTX">Salt Lake City</option>
                    <option value=""></option>
                        <option value="">--Vermont</option>
                            <option value="KCXX">Burlington</option>
                    <option value=""></option>
                        <option value="">--Virginia</option>
                            <option value="KFCX">Blacksburg</option>
                            <option value="KAKQ">Norfolk</option>
                            <option value="KAKQ">Richmond</option>
                            <option value="KFCX">Roanoke</option>
                            <option value="KLWX">Sterling</option>
                            <option value="KAKQ">Wakefield</option>
                    
                    <option value=""></option>
                        <option value="">--Washington</option>
                            <option value="KATX">Seattle</option>
                            <option value="KOTX">Spokane</option>
                            <option value="KATX">Tacoma</option>
                            <option value="KLGX">Langley Hill</option>
                    
                    <option value=""></option>
                        <option value="">--Washington DC</option>
                            <option value="KLWX">Washington</option>
                    
                    <option value=""></option>
                        <option value="">--West Virginia</option>
                            <option value="KRLX">Charleston</option>
                    
                    <option value=""></option>
                        <option value="">--Wisconsin</option>
                            <option value="KGRB">Green Bay</option>
                            <option value="KARX">La Crosse</option>
                            <option value="KMKX">Milwaukee</option>
                    
                    <option value=""></option>
                        <option value="">--Wyoming</option>
                            <option value="KCYS">Cheyenne</option>
                            <option value="KRIW">Riverton</option>
                    
                    <option value=""></option>
                        <option value="">--South Korea	</option>
                    
                    <option value="RKJK">Kunsan</option>
                    <option value="RKSG">Camp Humphreys</option>
                    <option value=""></option>
                    </select>

                    <h2>Select Date</h2>
                    <select style={{ height: "40px" , width: "50px" }} onChange={(e) => handle(e)} id="reqDateMM" value={data.reqDateMM} type="text" placeholder="reqDateMM" name="reqDateMM" required> 
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

                    <select style={{ height: "40px" , width: "50px" }} onChange={(e) => handle(e)} id="reqDateDD" value={data.reqDateDD} type="text" placeholder="reqDateDD" name="reqDateDD" required> 
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

                    <select style={{ height: "40px" , width: "70px" }} onChange={(e) => handle(e)} id="reqDateYYYY" value={data.reqDateYYYY} type="text" placeholder="reqDateYYYY" name="reqDateYYYY" required> 
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
                    <select style={{ height: "40px" , width: "50px" }} onChange={(e) => handle(e)} id="reqStartTimeHH" value={data.reqStartTimeHH} type="text" placeholder="reqStartTimeHH" name="reqStartTimeHH" required> 
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
                    
                    <select style={{ height: "40px" , width: "50px" }} onChange={(e) => handle(e)} id="reqStartTimeMM" value={data.reqStartTimeMM} type="text" placeholder="reqStartTimeMM" name="reqStartTimeMM" required> 
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

                    <select style={{ height: "40px" , width: "50px" }} onChange={(e) => handle(e)} id="reqStartTimeSS" value={data.reqStartTimeSS} type="text" placeholder="reqStartTimeSS" name="reqStartTimeSS" required> 
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
                    <select style={{ height: "40px" , width: "50px" }} onChange={(e) => handle(e)} id="reqEndTimeHH" value={data.reqEndTimeHH}  type="text" placeholder="reqEndTimeHH" name="reqEndTimeHH" required> 
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
                    
                    <select style={{ height: "40px" , width: "50px" }} onChange={(e) => handle(e)} id="reqEndTimeMM" value={data.reqEndTimeMM}  type="text" placeholder="reqEndTimeMM" name="reqEndTimeMM" required> 
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

                    <select style={{ height: "40px" , width: "50px" }} onChange={(e) => handle(e)} id="reqEndTimeSS" value={data.reqEndTimeSS}  type="text" placeholder="reqEndTimeSS" name="reqEndTimeSS" required> 
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
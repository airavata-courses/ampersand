import React, { useState } from 'react'
import Axios from 'axios'
import { useEffect } from 'react';
import axios from 'axios';

function PostForm(){
    const url = "http://localhost:3001/users"
    const py_url = "http://localhost:3005/fileurl/"
    const nexrad_aws_url = ""

    const [name, setName] = useState('');
    useEffect(async () => {
      const result = await axios.get('http://localhost:5001/greetme', {
        withCredentials: true
      });
      setName(result.data.fullName);
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

    function submit(e){
        e.preventDefault();
        Axios.post(url, {
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
            console.log(res.data)
        })
        
        const radar = (data.reqRadar).toUpperCase()

        const rem_url = data.reqDateYYYY + '/' + data.reqDateMM + '/' + data.reqDateDD + '/' + radar + '/' + data.reqStartTimeHH + data.reqStartTimeMM
        console.log(py_url + rem_url)

        Axios.get(py_url+rem_url, {
        })
        .then(res => {
            console.log(res.data)
            nexrad_aws_url = res.data
        })

    }

    function handle(e){
        const newdata = {...data}
        newdata[e.target.id] = e.target.value
        setData(newdata)
        console.log(newdata)
    }

    return (
        <div>
            <hr></hr>
            <h1>WEATHER DASHBOARD</h1>
            <h2>Welcome <b onChange={(e) => handle(e)} id="username" value={name}>{name}</b></h2>
            {/* <h2>Welcome {name} !</h2> */}
            <hr></hr>
            <br></br><br></br>
            <form onSubmit={(e)=> submit(e)}>
                    {/* <input style={{ height: "40px" , width: "200px" }} onChange={(e) => handle(e)} id="username" value={data.username} type="text" id="username" placeholder="username" name="username" required /> */}
                    <h2>Select Radars by State</h2>
                    <select style={{ height: "40px" , width: "200px" }} onChange={(e) => handle(e)} id="reqRadar" value={data.reqRadar}  type="text" id="reqRadar" placeholder="reqRadar" name="reqRadar" required>
                        <option value="">Radars by State</option>
                        <option value=""></option>
                            <option value="">--Alabama</option>
                                <option value="kbmx">Birmingham</option>
                                <option value="kmxx">E. Alabama</option>
                                <option value="keox">Fort Rucker</option>
                                <option value="kmob">Mobile</option>
                                <option value="khtx">Nrn. Alabama</option>
                        <option value=""></option>
                            <option value="">--Alaska</option>
                                <option value="pabc">Bethel</option>
                                <option value="pacg">Biorka Is.</option>
                                <option value="papd">Fairbanks</option>
                                <option value="pahg">Kenai</option>
                                <option value="pakc">King Salmon</option>
                                <option value="paih">Middleton Is.</option>
                                <option value="paec">Nome</option>
                                <option value="papd">Pedro Dome</option>
                                <option value="pacg">Sitka</option>
                        <option value=""></option>
                            <option value="">--Arizona</option>
                                <option value="kfsx">Flagstaff</option>
                                <option value="kiwa">Phoenix</option>
                                <option value="kemx">Tucson</option>
                                <option value="kyux">Yuma</option>
                        <option value=""></option>
                            <option value="">--Arkansas</option>
                                <option value="klzk">Little Rock</option>
                                <option value="ksrx">W. Ark./Ft. Smith</option>
                        <option value=""></option>
                            <option value="">--California</option>
                                <option value="kbbx">Beale AFB</option>
                                <option value="keyx">Edwards AFB</option>
                                <option value="kbhx">Eureka</option>
                                <option value="khnx">Hanford</option>
                                <option value="kvtx">Los Angeles</option>
                                <option value="kdax">Sacramento</option>
                                <option value="knkx">San Diego</option>
                                <option value="kmux">San Francisco</option>
                                <option value="khnx">San Joaquin Vly.</option>
                                <option value="ksox">Santa Ana Mtns</option>
                                <option value="kvbx">Vandenberg AFB</option>
                        <option value=""></option>
                            <option value="">--Colorado</option>
                                <option value="kftg">Denver/Boulder</option>
                                <option value="kgjx">Grand Junction</option>
                                <option value="kpux">Pueblo</option>
                        <option value=""></option>
                            <option value="">--Delaware</option>
                                <option value="kdox">Dover AFB</option>
                        <option value=""></option>
                            <option value="">--Florida</option>
                                <option value="kevx">Eglin AFB</option>
                                <option value="kjax">Jacksonville</option>
                                <option value="kbyx">Key West</option>
                                <option value="kmlb">Melbourne</option>
                                <option value="kamx">Miami</option>
                                <option value="kevx">NW Florida</option>
                                <option value="ktlh">Tallahassee</option>
                                <option value="ktbw">Tampa Bay Area</option>
                        <option value=""></option>
                            <option value="">--Georgia</option>
                                <option value="kffc">Atlanta</option>
                                <option value="kvax">Moody AFB</option>
                                <option value="kffc">Peachtree City</option>
                                <option value="kjgx">Robins AFB</option>
                        <option value=""></option>
                            <option value="">--Guam</option>
                                <option value="pgua">Andersen AFB</option>
                        <option value=""></option>
                            <option value="">--Hawaii</option>
                                <option value="phki">Kauai</option>
                                <option value="phkm">Kohala</option>
                                <option value="phmo">Molokai</option>
                                <option value="phwa">South Shore</option>
                        <option value=""></option>
                            <option value="">--Idaho</option>
                                <option value="kcbx">Boise</option>
                                <option value="ksfx">Pocatello</option>
                        <option value=""></option>
                            <option value="">--Illinois</option>
                                <option value="kilx">Central IL</option>
                                <option value="klot">Chicago</option>
                        <option value=""></option>
                            <option value="">--Indiana</option>
                                <option value="kvwx">Evansville</option>
                                <option value="kind">Indianapolis</option>
                                <option value="kiwx">Nrn. Indiana</option>
                        <option value=""></option>
                            <option value="">--Iowa</option>
                                <option value="kdmx">Des Moines</option>
                                <option value="kdvn">Quad Cities</option>
                        <option value=""></option>
                            <option value="">--Kansas</option>
                                <option value="kddc">Dodge City</option>
                                <option value="kgld">Goodland</option>
                                <option value="ktwx">Topeka</option>
                                <option value="kict">Wichita</option>
                        <option value=""></option>
                            <option value="">--Kentucky</option>
                                <option value="khpx">Fort Cambell</option>
                                <option value="kjkl">Jackson</option>
                                <option value="klvx">Louisville</option>
                                <option value="kpah">Paducah</option>
                                <option value=""></option>
                            <option value="">--Louisiana</option>
                                <option value="kpoe">Fort Polk</option>
                                <option value="klch">Lake Charles</option>
                                <option value="klix">New Orleans</option>
                                <option value="kshv">Shreveport</option>
                        <option value=""></option>
                            <option value="">--Maine</option>
                                <option value="kcbw">Caribou</option>
                                <option value="kgyx">Portland</option>
                        <option value=""></option>
                            <option value="">--Maryland</option>
                                <option value="klwx">Baltimore</option>
                        <option value=""></option>
                            <option value="">--Massachusetts</option>
                                <option value="kbox">Boston</option>
                        <option value=""></option>
                            <option value="">--Michigan</option>
                                <option value="kdtx">Detroit</option>
                                <option value="kapx">Gaylord</option>
                                <option value="kgrr">Grand Rapids</option>
                                <option value="kmqt">Marquette</option>
                        <option value=""></option>
                            <option value="">--Minnesota</option>
                                <option value="kdlh">Duluth</option>
                                <option value="kmpx">Minneapolis</option>
                        <option value=""></option>
                            <option value="">--Mississippi</option>
                                <option value="kgwx">Columbus AFB</option>
                                <option value="kdgx">Brandon/Jackson</option>
                        <option value=""></option>
                            <option value="">--Missouri</option>
                                <option value="keax">Kansas City</option>
                                <option value="ksgf">Springfield</option>
                                <option value="klsx">St. Louis</option>
                        <option value=""></option>
                            <option value="">--Montana</option>
                                <option value="kblx">Billings</option>
                                <option value="kggw">Glasgow</option>
                                <option value="ktfx">Great Falls</option>
                                <option value="kmsx">Missoula</option>
                        <option value=""></option>
                            <option value="">--Nebraska</option>
                                <option value="kuex">Hastings</option>
                                <option value="klnx">North Platte</option>
                                <option value="koax">Omaha</option>
                        <option value=""></option>
                            <option value="">--Nevada</option>
                                <option value="klrx">Elko</option>
                                <option value="kesx">Las Vegas</option>
                                <option value="krgx">Reno</option>
                        <option value=""></option>
                            <option value="">--New Jersey</option>
                                <option value="kdix">Mt. Holly</option>
                        <option value=""></option>
                            <option value="">--New Mexico</option>
                                <option value="kabx">Albuquerque</option>
                                <option value="kfdx">Cannon AFB</option>
                                <option value="khdx">Holloman AFB</option>
                        <option value=""></option>
                            <option value="">--New York</option>
                                <option value="kenx">Albany</option>
                                <option value="kbgm">Binghamton</option>
                                <option value="kbuf">Buffalo</option>
                                <option value="ktyx">Montague</option>
                                <option value="kokx">New York City</option>
                                <option value="kokx">Upton</option>
                        <option value=""></option>
                            <option value="">--North Carolina</option>
                                <option value="krax">Durham</option>
                                <option value="kmhx">Morehead City</option>
                                <option value="krax">Raleigh</option>
                                <option value="kltx">Wilmington</option>
                        <option value=""></option>
                            <option value="">--North Dakota</option>
                                <option value="kbis">Bismarck</option>
                                <option value="kmvx">Grand Forks</option>
                                <option value="kmbx">Minot AFB</option>
                        <option value=""></option>
                            <option value="">--Ohio</option>
                                <option value="kiln">Cincinnati</option>
                                <option value="kcle">Cleveland</option>
                                <option value="kiln">Dayton</option>
                                <option value="kiln">Wilmington</option>
                        <option value=""></option>
                            <option value="">--Oklahoma</option>
                                <option value="kfdr">Frederick</option>
                                <option value="ktlx">Oklahoma City</option>
                                <option value="kinx">Tulsa</option>
                                <option value="kvnx">Vance AFB</option>
                        <option value=""></option>
                            <option value="">--Oregon</option>
                                <option value="kmax">Medford</option>
                                <option value="kpdt">Pendleton</option>
                                <option value="krtx">Portland</option>
                        <option value=""></option>
                            <option value="">--Pennsylvania</option>
                                <option value="kdix">Philadelphia</option>
                                <option value="kpbz">Pittsburgh</option>
                                <option value="kccx">State College</option>
                        <option value=""></option>
                            <option value="">--Puerto Rico</option>
                                <option value="tjua">Puerto Rico/V.I.</option>
                        <option value=""></option>
                            <option value="">--South Carolina</option>
                                <option value="kclx">Charleston</option>
                                <option value="kcae">Columbia</option>
                                <option value="kgsp">Greenville</option>
                                <option value="kgsp">Spartanburg</option>
                                <option value="kgsp">Greer</option>
                        <option value=""></option>
                            <option value="">--South Dakota</option>
                                <option value="kabr">Aberdeen</option>
                                <option value="kudx">Rapid City</option>
                                <option value="kfsd">Sioux falls</option>
                        <option value=""></option>
                            <option value="">--Tennessee</option>
                                <option value="kmrx">Knoxville</option>
                                <option value="knqa">Memphis</option>
                                <option value="kmrx">Morristown</option>
                                <option value="kohx">Nashville</option>
                                <option value="kmrx">Tri Cities</option>
                        <option value=""></option>
                            <option value="">--Texas</option>
                                <option value="kama">Amarillo</option>
                                <option value="kewx">Austin</option>
                                <option value="kbro">Brownsville</option>
                                <option value="kgrk">Central Texas</option>
                                <option value="kcrp">Corpus Christi</option>
                                <option value="kfws">Dallas</option>
                                <option value="kdyx">Dyess AFB</option>
                                <option value="kepz">El Paso</option>
                                <option value="kfws">Fort Worth</option>
                                <option value="khgx">Galveston</option>
                                <option value="khgx">Houston</option>
                                <option value="kdfx">Laughlin AFB</option>
                                <option value="klbb">Lubbock</option>
                                <option value="kmaf">Midland/Odessa</option>
                                <option value="ksjt">San Angelo</option>
                                <option value="kewx">San Antonio</option>
                        <option value=""></option>
                            <option value="">--Utah</option>
                                <option value="kicx">Cedar City</option>
                                <option value="kmtx">Salt Lake City</option>
                        <option value=""></option>
                            <option value="">--Vermont</option>
                                <option value="kcxx">Burlington</option>
                        <option value=""></option>
                            <option value="">--Virginia</option>
                                <option value="kfcx">Blacksburg</option>
                                <option value="kakq">Norfolk</option>
                                <option value="kakq">Richmond</option>
                                <option value="kfcx">Roanoke</option>
                                <option value="klwx">Sterling</option>
                                <option value="kakq">Wakefield</option>
                        <option value=""></option>
                            <option value="">--Washington</option>
                                <option value="katx">Seattle</option>
                                <option value="kotx">Spokane</option>
                                <option value="katx">Tacoma</option>
                                <option value="klgx">Langley Hill</option>
                        <option value=""></option>
                            <option value="">--Washington DC</option>
                                <option value="klwx">Washington</option>
                        <option value=""></option>
                            <option value="">--West Virginia</option>
                                <option value="krlx">Charleston</option>
                        <option value=""></option>
                            <option value="">--Wisconsin</option>
                                <option value="kgrb">Green Bay</option>
                                <option value="karx">La Crosse</option>
                                <option value="kmkx">Milwaukee</option>
                        <option value=""></option>
                            <option value="">--Wyoming</option>
                                <option value="kcys">Cheyenne</option>
                                <option value="kriw">Riverton</option>
                        
                        
                        <option value=""></option>
                            <option value="">--South Korea	</option>
                        
                        <option value="rkjk">Kunsan</option>
                        <option value="rksg">Camp Humphreys</option>
                        <option value=""></option>
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

                    <select style={{ height: "40px" , width: "50px" }} onChange={(e) => handle(e)} id="reqDateYYYY" value={data.reqDateYYYY} type="text" id="reqDateYYYY" placeholder="reqDateYYYY" name="reqDateYYYY" required> 
                        <option hidden> YYYY </option> 
                            <option value="1993" > 1993 </option> 
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
                            <option value="2014" > 2014 </option> 
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
                    <input style={{ height: "40px" , width: "500px" }} placeholder="submit" name="submit" id="submit" type="submit" value="CREATE GRAPH" />
            </form>
        </div>
    );
}

export default PostForm
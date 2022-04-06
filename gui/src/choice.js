import './App.css';
import React, {useEffect} from 'react';
import axios from 'axios';
import rd from "./radar.png"
import mr from "./merra.png"
import './choice.css';

import {useTabs, withTabs} from "./context/TabsContext";
import {Tabs, Tab} from "./components/Tabs";

const name = ""

const params = new URLSearchParams(window.location.search);
var username = params.get("username");

if(username == null){
    username = 'guest'
}

const tabs = {
    firstTab: 'WELCOME ' + username.toLocaleUpperCase()
}

function nexrad(){
    
    window.open( "/radar" + "/?username=" + username, "_self");
}

function merra(){
    window.open( "/merra" + "/?username=" + username, "_self");
}
function App() {

    useEffect(async () => {
        // gateway call for username
        const greet_url = await axios.get('http://localhost:30001/greetme');
        const result = await axios.get(greet_url.data.url, {
            withCredentials: true
      });
      const aname = (result.data.fullName).replace(" ", "")
      name = aname;

      if(name != null){
        username = name;
      }
    });

    const { setCurrentTab } = useTabs();

    document.title = "Option"
    
    return (
        <div>
            <center>
                <div>
                <div className="wrapper">
                    <Tabs tabs={tabs} defaultTab={tabs.firstTab} onTabSelect={(tab) => setCurrentTab(tab)}  className="custom-tab-container-class">
                        <Tab id={tabs.firstTab}>
                        <div style={{marginTop:"50px"}}>
                        <center>
                            {/* <h3>Click for checking out the Data</h3> */}
                                <div className='card'>
                                    <img src={rd} onClick={nexrad}/>
                                </div>
                                
                                <span style={{paddingLeft:"100px"}}></span>

                                <div className='card'>
                                    <img src={mr} onClick={merra}/>
                                </div>
                            <h1 style={{color:"whitesmoke"}}>RADAR DATA <span style={{paddingLeft:"400px"}}></span> MERRA DATA</h1>
                        </center>
                        </div>
                        </Tab>
                    </Tabs>
                </div>
                </div>
            </center>
            </div>
      );
}

export default withTabs(App);
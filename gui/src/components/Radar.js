import './Radar.css';
import React from 'react';
import history from "./history.png";
import RadarMap from './Map/RadarMap'

import {useTabs, withTabs} from "../context/TabsContext";
import {Tabs, Tab} from "../components/Tabs";

document.title = "Dashboard";

const params = new URLSearchParams(window.location.search);
var username = params.get("username");

if(username == null){
    username = 'guest'
}

const tabs = {
    firstTab: 'WELCOME ' + username.toLocaleUpperCase().replace(" ", "")
}

function Radar(){
    const { setCurrentTab } = useTabs();
    
    function request(){
        window.open( "/user/request" + "/?name=" + username);
    }

    return(
        <div>
            <center>
                <div>
                <div className="wrapper">
                    <Tabs tabs={tabs} defaultTab={tabs.firstTab} onTabSelect={(tab) => setCurrentTab(tab)}  className="custom-tab-container-class">
                        <Tab id={tabs.firstTab}>
                             <input type="image" src={history} style={{ height: "60px" , width: "60px", position:"absolute", right:"0", top:"15px", marginRight:"10px"}} onClick={request} />
                            <RadarMap/>
                        </Tab>
                    </Tabs>
                </div>
                </div>
            </center>
        </div>
    );
}

export default withTabs(Radar);
import './Radar.css';
import React from 'react';
import RadarMap from './Map/RadarMap'

import {useTabs, withTabs} from "../context/TabsContext";
import {Tabs, Tab} from "../components/Tabs";

const tabs = {
    firstTab: 'NEXRAD RADAR DATA'
}

function Radar(){
    const { setCurrentTab } = useTabs();
      
    return(
        <div>
            <center>
                <div>
                <div className="wrapper">
                    <Tabs tabs={tabs} defaultTab={tabs.firstTab} onTabSelect={(tab) => setCurrentTab(tab)}  className="custom-tab-container-class">
                        <Tab id={tabs.firstTab}>
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
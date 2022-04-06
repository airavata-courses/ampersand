import './Merra.css'
import React, { useState } from 'react'
// import Axios from 'axios'
// import { useEffect } from 'react';
// import axios from 'axios';
import MerraMap from './Map/MerraMap';

import {useTabs, withTabs} from "../context/TabsContext";
import {Tabs, Tab} from "../components/Tabs";

const tabs = {
    firstTab: 'MERRA DATA'
}

function Merra(){
    const { setCurrentTab } = useTabs();

    return(<div>
        <center>
            <div>
            <div className="wrapper">
                    <Tabs tabs={tabs} defaultTab={tabs.firstTab} onTabSelect={(tab) => setCurrentTab(tab)}  className="custom-tab-container-class">
                        <Tab id={tabs.firstTab}>
                            <MerraMap/>
                        </Tab>
                    </Tabs>
            </div>
            </div>
        </center>
    </div>
    );
}

export default withTabs(Merra);
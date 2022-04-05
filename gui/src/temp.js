import './App.css';
import React from 'react';
import {useTabs, withTabs} from "./context/TabsContext";
import {Tabs, Tab} from "./components/Tabs";
import Radar from './components/Radar';
import Merra from './components/Merra';

const tabs = {
    firstTab: 'NEXRAD RADAR DATA',
    secondTab: 'MERRA DATA'
}

function App() {
    const { setCurrentTab } = useTabs();

    return (
        <div className="wrapper">
            <Tabs tabs={tabs} defaultTab={tabs.firstTab} onTabSelect={(tab) => setCurrentTab(tab)} className="custom-tab-container-class">
                <Tab id={tabs.firstTab}>
                    <Radar />
                </Tab>
                <Tab id={tabs.secondTab}>
                    <Merra />
                </Tab>
            </Tabs>
        </div>
      );
}

export default withTabs(App);
import './App.css';
import React from 'react';
import {useTabs, withTabs} from "./context/TabsContext";
import {Tabs, Tab} from "./components/Tabs";
// import Radar from './components/Radar';
// import Merra from './components/Merra';
import rd from "./radar.png"
import mr from "./merra.png"
import './temp.css';

const tabs = {
    firstTab: 'NEXRAD RADAR DATA',
    secondTab: 'MERRA DATA'
}

var name = "";

function nexrad(){
    window.open( "/radar" + "/?name=" + name);
}

function merra(){
    window.open( "/merra" + "/?name=" + name);
}
function App() {

    return (
        <div style={{marginTop:"40px"}}>
        <center>
            <h3>Click for checking out the Data</h3>
            <img src={rd} height={"550px"} width={"650px"} onClick={nexrad}/> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <img src={mr} height={"550px"} width={"650px"} onClick={merra}/>
            <h1>RADAR DATA &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; MERRA DATA</h1>
        </center>
        </div>
      );
}

export default App;
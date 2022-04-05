import './Radar.css';
import React from 'react';
import RadarMap from './Map/RadarMap'

function Radar(){
      
    return(
        <div>
            <center>
                <div>
                <h1>This is Radar Data</h1>
                    <RadarMap/>
                </div>
            </center>
        </div>
    );
}

export default Radar;
import './Radar.css';
import React from 'react';
import RadarMap from './Map/RadarMap'

function Radar(){
      
    return(
        <div>
            <center>
                <div>
                    <RadarMap/>
                </div>
            </center>
        </div>
    );
}

export default Radar;
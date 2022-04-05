import React from 'react'
import 'mapbox-gl/dist/mapbox-gl.css';
import mapboxgl from 'mapbox-gl';
import '../Radar.css';

document.addEventListener('DOMContentLoaded', function() {

    const Radar_Station = ""

    // all of your map code here
	mapboxgl.accessToken = 'pk.eyJ1IjoibmthbWJsZSIsImEiOiJjbDFsa2MxdmIwYmd1M3FyendscHEwemN1In0.IdIJN8xZHt4l3bsN0gxlMA';
    const map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/mapbox/light-v10',
        center: [-96, 37.8],
        zoom: 3
    });

    map.on('load', () => {
        // Add an image to use as a custom marker
        map.loadImage(
            'https://docs.mapbox.com/mapbox-gl-js/assets/custom_marker.png',
            (error, image) => {
                if (error) throw error;
                map.addImage('custom-marker', image);

                // Add a GeoJSON source with Radar Station points
                map.addSource('points', {
                    'type': 'geojson',
                    'data': {
                        'type': 'FeatureCollection',
                        'features': [

                            {
                                'type': 'Feature',
                                'geometry': {
                                    'type': 'Point',
                                    'coordinates': [-66.0780644, 18.1155998]
                                },
                                'properties': {
                                    'title': 'TJUA - San Juan, PR'
                                }
                            },
                            
                            {
                                'type': 'Feature',
                                'geometry': {
                                    'type': 'Point',
                                    'coordinates': [-67.8066033, 46.0391944]
                                },
                                'properties': {
                                    'title': 'KCBW - Loring AFB, ME'
                                }
                            },

                            {
                                'type': 'Feature',
                                'geometry': {
                                    'type': 'Point',
                                    'coordinates': [-70.2565545, 43.8913555]
                                },
                                'properties': {
                                    'title': 'KGYX - Portland, ME'
                                }
                            },
                        ]
                    }
                });

                // Add a symbol layer
                map.addLayer({
                    'id': 'points',
                    'type': 'symbol',
                    'source': 'points',
                    'layout': {
                        'icon-image': 'custom-marker',
                        // get the title name from the source's "title" property
                        'text-field': ['get', 'title'],
                        'text-font': [
                            'Open Sans Semibold',
                            'Arial Unicode MS Bold'
                        ],
                        'text-offset': [0, 1.25],
                        'text-anchor': 'top'
                    }
                });
            }
        );
    });


 }, false);

function RadarMap(){
    return(
        <div>
            <center>
                <div>
                    <div id="map"></div>
                </div>
            </center>
        </div>
    );
}

export default RadarMap;
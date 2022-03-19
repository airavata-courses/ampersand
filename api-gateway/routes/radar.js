const express = require('express')
const router = express.Router()
const Axios = require('axios')

router.post("/", async (req, response) => {

    var radar_url = "http://localhost:8080/radarstation?city="    
    result_radar = ""

    console.log(req.body.rradar)
    radar_url = radar_url + req.body.rradar
    console.log(radar_url)
    try{
        response.status(201).json({rad: "KMOB"})
    }
    catch(err){
        console.log(err)
    }
    // try{
    // await Axios.get(radar_url, {headers:{
    //       'Access-Control-Allow-Origin': "*"
    // }})
    // .then( 
    //     res => {
    //     console.log(res.data)
    //     result_radar = res.data
    //     response.status(201).json({rad: result_radar})
    // })}
    // catch(err){
    //     console.log(err);
    // }

})

module.exports = router
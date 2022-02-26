const express = require('express')
const router = express.Router()
const Axios = require('axios')

router.post("/", async (req, response) => {

    var radar_url = "http://localhost:8080/radarstation?city="    
    result_radar = ""

    // console.log(req.body.rradar)
    radar_url = radar_url + req.body.rradar
    // console.log(radar_url)

    Axios.get(radar_url, {headers:{
        "authorization" : 'token' , 'Access-Control-Allow-Origin': "*"
    }})
    .then(res => {
        // console.log(res.data)
        result_radar = res.data
        response.status(201).json({rad: result_radar})
    })

})

module.exports = router
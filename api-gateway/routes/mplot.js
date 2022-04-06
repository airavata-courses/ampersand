const express = require('express')
const router = express.Router()
const Axios = require('axios')

var users_url = "http://localhost:3001/merra"

var py_url = "http://data-ingestor:81/satellite/"

router.post("/", async (req, response) => {

    // var nexrad_aws_url = ""
    // var aws_f_name = ""
    var cloud_image_url = ""
    var patch_url = ""

    // getting all the required attributes for individual request
    const ses_id = req.body._id;

    // merra ingestor+plotting service data
    const place = req.body.place;
    const yyyy = req.body.yyyy;
    const longitude = req.body.longitude;
    const latitude = req.body.latitude;

    // console.log(ses_id, username, historyDate, reqRadar, reqDateYYYY, reqDateMM, reqDateDD, reqStartTimeHH, reqStartTimeMM, reqStartTimeSS, reqEndTimeHH, reqEndTimeMM, reqEndTimeSS);

    // for patching the individual user request
    patch_url = users_url + '/' + ses_id;

    // for generating data ingestor URL
    const rem_url = yyyy + '/' + place + '/' + latitude + '/' + longitude
    // py_url = py_url + rem_url

    // data ingestor API call request
    try{
    Axios.get(py_url+rem_url, {headers:{
        "authorization" : 'token' , 'Access-Control-Allow-Origin': "*"

    }})
    .then(res => {
            cloud_image_url = res.data.cloud_plot_url
            // console.log(cloud_image_url)
            console.log("Plotting Service Success")

            // modifying the database with new results
             Axios.patch(patch_url, {
                id: ses_id,
                cloud_url: cloud_image_url
            })
            .then(res =>{
                // console.log(res.data)
                console.log("Database Updated with new values for request ->", ses_id)

                // sending the cloud image url to the user
                return response.status(201).json({cloud_url: cloud_image_url})
            })
        })
    }
    catch(err){
        console.log(err);
    }
})

module.exports = router
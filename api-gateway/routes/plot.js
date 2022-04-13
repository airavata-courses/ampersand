const express = require('express')
const router = express.Router()
const Axios = require('axios')

const host_url = require('../Utilities.js');

var users_url = host_url.host_url+":3001/users"
var py_url = "http://data-ingestor:81/fileurl/"
var pl_url = "http://data-plotting:82/plot/"

router.post("/", async (req, response) => {
    console.log("rpplott")

    var nexrad_aws_url = ""
    var aws_f_name = ""
    var cloud_image_url = ""
    var patch_url = ""

    // getting all the required attributes for individual request
    const ses_id = req.body._id;
    const username = req.body.username;
    const historyDate = req.body.historyDate;
    const reqRadar = req.body.reqRadar;

    const reqDateYYYY = req.body.reqDateYYYY;
    const reqDateMM = req.body.reqDateMM;
    const reqDateDD = req.body.reqDateDD;

    const reqStartTimeHH = req.body.reqStartTimeHH;
    const reqStartTimeMM = req.body.reqStartTimeMM;
    const reqStartTimeSS = req.body.reqStartTimeSS;

    const reqEndTimeHH = req.body.reqEndTimeHH;
    const reqEndTimeMM = req.body.reqEndTimeMM;
    const reqEndTimeSS = req.body.reqEndTimeSS;

    // console.log(ses_id, username, historyDate, reqRadar, reqDateYYYY, reqDateMM, reqDateDD, reqStartTimeHH, reqStartTimeMM, reqStartTimeSS, reqEndTimeHH, reqEndTimeMM, reqEndTimeSS);

    // for patching the individual user request
    patch_url = users_url + '/' + ses_id;

    // for generating data ingestor URL
    const rem_url = reqDateYYYY + '/' + reqDateMM + '/' + reqDateDD + '/' + reqRadar + '/' + reqStartTimeHH + reqStartTimeMM
    // py_url = py_url + rem_url

    // data ingestor API call request
    try{
        const final1 = await Axios.get(py_url+rem_url, {data: "something"},{headers:{
            "authorization" : 'token' , 'Access-Control-Allow-Origin': "*"
        }})
        
        nexrad_aws_url = final1.data.url
        aws_f_name = final1.data.file_name
        // console.log(nexrad_aws_url, aws_f_name)
        console.log("Ingestor Service Success")

        // for data plotting API call request
        const final2 = await Axios.post(pl_url, {
            user_id: ses_id, 
            url: nexrad_aws_url,
            file_name: aws_f_name
        })
        
        cloud_image_url = final2.data.cloud_plot_url
        // console.log(cloud_image_url)
        console.log("Plotting Service Success")

        // modifying the database with new results
        const final3 = await Axios.patch(patch_url, {
            id: ses_id, 
            aws_url: nexrad_aws_url,
            aws_fname: aws_f_name,
            cloud_url: cloud_image_url
        })

        // console.log(res.data)
        console.log("Database Updated with new values for request ->", ses_id)

                // sending the cloud image url to the user
        return response.status(201).json({cloud_url: cloud_image_url})

    }catch(err){
        console.log(err);
    }
})

module.exports = router
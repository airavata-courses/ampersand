require('dotenv').config();
const express = require('express')
const router = express.Router()
const User = require('../models/merra')

// mongoose (mongoDB) 
const mongoose = require('mongoose')
const { default: axios } = require('axios')
// console.log(process.env.R_DATABASE_URL)
mongoose.connect(process.env.R_DATABASE_URL)
mongoose.Promise = global.Promise

const host_url = require('../Utilities.js');

/////////////
// const Axios = require('axios')

// var users_url = "http://localhost:3001/merra"

// var py_url = "http://data-ingestor:81/satellite/"

// var cloud_image_url = ""
// var patch_url = ""
/////////////

// const amqp = require('amqplib/callback_api')

// getting all users
router.get('/', async (req, res) => {
    try{
        const users = await User.find()
        return res.json(users)
    } catch (err){
        return res.status(500).json({message: err.message})
    }
})

// getting one user using user id
router.get('/:id', getUser, (req, res) => {
    return res.json(res.user)
})

// getting data using username
router.post('/name', async (req, res) => {
    try{
        const docs = await User.find({ username:  req.body.username});
        return res.json(docs)
    }
    catch(e){
        console.log(e.message)
    }
})

// storing one user data
router.post('/', async (req, response) => {

    console.log("aur ek baar")
    req.setTimeout(20*60*1000);

    try{
        const users = await new User({
            username: req.body.username,
            historyDate: req.body.historyDate,
            place: req.body.place,
            yyyy: req.body.yyyy,
            longitude: req.body.longitude,
            latitude: req.body.latitude,
        })

        const newUser = await users.save()
        console.log("new => ", newUser)

        // res.status(201).json(newUser)
        
        // mq producer code (sending to ingest_queue)
        const aurl = host_url.host_url+":30001/msingestq"
        console.log(aurl)
        const ingest_w = await axios({method:'post',url: aurl, data: newUser})
        console.log("INGEST MQ (sent) -> ", ingest_w.data)
        
        // mq consumer code (receiving from ingest_queue)
        const burl = host_url.host_url+":30001/mringestq"
        console.log(burl)
        const ingest_x = await axios({method:'post',url: burl, data: 'something'})
        console.log("INGEST MQ (received) ->", ingest_x.data)

        
        // sending the ingest queue data to next service
        const curl = host_url.host_url+":30001/mplot"
        console.log(curl)
        const image_url = await axios({method:'post',url: curl, data: newUser})
        console.log(image_url.data)

        //////////////////////////////////////////////
        // // getting all the required attributes for individual request
        // const ses_id = newUser._id;

        // // merra ingestor+plotting service data
        // const place = newUser.place;
        // const yyyy = newUser.yyyy;
        // const longitude = newUser.longitude;
        // const latitude = newUser.latitude;

        // // console.log(ses_id, username, historyDate, reqRadar, reqDateYYYY, reqDateMM, reqDateDD, reqStartTimeHH, reqStartTimeMM, reqStartTimeSS, reqEndTimeHH, reqEndTimeMM, reqEndTimeSS);
        // // for patching the individual user request
        // patch_url = users_url + '/' + ses_id;

        // // for generating data ingestor URL
        // const rem_url = yyyy + '/' + place + '/' + latitude + '/' + longitude

        // console.log("going all in")
        
        // // var delayTime = 10*60*1000;
        // // function someDelay() {
        // const final1 = await Axios.get(py_url+rem_url, {headers:{
        //         "authorization" : 'token' , 'Access-Control-Allow-Origin': "*"
        //     }})
        
        // console.log(final1.data)

        // cloud_image_url = final1.data.cloud_plot_url
        // // console.log(cloud_image_url)
        // console.log("Plotting Service Success")
        
        // // modifying the database with new results
        // const final2 = await Axios.patch(patch_url, {
        //     id: ses_id,
        //     cloud_url: cloud_image_url
        // })
        
        // // console.log(res.data)
        // console.log("Database Updated with new values for request ->", ses_id)
        // // sending the cloud image url to the user
        // return response.status(201).json({cloud_url: cloud_image_url, message: "All Services Worked"})
        
        // setTimeout(someDelay, delayTime);
        
        // return response.status(201).json({cloud_url: cloud_image_url, message: "All Services Worked"})

            // .catch(err =>{console.log("some error 2", err)})
        //////////////////////////////////////////////
       
        // mq producer code (sending to plot_queue)
        const durl = host_url.host_url+":30001/msplotq"
        console.log(durl)
        const plot_y = await axios({method:'post',url: durl, data: image_url.data})
        console.log("PLOT MQ (sent) ->", plot_y.data)

        // mq consumer code (receiving from plot_queue)
        const eurl = host_url.host_url+":30001/mrplotq"
        console.log(eurl)
        const plot_z = await axios({method:'post',url: eurl, data: 'something'})
        console.log("PLOT MQ (received) ->", plot_z.data)

        console.log("all services worked, sending cloud_url back to UI",plot_z.data)
        return response.status(201).json({cloud_url: plot_z.data.cloud_url, message: "All Services Worked"})
        // return response.status(201).json({cloud_url: image_url.data.cloud_url, message: "All Services Worked"})
    } catch (err) {
        console.log("errors", err)
        // return res.status(400).json({message: err.message})
    }
})

// updating one user
router.patch('/:id', async (req, res) => {
    try{
        await User.findByIdAndUpdate(req.body.id, {
            cloud_url:  req.body.cloud_url
        });
        return res.status(201).json({message: "Database Modified"})
        // console.log("modified")
    }
    catch(e){
        console.log(e.message)
    }
})

// deleting one user
router.delete('/:id', getUser, async (req, res) => {
    try{
        await res.user.remove()
        return res.json({message: "Deleted User Successfully"})
    }catch (err){
        return res.status(500).json({message: err.message})
    }
})

async function getUser(req, res, next){
    let user
    try{
        user = await User.findById(req.params.id)
        if(user == null){
            return res.status(404).json({message: 'Cannot find the user'})
        }
    }catch (err){
        return res.status(500).json({message: err.message})
    }
    res.user = user
    next()
}

module.exports = router

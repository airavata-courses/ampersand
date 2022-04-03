const express = require('express')
const router = express.Router()
const User = require('../models/users')

// mongoose (mongoDB) 
const mongoose = require('mongoose')
const { default: axios } = require('axios')
mongoose.connect(process.env.DATABASE_URL)
mongoose.Promise = global.Promise

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
router.post('/', async (req, res) => {
    const users = new User({
        username: req.body.username,
        historyDate: req.body.historyDate,
        reqRadar: req.body.reqRadar,

        reqDateYYYY: req.body.reqDateYYYY,
        reqDateMM: req.body.reqDateMM,
        reqDateDD: req.body.reqDateDD,

        reqStartTimeHH: req.body.reqStartTimeHH,
        reqStartTimeMM: req.body.reqStartTimeMM,
        reqStartTimeSS: req.body.reqStartTimeSS,

        reqEndTimeHH: req.body.reqEndTimeHH,
        reqEndTimeMM: req.body.reqEndTimeMM,
        reqEndTimeSS: req.body.reqEndTimeSS
    })
    try{
        const newUser = await users.save()
        // res.status(201).json(newUser)
        
        // mq producer code (sending to ingest_queue)
        const ingest_a = await axios({method:'post',url:'http://localhost:3001/singestq', data: newUser})
        console.log("INGEST MQ (sent) ->", ingest_a.data)
        
        // mq consumer code (receiving from ingest_queue)
        const ingest_b = await axios({method:'post',url:'http://localhost:3001/ringestq', data: 'something'})
        console.log("INGEST MQ (received) ->", ingest_b.data)
        
        // sending the ingest queue data to next service
        const image_url = await axios({method:'post',url:'http://localhost:3001/plot', data: ingest_b.data})
        
        // mq producer code (sending to plot_queue)
        const plot_a = await axios({method:'post',url:'http://localhost:3001/splotq', data: image_url.data})
        console.log("PLOT MQ (sent) ->", plot_a.data)

        // mq consumer code (receiving from plot_queue)
        const plot_b = await axios({method:'post',url:'http://localhost:3001/rplotq', data: 'something'})
        console.log("PLOT MQ (received) ->", plot_b.data)

        console.log("all services worked, sending cloud_url back to UI",plot_b.data)
        return res.status(201).json({cloud_image_url: plot_b.data.cloud_url, message: "All Services Worked"})
    } catch (err) {
        console.log("error")
        return res.status(400).json({message: err.message})
    }
})

// updating one user
router.patch('/:id', async (req, res) => {
    try{
        await User.findByIdAndUpdate(req.body.id, { 
            aws_url:  req.body.aws_url,
            aws_fname:  req.body.aws_fname,
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
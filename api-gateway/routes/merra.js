const express = require('express')
const router = express.Router()
const User = require('../models/merra')

// mongoose (mongoDB) 
const mongoose = require('mongoose')
const { default: axios } = require('axios')
mongoose.connect(process.env.M_DATABASE_URL)
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
        place: req.body.place,
        yyyy: req.body.yyyy,
        longitude: req.body.longitude,
        latitude: req.body.latitude,
    })
    try{
        const newUser = await users.save()
        // res.status(201).json(newUser)
        
        // mq producer code (sending to ingest_queue)
        const ingest_w = await axios({method:'post',url:'http://localhost:3001/msingestq', data: newUser})
        console.log("INGEST MQ (sent) ->", ingest_w.data)
        
        // mq consumer code (receiving from ingest_queue)
        const ingest_x = await axios({method:'post',url:'http://localhost:3001/mringestq', data: 'something'})
        console.log("INGEST MQ (received) ->", ingest_x.data)
        
        // sending the ingest queue data to next service
        const image_url = await axios({method:'post',url:'http://localhost:3001/mplot', data: ingest_x.data})
        
        // mq producer code (sending to plot_queue)
        const plot_y = await axios({method:'post',url:'http://localhost:3001/msplotq', data: image_url.data})
        console.log("PLOT MQ (sent) ->", plot_y.data)

        // mq consumer code (receiving from plot_queue)
        const plot_z = await axios({method:'post',url:'http://localhost:3001/mrplotq', data: 'something'})
        console.log("PLOT MQ (received) ->", plot_z.data)

        console.log("all services worked, sending cloud_url back to UI",plot_z.data)
        return res.status(201).json({cloud_image_url: plot_z.data.cloud_url, message: "All Services Worked"})
    } catch (err) {
        console.log("error")
        return res.status(400).json({message: err.message})
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
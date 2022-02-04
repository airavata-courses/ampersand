const express = require('express')
const router = express.Router()
const User = require('../models/users')

// getting all users
router.get('/', async (req, res) => {
    try{
        const users = await User.find()
        res.json(users)
    } catch (err){
        res.status(500).json({message: err.message})
    }
})

// getting one user using user id
router.get('/:id', getUser, (req, res) => {
    res.json(res.user)
})

// getting data using username
// router.get('/:id', getUser, (req, res) => {
//     res.json(res.username)
// })

// creating one user
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
        res.status(201).json(newUser)
    } catch (err) {
        res.status(400).json({message: err.message})
    }
})

// updating one user
router.patch('/:id', getUser, (req, res) => {
    
})

// deleting one user
router.delete('/:id', getUser, async (req, res) => {
    try{
        await res.user.remove()
        res.json({message: "Deleted User Successfully"})
    }catch (err){
        res.status(500).json({message: err.message})
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
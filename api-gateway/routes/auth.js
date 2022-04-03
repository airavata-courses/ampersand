const express = require('express')
const router = express.Router()

const host_url = require('../Utilities.js');


router.get("/", (req, res) => {

    res.status(201).json({ url:  host_url.host_url+":30002/auth/google"});
})

module.exports = router
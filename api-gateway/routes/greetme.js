const express = require('express')
const router = express.Router()

const host_url = require('../Utilities.js');

router.get("/", async (req, res) => {
    res.status(201).json({ url:  host_url.host_url+":30003/greetme"});
})

module.exports = router
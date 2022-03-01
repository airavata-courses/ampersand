const express = require('express')
const router = express.Router()

router.get("/", async (req, res) => {
    res.status(201).json({ url:  "http://greetings-service:5001/greetme"});
})

module.exports = router
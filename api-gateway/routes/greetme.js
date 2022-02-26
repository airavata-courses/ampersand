const express = require('express')
const router = express.Router()

router.get("/", async (req, res) => {
    res.status(201).json({ url:  "http://localhost:5001/greetme"});
})

module.exports = router
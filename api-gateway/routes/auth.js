const express = require('express')
const router = express.Router()

router.get("/", (req, res) => {

    res.status(201).json({ url:  "http://localhost:30002/auth/google"});
})

module.exports = router
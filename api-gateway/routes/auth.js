const express = require('express')
const router = express.Router()

router.get("/", (req, res) => {

    res.status(201).json({ url:  "http://account-service:5000/auth/google"});
})

module.exports = router
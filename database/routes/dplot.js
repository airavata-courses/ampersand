const express = require('express')
const router = express.Router()
const Axios = require('axios')

const url = "http://localhost:5000/auth/google"

router.get("/", (req, res) => {

    Axios.get(url, {
    })
    .then(res => {
        console.log(res.data)
    })

})

module.exports = router
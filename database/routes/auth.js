const express = require('express')
const router = express.Router()
const Axios = require('axios')

const url = "http://localhost:5000/auth/google"
const page = "";

router.get("/", async (req, res) => {

    Axios.get(url)
    .then(res => {
        page = res;
    })
    console.log(req)
    console.log(res)
    console.log(page)

})

module.exports = router
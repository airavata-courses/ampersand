const mongoose = require('mongoose')

const merraSchema = new mongoose.Schema({
    username:{
        type: String,
        required: true
    },
    historyDate:{
        type: Date,
        required: true,
        default: Date.now
    },
    place:{
        type: String,
        required: true
    },
    yyyy:{
        type: String,
        required: true
    },
    latitude:{
        type: String,
        required: true
    },
    longitude:{
        type: String,
        required: true
    },

    cloud_url:{
        type: String
    }
    
})

module.exports = mongoose.model('Merra', merraSchema)
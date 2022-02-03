const mongoose = require('mongoose')

const usersSchema = new mongoose.Schema({
    username:{
        type: String,
        required: true
    },
    historyDate:{
        type: Date,
        required: true,
        default: Date.now
    },
    reqRadar:{
        type: String,
        required: true
    },


    reqDateYYYY:{
        type: String,
        required: true
    },
    reqDateMM:{
        type: String,
        required: true
    },
    reqDateDD:{
        type: String,
        required: true
    },


    reqStartTimeHH:{
        type: String,
        required: true
    },
    reqStartTimeMM:{
        type: String,
        required: true
    },
    reqStartTimeSS:{
        type: String,
        required: true
    },


    reqEndTimeHH:{
        type: String,
        required: true
    },
    reqEndTimeMM:{
        type: String,
        required: true
    },
    reqEndTimeSS:{
        type: String,
        required: true
    }
})

module.exports = mongoose.model('Users', usersSchema)
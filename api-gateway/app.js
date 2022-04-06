require('dotenv').config()

const express = require('express')
const app = express()
const port = 3001
const mongoose = require('mongoose')
const { expressCspHeader, INLINE, NONE, SELF } = require('express-csp-header');

mongoose.connect(process.env.DATABASE_URL)
const db = mongoose.connection
const cors = require('cors')
db.on('error', (error) => console.error(error))
db.once('open', () => console.log('Connected to MongoDB on port '+ db.port))

app.use(express.json())
app.use(express.urlencoded({ extended: true}))
app.use(cors({origin: '*'}))

// for radar database
const radar_usersRouter_db = require('./routes/users')
app.use('/users', radar_usersRouter_db)

// for merra database
const merra_usersRouter_db = require('./routes/merra')
app.use('./merra', merra_usersRouter_db)

// for greetme request
const usersRouter_greetme = require('./routes/greetme')
app.use('/greetme', usersRouter_greetme)

// for radar station request
// const usersRouter_radar = require('./routes/radar')
// app.use('/radar', usersRouter_radar)

// for google auth
const usersRouter_auth = require('./routes/auth')
app.use('/auth', usersRouter_auth)

// for plotting process user request (Radar)
const usersRouter_plot = require('./routes/plot')
app.use('/plot', usersRouter_plot)

// for plotting process user request (Merra)
const musersRouter_plot = require('./routes/mplot')
app.use('/mplot', musersRouter_plot)

// RABBIT MQ for RADAR DATA

// for data ingestor queue (send)
const diqueue_send = require('./routes/singestq')
app.use('/singestq', diqueue_send)

// for data ingestor queue (receive)
const diqueue_receieve = require('./routes/ringestq')
app.use('/ringestq', diqueue_receieve)

// for data plotting queue (send)
const dpqueue_send = require('./routes/splotq')
app.use('/splotq', dpqueue_send)

// for data plotting queue (receive)
const dpqueue_receieve = require('./routes/rplotq')
app.use('/rplotq', dpqueue_receieve)

// RABBIT MQ for MERRA DATA

// for data ingestor queue (send)
const mdiqueue_send = require('./routes/msingestq')
app.use('/msingestq', mdiqueue_send)

// for data ingestor queue (receive)
const mdiqueue_receieve = require('./routes/mringestq')
app.use('/mringestq', mdiqueue_receieve)

// for data plotting queue (send)
const mdpqueue_send = require('./routes/msplotq')
app.use('/msplotq', mdpqueue_send)

// for data plotting queue (receive)
const mdpqueue_receieve = require('./routes/mrplotq')
app.use('/mrplotq', mdpqueue_receieve)

app.use(expressCspHeader({ 
    policies: { 
        'default-src': [expressCspHeader.NONE], 
        'img-src': [expressCspHeader.SELF], 
    } 
})); 

app.listen(port, () =>  console.log('Server is listening on port ' + port))
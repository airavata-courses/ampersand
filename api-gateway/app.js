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

// for database
const usersRouter_db = require('./routes/users')
app.use('/users', usersRouter_db)

// for greetme request
const usersRouter_greetme = require('./routes/greetme')
app.use('/greetme', usersRouter_greetme)

// for radar station request
const usersRouter_radar = require('./routes/radar')
app.use('/radar', usersRouter_radar)

// for google auth
const usersRouter_auth = require('./routes/auth')
app.use('/auth', usersRouter_auth)

// for plotting process user request
const usersRouter_plot = require('./routes/plot')
app.use('/plot', usersRouter_plot)

app.use(expressCspHeader({ 
    policies: { 
        'default-src': [expressCspHeader.NONE], 
        'img-src': [expressCspHeader.SELF], 
    } 
})); 

app.listen(port, () =>  console.log('Server is listening on port ' + port))
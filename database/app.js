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
app.use(cors())
// to display index page
// app.get('/index.html', function (req, res){
//     res.sendFile(__dirname + '/index.html')
// })

// for database
const usersRouter_db = require('./routes/users')
app.use('/users', usersRouter_db)

// for auth
const usersRouter_auth = require('./routes/auth')
app.use('/auth', usersRouter_auth)

// for data ingestor
const usersRouter_ding = require('./routes/ding')
app.use('/ding', usersRouter_ding)

// for data plotting
const usersRouter_dplot = require('./routes/dplot')
app.use('/dplot', usersRouter_dplot)

app.use(expressCspHeader({ 
    policies: { 
        'default-src': [expressCspHeader.NONE], 
        'img-src': [expressCspHeader.SELF], 
    } 
})); 

app.listen(port, () =>  console.log('Server is listening on port ' + port))
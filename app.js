require('dotenv').config()

const express = require('express')
const app = express()
const port = 3001
const mongoose = require('mongoose')
const { expressCspHeader, INLINE, NONE, SELF } = require('express-csp-header');

mongoose.connect(process.env.DATABASE_URL)
const db = mongoose.connection
db.on('error', (error) => console.error(error))
db.once('open', () => console.log('Connected to MongoDB on port '+ db.port))

app.use(express.json())
app.use(express.urlencoded({ extended: false}))

// to display index page
app.get('/index.html', function (req, res){
    res.sendFile(__dirname + '/index.html')
})

const usersRouter = require('./routes/users')
app.use('/users', usersRouter)

app.use(expressCspHeader({ 
    policies: { 
        'default-src': [expressCspHeader.NONE], 
        'img-src': [expressCspHeader.SELF], 
    } 
})); 

// this solves the CORS error
app.use(function (req, res, next){
    res.header('Content-Security-Policy', "img-src 'self'");
    res.set("Content-Security-Policy", "default-src 'self'");
    res.header("Access-Control-Allow-Origin", "*")
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
})

app.listen(port, () =>  console.log('Server is listening on port ' + port))
require('dotenv').config()

const express = require('express')
const app = express()
const port = 3000
const mongoose = require('mongoose')

mongoose.connect(process.env.DATABASE_URL)
const db = mongoose.connection
db.on('error', (error) => console.error(error))
db.once('open', () => console.log('Connected to MongoDB on port '+ db.port))

app.use(express.json())

const usersRouter = require('./routes/users')
app.use('/users', usersRouter)

app.get('/', function (req, res){
    res.sendFile(__dirname + '/index.html')
})

app.listen(port, () =>  console.log('Server is listening on port ' + port))
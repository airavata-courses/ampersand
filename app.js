const express = require('express');
const app = express();
const port = 8080;

app.use(express.static(__dirname+'/'));

app.get('/', function (req, res){
    res.sendFile(__dirname + '/index.html');
})

app.listen(port, '127.0.0.1', function(error){
    if(error){
        console.log('Something went wrong', error)
    }
    else{
        console.log('Server is listening on port ' + port)
    }
})
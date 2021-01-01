/* Seting up Express Server*/
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
const { Socket } = require('dgram');
var http = require('http').Server(app);
var io = require('socket.io')(http);


/*
* This will pass directory to display 
* html content on the server
*/
app.use(express.static(__dirname))
//Setting server to port
var server = http.listen(3000, () =>{
    console.log('Server listening on port: ', server.address().port)
})

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));


var messages = [
    {name: 'JaimeGoB', message: 'Hello world'},
    {name: 'JaimeGoC', message: 'Hello hego'}
]


/*This is used to store messages in:
* /messages
* path so we can see all stored messages.
*/
app.get('/messages', (req,res) => {
    res.send(messages);
})

app.post('/messages', (req,res) => {
    messages.push(req.body);
    io.emit('message', req.body);
    res.sendStatus(200);
})

io.on('connection', (socket) =>{
    console.log('User connected.');
})


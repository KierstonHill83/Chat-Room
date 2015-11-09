// Initializes app to be a function
var app = require('express')();
var http = require('http').Server(app);
// Initializing a new instance of socket.io by passing the http object.
var io = require('socket.io')(http);

app.get('/', function(req, res){
  res.sendfile('index.html');
});

// Listen on the connection event for incoming sockets, and log it to the console
io.on('connection', function(socket) {
  console.log('a user connected');
  socket.on('disconnect', function() {
    console.log('user disconnected');
  });
});

// Listen for message and lot it in console
io.on('connection', function(socket) {
  socket.on('chat message', function(msg) {
    console.log('message: ' + msg);
  });
});

// Will send the message to everyone through io.emit
io.on('connection', function(socket) {
  socket.on('chat message', function(msg) {
    io.emit('chat message', msg);
  });
});

// The server is listening on port 3000
http.listen(3000, function(){
  console.log('listening on *:3000');
});
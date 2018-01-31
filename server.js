const express = require('express');
const app = express();
// server for socket.io:
var serv = require('http').Server(app);

const PORT = process.env.PORT || 3000
serv.listen(PORT)

app.get('/', function(req, res) {
  res.sendFile(__dirname + '/public/index.html');
});
app.use('/public', express.static(__dirname + '/public'));


var io = require('socket.io')(serv, {});

io.sockets.on('connection', function(socket) {
  socket.id = Math.random();
  console.log('Connection made:', socket.id)

  // while player connected, listen for these events:
  socket.on('keyPress', function(data) {
    if (data.inputId === 'left') {
      player.pressingLeft = data.state;
      // change player lookDirection here
    } else if (data.inputId === 'right') {
      player.pressingRight = data.state;
    } else if (data.inputId === 'up') {
      player.pressingUp = data.state;
    } else if (data.inputId === 'down') {
      player.pressingDown = data.state;
    }
  });

  socket.on('disconnect', function() {
    delete SOCKET_LIST[socket.id];
    delete PLAYER_LIST[socket.id];
    console.log('Connection ended.')
  })

});

const express = require('express');
const app = express();

// server for socket.io:
var serv = require('http').Server(app);

//game
var playerObject = require('./game/player.js');
var mapObject = require('./game/map.js');

const PORT = process.env.PORT || 3000
serv.listen(PORT)

app.get('/', function(req, res) {
  res.sendFile(__dirname + '/public/index.html');
});
app.use('/public', express.static(__dirname + '/public'));


var io = require('socket.io')(serv, {});

var mapData = new mapObject();
var SOCKET_LIST = {};
var PLAYER_LIST = {};

io.sockets.on('connection', function(socket) {
  socket.id = Math.random();
  var player = new playerObject(socket.id);
  SOCKET_LIST[socket.id] = socket;
  PLAYER_LIST[socket.id] = player;
  console.log('Connection made:', socket.id)

  socket.on('keyPress', function(data) {
    if (data.inputId === 'left') {
      player.pressingLeft = data.state;
    } else if (data.inputId === 'right') {
      player.pressingRight = data.state;
    } else if (data.inputId === 'up') {
      player.pressingUp = data.state;
    } else if (data.inputId === 'down') {
      player.pressingDown = data.state;
    }
  });

  socket.on('onMouseDown', function(data) {
    player.setCoordinates(data);
  })

  socket.on('disconnect', function() {
    delete SOCKET_LIST[socket.id];
    delete PLAYER_LIST[socket.id];
    console.log('Connection ended.')
  })
});

setInterval(function() {
  var playerData = [];

  for (var i in PLAYER_LIST) {
    var player = PLAYER_LIST[i]
    player.updatePosition(mapData);
    playerData.push({
      x: player.x,
      y: player.y,
      direction: player.direction,
      animCounter: player.animCounter
    })
  }

  for (var i in SOCKET_LIST) {
    var socket = SOCKET_LIST[i]
    socket.emit('update', playerData, mapData, 0)
  }
}, 1000/25)

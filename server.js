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
  // create a new player using random socket.id:
  var player = new playerObject(socket.id);
  SOCKET_LIST[socket.id] = socket;
  // insert created player into PLAYER_LIST with socket.id key
  PLAYER_LIST[socket.id] = player;
  console.log('Connection made:', socket.id)

  // while player connected, listen for these events:

  // CHECK FOR COLLISIONS
  socket.on('keyPress', function(data) {

    // if client asks if they can move left,
    if (data.inputId === 'left') {
      player.pressingLeft = data.state;
    } else if (data.inputId === 'right') {
      player.pressingRight = data.state;
    } else if (data.inputId === 'up') {
      player.pressingUp = data.state;
    } else if (data.inputId === 'down') {
      player.pressingDown = data.state;
    }
    // if (player.checkCollisions(mapData) === true) {
    //   console.log('collision with tile: 7')
    // }

  });

  socket.on('disconnect', function() {
    delete SOCKET_LIST[socket.id];
    delete PLAYER_LIST[socket.id];
    console.log('Connection ended.')
  })

});



// loop thru every socket in socket list to send packets to each connection (rather than to each player in player list)
setInterval(function() {
  var playerData = [];
  // for every socket (player) in the SOCKET_LIST:
    // changes player's positions and store as package so we can send new positions to all clients
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

  // loop thru and send package to all clients to update their view with map and all player's new positions.
  for (var i in SOCKET_LIST) {
    var socket = SOCKET_LIST[i]
    socket.emit('update', playerData, mapData, 0)
    // mapData.isPositionWall();
  }
}, 1000/25)

const express = require('express');
const bodyParser= require('body-parser')
const app = express();

app.use(bodyParser.json({extended: true}))

var Player = require('./game/player.js');
var Npc = require('./game/npc.js');
var Map = require('./game/map.js');
var services = require('./game/services.js');
var serv = require('http').Server(app);

const PORT = process.env.PORT || 3000
serv.listen(PORT)

app.get('/', function(req, res) {
  res.sendFile(__dirname + '/public/index.html');
});
app.use('/public', express.static(__dirname + '/public'));

var io = require('socket.io')(serv, {});
var map = new Map(8, 8, 48, [[
    1, 1, 1, 1, 1, 1, 1, 1,
    1, 1, 1, 1, 1, 1, 1, 1,
    1, 1, 3, 4, 2, 1, 1, 1,
    1, 1, 1, 1, 2, 1, 1, 1,
    1, 1, 2, 1, 2, 1, 1, 1,
    1, 1, 1, 1, 1, 1, 1, 1,
    1, 1, 1, 1, 1, 1, 1, 1,
    1, 1, 1, 1, 1, 1, 1, 1
], [
    7, 7, 7, 7, 7, 7, 7, 7,
    7, 0, 0, 0, 0, 0, 0, 7,
    7, 0, 0, 0, 0, 0, 0, 7,
    7, 0, 5, 6, 0, 0, 0, 7,
    7, 0, 0, 0, 0, 0, 0, 7,
    7, 0, 0, 0, 0, 0, 0, 7,
    7, 0, 0, 0, 0, 0, 0, 7,
    7, 7, 7, 7, 7, 7, 7, 7
]]);
var SOCKET_LIST = {};
var PLAYER_LIST = {};
var NPC_LIST = {};

var chicken = new Npc(
  123, 100, 300, 0.5, 0.05, 40, 0.99, "chicken", 2, 5, 2
);
PLAYER_LIST[123] = chicken;

io.sockets.on('connection', function(socket) {
  socket.id = Math.random();
  var player = new Player(
    socket.id, 300, 300, 3, 0.3, "player", 3, 4, 3
  );
  SOCKET_LIST[socket.id] = socket;
  PLAYER_LIST[socket.id] = player;
  console.log('Connection made:', socket.id)

  socket.on('keyPress', function(data) {
    data.inputId === 'left' ? player.pressingLeft = data.state : null;
    data.inputId === 'right' ? player.pressingRight = data.state : null;
    data.inputId === 'up' ? player.pressingUp = data.state : null;
    data.inputId === 'down' ? player.pressingDown = data.state : null;
  });

  socket.on('onMouseDown', function(data) {
    player.handleClick(data);
  })

  socket.on('disconnect', function() {
    delete SOCKET_LIST[socket.id];
    delete PLAYER_LIST[socket.id];
    console.log('Connection ended.')
  })
});

setInterval(function() {
  var packet = [];

  for (var i in PLAYER_LIST) {
    var character = PLAYER_LIST[i]

    character.updatePosition(map);
    packet.push({
      x: character.x,
      y: character.y,
      direction: character.direction,
      animCounter: character.animCounter,
      spriteData: character.spriteData,
    })
  }

  packet.sort(services.sortYcoords)

  for (var i in SOCKET_LIST) {
    var socket = SOCKET_LIST[i]
    socket.emit('update', packet, map, 0)
  }
}, 1000/50)

app.post('/test', (req, res) => {
  console.log('a post req was made!')
  res.setHeader('Content-Type', 'application/json');
  res.send(JSON.stringify({ sum: req.body.x + req.body.y }));
})

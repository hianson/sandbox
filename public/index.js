var socket = io();
var canvas = document.getElementById("ctx")
var ctx = canvas.getContext("2d");
ctx.imageSmoothingEnabled = false;

var Sprites = {};
Sprites.player = new Image();
Sprites.player.src = '/public/assets/hero.png';
Sprites.map = new Image();
Sprites.map.src = '/public/assets/tiles.png';

socket.on('update', function(d, m, l) {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  for (var i = 0; i < m.layers.length; i++) {
    for (var j = 0; j < m.layers[i].length; j++) {
        var x = j % m.cols;
        var y = Math.floor(j / m.cols)
        var tile = m.layers[i][j]

        if (tile !== 0) {
          ctx.drawImage(
              Sprites.map,
              (tile - 1) * m.tsize,
              0,
              m.tsize,
              m.tsize,
              x * m.tsize,
              y * m.tsize,
              m.tsize,
              m.tsize
          );
        }
      }
    }

  for (var i = 0; i < d.length; i++) {
    var width = Sprites.player.width;
    var height = Sprites.player.width;
    var frameWidth = Sprites.player.width/3;
    var frameHeight = Sprites.player.height/4;
    var walkingMod = Math.floor(d[i].animCounter) % 3

    ctx.drawImage(
      Sprites.player,
      walkingMod*frameWidth,
      d[i].direction*frameHeight,
      Sprites.player.width/3,
      Sprites.player.height/4,
      d[i].x-width/2,
      d[i].y-height/2,
      width,height
    );
  }
})

document.onkeydown = function(event) {
  if (event.keyCode === 68) {
    socket.emit('keyPress', {inputId: 'right', state: true});
  } else if (event.keyCode === 83) {
    socket.emit('keyPress', {inputId: 'down', state: true});
  } else if (event.keyCode === 65) {
    socket.emit('keyPress', {inputId: 'left', state: true});
  } else if (event.keyCode === 87) {
    socket.emit('keyPress', {inputId: 'up', state: true});
  }
}

document.onkeyup = function(event) {
  if (event.keyCode === 68) {
    socket.emit('keyPress', {inputId: 'right', state: false});
  } else if (event.keyCode === 83) {
    socket.emit('keyPress', {inputId: 'down', state: false});
  } else if (event.keyCode === 65) {
    socket.emit('keyPress', {inputId: 'left', state: false});
  } else if (event.keyCode === 87) {
    socket.emit('keyPress', {inputId: 'up', state: false});
  }
}

canvas.addEventListener("click", function(event) {
  var rect = canvas.getBoundingClientRect();

  socket.emit('onMouseDown', {x: Math.floor(event.clientX - rect.left), y: Math.floor(event.clientY - rect.top)});
})

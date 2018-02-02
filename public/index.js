var socket = io();
var canvas = document.getElementById("ctx")
var ctx = canvas.getContext("2d");
ctx.imageSmoothingEnabled = false;

var Sprites = {};
Sprites.player = new Image();
Sprites.player.src = '/public/assets/hero.png';
Sprites.map = new Image();
Sprites.map.src = '/public/assets/tiles.png';
Sprites.chicken = new Image();
Sprites.chicken.src = '/public/assets/chicken.png'

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
    var sprite = Sprites[d[i].spriteData.spriteType]
    var direction = d[i].direction
    var frameWidth = Sprites[d[i].spriteData.spriteType].width / d[i].spriteData.spriteCols;
    var frameHeight = Sprites[d[i].spriteData.spriteType].height / d[i].spriteData.spriteRows;
    var width = Sprites[d[i].spriteData.spriteType].width;
    var height = Sprites[d[i].spriteData.spriteType].height;
    var size = d[i].spriteData.size
    var walkingMod = Math.floor(d[i].animCounter) % d[i].spriteData.spriteCols

    ctx.drawImage(
      sprite,
      walkingMod*frameWidth,
      direction*frameHeight,
      frameWidth,
      frameHeight,
      d[i].x-width/2,
      d[i].y-height/2,
      frameWidth * size,
      frameHeight * size
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

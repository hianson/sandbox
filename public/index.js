var socket = io();
var canvas = document.getElementById("ctx")
var ctx = canvas.getContext("2d");
ctx.imageSmoothingEnabled = false;

var Sprites = {};
Sprites.player = new Image();
Sprites.player.src = '/public/hero.png';
Sprites.map = new Image();
Sprites.map.src = '/public/tiles.png';

socket.on('update', function(d, m, l) {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  //render map
  for (var i = 0; i < m.layers[l].length; i++) {
      var x = i % m.cols;
      var y = Math.floor(i / m.cols)
      var tile = m.layers[l][i]

      if (tile !== 0) { // 0 => empty tile
        ctx.drawImage(
            Sprites.map,
            (tile - 1) * m.tsize,
            0,
            m.tsize,
            m.tsize,
            x * m.tsize * 4,
            y * m.tsize * 4,
            m.tsize * 4,
            m.tsize * 4
        );
      }
    }

  for (var i = 0; i < d.length; i++) {
    ctx.fillStyle = "steelblue";
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

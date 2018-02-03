var socket = io();
var canvas = document.getElementById("ctx");
var ctx = canvas.getContext("2d");
ctx.imageSmoothingEnabled = false;

var Sprites = {};
Sprites.chicken = new Image();
Sprites.player = new Image();
Sprites.map = new Image();
Sprites.chicken.src = '/public/assets/chicken.png'
Sprites.player.src = '/public/assets/hero.png';
Sprites.map.src = '/public/assets/tiles.png';

document.onkeydown = function(event) {
  event.keyCode === 68 ? socket.emit('keyPress', {inputId: 'right', state: true}) : null;
  event.keyCode === 83 ? socket.emit('keyPress', {inputId: 'down', state: true}) : null;
  event.keyCode === 65 ? socket.emit('keyPress', {inputId: 'left', state: true}) : null;
  event.keyCode === 87 ? socket.emit('keyPress', {inputId: 'up', state: true}) : null;
}

document.onkeyup = function(event) {
  event.keyCode === 68 ? socket.emit('keyPress', {inputId: 'right', state: false}) : null;
  event.keyCode === 83 ? socket.emit('keyPress', {inputId: 'down', state: false}) : null;
  event.keyCode === 65 ? socket.emit('keyPress', {inputId: 'left', state: false}) : null;
  event.keyCode === 87 ? socket.emit('keyPress', {inputId: 'up', state: false}) : null;
}

canvas.addEventListener("click", function(event) {
  var rect = canvas.getBoundingClientRect();

  socket.emit('onMouseDown', {x: Math.floor(event.clientX - rect.left), y: Math.floor(event.clientY - rect.top)});
})

socket.on('update', function(d, m, l) {
  renderCanvas(d, m, l);
})

function renderCanvas(d, m, l) {
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
    var type = d[i].spriteData.spriteType
    var sprite = Sprites[type]
    var direction = d[i].direction
    var frameWidth = Sprites[type].width / d[i].spriteData.spriteCols;
    var frameHeight = Sprites[type].height / d[i].spriteData.spriteRows;
    var width = Sprites[type].width;
    var height = Sprites[type].height;
    var size = d[i].spriteData.drawSize
    var walkingMod = Math.floor(d[i].animCounter) % d[i].spriteData.spriteCols

    ctx.drawImage(
      sprite,
      walkingMod*frameWidth,
      direction*frameHeight,
      frameWidth,
      frameHeight,
      d[i].x-(frameWidth*size/2),
      d[i].y-(frameHeight*size/2),
      frameWidth * size,
      frameHeight * size
    );
  }
}

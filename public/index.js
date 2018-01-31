var socket = io();
var canvas = document.getElementById("ctx")
var ctx = canvas.getContext("2d");
ctx.imageSmoothingEnabled = false;

var Img = {};
Img.player = new Image();
Img.player.src = '/public/hero.png';

socket.on('update', function(data1) {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  for (var i = 0; i < data1.length; i++) {
    ctx.fillStyle = "steelblue";
    var width = Img.player.width;
    var height = Img.player.width;
    var frameWidth = Img.player.width/3;
    var frameHeight = Img.player.height/4;
    var walkingMod = Math.floor(data1[i].animCounter) % 3

    ctx.drawImage(
      Img.player,
      walkingMod*frameWidth,
      data1[i].direction*frameHeight,
      Img.player.width/3,
      Img.player.height/4,
      data1[i].x-width/2,
      data1[i].y-height/2,
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

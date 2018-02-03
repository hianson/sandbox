var Character = require('./character.js');
var Map = require('./map.js');

class Player extends Character {
  constructor(id, x, y, speed, animSpeed, spriteType, size) {
    super(id, x, y, speed, animSpeed, spriteType, size)
    this.pressingRight = false;
    this.pressingLeft = false;
    this.pressingUp = false;
    this.pressingDown = false;
  }
}

Player.prototype.updatePosition = function(mapData) {
  var distanceX = Math.abs(this.x - this.targetX)
  var distanceY = Math.abs(this.y - this.targetY)
  var prevX = this.x
  var prevY = this.y

  this.handleKeypress();
  this.updateCharacterPosition(distanceX, distanceY)
  this.x === this.targetX && this.y === this.targetY ? this.animCounter = 1 : null;
  this.animCounter += this.animSpeed;

  this.checkCollisions(mapData) ? (this.x = prevX, this.y = prevY, this.targetX = this.x, this.targetY = this.y) : null;
}

Player.prototype.handleKeypress = function() {
  this.pressingRight ? this.targetX += this.speed : null;
  this.pressingLeft ? this.targetX -= this.speed : null;
  this.pressingUp ? this.targetY -= this.speed : null;
  this.pressingDown ? this.targetY += this.speed : null;
}

Player.prototype.handleClick = function(data) {
  this.targetX = data.x;
  this.targetY = data.y;
}

module.exports = Player;

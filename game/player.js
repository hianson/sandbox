var Character = require('./character.js');

class Player extends Character {
  constructor(id, x, y, speed, spriteType, spriteCols, spriteRows, size) {
    super(id, x, y, speed, spriteType, spriteCols, spriteRows, size)
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

  this.pressingRight ? (this.direction = 2, this.targetX += this.speed) : null;
  this.pressingLeft ? (this.direction = 1, this.targetX -= this.speed) : null;
  this.pressingUp ? (this.direction = 3, this.targetY -= this.speed) : null;
  this.pressingDown ? (this.direction = 0, this.targetY += this.speed) : null;

  if (this.x < this.targetX) {
    distanceX < this.speed ? this.x += distanceX : this.x += this.speed;
    this.direction = 2
  }
  if (this.y > this.targetY) {
    distanceY < this.speed ? this.y -= distanceY : this.y -= this.speed;
    this.direction = 3
  }
  if (this.x > this.targetX) {
    distanceX < this.speed ? this.x -= distanceX : this.x -= this.speed;
    this.direction = 1
  }
  if (this.y < this.targetY) {
    distanceY < this.speed ? this.y += distanceY : this.y += this.speed;
    this.direction = 0
  }
  this.animCounter += 0.3
  this.x === this.targetX && this.y === this.targetY ? this.animCounter = 1 : null;
  this.checkCollisions(mapData) ? (this.x = prevX, this.y = prevY, this.targetX = this.x, this.targetY = this.y) : null;
}

Player.prototype.checkCollisions = function(mapData) {
  var playerX = Math.floor(this.x/mapData.tsize)
  var playerY = Math.floor(this.y/mapData.tsize)
  var playerPosIndex = playerX + playerY * 8
  var tile = mapData.layers[1][playerPosIndex]

  if (tile === 7 || tile === 5 || tile === 6) {
    return true
  }
}

Player.prototype.setCoordinates = function(data) {
  this.targetX = data.x;
  this.targetY = data.y;
}

module.exports = Player;

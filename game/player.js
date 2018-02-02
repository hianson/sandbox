function Player(id, x, y) {
  this.id = id;
  this.x = 300;
  this.y = 300;
  this.targetX = this.x;
  this.targetY = this.y;
  this.pressingRight = false;
  this.pressingLeft = false;
  this.pressingUp = false;
  this.pressingDown = false;
  this.maxSpd = 5;
  this.direction = 0;
  this.animCounter = 0;
}

Player.prototype.updatePosition = function(mapData) {
  var distanceX = Math.abs(this.x - this.targetX)
  var distanceY = Math.abs(this.y - this.targetY)
  var prevX = this.x
  var prevY = this.y

  this.pressingRight ? (this.direction = 2, this.targetX += this.maxSpd) : null;
  this.pressingLeft ? (this.direction = 1, this.targetX -= this.maxSpd) : null;
  this.pressingUp ? (this.direction = 3, this.targetY -= this.maxSpd) : null;
  this.pressingDown ? (this.direction = 0, this.targetY += this.maxSpd) : null;

  if (this.x < this.targetX) {
    distanceX < this.maxSpd ? this.x += distanceX : this.x += this.maxSpd;
    this.direction = 2
  }
  if (this.y > this.targetY) {
    distanceY < this.maxSpd ? this.y -= distanceY : this.y -= this.maxSpd;
    this.direction = 3
  }
  if (this.x > this.targetX) {
    distanceX < this.maxSpd ? this.x -= distanceX : this.x -= this.maxSpd;
    this.direction = 1
  }
  if (this.y < this.targetY) {
    distanceY < this.maxSpd ? this.y += distanceY : this.y += this.maxSpd;
    this.direction = 0
  }
  this.animCounter += 0.5
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

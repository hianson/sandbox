function Player(id) {
  this.x = 300;
  this.y = 300;
  this.id = id;
  this.pressingRight = false;
  this.pressingLeft = false;
  this.pressingUp = false;
  this.pressingDown = false;
  this.maxSpd = 10;
  this.direction = 0;
  this.animCounter = 0;
}

Player.prototype.updatePosition = function(mapData) {
  var prevX = this.x
  var prevY = this.y

  if (this.pressingRight) {
    this.x += this.maxSpd;
    this.direction = 2
    this.animCounter += 0.2
  }
  if (this.pressingLeft) {
    this.x -= this.maxSpd;
    this.direction = 1
    this.animCounter += 0.2
  }
  if (this.pressingUp) {
    this.y -= this.maxSpd;
    this.direction = 3
    this.animCounter += 0.2
  }
  if (this.pressingDown) {
    this.y += this.maxSpd;
    this.direction = 0
    this.animCounter += 0.2
  }
  if (this.checkCollisions(mapData) === true) {
    this.x = prevX
    this.y = prevY
  }
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

module.exports = Player;

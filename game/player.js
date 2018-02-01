function Player(id) {
  this.x = 300;
  this.y = 300;
  this.id = id;
  this.pressingRight = false;
  this.pressingLeft = false;
  this.pressingUp = false;
  this.pressingDown = false;
  this.mouseDown = false;
  this.maxSpd = 7;
  this.direction = 0;
  this.animCounter = 0;
  this.targetX = 300;
  this.targetY = 300;
}

Player.prototype.updatePosition = function(mapData) {
  var prevX = this.x
  var prevY = this.y

  if (this.pressingRight) {
    this.x += this.maxSpd;
    this.targetX = this.x
    this.direction = 2
    this.animCounter += 0.2
  }
  if (this.pressingLeft) {
    this.x -= this.maxSpd;
    this.targetX = this.x
    this.direction = 1
    this.animCounter += 0.2
  }
  if (this.pressingUp) {
    this.y -= this.maxSpd;
    this.targetY = this.y
    this.direction = 3
    this.animCounter += 0.2
  }
  if (this.pressingDown) {
    this.y += this.maxSpd;
    this.targetY = this.y
    this.direction = 0
    this.animCounter += 0.2
  }

  var distanceX = Math.abs(this.x - this.targetX)
  var distanceY = Math.abs(this.y - this.targetY)

  if (this.x < this.targetX) {
    if (distanceX < 7) {
      this.x += distanceX
    } else {
      this.x += 7
    }
    this.direction = 2
  }
  if (this.y > this.targetY) {
    if (distanceY < 7) {
      this.y -= distanceY
    } else {
      this.y -= 7
    }
    this.direction = 3
  }
  if (this.x > this.targetX) {
    if (distanceX < 7) {
      this.x -= distanceX
    } else {
      this.x -= 7
    }
    this.direction = 1
  }
  if (this.y < this.targetY) {
    if (distanceY < 7) {
      this.y += distanceY
    } else {
      this.y += 7
    }
    this.direction = 0
  }


  if (this.x === this.targetX && this.y === this.targetY) {
    this.animCounter = 0;
  }

  if (this.checkCollisions(mapData) === true) {
    this.x = prevX
    this.y = prevY
    this.targetX = this.x
    this.targetY = this.y
  }

  this.animCounter += 0.2
}

Player.prototype.clickMovement = function() {
  if (this.mouseDown === true) {
    // console.log('mouse is held down', this.animCounter)
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

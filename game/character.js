var Map = require('./map.js')

class Character {
  constructor(id, x, y, speed, animSpeed, spriteType, size) {
    this.id = id;
    this.x = x;
    this.y = y;
    this.targetX = this.x;
    this.targetY = this.y;
    this.speed = speed;
    this.direction = 0;
    this.animSpeed = animSpeed;
    this.animCounter = 0;
    this.spriteData = {
      spriteType: spriteType,
      spriteCols: null,
      spriteRows: null,
      drawSize: size
    }
    this.setSpriteParams()
  }
}

Character.prototype.setSpriteParams = function() {
  this.spriteData.spriteType === 'player' ? (this.spriteData.spriteCols = 3, this.spriteData.spriteRows = 4) : null;
  this.spriteData.spriteType === 'chicken' ? (this.spriteData.spriteCols = 2, this.spriteData.spriteRows = 5) : null;
}

Character.prototype.checkCollisions = function(mapData) {
  var playerX = Math.floor(this.x/mapData.tsize)
  var playerY = Math.floor(this.y/mapData.tsize)
  var playerPosIndex = playerX + playerY * 8
  var tile = mapData.layers[1][playerPosIndex]

  if (tile === 7 || tile === 5 || tile === 6) {
    return true
  }
}

Character.prototype.updateCharacterPosition = function(dx, dy) {
  if (this.x < this.targetX) {
    dx < this.speed ? this.x += dx : this.x += this.speed;
    this.direction = 2
  }
  if (this.y > this.targetY) {
    dy < this.speed ? this.y -= dy : this.y -= this.speed;
    this.direction = 3
  }
  if (this.x > this.targetX) {
    dx < this.speed ? this.x -= dx : this.x -= this.speed;
    this.direction = 1
  }
  if (this.y < this.targetY) {
    dy < this.speed ? this.y += dy : this.y += this.speed;
    this.direction = 0
  }
}

module.exports = Character;

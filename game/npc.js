var Character = require('./character.js');

class Npc extends Character {
  constructor(id, x, y, speed, walkDistance, spriteType, spriteCols, spriteRows, size) {
    super(id, x, y, speed, spriteType, spriteCols, spriteRows, size)
    this.npcData = {
      walkDistance: walkDistance,
      walking: false
    }
  }
}

Npc.prototype.updatePosition = function(mapData) {
  var distanceX = Math.abs(this.x - this.targetX)
  var distanceY = Math.abs(this.y - this.targetY)
  var prevX = this.x
  var prevY = this.y

  this.setCoordinates();

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
  this.animCounter += this.animSpeed
  this.x === this.targetX && this.y === this.targetY ? (this.npcData.walking = false, this.animCounter = 0) : null;
  this.checkCollisions(mapData) ? (this.x = prevX, this.y = prevY, this.targetX = this.x, this.targetY = this.y) : null;
}

Npc.prototype.checkCollisions = function(mapData) {
  var playerX = Math.floor(this.x/mapData.tsize)
  var playerY = Math.floor(this.y/mapData.tsize)
  var playerPosIndex = playerX + playerY * 8
  var tile = mapData.layers[1][playerPosIndex]

  if (tile === 7 || tile === 5 || tile === 6) return true;
}

Npc.prototype.setCoordinates = function() {
  if (this.npcData.walking === true) return;

  if (Math.random() > 0.98) {
    var npcDirection = Math.floor(Math.random() * 4)
    switch (npcDirection) {
      case 0:
        this.targetY += this.npcData.walkDistance;
        break;
      case 1:
        this.targetX -= this.npcData.walkDistance;
        break;
      case 2:
        this.targetX += this.npcData.walkDistance;
        break;
      case 3:
        this.targetY -= this.npcData.walkDistance;
        break;
    }
    this.npcData.walking = true;
  }
}

module.exports = Npc;

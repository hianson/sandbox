var Character = require('./character.js');

class Npc extends Character {
  constructor(id, x, y, speed, animSpeed, walkDistance, spriteType, spriteCols, spriteRows, size) {
    super(id, x, y, speed, animSpeed, spriteType, spriteCols, spriteRows, size)
    this.walkDistance = walkDistance;
    this.walking = false;
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
  this.x === this.targetX && this.y === this.targetY ? (this.walking = false, this.animCounter = 0) : null;
  this.animCounter += this.animSpeed

  this.checkCollisions(mapData) ? (this.x = prevX, this.y = prevY, this.targetX = this.x, this.targetY = this.y) : null;
}

Npc.prototype.setCoordinates = function() {
  if (this.walking === true) return;

  if (Math.random() > 0.98) {
    var npcDirection = Math.floor(Math.random() * 4)
    switch (npcDirection) {
      case 0:
        this.targetY += this.walkDistance;
        break;
      case 1:
        this.targetX -= this.walkDistance;
        break;
      case 2:
        this.targetX += this.walkDistance;
        break;
      case 3:
        this.targetY -= this.walkDistance;
        break;
    }
    this.walking = !(this.x === this.targetX && this.y === this.targetY);
  }
}

module.exports = Npc;

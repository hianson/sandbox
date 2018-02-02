var Character = require('./character.js');

class Npc extends Character {
  constructor(id, x, y, speed, animSpeed, walkDistance, spriteType, spriteCols, spriteRows, size) {
    super(id, x, y, speed, animSpeed, spriteType, spriteCols, spriteRows, size)
    this.walkDistance = walkDistance;
    this.walking = false;
    this.walkChance = 0.98;
  }
}

Npc.prototype.updatePosition = function(mapData) {
  var distanceX = Math.abs(this.x - this.targetX)
  var distanceY = Math.abs(this.y - this.targetY)
  var prevX = this.x
  var prevY = this.y

  this.npcWalk(this.walkChance);
  this.updateCharacterPosition(distanceX, distanceY);
  this.x === this.targetX && this.y === this.targetY ? (this.walking = false, this.animCounter = 1) : null;
  this.animCounter += this.animSpeed

  this.checkCollisions(mapData) ? (this.x = prevX, this.y = prevY, this.targetX = this.x, this.targetY = this.y) : null;
}

Npc.prototype.npcWalk = function(chance) {
  if (this.walking === true) return;

  if (Math.random() > chance) {
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
    this.walking = true;
  }
}

module.exports = Npc;

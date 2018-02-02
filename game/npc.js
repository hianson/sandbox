function Npc(id, x, y) {
  this.id = id;
  this.x = 100;
  this.y = 300;
  this.targetX = this.x;
  this.targetY = this.y;
  this.maxSpd = 1;
  this.direction = 0;
  this.animCounter = 0;
  this.animSpeed = 0.1
  this.walking = false;
  this.walkingDistance = 40;
}

Npc.prototype.updatePosition = function(mapData) {
  var distanceX = Math.abs(this.x - this.targetX)
  var distanceY = Math.abs(this.y - this.targetY)
  var prevX = this.x
  var prevY = this.y

  this.setCoordinates();

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
  this.animCounter += this.animSpeed
  this.x === this.targetX && this.y === this.targetY ? (this.walking = false, this.animCounter = 1) : null;
  this.checkCollisions(mapData) ? (this.x = prevX, this.y = prevY, this.targetX = this.x, this.targetY = this.y) : null;
}

Npc.prototype.checkCollisions = function(mapData) {
  var playerX = Math.floor(this.x/mapData.tsize)
  var playerY = Math.floor(this.y/mapData.tsize)
  var playerPosIndex = playerX + playerY * 8
  var tile = mapData.layers[1][playerPosIndex]

  if (tile === 7 || tile === 5 || tile === 6) {
    return true
  }
}

Npc.prototype.setCoordinates = function() {
  if (this.walking === true) {
    return;
  }
  var npcWalk = Math.random() > 0.98

  if (npcWalk) {
    var npcDirection = Math.floor(Math.random() * 4)
    switch (npcDirection) {
      case 0:
        this.targetY += this.walkingDistance;
        break;
      case 1:
        this.targetX -= this.walkingDistance;
        break;
      case 2:
        this.targetX += this.walkingDistance;
        break;
      case 3:
        this.targetY -= this.walkingDistance;
        break;
    }
    this.walking = true;
  }
}

module.exports = Npc;
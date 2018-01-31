function Player(id) {
  this.x = 230;
  this.y = 380;
  this.id = id;
  this.pressingRight = false;
  this.pressingLeft = false;
  this.pressingUp = false;
  this.pressingDown = false;
  this.maxSpd = 10;
  this.direction = 0;
  this.animCounter = 0;
}

Player.prototype.updatePosition = function() {
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
}

module.exports = Player;

class Character {
  constructor(id, x, y, speed, animSpeed, spriteType, spriteCols, spriteRows, size) {
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
      spriteCols: spriteCols,
      spriteRows: spriteRows,
      walkingMod: Math.floor(this.animCounter) % spriteCols,
      drawSize: size
    }
  }
}

module.exports = Character;

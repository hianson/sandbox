class Map {
  constructor(cols, rows, tsize, layers) {
    this.cols = cols;
    this.rows = rows;
    this.tsize = tsize;
    this.layers = layers;
  }
}

Map.prototype.isCollision = function() {
  // console.log(this.cols)
}

module.exports = Map;

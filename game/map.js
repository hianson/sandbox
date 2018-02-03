class Map {
  constructor(cols, rows, tsize, layers) {
    this.cols = cols;
    this.rows = rows;
    this.tsize = tsize;
    this.layers = layers;
  }
}

Map.prototype.test = function() {
  console.log('asd')
}

Map.prototype.depthOrder = function(a, b) {
  console.log(a)
  if (a.y < b.y) {
    return -1;
  }
  if (a.y > b.y) {
    return 1;
  }
  return 0;
}

module.exports = Map;

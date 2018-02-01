function Map() {
    this.cols = 8,
    this.rows = 8,
    this.tsize = 48,
    this.layers = [[
        1, 1, 1, 1, 1, 1, 1, 1,
        1, 1, 1, 1, 1, 1, 1, 1,
        1, 1, 3, 4, 2, 1, 1, 1,
        1, 1, 5, 6, 2, 1, 1, 1,
        1, 1, 2, 1, 2, 1, 1, 1,
        1, 1, 1, 1, 1, 1, 1, 1,
        1, 1, 1, 1, 1, 1, 1, 1,
        1, 1, 1, 1, 1, 1, 1, 1
    ], [
        7, 7, 7, 7, 7, 7, 7, 7,
        7, 0, 0, 0, 0, 0, 0, 7,
        7, 0, 0, 0, 0, 0, 0, 7,
        7, 0, 0, 0, 0, 0, 0, 7,
        7, 0, 0, 0, 0, 0, 0, 7,
        7, 0, 0, 0, 0, 0, 0, 7,
        7, 0, 0, 0, 0, 0, 0, 7,
        7, 7, 7, 7, 7, 7, 7, 7
    ]]
}

Map.prototype.getTile = function(layer, col, row) {
  return this.layers[layer][row * map.cols + col];
}

// function to check if a position is inside of a wall
Map.prototype.isPositionWall = function(pt) {
  var gridX = Math.floor(pt.x / this.tsize);
  var gridY = Math.floor(pt.y / this.tsize);
}

module.exports = Map;

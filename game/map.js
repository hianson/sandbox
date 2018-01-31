function Map() {
    this.cols = 8,
    this.rows = 8,
    this.tsize = 16,
    this.layers = [[
        1, 1, 1, 1, 1, 1, 1, 1,
        1, 1, 1, 1, 1, 1, 1, 1,
        1, 1, 2, 2, 2, 1, 1, 1,
        1, 1, 2, 2, 2, 1, 1, 1,
        1, 1, 2, 1, 2, 1, 1, 1,
        1, 1, 1, 1, 1, 1, 1, 1,
        1, 1, 1, 1, 1, 1, 1, 1,
        1, 1, 1, 1, 1, 1, 1, 1
    ], [
        4, 3, 3, 3, 3, 3, 3, 4,
        4, 0, 0, 0, 0, 0, 0, 4,
        4, 0, 0, 0, 0, 0, 0, 4,
        4, 0, 0, 5, 0, 0, 0, 4,
        4, 0, 0, 5, 0, 0, 0, 4,
        4, 0, 0, 0, 0, 0, 0, 4,
        4, 4, 4, 0, 0, 4, 4, 4,
        0, 3, 3, 0, 0, 3, 3, 3
    ]]
}

Map.prototype.getTile = function(layer, col, row) {
  return this.layers[layer][row * map.cols + col];
}

module.exports = Map;

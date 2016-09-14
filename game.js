function Block(x, y) {
  this.xCoord = x;
  this.yCoord = y;
}

function Piece(x,y) {

  this.blocks = [new Block(x,y)];

}

var gameModel = {
  init: function() {
    this.currentBlock = new Piece(4,0);
    this.populatePiece("square");
    this.turn = 0;
    this.score = 0;
  },

  getCoords: function(){
    return [gameModel.currentBlock.xCoord, gameModel.currentBlock.yCoord];
  },

  updateGame: function(grid) {
    var coords = this.getCoords();
    // if (gameModel.checkTouch(grid) || coords[1] === 19) {
    //   this.currentBlock = new Block(4,0);
    //   return coords;
    // }
    // gameModel.currentBlock.yCoord += 1;
    gameModel.currentBlock.blocks.forEach(function(block) {
      block.yCoord += 1;
    });
    return false;
  },

  checkTouch: function(grid) {
    var x = gameModel.currentBlock.xCoord;
    var y = gameModel.currentBlock.yCoord;
    if (grid[x][y+1]) {
      return true;
    }
    return false;
  },

  populatePiece: function(type) {
    var xCoord = this.currentBlock.blocks[0].xCoord;
    var yCoord = this.currentBlock.blocks[0].yCoord;
    TYPES[type].forEach(function(ele) {
      var block = new Block(xCoord + ele[0], yCoord + ele[1]);
      gameModel.currentBlock.blocks.push(block);
    });
  },

  updatePieceCoords: function(keycode) {
    this.currentBlock.blocks.forEach(function(block) {
      if (keycode === 37) {
        block.xCoord -= 1;
      }
      if (keycode === 39) {
        block.xCoord += 1;
      }
      // if (keycode === 40) {
      //   return gameModel.setPiece(this.currentBlock);
      // }
      return false;
    });
  },

  setPiece: function(block) {
    var xVal = block.xCoord;
    var yVal = block.yCoord;
    this.currentBlock = new Block(4,0);
    return [xVal, yVal];
  }
};

var TYPES = {
  square: [[1,0], [0,1], [1,1]]
};

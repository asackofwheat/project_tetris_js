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
    return gameModel.currentBlock.blocks;
  },

  updateGame: function(grid) {
    var coords = this.getCoords();
    var lowestRowTouch = gameModel.currentBlock.blocks.some(function(block) {
      return block.yCoord === 19;
    });
    if (gameModel.checkTouch(grid) || lowestRowTouch) {
      this.currentBlock = new Piece(4,0);
      this.populatePiece('square');
      return coords;
    }
    // gameModel.currentBlock.yCoord += 1;
    gameModel.currentBlock.blocks.forEach(function(block) {
      block.yCoord += 1;
    });
    return false;
  },

  checkTouch: function(grid) {
    gameModel.currentBlock.blocks.forEach(function(block) {
      var x = block.xCoord;
      var y = block.yCoord;
      if (grid[x][y+1]) {
        return true;
      }
    });
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
    });
    if (keycode === 40) {
      // var blocks = gameModel.currentBlock.blocks;
      // return blocks.map(function(block) {
      //   gameModel.setPiece(block);
      // });
      return gameModel.setPiece(gameModel.currentBlock);
    }
    return false;
  },

  setPiece: function(block) {
    return this.currentBlock.blocks;
  }
};

var TYPES = {
  square: [[1,0], [0,1], [1,1]]
};

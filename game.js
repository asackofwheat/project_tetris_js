function Block(x, y) {
  this.xCoord = x;
  this.yCoord = y;
};

function Piece(x,y) {
  this.blocks = [new Block(x,y)];
  this.type = "";
  this.rotation = 0;
};

Piece.prototype.turn = function() {
  this.rotation += 1;
  if (this.rotation > 3) {
    this.rotation = 0
  }
};

var gameModel = {
  init: function() {
    this.currentBlock = new Piece(4,0);
    this.populatePiece(this.getRandom());
    this.turn = 0;
    this.score = 0;
  },

  getRandom: function() {
    return TYPEARRAY[Math.floor(Math.random() * TYPEARRAY.length)];
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
      this.populatePiece(this.getRandom());
      return coords;
    }
    gameModel.currentBlock.blocks.forEach(function(block) {
      block.yCoord += 1;
    });
    return false;
  },

  checkTouch: function(grid) {
    for (var i = 0; i < 4; i++) {
      var x = gameModel.currentBlock.blocks[i].xCoord;
      var y = gameModel.currentBlock.blocks[i].yCoord;
      if (grid[x][y+1]) {
        return true;
      }
    }
    // gameModel.currentBlock.blocks.forEach(function(block) {
    //   var x = block.xCoord;
    //   var y = block.yCoord;
    //   if (grid[x][y+1]) {
    //     return true;
    //   }
    // });
    return false;
  },

  populatePiece: function(type) {
    var xCoord = this.currentBlock.blocks[0].xCoord;
    var yCoord = this.currentBlock.blocks[0].yCoord;
    this.currentBlock.type = type
    TYPES[type][0].forEach(function(ele) {
      var block = new Block(xCoord + ele[0], yCoord + ele[1]);
      gameModel.currentBlock.blocks.push(block);
    });
  },

  rotatePiece: function(type, rotation) {
    var xCoord = this.currentBlock.blocks[0].xCoord;
    var yCoord = this.currentBlock.blocks[0].yCoord;
    this.currentBlock.blocks.splice(1)
    TYPES[type][rotation].forEach(function(ele) {
      var block = new Block(xCoord + ele[0], yCoord + ele[1]);
      gameModel.currentBlock.blocks.push(block);
    });
  },

  updatePieceCoords: function(keycode) {
    if (keycode === 37 && gameModel.leftCheck()) {
      this.currentBlock.blocks.forEach(function(block) {
        block.xCoord -= 1;
      });
    }
    else if (keycode === 39 && gameModel.rightCheck()) {
      this.currentBlock.blocks.forEach(function(block) {
        block.xCoord += 1;
      });
    }
    else if (keycode === 40) {
      return gameModel.setPiece(gameModel.currentBlock);
    }
    else if (keycode === 38) {
      gameModel.currentBlock.turn();
      var type = gameModel.currentBlock.type;
      var rotation = gameModel.currentBlock.rotation;
      this.rotatePiece(type, rotation);
    }
    return false;
  },

  setPiece: function(block) {
    return this.currentBlock.blocks;
  },

  leftCheck: function() {
    var blocks = gameModel.currentBlock.blocks;
    var side = !blocks.some(function(block) {
      return block.xCoord === 0;
    });
    return (side && this.checkTouchLeft(gridModel.gridArray))
  },

  rightCheck: function() {
    var blocks = gameModel.currentBlock.blocks;
    var side = !blocks.some(function(block) {
      return block.xCoord === 9;
    });
    return (side && this.checkTouchRight(gridModel.gridArray))
  },

  checkTouchRight: function(grid) {
    for (var i = 0; i < 4; i++) {
      var x = gameModel.currentBlock.blocks[i].xCoord;
      var y = gameModel.currentBlock.blocks[i].yCoord;
      if (grid[x+1][y]) {
        return false;
      }
    }
    return true;
  },

  checkTouchLeft: function(grid) {
    for (var i = 0; i < 4; i++) {
      var x = gameModel.currentBlock.blocks[i].xCoord;
      var y = gameModel.currentBlock.blocks[i].yCoord;
      if (grid[x-1][y]) {
        return false;
      }
    }
    return true;
  },

};

var TYPEARRAY = ['square',
                 'lpiece',
                 'ipiece',
                 'spiece',
                 'bar'];

var TYPES = {
  square: [[[1,0],[0,1],[1,1]],
           [[1,0],[0,1],[1,1]],
           [[1,0],[0,1],[1,1]],
           [[1,0],[0,1],[1,1]]],
  lpiece: [[[1,0],[-1,0],[1,1]],
           [[0,-1],[0,1],[-1,1]],
           [[1,0],[-1,0],[-1,-1]],
           [[0,-1],[0,1],[1,-1]]],
  ipiece: [[[0,1],[-1,0],[1,0]],
           [[1,0],[0,-1],[0,1]],
           [[0,-1],[-1,0],[1,0]],
           [[-1,0],[0,-1],[0,1]]],
  spiece: [[[1,0],[0,1],[-1,1]],
           [[-1,0],[0,1],[-1,-1]],
           [[1,0],[0,1],[-1,1]],
           [[-1,0],[0,1],[-1,-1]]],
  bar:    [[[1,0],[-1,0],[2,0]],
           [[0,1],[0,-1],[0,2]],
           [[1,0],[-1,0],[2,0]],
           [[0,1],[0,-1],[0,2]]]
};
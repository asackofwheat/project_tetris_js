var controller = {
  init: function() {
    view.init();
    gridModel.init();
    gameModel.init();
  },

  gameLoop: function(){
    var loop = 1;
    setInterval(function() {
      view.render(gridModel.width, gridModel.height, gameModel.currentBlock.blocks, gridModel.gridArray);
      if (loop % 10 === 0) {
        var coords = gameModel.updateGame(gridModel.gridArray);
        if (!!coords) {
          gridModel.updateGrid(coords);
        }
        gridModel.checkRow(coords);
      }
      loop++;
    }, 40);
  },

  movePiece: function(keycode) {
    var blocks = gameModel.updatePieceCoords(keycode);
    if (!!blocks) {
      // gridModel.updateGrid(blocks);
      // gameModel.currentBlock = new Piece(4,0);
      // gameModel.populatePiece(gameModel.getRandom());
      var coords = gameModel.updateGame(gridModel.gridArray);
      if (!!coords) {
        gridModel.updateGrid(coords);
      }
      gridModel.checkRow(coords);
    }
  }

};

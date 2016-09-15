var gridModel = {
  width: 10,
  height: 20,

  init: function() {
    this.gridArray = new Array(this.width);
    this.buildGrid();
  },

  buildGrid: function() {
    for (var i = 0; i < this.gridArray.length; i++) {
      this.gridArray[i] = new Array(this.height);
    }
  },

  updateGrid: function(blocks) {
    blocks.forEach(function(block) {
      var col = gridModel.gridArray[block.xCoord];
      
      // for (var i = col.length - 1; i >= 0; i--) {
      //   if (!col[i]) {
      //     col[i] = true;
      //     gridModel.checkRow([0,i]);
      //     break;
      //   }
      // }

      col[block.yCoord] = true;
    });

    this.checkRow(this.getPieceRows(blocks));
  },

  getPieceRows: function(blocks) {
    rows = [];
    for (var i = 0; i < blocks.length; i++) {
      rows.push(blocks[i].yCoord);
    }
    return this.getUniqueRows(rows);
  },

  getUniqueRows: function(rows) {
    var uniqueRows = [];
    $.each(rows, function(i, el){
      if($.inArray(el, uniqueRows) === -1) {
        uniqueRows.push(el)
      }
    });
    return uniqueRows;
  },

  checkRow: function(rows){
    for(var i = 0; i < rows.length; i++){
      if(this.fullRow(rows[i])){
        this.removeRow(rows[i]);
      }
    }
  },

  fullRow: function(y){
    for(var j = 0; j < this.width; j++ ){
      if(!this.gridArray[j][y]){
        return false;
      }
    }
    return true;
  },

  removeRow: function(rowNum){
    gameModel.score++;
    for(var k = 0; k < this.width; k++){
      var temp = this.gridArray[k].splice(rowNum,1);
      this.gridArray[k].unshift(undefined);
      // this.gridArray[k] = temp.concat(this.gridArray[k].slice(1));
    }
  }
};

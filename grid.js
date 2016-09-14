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

  updateGrid: function(coords) {
    var col = this.gridArray[coords[0]];
    console.log(this.gridArray);
    // Search from the end of the column to the start.
    // See if any of the cells are undefined. If they are,
    // set the cell to true. Then return.
    // A 'true' cell will have the 'old-block' CSS class.
    for (var i = col.length - 1; i >= 0; i--) {
      if (!col[i]) {
        col[i] = true;
        gridModel.checkRow([0,i]);
        break;
      }
    }
  },

  checkRow: function(coords){
    var fulls = [];
    for(var i = 0; i < this.height; i++){
      if(this.fullRow(coords[1])){
        this.removeRow(i);
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

    for(var k = 0; k < this.width; k++){
      var temp = this.gridArray[k].splice(rowNum,1);
      this.gridArray[k].unshift(undefined);
      // this.gridArray[k] = temp.concat(this.gridArray[k].slice(1));
    }
  }
};

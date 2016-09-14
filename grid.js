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
    for (var i = col.length - 1; i >= 0; i--) {
      if (!col[i]) {
        col[i] = true;
        return;
      }
    }
  },

  checkRow: function(coords){
    var fulls = [];
    for(var i = 0; i < this.height; i++){
      if(this.fullRow(coords[1])){
        this.removeRow(i)
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
      var temp = this.gridArray[k].splice(rowNum);
      this.gridArray[k] = temp.concat(this.gridArray[k].slice(1));
    }
  }
};

var view = {
  init: function() {
    this.addKeyboardListner();
  },

  render: function(width, height, currentBlocks, gridArray) {
    $('#grid').html('');
    $('#score').html('Rows cleared: ' + gameModel.score);
    for(var i = 0; i < height; i++){
      var $row = $('<div>').addClass('row');
      $('#grid').append($row);
      for(var j = 0; j < width; j++){
        var $block = $('<div>')
                    .addClass('block')
                    .attr('data-x', j)
                    .attr('data-y', i);
        currentBlocks.forEach(function(ele) {
          if (j === ele.xCoord && i === ele.yCoord) {
            $block.addClass('current-block');
          }
        });
        if (gridArray[j][i]) {
          $block.addClass('old-block');
        }
        $row.append($block);
      }
    }
  },

  addKeyboardListner: function() {
    $(document).keydown(function(e) {
      var keycode = e.keyCode;
      controller.movePiece(keycode);
    });
  }

};

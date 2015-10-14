'use strict';

angular.module('App')
.factory('blockBuild', blockBuild);

function blockBuild (Block) {
	var block = block;
	return block;

	function block () {
		var svgCanvas = this.getSvgCanvas();
		var grid = this.getData('grid');
		var blocks = [];
		var properties = {
			xStep: this.getData('xStep'),
			yStep: this.getData('yStep'),
			strokeWidth:  this.getData('strokeWidth')
		};

		for (var i = 0; i < Math.pow(grid, 2); i++) {
			if (i % grid == 0) {
				blocks.push([]);
			}
			addNewBlock.call(this, i);
		}

		this.setData('blocks', blocks);

		function addNewBlock (i) {
			var dataObj = {
				animDuration: this.getData('animDuration'),
				grid: grid,
				posX: i % grid + 1,
				posY: Math.floor(i / grid) + 1,
				xStep: properties.xStep,
				yStep: properties.yStep,
				strokeWidth: properties.strokeWidth
			};
			blocks[blocks.length - 1].push(new Block(dataObj, svgCanvas));		
		}
	}

}



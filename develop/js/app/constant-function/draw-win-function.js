'use strict';

angular.module('App')
.constant('drawWin', drawWin);

function drawWin () {
	var blocks = this.getData('blocks');
	var grid = this.getData('grid');
	var winObj = this.getData('gameWinObj');
	var svgCanvas = this.getSvgCanvas();
	var animDuration = this.getData('animDuration');
	
	var blockValues = getBlocks();
	var lineParams = calculateLine();

	var winLine = svgCanvas.line(lineParams.x1, lineParams.y1, lineParams.x1, lineParams.y1);
	winLine.attr({
		class: 'game-wrapper__win-line'
	});
	winLine.animate({
		x2: lineParams.x2,
		y2: lineParams.y2
	}, animDuration);

	function getBlocks () {
		var arr = winObj.arr;
		var lengthArr = arr.length;
		return [
			blocks[arr[0].posY - 1][arr[0].posX - 1],
			blocks[arr[lengthArr - 1].posY - 1][arr[lengthArr - 1].posX - 1],
		]	
	}

	function calculateLine () {
		var obj = {};
		var diagonal = blockValues[0].posY != blockValues[1].posY && blockValues[0].posX != blockValues[1].posX;

		obj.x1 = calculateOffset('height') + blockValues[0].pixelValue.x;
		obj.x2 = calculateOffset('height') + blockValues[1].pixelValue.x;
		obj.y1 = calculateOffset('width') + blockValues[0].pixelValue.y;
		obj.y2 = calculateOffset('width') + blockValues[1].pixelValue.y;

		if (blockValues[0].posY == blockValues[1].posY) {
			obj.x1 -= calculateOffset('height', true);
			obj.x2 += calculateOffset('height', true);
		}
		if (blockValues[0].posX == blockValues[1].posX) {
			obj.y1 -= calculateOffset('width', true);
			obj.y2 += calculateOffset('width', true);
		}
		if (diagonal) {
			obj.x1 -= calculateOffset('height', true);
			obj.x2 += calculateOffset('height', true);
			if (blockValues[0].posY == 1) {
				obj.y1 -= calculateOffset('width', true);
				obj.y2 += calculateOffset('width', true);				
			}
			if (blockValues[1].posY == 1) {
				obj.y1 += calculateOffset('width', true);
				obj.y2 -= calculateOffset('width', true);				
			}
		}

		return obj;

		function calculateOffset (param, isAdditional) {
			if (!isAdditional) {
				return Math.floor(blockValues[0].pixelValue[param] / 2);
			}
			return Math.floor(blockValues[0].pixelValue[param] / 20);
		}
	}
}
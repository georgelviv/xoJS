'use-strict';

angular.module('App')
.constant('buildGridLines', buildGridLines);

function buildGridLines () {
	var svgCanvas = this.getSvgCanvas();
	var grid = this.getData('grid');

	var lineStyleObj = {
		class: 'game-wrapper__line-grid',
		strokeWidth: this.getData('strokeWidth') 
	}

	var xStep = this.getData('xStep');
	var yStep = this.getData('yStep');
	var widthSvg = this.getData('widthSvg');
	var heightSvg = this.getData('heightSvg');

	drawVertical();
	drawHorizontal();

	function drawHorizontal () {
		var i = 1;
		while (yStep * i < (heightSvg - grid)) {
			var line = svgCanvas.line(0, yStep * i, widthSvg, yStep * i);
			line.attr(lineStyleObj);
			i++;
		}
	}

	function drawVertical () {
		var i = 1;
		while (xStep * i < (widthSvg - grid)) {
			var line = svgCanvas.line(xStep * i, 0, xStep * i, heightSvg);
			line.attr(lineStyleObj);
			i++;
		}
	}
}
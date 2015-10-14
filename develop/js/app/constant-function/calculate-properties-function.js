'use strict';

angular.module('App')
.constant('calculateProperties', calculateProperties);

function calculateProperties () {
	var svgCanvas = this.getSvgCanvas();
	var grid = this.getData('grid')
	var clientRect = svgCanvas.node.getBoundingClientRect();
	var widthSvg = clientRect.width;
	var heightSvg = clientRect.height;
	var xStep = Number((widthSvg / grid).toFixed(3));
	var yStep = Number((heightSvg / grid).toFixed(3));

	this.setData('xStep', xStep);
	this.setData('yStep', yStep);
	this.setData('widthSvg', widthSvg);
	this.setData('heightSvg', heightSvg);
}
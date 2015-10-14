'use strict';

angular.module('App')
.constant('reset', reset);

function reset () {
	clearBoard.call(this);

	this.setData('gameWinObj', null);
	this.setData('gameStatus', null);
}

function clearBoard () {
	var blocks = this.getData('blocks');
	if (!blocks) return;

	blocks.forEach(function (value) {
		value.forEach(clearBlcokDraw);
	});

	function clearBlcokDraw (value) {
		value.setBlockParam('type', null);
		value.clearDraw();
	}
}
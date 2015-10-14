'use-strict';

angular.module('App')
.constant('checkForWin', checkForWin);

function checkForWin () {
	var typeArr = ['x', 'o'];
	var blocks = this.getData('blocks');
	var grid = this.getData('grid');

	if (!checkMinimalTurns()) {
		return false;
	}
	
	var res = lineCheck();

	if (!res) {
		res = diagonalCheck();
	}

	if (res) {
		this.setData('gameStatus', 'win');
		this.setData('gameWinObj', buildObj(res));
		return true;
	}

	this.setData('gameWinObj', null);

	if (blocks.every(isSet)) {
		this.setData('gameStatus', 'draw');
		return 'draw';
	}

	return false;

	function checkMinimalTurns () {
		var minimal = grid * 2 - 1;
		var count = 0;
		blocks.forEach(function (value) {
			value.forEach(function (block) {
				if (block.getBlockParams('type')) {
					count++;
				}
			});
		});
		return minimal <= count;
	}

	function isSet (value) {
		if (Object.prototype.toString.call(value) == '[object Array]') {
			return value.every(isSet);
		} else {
			return !!value.getBlockParams('type');
		}
	}

	function buildObj (obj) {
		var type = obj.type;
		var arr = [];
		var i, posX, posY;
		for (i = 0; i < grid; i++) {
			if (obj.position == 'horizontal') {
				posY = obj.line;
				posX = i + 1;
			}
			if (obj.position == 'vertical') {
				posX = obj.line;
				posY = i + 1;
			}
			if (obj.position == 'leftDiagonal') {
				posX = i + 1;
				posY = i + 1;
			}
			if (obj.position == 'rightDiagonal') {
				posX = i + 1;
				posY = grid - i;
			}
			arr.push({
				posX: posX,
				posY: posY
			});
		}
		return {
			type: type,
			arr: arr
		};
	}


	function diagonalCheck () {
		var i, k, left, right;
		for (i = 0; i < typeArr.length; i++) {
			left = true;
			right = true;
			for (k = 0; k < grid; k++) {
				if (typeArr[i] !== blocks[k][k].getBlockParams('type')) {
					left = false;
				}
				if (typeArr[i] !== blocks[k][grid - 1 - k].getBlockParams('type')) {
					right = false;
				}
				if (!left && !right) {
					break;
				}
				if (k == grid - 1) {
					return {
						position: (left) ? 'leftDiagonal' : 'rightDiagonal',
						type: typeArr[i]
					}
				}
			} 
		}
		return false;
	}

	function lineCheck () {
		var resObj = {};
		var k, i, j, vertical, horizontal;

		for (k = 0; k < typeArr.length; k++) {
			for (i = 0; i < grid; i++) {
				horizontal = true;
				vertical = true;
				for (j = 0; j < grid; j++) {
					if (typeArr[k] != blocks[i][j].getBlockParams('type')) {
						horizontal = false;
					}
					if (typeArr[k] != blocks[j][i].getBlockParams('type')) {
						vertical = false;
					}
					if (!horizontal && !vertical) {
						break;
					}
					if (j == grid - 1) {
						return {
							position: (horizontal) ? 'horizontal' : 'vertical',
							line: i + 1,
							type: typeArr[k]
						}
					}
				}
			}
		}
		return false;
	}
}
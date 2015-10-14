'use strict';

angular.module('App')
.factory('initPassbyPass', initPassbyPass);

function initPassbyPass ($rootScope) {
	var passbyPass = passbyPass;
	return passbyPass;

	function passbyPass () {
		var canvas = this.getSvgCanvas();
		var blocks= this.getData('blocks');
		var grid = this.getData('grid');

		var self = this;
		var turnX = true;
		var canMove = true;

		this.setData('gameStatus', 'play');

		canvas.node.addEventListener('click', clickHandler, false);
		var drawEnd = $rootScope.$on('drawEnd', drawEndHandler);

		function drawEndHandler () {
			winHandler();
			canMove = true;
		}

		function clickHandler (event) {
			var target = event.target;
			var posX = Number(target.getAttribute('data-block-pos-x'));
			var posY = Number(target.getAttribute('data-block-pos-y'));
			if (canMove && posX && posY) {
				makeMove(posY, posX);
			}
		}

		function makeMove (posY, posX) {
			var block = blocks[posY - 1][posX - 1];
			canMove = false;
			var isDrawed = turnX ? block.drawX() : block.drawO();
			if (isDrawed !== false) {
				self.sound.playTurn();
				turnX = !turnX;
			} else {
				canMove = true;
			}
		}

		function winHandler () {
			self.checkForWin();
			var status = self.getData('gameStatus');

			if (status == 'win') {
				self.drawWin();
				self.sound.playWin();
				removeEvents();
				$rootScope.$emit('endGame', 'win' + self.getData('gameWinObj').type);
				
			}

			if (status == 'draw') {
				removeEvents();
				$rootScope.$emit('endGame', 'draw');
			}

			if (status == 'clear') {
				self.setData('gameStatus', 'play');
			}
		}

		function removeEvents () {
			drawEnd();
			canvas.node.removeEventListener('click', clickHandler);
		}
	}
}


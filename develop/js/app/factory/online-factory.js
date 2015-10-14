'use strict';

angular.module('App')
.factory('initOnline', initOnline);

function initOnline ($rootScope) {
	var online = online;
	return online;

	function online () {
		var canvas = this.getSvgCanvas();
		var blocks= this.getData('blocks');
		var grid = this.getData('grid');

		var self = this;
		var turnX = true;
		var canMove = true;

		var drawEnd = $rootScope.$on('drawEnd', drawEndHandler);

		this.setData('gameStatus', 'play');

		var onlineMove = $rootScope.$on('online-move', onlineMoveHandler);
		var onlineMoved = $rootScope.$on('online-moved', onlineMovedHandler);
		var onlineDisconnected = $rootScope.$on('online-disconnect', onlineDisconnectHandler);

		function resetEvents () {
			drawEnd();
			onlineMove();
			onlineDisconnected();
		}

		function onlineDisconnectHandler () {
			turnX = true;
			canMove = true;
			clearHandler();
			self.reset();
		}
		

		function onlineMovedHandler (event, param) {
			var block = blocks[param.data.y][param.data.x];
			turnX = param.player == 'x' ? true : false;
			canMove = false;
			var isDrawed = turnX ? block.drawX() : block.drawO();
			if (isDrawed !== false) {
				self.sound.playTurn();
				turnX = !turnX;
				clearHandler();
			} else {
				canMove = true;
			}
			
		}

		function onlineMoveHandler () {
			canvas.node.addEventListener('click', clickHandler, false);
		}

		function clearHandler () {
			canvas.node.removeEventListener('click', clickHandler);
		}

		function drawEndHandler () {
			winHandler();
			canMove = true;
		}

		function clickHandler (event) {
			var target = event.target;
			var posX = Number(target.getAttribute('data-block-pos-x'));
			var posY = Number(target.getAttribute('data-block-pos-y'));
			if (posX && posY) {
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
				$rootScope.$emit('move', {y: [posY - 1], x: [posX - 1]});
				clearHandler();
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

			if (status == 'win' || status == 'clear' || status == 'draw') {
				resetEvents();
			}
		}

		function removeEvents () {
			canvas.node.removeEventListener('click', clickHandler);
		}
	}
}


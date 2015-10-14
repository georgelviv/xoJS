'use strict';

angular.module('App')
.controller('PassCtrl', PassCtrl);

function PassCtrl ($rootScope, Game) {
	var pass = this;

	pass.playBtn = false;

	pass.playBtnText = 'Play';
	pass.playBtnHandler = playBtnHandler;
	setTimeout(playBtnHandler, 0);

	$rootScope.$on('endGame', endGameHandler);
	
	function playBtnHandler () {
		var game = new Game();
		game.init();
		game.initPassbyPass();
		pass.playBtn = false;
	}

	function endGameHandler (event, param) {
		if (param == 'draw') {
			pass.playBtnText = 'Draw';
		}
		if (param == 'wino') {
			pass.playBtnText = 'O wins';
		}
		if (param == 'winx') {
			pass.playBtnText = 'X wins';
		}
		pass.playBtn = true;
		$rootScope.$apply();
	}
}



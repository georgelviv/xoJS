'use strict';

angular.module('App')
.controller('OnlineCtrl', OnlineCtrl);

function OnlineCtrl ($rootScope, Game) {
	var online = this;
	var socket, player, game;

	online.playBtn = true;
	online.playBtnDisabled = true;
	online.playBtnHandler = playBtnHandler;
	online.playBtnText = 'Wait for player';
	setTimeout(playInit, 0);

	$rootScope.$on('endGame', endGameHandler);
	$rootScope.$on('move', moveHandler);

	function clearSocketsListeners () {
		socket.removeAllListeners('events');
	}

	function socketEvents () {
		socket.on('events', function(data) {
			if (data.typeEvent == 'connected') {
				handleConnected(data.value);
			}
			if (data.typeEvent == 'start') {
				handleStart(data.value);
			}
			if (data.typeEvent == 'moved') {
				handleMoved(data.value);
			}
			if (data.typeEvent == 'move') {
				handleMove(data.value);
			}
			if (data.typeEvent == 'disconnect') {
				handleDisconnect();
			}
		});
	}

	function handleDisconnect () {
		$rootScope.$emit('online-disconnect');
		online.msg = 'You are: ' + player + ', Opponent disconnected';
		online.playBtn = true;
		$rootScope.$apply();
	}

	function handleMoved (value) {
		$rootScope.$emit('online-moved', value);
		online.msg = 'You are: ' + player + ', Your turn';
		$rootScope.$apply();
	}

	function handleConnected (value) {
		player = value;
		online.msg = 'You are: ' + player;
		$rootScope.$apply();
	}

	function handleMove (value) {
		if (value == 'move') {
			online.msg = 'You are: ' + player + ', Your turn';
			$rootScope.$emit('online-move');
		} else {
			online.msg = 'You are: ' + player + ', Opponent turn';
		}		
	}

	function handleStart (value) {
		handleMove(value);
		
		online.playBtn = false;
		$rootScope.$apply();
	}

	function moveHandler (event, param) {
		socket.emit('move', {
			player: player,
			data: param
		});
		online.msg = 'You are: ' + player + ', Opponent turn';
		$rootScope.$apply();
	}

	function playInit () {
		game = new Game();
		game.init();
		game.initOnline();
		socket = io();
		socketEvents();
	}
	
	function playBtnHandler () {
		game = new Game();
		game.init();
		game.initOnline();
		online.playBtnDisabled = true;
		online.msg = 'You are: ' + player;
		online.playBtnText = 'Wait for player';
		socket.emit('restart');
		socketEvents();
	}

	function endGameHandler (event, param) {
		if (param == 'draw') {
			online.playBtnText = 'Draw';
		}
		if (param == 'wino') {
			online.playBtnText = 'O wins';
		}
		if (param == 'winx') {
			online.playBtnText = 'X wins';
		}

		online.msg = 'You are: ' + player + ', Play Again?';
		online.playBtn = true;
		online.playBtnDisabled = false;

		socket.emit('end');
		clearSocketsListeners();
		$rootScope.$apply();
	}
}



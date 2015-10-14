'use strict';

angular.module('App')
.provider('Sound', SoundProvider);

function SoundProvider () {
	var defaults = {
		play: false
	};

	var api = {
		playTurn: function () {},
		playWin: function () {}
	};

	return {
		$get: soundGet,
		setDefaults: setDefaults
	}



	function soundGet () {
		if (defaults.play) {
			api.playTurn = playTurn();
			api.playWin = playWin();
		}
		return api;
	}

	function playTurn () {
		var audio = new Audio('vendor/turn.wav');
		return function () {
			audio.play();
		}	
	}

	function playWin () {
		var audio = new Audio('vendor/win.wav');
		return function () {
			audio.play();
		}	
	}

	function setDefaults (key, value) {
		if (angular.isObject(key)) {
			defaults = key;
		}
		if (key) {
			defaults[key] = value;
		}
	}
}
'use strict';

angular.module('App')
.provider('Game', GameProvider);

function GameProvider () {
	var defaults = {
		selector: '.game-wrapper',
		grid: 3,
		strokeWidth: 1,
		animDuration: 300,
		play: false
	};

	var setDefaults = setDefaults;
	var Game = Game;

	return {
		$get: providerGet,
		setDefaults: setDefaults
	}

	function providerGet ($injector) {
		Game.prototype.init = init;
		Game.prototype.calculateProperties = $injector.get('calculateProperties');
		Game.prototype.buildGridLines = $injector.get('buildGridLines');
		Game.prototype.blockBuild = $injector.get('blockBuild');
		Game.prototype.checkForWin = $injector.get('checkForWin');
		Game.prototype.initPassbyPass = $injector.get('initPassbyPass');
		Game.prototype.initOnline = $injector.get('initOnline');
		Game.prototype.drawWin = $injector.get('drawWin');
		Game.prototype.reset = $injector.get('reset');
		Game.prototype.sound = $injector.get('Sound');

		return Game;
	}

	function setDefaults (key, value) {
		if (angular.isObject(key)) {
			defaults = key;
		}
		if (key) {
			defaults[key] = value;
		}
	}

	function Game () {
		var gameInstance;

		Game = function () {
			return gameInstance;
		}

		Game.prototype = this;
		gameInstance = new Game();
		gameInstance.constructor = Game;

		// Private
		var selector = defaults.selector;
		var svgCanvas = new Snap(selector);
		var dataObj = {
			grid: defaults.grid, 
			strokeWidth: defaults.strokeWidth,
			animDuration: defaults.animDuration
		};

		// Public
		this.getSvgCanvas = getSvgCanvas;
		this.setData = setData;
		this.getData = getData;


		function getSvgCanvas () {
			return svgCanvas;
		}
		function setData (key, value) {
			if (key && value !== undefined) {
				dataObj[key] = value;
			}
		}
		function getData(key) {
			if (key && dataObj[key]) {
				return dataObj[key];
			}
		}
	}

	function init () {
		Game.prototype.reset();
		Game.prototype.calculateProperties();
		Game.prototype.buildGridLines();
		Game.prototype.blockBuild();
	}

}






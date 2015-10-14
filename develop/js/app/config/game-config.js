'use strict';

angular.module('App')
.config(function (GameProvider) {
	GameProvider.setDefaults('play', true);
	GameProvider.setDefaults('grid', 3);
	GameProvider.setDefaults('animDuration', 150);
});
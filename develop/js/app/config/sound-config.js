'use strict';

angular.module('App')
.config(function (SoundProvider) {
	SoundProvider.setDefaults('play', true);
});
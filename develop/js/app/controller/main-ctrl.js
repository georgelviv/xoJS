'use strict';

angular.module('App')
.controller('MainCtrl', MainCtrl);

function MainCtrl ($rootScope, Game, url) {
	var main = this;

	main.passUrl = url.pass;
	main.onlineUrl = url.online;
}



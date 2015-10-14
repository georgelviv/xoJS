'use strict';

angular.module('App')
.config(mainRouter);

function mainRouter ($routeProvider) {
	$routeProvider.
		when('/', {
			templateUrl: 'main.tpl',
			controller: 'MainCtrl as main'
		}).
		when('/pass', {
			templateUrl: 'pass.tpl',
			controller: 'PassCtrl as pass'
		}).
		when('/online', {
			templateUrl: 'online.tpl',
			controller: 'OnlineCtrl as online'
		}).
		otherwise({
			redirectTo: '/'
		});
}
angular.module("App").run(["$templateCache", function($templateCache) {$templateCache.put("main.tpl","<div class=\"content__game-wrapper\">\r\n	<svg class=\"game-wrapper\"></svg>\r\n	<a class=\"content__play-btn content__play-btn--online\"\r\n		ng-href=\"{{main.onlineUrl}}\">\r\n		Play Online\r\n	</a>\r\n	<a class=\"content__play-btn content__play-btn--home\" \r\n		ng-href=\"{{main.passUrl}}\">\r\n		Play Home\r\n	</a>\r\n</div>");
$templateCache.put("online.tpl","<div class=\"content__game-wrapper\">\r\n	<svg class=\"game-wrapper\"></svg>\r\n	<button class=\"content__play-btn content__play-btn--pass\" ng-show=\"online.playBtn\" \r\n		ng-click=\"online.playBtnHandler()\" ng-disabled=\"online.playBtnDisabled\">\r\n		{{online.playBtnText}}\r\n	</button>\r\n</div>\r\n<p class=\"content__messages\" ng-bind=\"online.msg\"></p>");
$templateCache.put("pass.tpl","<div class=\"content__game-wrapper\">\r\n	<svg class=\"game-wrapper\"></svg>\r\n	<button class=\"content__play-btn content__play-btn--pass\" ng-show=\"pass.playBtn\" \r\n		ng-click=\"pass.playBtnHandler()\">\r\n		{{pass.playBtnText}}\r\n	</button>\r\n</div>");}]);
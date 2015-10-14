<div class="content__game-wrapper">
	<svg class="game-wrapper"></svg>
	<button class="content__play-btn content__play-btn--pass" ng-show="online.playBtn" 
		ng-click="online.playBtnHandler()" ng-disabled="online.playBtnDisabled">
		{{online.playBtnText}}
	</button>
</div>
<p class="content__messages" ng-bind="online.msg"></p>
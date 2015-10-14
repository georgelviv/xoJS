'use strict';

angular.module('App')
.factory('Block', Block);

function Block ($rootScope) {
	var Block = Block;

	Block.prototype.calculateOffset = calculateOffset;
	Block.prototype.drawX = drawX;
	Block.prototype.drawO = drawO;
	Block.prototype.clearDraw = clearDraw;

	return Block;

	function Block (data, canvas) {
		var self = this;
		var blockParams = {
			type: '',
			animDuration: data.animDuration
		};

		init.call(this);

		this.getBlockParams = getBlockParams;
		this.getCanvas = getCanvas;
		this.setBlockParam = setBlockParam;

		function init () {
			var offsetObj = this.calculateOffset(data);
			calculateBlockValues.call(this, offsetObj);

			var blockPaper = canvas.rect(this.pixelValue.x, this.pixelValue.y, this.pixelValue.width, this.pixelValue.height);
			var className = 'game-wrapper__block';

			blockPaper.attr({
				class: className,
				'data-block-pos-x': self.posX,
				'data-block-pos-y': self.posY
			});

			blockParams.circleOffset = Math.floor(this.pixelValue.width / 15);
			blockParams.lineOffsetX = Math.floor(this.pixelValue.width / 10);
			blockParams.lineOffsetY = Math.floor(this.pixelValue.height / 10);
		}

		function calculateBlockValues (offsetObj) {
			var pixelValue = {
				width: data.xStep - offsetObj.widthOffset,
				height: data.yStep  - offsetObj.heightOffset,
				x: (data.posX - 1) * data.xStep + offsetObj.xOffset,
				y: (data.posY - 1) * data.yStep + offsetObj.yOffset
			};

			Object.defineProperties(this, {
				posX: {
					writable: false,
					value: data.posX
				},
				posY: {
					writable: false,
					value: data.posY
				},
				pixelValue: {
					writable: false,
					value: pixelValue
				}
			});
		}

		function getBlockParams (key) {
			if (key) {
				return blockParams[key];
			} else {
				var obj = {};
				for (var prop in blockParams) {
					if (typeof blockParams[prop] !== 'object') {
						obj[prop] = blockParams[prop];
					}
				}
				return obj;
			}
		}

		function setBlockParam (key, value) {
			if (key && value !== undefined) {
				blockParams[key] = value;
			}		
		}
	 
		function getCanvas () {
			return canvas;
		}
	}



	function clearDraw () {
		var draw = this.getBlockParams('draw');
		if (!draw) {
			return;
		}
		if (angular.isArray(draw)) {
			draw.forEach(function (value) {
				value.node.parentElement.removeChild(value.node);
			});
		} else {
			draw.node.parentElement.removeChild(draw.node);
		}
		this.setBlockParam('draw', '');
		this.setBlockParam('type', '');
	}

	function calculateOffset (data) {
		var offsetObj = {
			xOffset: data.strokeWidth,
			yOffset: data.strokeWidth,
			widthOffset: data.strokeWidth * 2,
			heightOffset: data.strokeWidth * 2
		};

		if (data.posX == 1) {
			offsetObj.xOffset = 0;
			offsetObj.widthOffset /= 2;
		}

		if (data.posY == 1) {
			offsetObj.yOffset = 0;
			offsetObj.heightOffset /= 2;
		}
		if (data.posX == data.grid) {
			offsetObj.widthOffset /= 2;
		}

		if (data.posY == data.grid) {
			offsetObj.heightOffset /= 2;
		}
		return offsetObj;
	}

	function drawO () {
		if (this.getBlockParams('draw')) {
			return false;
		}

		var canvas = this.getCanvas();
		var offset = this.getBlockParams('circleOffset');
		var animDuration = this.getBlockParams('animDuration');

		var circleObj = {
			x: this.pixelValue.x + this.pixelValue.width / 2,
			y: this.pixelValue.y + this.pixelValue.height / 2,
			r: this.pixelValue.width / 2 - offset * 2,
			attr: {
				class: 'game-wrapper__o',
				strokeDashoffset: '1000'
			}
		};

		var animationCb = (function () {
			this.setBlockParam('draw', circleObj.draw);
			this.setBlockParam('type', 'o');
			$rootScope.$emit('drawEnd');
		}).bind(this);

		drawCircle();

		function drawCircle () {
			var paperCircle = canvas.circle(circleObj.x, circleObj.y, circleObj.r);
			circleObj.draw = paperCircle;
			paperCircle.attr(circleObj.attr);
			paperCircle.animate({
				strokeDashoffset: '760'
			}, animDuration * 2, null, animationCb);			
		}

	} 


	function drawX () {
		if (this.getBlockParams('draw')) {
			return false;
		}

		var canvas = this.getCanvas();
		var offsetX = this.getBlockParams('lineOffsetX');
		var offsetY = this.getBlockParams('lineOffsetY');
		var animDuration = this.getBlockParams('animDuration');

		var lineObj = {
			x1: this.pixelValue.x + offsetX,
			x2: this.pixelValue.x + this.pixelValue.width - offsetX,
			y1: this.pixelValue.y + offsetY,
			y2: this.pixelValue.y + this.pixelValue.height - offsetY,
			attr: {
				class: 'game-wrapper__x'
			},
			draw: []
		};

		var animationCb = (function () {
			this.setBlockParam('draw', lineObj.draw);
			this.setBlockParam('type', 'x');
			$rootScope.$emit('drawEnd');
		}).bind(this);

		drawLine(true);

		function drawLine (isFirst) {
			var lineData = {
				x1: lineObj.x1,
				x2: lineObj.x2,
				y1: isFirst ? lineObj.y1 : lineObj.y2,
				y2: isFirst ? lineObj.y2 : lineObj.y1
			};

			var lineOne = canvas.line(lineData.x1, lineData.y1, lineData.x1, lineData.y1);
			lineObj.draw.push(lineOne);
			lineOne.attr(lineObj.attr);
			lineOne.animate({
				x2: lineData.x2,
				y2: lineData.y2
			}, animDuration, null, cb);	

			function cb () {
				isFirst ? drawLine(false) : animationCb();
			}			
		}
	}
}
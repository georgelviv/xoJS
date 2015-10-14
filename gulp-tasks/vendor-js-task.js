var gulp = require('gulp');
var concat = require('gulp-concat');
var livereload = require('gulp-livereload');

var config = require('./configuration.json');
var vendorArr = [
	'socket.io-client/socket.io.js',
	'angular/angular.js',
	'angular-route/angular-route.js',
	'angular-animate/angular-animate.js',
	'snap.svg/dist/snap.svg.js'
];
var filesArr = buildFilesArr();

module.exports = vendorJsTask;
module.exports.srcFiles = filesArr;

function vendorJsTask() {
	return gulp.src(filesArr)
		.pipe(concat('vendor.js'))
		.on('error', function (err) {
			console.log('Error in uglify');
			console.log(err && err.message || err);
		})
		.pipe(gulp.dest(config.buildDir))
		.pipe(livereload());
}

function buildFilesArr () {
	var filesArr = []; 

	vendorArr.forEach(function (value) {
		filesArr.push(config.frontDir + '/js/vendor/' + value);
	});

	return filesArr;
}
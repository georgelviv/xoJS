var gulp = require('gulp');
var concat = require('gulp-concat');
var ngAnnotate = require('gulp-ng-annotate');
var uglify = require('gulp-uglify');
var livereload = require('gulp-livereload');

var config = require('./configuration.json');

var files = config.frontDir + '/js/app/**/*.js';

module.exports = jsTask;
module.exports.srcFiles = files;

function jsTask() {
	return gulp.src(files)
		.pipe(concat('script.js'))
		.pipe(ngAnnotate())	
		.pipe(uglify())
		.on('error', function (err) {
			console.log('Error in uglify');
			console.log(err && err.message || err);
		})
		.pipe(gulp.dest(config.buildDir))
		.pipe(livereload());
}

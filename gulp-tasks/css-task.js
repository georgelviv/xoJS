var gulp = require('gulp');
var stylus = require('gulp-stylus');
var livereload = require('gulp-livereload');

var config = require('./configuration.json');
var srcFile = config.frontDir + '/styl/main.styl';

module.exports = cssTask;
module.exports.srcFiles = config.frontDir + '/styl/**/*.styl';


function cssTask() {
	return gulp.src(srcFile)
		.pipe(stylus())
		.pipe(gulp.dest(config.buildDir))
		.pipe(livereload());
}
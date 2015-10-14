var gulp = require('gulp');
var livereload = require('gulp-livereload');

var config = require('./configuration.json');
var srcFiles = config.frontDir + '/' + config.startPoint;

module.exports = copyTask;
module.exports.srcFiles = srcFiles;

function copyTask() {
	return gulp.src(srcFiles)
		.pipe(gulp.dest(config.buildDir))
		.pipe(livereload());
}
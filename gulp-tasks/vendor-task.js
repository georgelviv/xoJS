var gulp = require('gulp');

var config = require('./configuration.json');
var srcFiles = config.frontDir + '/vendor/**/*.*';

module.exports = vendorTask;

function vendorTask() {
	return gulp.src(srcFiles)
		.pipe(gulp.dest(config.buildDir + '/vendor'));
}
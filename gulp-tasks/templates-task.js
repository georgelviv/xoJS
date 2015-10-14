var gulp = require('gulp');
var templateCache = require('gulp-angular-templatecache');
var livereload = require('gulp-livereload');

var config = require('./configuration.json');
var files = config.frontDir + '/tpl/**/*.tpl'

module.exports = templatesTask;
module.exports.srcFiles = files;

function templatesTask () {
	return gulp.src(files)
		.pipe(templateCache({
			module: 'App',
			filename: 'templates-run.js'
		}))
		.pipe(gulp.dest(config.frontDir + '/js/app/'))
		.pipe(livereload());
}
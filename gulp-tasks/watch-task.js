var gulp = require('gulp');
var livereload = require('gulp-livereload');

var config = require('./configuration.json');

module.exports = watchTask;

function watchTask() {
	livereload.listen();
	gulp.watch(require('./copy-task').srcFiles, ['copy-task']);
	gulp.watch(require('./js-task').srcFiles, ['js-task']);
	gulp.watch(require('./css-task').srcFiles, ['css-task']);
	gulp.watch(require('./templates-task').srcFiles, ['templates-task']);
}


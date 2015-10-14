var gulp = require('gulp');
var runSequence = require('run-sequence');

gulp.task('default', ['clean-and-build', 'watch-task']);


gulp.task('clean-and-build', function () {
	runSequence('clean-task', 'build');
});

gulp.task('build', function () {
	runSequence('templates-task', ['copy-task', 'vendor-task', 'vendor-js-task', 'js-task', 'css-task']);
});

gulp.task('clean-task', require('./gulp-tasks/clean-task'));
gulp.task('copy-task', require('./gulp-tasks/copy-task'));
gulp.task('vendor-task', require('./gulp-tasks/vendor-task'));
gulp.task('templates-task', require('./gulp-tasks/templates-task'));
gulp.task('js-task', require('./gulp-tasks/js-task'));
gulp.task('vendor-js-task', require('./gulp-tasks/vendor-js-task'));
gulp.task('css-task', require('./gulp-tasks/css-task'));
gulp.task('watch-task', require('./gulp-tasks/watch-task'));
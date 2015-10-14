var gulp = require('gulp');
var clean = require('gulp-clean');
 
var config = require('./configuration.json'); 
module.exports = cleanTask;

function cleanTask () {
    return gulp.src(config.buildDir , {read: false})
        .pipe(clean());
}
var gulp = require('gulp');
var plugins = require('gulp-load-plugins')({
    pattern: '*',
    lazy: true,
    debug: true
});
var config = require('./config/struct');

function getTask(location, task) {
    return require('./gulp/'+ location + task)(gulp, plugins, config);
}

gulp.task('dev', getTask('dev/', 'dev'));

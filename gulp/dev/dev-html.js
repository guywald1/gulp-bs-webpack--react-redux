module.exports = function(gulp, plugins, config) {
    return function() {
        return gulp.src(config.src.root + '/**/*.html')
            .pipe(plugins.plumber())
            .pipe(gulp.dest(config.build.root));
    };
};

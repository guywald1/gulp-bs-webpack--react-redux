module.exports = function(gulp, plugins, config) {
    return function() {
        return gulp.src(config.src.sass + '/**/*.sass')
            .pipe(plugins.sass().on('error', plugins.sass.logError))
            .pipe(plugins.autoprefixer())
            .pipe(plugins.plumber())
            .pipe(gulp.dest(config.build.css));
    };
};

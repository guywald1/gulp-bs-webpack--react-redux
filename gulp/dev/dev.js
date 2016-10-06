module.exports = function (gulp, plugins, config) {

	function getTask(location, task) {
		return require(location + task)(gulp, plugins, config);
	}


	var webpack = require('webpack');
	var webpackSettings = require('../../webpack.config');
	var bundler = webpack(webpackSettings);
	var browserSync = require('browser-sync');
	var webpackDevMiddleware = require('webpack-dev-middleware');
	var webpackHotMiddleware = require('webpack-hot-middleware');

	gulp.watch(config.src.root + '/**/*.html', [getTask('./', 'dev-html')], browserSync.reload);
	gulp.watch(config.src.sass + '/**/*.sass', [getTask('./', 'dev-sass')], browserSync.reload);

	return function () {

		bundler.plugin('done', function (stats) {
			if (stats.hasErrors() || stats.hasWarnings()) {
				return browserSync.sockets.emit('fullscreen:message', {
					title: "Webpack Error:",
					body: stripAnsi(stats.toString()),
					timeout: 100000
				});
			}
			browserSync.reload();
		});
		return plugins.browserSync({
			server: {
				baseDir: [config.build.root],
				middleware: [
					webpackDevMiddleware(bundler, {
						publicPath: webpackSettings.output.publicPath,
						stats: {
							colors: true
						}
					}),
					webpackHotMiddleware(bundler)
				]
			},
			files: [
				config.build.css + '**/*.css',
				config.build.root + '**/*.html'
			]
		});
	};
};

var webpack = require('webpack');
var config = require('./config/struct');
var process = require('process');
var path = require('path');
var environments = require('gulp-environments');
var webpackSettings = {
  entry: {
    app: [
      'webpack/hot/dev-server',
      'webpack-hot-middleware/client',
       path.join(process.cwd(), config.src.js, 'app.jsx')
    ],
  },
  output: {
    path: path.join(process.cwd(), config.build.js),
    publicPath: '/js/',
    filename: 'bundle.js'
  },
  plugins: environments.production() ? [
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin()
  ] : [
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.NoErrorsPlugin(),
    new webpack.HotModuleReplacementPlugin(),
  ],
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  debug: environments.development(),
  module: {
    loaders: [{
      test: /\.jsx?/,
      exclude: /(node_modules|bower_components)/,
      include: [path.join(process.cwd(), config.src.js)],
      loaders: ['babel?presets[]=react,presets[]=es2015', 'webpack-module-hot-accept'],
    }],
  }
};

module.exports = webpackSettings;

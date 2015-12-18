var webpack = require('webpack');
var path = require('path');
var __dirname; // So linter doesnt complain
var nodeModulesPath = path.resolve(__dirname, 'node_modules');
var jsBuildPath = path.resolve(__dirname, 'src');
var jsPath = path.resolve(__dirname, 'src', 'js');
var mainPath = path.resolve(jsPath, 'app.js');

var config = {
  // devtool option turns on sourcemaps
  devtool: 'eval-source-map',

  entry: [
    'webpack-dev-server/client?http://localhost:8080',
    'webpack/hot/only-dev-server',
    mainPath,
  ],

  output: {
    // Note we don't actually use this path in dev mode bc webpack-dev-server
    // serves the bundle from memory, but it's required.
    path: jsBuildPath,
    filename: 'bundle.js',

    // Everything related to webpack should go through a build path,
    // localhost:3000/build. That makes proxying easier to handle
    // For now just use /
    publicPath: 'http://localhost:8080/'
  },

  module: {
    loaders: [
      // This enables the react-hot loader
      {
        test: /\.js$/,
        loader: 'react-hot',
        include: [jsPath],
      },
      // babel transpiles our code, handles JSX and ES6/7 out of the box
      {
        test: /\.js$/,
        loader: 'babel',
        exclude: [nodeModulesPath],
        query: {
          presets: ['react', 'es2015'],
        }
      },
      // some npm modules include json data
      {
        test: /\.json$/,
        loader: 'json',
      },
    ],
  },

  // Set up the hot replacement plugin
  plugins: [new webpack.HotModuleReplacementPlugin()]
};

module.exports = config;


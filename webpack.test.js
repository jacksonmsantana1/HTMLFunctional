var path = require('path');
var webpack = require('webpack');

module.exports = {
  context: path.resolve('src'),
  entry: {
    app: './index.spec.js',
  },
  output: {
    path: path.resolve('tests/'),
    filename: 'test.js',
  },
  config: {
    devtool: 'eval-source-map',
  },
  module: {
    loaders: [
      {
	test: [/\.es6$/, /\.js$/],
	exclude: /node_modules/,
	loader: 'babel-loader',
      }, 
    ],
    noParse: [
      /node_modules\/sinon\//,
    ],
  },
  plugins: [],
  resolve: {
    alias: {
      sinon: 'sinon/pkg/sinon'
    },
    extensions: ['', '.js', '.es6'],
  },
};

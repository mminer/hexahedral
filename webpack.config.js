'use strict';

let cssnext = require('postcss-cssnext');
let path = require('path');

module.exports = {
  devtool: 'cheap-module-source-map',
  entry: [
    'babel-polyfill',
    path.resolve(__dirname, 'src/entry.js'),
  ],
  module: {
    loaders: [
      {
        exclude: /node_modules/,
        loader: 'babel',
        query: {
          cacheDirectory: true, // Use OS temp directory
          presets: ['es2015', 'stage-0'],
        },
        test: /\.js$/,
      },
      {
        loader: 'style-loader!css-loader!postcss-loader',
        test: /\.css$/,
      },
    ],
  },
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'build'),
  },
  postcss: function () {
    return [cssnext];
  },
  resolve: {
    modulesDirectories: ['node_modules'],
  },
};

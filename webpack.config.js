'use strict';

let cssnext = require('postcss-cssnext');

module.exports = {
  devtool: 'cheap-module-source-map',
  entry: './src/entry.js',
  module: {
    loaders: [
      {
        exclude: /node_modules/,
        loader: 'babel',
        query: {
          cacheDirectory: true, // Use OS temp directory
          presets: ['es2015'],
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
    path: 'build',
  },
  postcss: function () {
    return [cssnext];
  },
  resolve: {
    modulesDirectories: ['node_modules', 'src'],
  },
};

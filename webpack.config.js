const cssnext = require('postcss-cssnext');
const path = require('path');
const webpack = require('webpack');

module.exports = {
  entry: './src/entry.js',
  module: {
    loaders: [
      {
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
          cacheDirectory: true, // Use OS temp directory
        },
        test: /\.js$/,
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: { importLoaders: 1 },
          },
          {
            loader: 'postcss-loader',
            options: { plugins: [cssnext] },
          },
        ],
      },
    ],
  },
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'build'),
  },
};

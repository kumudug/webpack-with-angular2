var webpackMerge = require('webpack-merge');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var commonConfig = require('./webpack.common.js');
var helpers = require('./helpers');

module.exports = webpackMerge(commonConfig, {
  devtool: 'cheap-module-eval-source-map',

  output: {
    path: helpers.root('dist'),
    publicPath: 'http://localhost:8080/',
    filename: '[name].js',
    chunkFilename: '[id].chunk.js'
  },

  plugins: [
    new ExtractTextPlugin('[name].css')
  ],

  devServer: {
    historyApiFallback: true,
    stats: 'minimal'
  }
});

//The development build relies on the Webpack development server which we configure near the bottom of the file. Although we tell Webpack to put output bundles in the dist folder, the dev server keeps all bundles in memory; it doesn't write them to disk. So we won't find any files in the dist folder

//The HtmlWebpackPlugin (added in webpack.common.js) use the publicPath and the filename settings to generate appropriate <script> and <link> tags into the index.html

//Our CSS are buried inside our Javascript bundles by default. The ExtractTextPlugin extracts them into external .css files that the HtmlWebpackPlugin inscribes as <link> tags into the index.html
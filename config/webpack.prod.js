var webpack = require('webpack');
var webpackMerge = require('webpack-merge');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var commonConfig = require('./webpack.common.js');
var helpers = require('./helpers');

const ENV = process.env.NODE_ENV = process.env.ENV = 'production';

module.exports = webpackMerge(commonConfig, {
  devtool: 'source-map',

  output: {
    path: helpers.root('dist'),
    publicPath: '/',
    filename: '[name].[hash].js',
    chunkFilename: '[id].[hash].chunk.js'
  },

  htmlLoader: {
    minimize: false // workaround for ng2
  },

  plugins: [
    new webpack.NoErrorsPlugin(),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin({ // https://github.com/angular/angular/issues/10618
      mangle: {
        keep_fnames: true
      }
    }),
    new ExtractTextPlugin('[name].[hash].css'),
    new webpack.DefinePlugin({
      'process.env': {
        'ENV': JSON.stringify(ENV)
      }
    })
  ]
});

//We don't use a development server. We're expected to deploy the application and its dependencies to a real production server. This time the output bundle files are physically placed in the dist folder.
//NoErrorsPlugin - stops the build if there is any error.
//DedupePlugin - detects identical (and nearly identical) files and removes them from the output.
//UglifyJsPlugin - minifies the bundles.
//ExtractTextPlugin - extracts embedded css as external files, adding cache-busting hash to the filename.
//DefinePlugin - use to define environment variables that we can reference within our application.
/*Thanks to the DefinePlugin and the ENV variable defined at top, we can enable Angular 2 production mode like this:
if (process.env.ENV === 'production') {
  enableProdMode();
}*/

'use strict';

let webpack = require('webpack');
let path    = require('path');
let html    = require('html-webpack-plugin');
let css     = require('extract-text-webpack-plugin');
let live    = require('webpack-livereload-plugin');
let hot     = require('webpack/lib/HotModuleReplacementPlugin');

module.exports = {
  entry: {
    index: ['./src/index.js', './src/style/index.css'],
    vendor: ['angular', 'angular-cookies', 'angular-animate', 'angular-ui-bootstrap']
  },
  output: {
    path: path.resolve(__dirname, 'dict'),
    filename: 'js/index.js'
  },
  resolve: {
    extensions: ['.js', '.json', '*']
  },
  module: {
    rules: [{
      test: /\.js?$/,
      exclude: /(node_modules)/,
      loader: 'babel-loader',
      options: {
        presets: ['es2015', 'stage-2']
      }
    }, {
      test: /\.css?$/,
      loader: css.extract({use: 'css-loader'})
    }, {
      test: /\.(jpe?g|png|gif|svg)$/i,
      loaders: [
        'file-loader?hash=sha512&digest=hex&name=[hash].[ext]&outputPath=images/',
        'image-webpack-loader?bypassOnDebug&optimizationLevel=7&interlaced=false'
      ]
    },{
      test: /\.html$/,
      use: [{
        loader: 'html-loader',
        options: {
          minimize: true
        }
      }]
    }]
  },
  devServer: {
    historyApiFallback: true,
    port: 9000
  },
  plugins: [
    new css('css/style.css'),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      filename: 'js/vendor.js'
    }),
    new html({
      filename: 'index.html',
      template: 'src/index.html'
    }),
    new live({appendScriptTag: true}),
    new hot()
  ]
};

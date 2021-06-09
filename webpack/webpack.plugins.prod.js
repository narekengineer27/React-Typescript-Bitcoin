const path = require('path');
const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const basePlugins = require('./webpack.plugins.base.js');
const WebpackAutoInject = require('webpack-auto-inject-version');

module.exports = [
  ...basePlugins,
  new CleanWebpackPlugin([path.join(__dirname, '..', '/build')]),
  new CopyWebpackPlugin([{
    from: '../public',
    to: 'public',
  }]),
  new WebpackAutoInject({
    PACKAGE_JSON_PATH: './env.json',
    components: {
      AutoIncreaseVersion: true,
      InjectAsComment: false,
    },
  }),
  // To replace occurrences of `process.env.NODE_ENV` in JS files to `production`
  new webpack.DefinePlugin({
    'process.env.NODE_ENV': JSON.stringify('production'),
  }),
  new webpack.LoaderOptionsPlugin({
    minimize: true,
    debug: false,
  }),
  new webpack.optimize.UglifyJsPlugin({
    beautify: false,
    mangle: {
      screw_ie8: true,
      keep_fnames: true,
    },
    compress: {
      warnings: false,
      screw_ie8: true,
    },
    comments: false,
  }),
  // @see https://medium.com/connect-the-dots/caching-assets-long-term-with-webpack-5ad24a4c39bd#.rmvzr38gz
  /*
   "Webpack, by default, assigns modules integer ids, based on order.
   So when modules are changed, all ids could change, invalidating the cache."
   */
  new webpack.NamedModulesPlugin(),
];

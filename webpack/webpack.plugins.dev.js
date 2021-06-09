const webpack = require('webpack');
const DashboardPlugin = require('webpack-dashboard/plugin');
const basePlugins = require('./webpack.plugins.base.js');

module.exports = [
  ...basePlugins,
  new DashboardPlugin(),
  new webpack.HotModuleReplacementPlugin(),
  new webpack.NamedModulesPlugin(),
];

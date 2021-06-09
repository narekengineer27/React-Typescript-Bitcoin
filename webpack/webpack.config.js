const config = require('./webpack.config.base');

const isProduction = process.env.NODE_ENV === 'production';
const devtool = isProduction ? false : 'cheap-module-source-map';
const plugins = isProduction
  ? require('./webpack.plugins.prod')
  : require('./webpack.plugins.dev');

Object.assign(config, {
  devtool,
  plugins,
  // Some libraries import Node modules but don't use them in the browser.
  // Tell Webpack to provide empty mocks for them so importing them works.
  node: {
    fs: 'empty',
    net: 'empty',
    tls: 'empty',
  },
  // Turn off performance hints during development because we don't do any
  // splitting or minification in interest of speed. These warnings become
  // cumbersome.
  performance: {
    hints: false,
  },
});

module.exports = config;

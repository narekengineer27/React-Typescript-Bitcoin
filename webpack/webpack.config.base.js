const path = require('path');
const webpackModule = require('./webpack.module');
var TsConfigPathsPlugin = require('awesome-typescript-loader').TsConfigPathsPlugin;

const isProduction = process.env.NODE_ENV === 'production';
const filename = isProduction ? '[name].[chunkhash].js' : '[name].[hash].js';

console.log(`Compiling to ${path.join(__dirname, '..', 'build')}...`); // eslint-disable-line no-console
console.log("port", process.env.PORT, __dirname, path.resolve(__dirname, '/..','/src/components'));
module.exports = {
  context: path.join(__dirname, '..', 'src'),
  entry: [
    'react-hot-loader/patch',
    './index.tsx'
  ],
  resolve: {
    plugins: [
      new TsConfigPathsPlugin()
    ],
    extensions: ['.ts', '.tsx', '.js', '.json', '.jsx'],
  },
  output: {
    filename,
    path: path.join(__dirname, '..', '/build'),
    publicPath: '/',
  },
  module: webpackModule,
  devServer: {
    contentBase: path.join(__dirname, '..', '/'),
    clientLogLevel: 'info',
    port: typeof process.env.PORT === 'undefined' ? 8000: process.env.PORT,
    hot: true,
    hotOnly: true,
    inline: true,
    host: '0.0.0.0',
    historyApiFallback: true,
    stats: {
      colors: true,
    },
    disableHostCheck: true,
  },
};

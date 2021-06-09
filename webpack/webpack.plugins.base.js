const webpack = require('webpack');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const InlineManifestWebpackPlugin = require('inline-manifest-webpack-plugin');

const isProduction = process.env.NODE_ENV === 'production';
const filename = isProduction ? 'styles.[chunkhash].css' : 'styles.[hash].css';

module.exports = [
  new ExtractTextPlugin(filename),
  // @see https://github.com/webpack/webpack/issues/1315#issuecomment-264673939
  // To ensure the hash value for vendors is not changed after App.tsx is changed.
  new webpack.optimize.CommonsChunkPlugin({
    names: ['vendor'],
    minChunks: ({ resource }) => /node_modules/.test(resource),
  }),
  new webpack.optimize.CommonsChunkPlugin({
    name: 'manifest',
  }),
  // Compile index.ejs into index.html, adding styles and scripts with chunkhash value
  new HtmlWebpackPlugin({
    template: 'index.ejs',
  }),
  /*
   To inline the manifest.json file into index.html,
   to save an extra HTTP request for manifest.json
   */
  new InlineManifestWebpackPlugin({
    name: 'webpackManifest',
  })
];

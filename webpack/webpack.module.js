const ExtractTextPlugin = require('extract-text-webpack-plugin');
const path = require('path');

module.exports = {
  rules: [
    {
      test: /\.jsx?$/, // Check for all js files
      exclude: /node_modules/,
      use: [
        {
          loader: 'babel-loader',
          options: { presets: ['es2015', 'react', 'stage-0'] },
        },
      ],
    },
    {
      test: /\.(ts|tsx)$/,
      include: path.join(__dirname, '..', '/src'),
      loader: ['react-hot-loader/webpack', 'awesome-typescript-loader'],
    },
    {
      test: /\.less$/,
      use: ["style-loader", "css-loader", "less-loader"],
    },
    {
      test: /\.css$/,
      use: ExtractTextPlugin.extract({
        fallback: "style-loader",
        use: {
          loader: "css-loader",
          options: {
            importLoaders: 1,
            modules: true,
            allChunks: true,
            localIdentName: '[name]--[local]-[hash:base64:5]',
          },
        },
      }),
    },
    {
      test: /\.json$/,
      use: 'json-loader',
    },
    {
      test: /\.(png|jpg|gif)(.*)$/,
      use: 'file-loader',
    },
    {
      test: /\.svg(\?[a-z0-9#=&.]+)?$/,
      use: 'url-loader?limit=65000&mimetype=image/svg+xml&name=public/fonts/[name].[ext]',
    },
    {
      test: /\.woff(\?[a-z0-9#=&.]+)?$/,
      use: 'url-loader?limit=65000&mimetype=application/font-woff&name=public/fonts/[name].[ext]',
    },
    {
      test: /\.woff2(\?[a-z0-9#=&.]+)?$/,
      use: 'url-loader?limit=65000&mimetype=application/font-woff2&name=public/fonts/[name].[ext]',
    },
    {
      test: /\.[ot]tf(\?[a-z0-9#=&.]+)?$/,
      use: 'url-loader?limit=65000&mimetype=application/octet-stream&name=public/fonts/[name].[ext]',
    },
    {
      test: /\.eot(\?[a-z0-9#=&.]+)?$/,
      use: 'url-loader?limit=65000&mimetype=application/vnd.ms-fontobject&name=public/fonts/[name].[ext]',
    },
  ],
};

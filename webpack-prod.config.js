const webpack = require('webpack');
const path = require('path');
const nodeExternals = require('webpack-node-externals');
const WebpackBar = require('webpackbar');

module.exports = {
  entry: ['./src/index.js'],
  target: 'node',
  node: {
    __dirname: true,
    __filename: true
  },
  externals: [
    // nodeExternals({
    //   whitelist: ['webpack/hot/poll?100']
    // })
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      }
    ]
  },
  mode: 'production',
  resolve: {
    extensions: ['.tsx', '.ts', '.js']
  },
  plugins: [
    //new webpack.HotModuleReplacementPlugin()
    // new WebpackBar({
    //   name: 'Server'
    // })
  ],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'index.js'
  }
};

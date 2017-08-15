const webpack = require('webpack');
const path = require('path');
const merge = require('webpack-merge');

var commonConfig = {
  entry: path.resolve(__dirname + '/src/Clock.vue'),
  output: {
    path: path.resolve(__dirname + '/dist/'),
    filename: 'vue-clock.js'
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        query: {
          presets: ['es2015']
        },
        include: __dirname,
        exclude: /node_modules/
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      },
      {
        test: /\.css$/,
        loader: 'style-loader!less-loader!css-loader'
      }
    ]
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin({
      minimize: true,
      sourceMap: false,
      mangle: true,
      compress: {
        warnings: false
      }
    })
  ],
  externals: {
    moment: 'moment'
  }
};

module.exports = [
  // Config 1: For browser environment
  merge(commonConfig, {
    entry: path.resolve(__dirname + '/src/plugin.js'),
    output: {
      filename: 'vue-clock.min.js',
      libraryTarget: 'window',
      library: 'VueClock'
    }
  }),

  // Config 2: For Node-based development environments
  merge(commonConfig, {
    entry: path.resolve(__dirname + '/src/Clock.vue'),
    output: {
      filename: 'vue-clock.js',
      libraryTarget: 'umd',

      // These options are useful if the user wants to load the module with AMD
      library: 'vue-clock',
      umdNamedDefine: true
    }
  })
];

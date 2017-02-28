const path = require('path');

module.exports = {
  entry: './src/app.jsx',

  output: {
    path: './src/',
    filename: 'bundle.js'
  },

  module: {
    loaders: [
      {
        test: /\.js?$/,
        loader: 'babel-loader',
        query: {
          presets: ['react', 'es2015']
        }
      }
    ]
  }
};

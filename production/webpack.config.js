'use strict'
module.exports = {
  entry: './src/public/api-enrolment/index.js',
  output: {
    path: 'public/api-enrolment',
    filename: 'index.js'
  },
  target: 'web',
  module: {
    loaders: [
      {
        test: /\.js/,
        loader: 'babel-loader',
        exclude: /node_modules/
      }
    ]
  }
}

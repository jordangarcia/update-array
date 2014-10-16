var webpack = require('webpack');

var genFilename = function(isMin) {
  return [
    './dist/update-array',
    (isMin ? '.min' : ''),
    '.js'
  ].join('');
}

var uglifyJsPlugin = new webpack.optimize.UglifyJsPlugin();

module.exports = [
  {
    entry: './index.js',
    output: {
      library: 'arrayUpdater',
      libraryTarget: 'umd',
      filename: genFilename(false),
    },
  },
  {
    entry: './index.js',
    output: {
      library: 'arrayUpdater',
      libraryTarget: 'umd',
      filename: genFilename(true),
    },
    plugins: [uglifyJsPlugin],
  }
];

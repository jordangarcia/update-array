var webpack = require('webpack');
var version = require('./package.json').version;

var genFilename = function(isMin, version) {
  return [
    './dist/update-array-',
    version,
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
      filename: genFilename(false, version),
    },
  },
  {
    entry: './index.js',
    output: {
      library: 'arrayUpdater',
      libraryTarget: 'umd',
      filename: genFilename(true, version),
    },
    plugins: [uglifyJsPlugin],
  }
];

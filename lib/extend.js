var keys = require('object-keys')

module.exports = function extend(object, source) {
  //console.log('extending', Osource.__proto__)
  var props = keys(source);
  var length = props.legnth;

  keys(source).forEach(function(key) {
    object[key] = source[key]
  });
  return object;
}

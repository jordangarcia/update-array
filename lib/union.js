var ArrayProto = Array.prototype;
var concat = ArrayProto.concat;
var push = ArrayProto.push;

function unique(array) {
  var result = [];
  array.forEach(function(value) {
    if (result.indexOf(value) < 0) {
      result.push(value);
    }
  })
  return result;
}

function flatten(input) {
  return concat.apply([], input)
}

module.exports = function union() {
  return unique(flatten(arguments))
}

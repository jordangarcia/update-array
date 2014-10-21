var diff = require('./lib/id-diff');
var extend = require('./lib/extend');

/**
 * Finds and returns the first instance of an object that has
 * obj[idKey]===val
 */
function findByProp(arr, idKey, val) {
  for (var i = 0; i < arr.length; i++) {
    var entry = arr[i]
    if (entry[idKey] === val) {
      return entry;
    }
  }
}

module.exports = function execute(arr, newArr) {
  var instructions = diff(arr, newArr)['ids'];

  var pointer = 0;

  var cache = (function createCache() {
    var cache = {};

    instructions.forEach(function(step) {
      var action = step[0];
      var id = step[1]
      if (action === 'x') {
        cache[id] = findByProp(arr, 'id', id)
      }
    });

    return cache;
  })();

  instructions.forEach(function(step) {
    var action = step[0];
    var id = step[1];

    switch (action) {
      case 'x':
      case '-':
        // take out spliced item
        arr.splice(pointer, 1);
        break;

      case '+':
        arr.splice(pointer, 0, findByProp(newArr, 'id', id));
        pointer++;
        break

      case 'p':
        arr.splice(pointer, 0, cache[id]);
      case '=':
        extend(arr[pointer], findByProp(newArr, 'id', id));
        pointer++;
        break;

    }
  });
}

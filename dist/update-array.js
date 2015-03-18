(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define(factory);
	else if(typeof exports === 'object')
		exports["arrayUpdater"] = factory();
	else
		root["arrayUpdater"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	var diff = __webpack_require__(1);
	var extend = __webpack_require__(2);

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

	  //console.log(instructions)
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
	        //console.log('doing p', arr, cache)
	        arr.splice(pointer, 0, cache[id]);
	        //console.log('after p', arr)
	      case '=':
	        // check for out of bounds
	        if (!arr[pointer]) {
	          // this is the case where an entity is included more than once in the newArr
	          arr[pointer] = extend({}, findByProp(newArr, 'id', id));
	        } else {
	          extend(arr[pointer], findByProp(newArr, 'id', id));
	        }
	        pointer++;
	        break;

	    }
	    //console.log(step, arr)
	  });
	}


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	var arrayDiff = __webpack_require__(3)({unique:true})

	var idMap = function(array) {
	  var map = {}
	  array.forEach(function(each) {
	    map[each.id] = each.value
	  })
	  return map
	}

	var ids = function(idValueArray) {
	  return idValueArray.map(function(each) {return each.id})
	}

	var diff = function(before, after) {
	  var valueDiff = {}
	  var afterMap = idMap(after)
	  before.forEach(function(each) {
	    var afterValue = afterMap[each.id]
	    if(afterValue === undefined) return valueDiff[each.id] = ['-', each.value]
	    if(each.value != afterValue) {
	      valueDiff[each.id] = ['m', each.value, afterValue]
	    } else {
	      valueDiff[each.id] = ['=', each.value]
	    }
	  })
	  var idDiff = arrayDiff(ids(before), ids(after))
	  idDiff.forEach(function(each) {
	    if(each[0] == '+') valueDiff[each[1]] = ['+', afterMap[each[1]]]
	  })
	  return {values: valueDiff, ids: idDiff}
	}

	module.exports = diff


/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	var keys = __webpack_require__(6)

	module.exports = function extend(object, source) {
	  //console.log('extending', Osource.__proto__)
	  var props = keys(source);
	  var length = props.legnth;

	  keys(source).forEach(function(key) {
	    object[key] = source[key]
	  });
	  return object;
	}


/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	var union = __webpack_require__(4)
	var longestCommonSubstring = __webpack_require__(5)

	var diff = function(before, after) {
	  var commonSeq = longestCommonSubstring(before, after)
	  var startBefore = commonSeq.startString1
	  var startAfter = commonSeq.startString2
	  if (commonSeq.length == 0) {
	    var result = before.map(function(each) { return ['-', each]})
	    return result.concat(after.map(function(each) { return ['+', each]}))
	  }
	  var beforeLeft = before.slice(0, startBefore)
	  var afterLeft = after.slice(0, startAfter)
	  var equal = after.slice(startAfter, startAfter + commonSeq.length)
	    .map(function(each) {return ['=', each]})
	  var beforeRight = before.slice(startBefore + commonSeq.length)
	  var afterRight = after.slice(startAfter + commonSeq.length)
	  return union(diff(beforeLeft, afterLeft), equal, diff(beforeRight, afterRight))
	}

	var orderedSetDiff = function(before, after) {
	  var diffRes = diff(before, after)
	  var result = []
	  diffRes.forEach(function(each) {
	    switch(each[0]) {
	      case '=':
	        result.push(each)
	        break
	      case '-':
	        result.push((after.indexOf(each[1]) > -1) ? ['x', each[1]] : ['-', each[1]])
	        break
	      case '+':
	        result.push((before.indexOf(each[1]) > -1) ? ['p', each[1]] : ['+', each[1]])
	    }
	  })
	  return result
	}

	var compress = function(diff) {
	  var result = []
	  var modifier
	  var section = []
	  diff.forEach(function(each) {
	    if(modifier && (each[0] == modifier)) {
	      section.push(each[1])
	    } else {
	      if(modifier) result.push([modifier, section])
	      section = [each[1]]
	      modifier = each[0]
	    }
	  })
	  if(modifier) result.push([modifier, section])
	  return result
	}

	module.exports = function(opts) {
	  opts = opts || {}
	  return function(before, after) {
	    var result = opts.unique ? orderedSetDiff(before, after) : diff(before, after)
	    return opts.compress ? compress(result) : result
	  }
	}


/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

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


/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	
	var indexMap = function(list) {
	  var map = {}
	  list.forEach(function(each, i) {
	    map[each] = map[each] || []
	    map[each].push(i)
	  })
	  return map
	}

	var longestCommonSubstring = function(seq1, seq2) {
	  var result = {startString1:0, startString2:0, length:0}
	  var indexMapBefore = indexMap(seq1)
	  var previousOverlap = []
	  seq2.forEach(function(eachAfter, indexAfter) {
	    var overlapLength
	    var overlap = []
	    var indexesBefore = indexMapBefore[eachAfter] || []
	    indexesBefore.forEach(function(indexBefore) {
	      overlapLength = ((indexBefore && previousOverlap[indexBefore-1]) || 0) + 1;
	      if (overlapLength > result.length) {
	        result.length = overlapLength;
	        result.startString1 = indexBefore - overlapLength + 1;
	        result.startString2 = indexAfter - overlapLength + 1;
	      }
	      overlap[indexBefore] = overlapLength
	    })
	    previousOverlap = overlap
	  })
	  return result
	}

	module.exports = longestCommonSubstring


/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	// modified from https://github.com/es-shims/es5-shim
	var has = Object.prototype.hasOwnProperty;
	var toString = Object.prototype.toString;
	var isArgs = __webpack_require__(7);
	var hasDontEnumBug = !({'toString': null}).propertyIsEnumerable('toString');
	var hasProtoEnumBug = (function () {}).propertyIsEnumerable('prototype');
	var dontEnums = [
		"toString",
		"toLocaleString",
		"valueOf",
		"hasOwnProperty",
		"isPrototypeOf",
		"propertyIsEnumerable",
		"constructor"
	];

	var keysShim = function keys(object) {
		var isObject = object !== null && typeof object === 'object';
		var isFunction = toString.call(object) === '[object Function]';
		var isArguments = isArgs(object);
		var isString = isObject && toString.call(object) === '[object String]';
		var theKeys = [];

		if (!isObject && !isFunction && !isArguments) {
			throw new TypeError("Object.keys called on a non-object");
		}

		var skipProto = hasProtoEnumBug && isFunction;
		if (isString && object.length > 0 && !has.call(object, 0)) {
			for (var i = 0; i < object.length; ++i) {
				theKeys.push(String(i));
			}
		}

		if (isArguments && object.length > 0) {
			for (var j = 0; j < object.length; ++j) {
				theKeys.push(String(j));
			}
		} else {
			for (var name in object) {
				if (!(skipProto && name === 'prototype') && has.call(object, name)) {
					theKeys.push(String(name));
				}
			}
		}

		if (hasDontEnumBug) {
			var ctor = object.constructor;
			var skipConstructor = ctor && ctor.prototype === object;

			for (var j = 0; j < dontEnums.length; ++j) {
				if (!(skipConstructor && dontEnums[j] === 'constructor') && has.call(object, dontEnums[j])) {
					theKeys.push(dontEnums[j]);
				}
			}
		}
		return theKeys;
	};

	keysShim.shim = function shimObjectKeys() {
		if (!Object.keys) {
			Object.keys = keysShim;
		}
		return Object.keys || keysShim;
	};

	module.exports = keysShim;



/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var toString = Object.prototype.toString;

	module.exports = function isArguments(value) {
		var str = toString.call(value);
		var isArguments = str === '[object Arguments]';
		if (!isArguments) {
			isArguments = str !== '[object Array]'
				&& value !== null
				&& typeof value === 'object'
				&& typeof value.length === 'number'
				&& value.length >= 0
				&& toString.call(value.callee) === '[object Function]';
		}
		return isArguments;
	};



/***/ }
/******/ ])
});

// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles

// eslint-disable-next-line no-global-assign
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  for (var i = 0; i < entry.length; i++) {
    newRequire(entry[i]);
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  return newRequire;
})({"../../../../Users/keithsim/AppData/Roaming/npm/node_modules/parcel-bundler/src/builtins/_empty.js":[function(require,module,exports) {

},{}],"../node_modules/lodash/_baseClamp.js":[function(require,module,exports) {
/**
 * The base implementation of `_.clamp` which doesn't coerce arguments.
 *
 * @private
 * @param {number} number The number to clamp.
 * @param {number} [lower] The lower bound.
 * @param {number} upper The upper bound.
 * @returns {number} Returns the clamped number.
 */
function baseClamp(number, lower, upper) {
  if (number === number) {
    if (upper !== undefined) {
      number = number <= upper ? number : upper;
    }
    if (lower !== undefined) {
      number = number >= lower ? number : lower;
    }
  }
  return number;
}

module.exports = baseClamp;

},{}],"../node_modules/lodash/isObject.js":[function(require,module,exports) {
/**
 * Checks if `value` is the
 * [language type](http://www.ecma-international.org/ecma-262/7.0/#sec-ecmascript-language-types)
 * of `Object`. (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
 * @example
 *
 * _.isObject({});
 * // => true
 *
 * _.isObject([1, 2, 3]);
 * // => true
 *
 * _.isObject(_.noop);
 * // => true
 *
 * _.isObject(null);
 * // => false
 */
function isObject(value) {
  var type = typeof value;
  return value != null && (type == 'object' || type == 'function');
}

module.exports = isObject;

},{}],"../node_modules/lodash/_freeGlobal.js":[function(require,module,exports) {
var global = arguments[3];
/** Detect free variable `global` from Node.js. */
var freeGlobal = typeof global == 'object' && global && global.Object === Object && global;

module.exports = freeGlobal;

},{}],"../node_modules/lodash/_root.js":[function(require,module,exports) {
var freeGlobal = require('./_freeGlobal');

/** Detect free variable `self`. */
var freeSelf = typeof self == 'object' && self && self.Object === Object && self;

/** Used as a reference to the global object. */
var root = freeGlobal || freeSelf || Function('return this')();

module.exports = root;

},{"./_freeGlobal":"../node_modules/lodash/_freeGlobal.js"}],"../node_modules/lodash/_Symbol.js":[function(require,module,exports) {
var root = require('./_root');

/** Built-in value references. */
var Symbol = root.Symbol;

module.exports = Symbol;

},{"./_root":"../node_modules/lodash/_root.js"}],"../node_modules/lodash/_getRawTag.js":[function(require,module,exports) {
var Symbol = require('./_Symbol');

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */
var nativeObjectToString = objectProto.toString;

/** Built-in value references. */
var symToStringTag = Symbol ? Symbol.toStringTag : undefined;

/**
 * A specialized version of `baseGetTag` which ignores `Symbol.toStringTag` values.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the raw `toStringTag`.
 */
function getRawTag(value) {
  var isOwn = hasOwnProperty.call(value, symToStringTag),
      tag = value[symToStringTag];

  try {
    value[symToStringTag] = undefined;
    var unmasked = true;
  } catch (e) {}

  var result = nativeObjectToString.call(value);
  if (unmasked) {
    if (isOwn) {
      value[symToStringTag] = tag;
    } else {
      delete value[symToStringTag];
    }
  }
  return result;
}

module.exports = getRawTag;

},{"./_Symbol":"../node_modules/lodash/_Symbol.js"}],"../node_modules/lodash/_objectToString.js":[function(require,module,exports) {
/** Used for built-in method references. */
var objectProto = Object.prototype;

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */
var nativeObjectToString = objectProto.toString;

/**
 * Converts `value` to a string using `Object.prototype.toString`.
 *
 * @private
 * @param {*} value The value to convert.
 * @returns {string} Returns the converted string.
 */
function objectToString(value) {
  return nativeObjectToString.call(value);
}

module.exports = objectToString;

},{}],"../node_modules/lodash/_baseGetTag.js":[function(require,module,exports) {
var Symbol = require('./_Symbol'),
    getRawTag = require('./_getRawTag'),
    objectToString = require('./_objectToString');

/** `Object#toString` result references. */
var nullTag = '[object Null]',
    undefinedTag = '[object Undefined]';

/** Built-in value references. */
var symToStringTag = Symbol ? Symbol.toStringTag : undefined;

/**
 * The base implementation of `getTag` without fallbacks for buggy environments.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the `toStringTag`.
 */
function baseGetTag(value) {
  if (value == null) {
    return value === undefined ? undefinedTag : nullTag;
  }
  return (symToStringTag && symToStringTag in Object(value))
    ? getRawTag(value)
    : objectToString(value);
}

module.exports = baseGetTag;

},{"./_Symbol":"../node_modules/lodash/_Symbol.js","./_getRawTag":"../node_modules/lodash/_getRawTag.js","./_objectToString":"../node_modules/lodash/_objectToString.js"}],"../node_modules/lodash/isObjectLike.js":[function(require,module,exports) {
/**
 * Checks if `value` is object-like. A value is object-like if it's not `null`
 * and has a `typeof` result of "object".
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
 * @example
 *
 * _.isObjectLike({});
 * // => true
 *
 * _.isObjectLike([1, 2, 3]);
 * // => true
 *
 * _.isObjectLike(_.noop);
 * // => false
 *
 * _.isObjectLike(null);
 * // => false
 */
function isObjectLike(value) {
  return value != null && typeof value == 'object';
}

module.exports = isObjectLike;

},{}],"../node_modules/lodash/isSymbol.js":[function(require,module,exports) {
var baseGetTag = require('./_baseGetTag'),
    isObjectLike = require('./isObjectLike');

/** `Object#toString` result references. */
var symbolTag = '[object Symbol]';

/**
 * Checks if `value` is classified as a `Symbol` primitive or object.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a symbol, else `false`.
 * @example
 *
 * _.isSymbol(Symbol.iterator);
 * // => true
 *
 * _.isSymbol('abc');
 * // => false
 */
function isSymbol(value) {
  return typeof value == 'symbol' ||
    (isObjectLike(value) && baseGetTag(value) == symbolTag);
}

module.exports = isSymbol;

},{"./_baseGetTag":"../node_modules/lodash/_baseGetTag.js","./isObjectLike":"../node_modules/lodash/isObjectLike.js"}],"../node_modules/lodash/toNumber.js":[function(require,module,exports) {
var isObject = require('./isObject'),
    isSymbol = require('./isSymbol');

/** Used as references for various `Number` constants. */
var NAN = 0 / 0;

/** Used to match leading and trailing whitespace. */
var reTrim = /^\s+|\s+$/g;

/** Used to detect bad signed hexadecimal string values. */
var reIsBadHex = /^[-+]0x[0-9a-f]+$/i;

/** Used to detect binary string values. */
var reIsBinary = /^0b[01]+$/i;

/** Used to detect octal string values. */
var reIsOctal = /^0o[0-7]+$/i;

/** Built-in method references without a dependency on `root`. */
var freeParseInt = parseInt;

/**
 * Converts `value` to a number.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to process.
 * @returns {number} Returns the number.
 * @example
 *
 * _.toNumber(3.2);
 * // => 3.2
 *
 * _.toNumber(Number.MIN_VALUE);
 * // => 5e-324
 *
 * _.toNumber(Infinity);
 * // => Infinity
 *
 * _.toNumber('3.2');
 * // => 3.2
 */
function toNumber(value) {
  if (typeof value == 'number') {
    return value;
  }
  if (isSymbol(value)) {
    return NAN;
  }
  if (isObject(value)) {
    var other = typeof value.valueOf == 'function' ? value.valueOf() : value;
    value = isObject(other) ? (other + '') : other;
  }
  if (typeof value != 'string') {
    return value === 0 ? value : +value;
  }
  value = value.replace(reTrim, '');
  var isBinary = reIsBinary.test(value);
  return (isBinary || reIsOctal.test(value))
    ? freeParseInt(value.slice(2), isBinary ? 2 : 8)
    : (reIsBadHex.test(value) ? NAN : +value);
}

module.exports = toNumber;

},{"./isObject":"../node_modules/lodash/isObject.js","./isSymbol":"../node_modules/lodash/isSymbol.js"}],"../node_modules/lodash/clamp.js":[function(require,module,exports) {
var baseClamp = require('./_baseClamp'),
    toNumber = require('./toNumber');

/**
 * Clamps `number` within the inclusive `lower` and `upper` bounds.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Number
 * @param {number} number The number to clamp.
 * @param {number} [lower] The lower bound.
 * @param {number} upper The upper bound.
 * @returns {number} Returns the clamped number.
 * @example
 *
 * _.clamp(-10, -5, 5);
 * // => -5
 *
 * _.clamp(10, -5, 5);
 * // => 5
 */
function clamp(number, lower, upper) {
  if (upper === undefined) {
    upper = lower;
    lower = undefined;
  }
  if (upper !== undefined) {
    upper = toNumber(upper);
    upper = upper === upper ? upper : 0;
  }
  if (lower !== undefined) {
    lower = toNumber(lower);
    lower = lower === lower ? lower : 0;
  }
  return baseClamp(toNumber(number), lower, upper);
}

module.exports = clamp;

},{"./_baseClamp":"../node_modules/lodash/_baseClamp.js","./toNumber":"../node_modules/lodash/toNumber.js"}],"../node_modules/lodash/isNil.js":[function(require,module,exports) {
/**
 * Checks if `value` is `null` or `undefined`.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is nullish, else `false`.
 * @example
 *
 * _.isNil(null);
 * // => true
 *
 * _.isNil(void 0);
 * // => true
 *
 * _.isNil(NaN);
 * // => false
 */
function isNil(value) {
  return value == null;
}

module.exports = isNil;

},{}],"colors.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
// TODO: consolidate - avoid duplication
var rgbs = ['rgb(246,214,189)', 'rgb(195,163,138)', 'rgb(153,117,119)', 'rgb(129,98,113)', 'rgb(78,73,95)', 'rgb(32,57,79)', 'rgb(15,42,63)', 'rgb(8,20,30)'];
var triplets = [[246, 214, 189], [195, 163, 138], [153, 117, 119], [129, 98, 113], [78, 73, 95], [32, 57, 79], [15, 42, 63], [8, 20, 30]]; // const hexes = [
//   '#f6d6bd',
//   '#c3a38a',
//   '#997577',
//   '#816271',
//   '#4e495f',
//   '#20394f',
//   '#0f2a3f',
//   '#08141e'
// ]

var colors = {
  rgb: function rgb(i) {
    return rgbs[i % rgbs.length];
  },
  triplet: function triplet(i) {
    return triplets[i % triplets.length];
  },
  // NOTE: if triplet isn't a color in the pallet, this will return undefined.
  lookup: function lookup(triplet) {
    for (var i = 0; i < triplets.length; i++) {
      var current = triplets[i];

      if (current[0] === triplet[0] && current[1] === triplet[1] && current[2] === triplet[2]) {
        return i;
      }
    }

    return undefined;
  }
};
var _default = colors;
exports.default = _default;
},{}],"alphabet.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var alphabet = {
  '<': [0, 0, 1, 0, 1, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0],
  '>': [1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 1, 0, 1, 0, 0, 0, 0, 0],
  '/': [0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0],
  ':': [0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0],
  '|': [0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0],
  '(': [0, 1, 1, 0, 1, 0, 1, 0, 0, 1, 0, 0],
  ')': [1, 0, 0, 1, 0, 1, 0, 1, 1, 0, 0, 0],
  0: [0, 1, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 0, 0, 0],
  1: [1, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 1, 1, 1, 0, 0, 0],
  2: [1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 0, 0, 0],
  3: [1, 1, 1, 0, 0, 1, 0, 1, 1, 0, 0, 1, 1, 1, 1, 0, 0, 0],
  4: [1, 0, 1, 1, 0, 1, 1, 1, 1, 0, 0, 1, 0, 0, 1, 0, 0, 0],
  5: [1, 1, 1, 1, 0, 0, 1, 1, 1, 0, 0, 1, 1, 1, 1, 0, 0, 0],
  6: [1, 0, 0, 1, 0, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 0, 0],
  7: [1, 1, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 0],
  8: [1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 0, 0],
  9: [1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 0, 1, 0, 0, 1, 0, 0, 0],
  ' ': [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  '.': [0, 0, 0, 0, 1, 0],
  ',': [0, 0, 0, 0, 1, 1],
  '+': [0, 0, 0, 0, 1, 0, 1, 1, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0],
  '-': [0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  '!': [1, 1, 1, 0, 1, 0],
  '?': [1, 1, 0, 1, 1, 1, 0, 0, 1, 0, 0, 0],
  a: [1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 0, 0, 0],
  b: [1, 1, 0, 1, 0, 1, 1, 1, 0, 1, 0, 1, 1, 1, 1, 0, 0, 0],
  c: [1, 1, 1, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 1, 1, 0, 0, 0],
  d: [1, 1, 0, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 0, 0, 0],
  e: [1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 0, 0, 1, 1, 1, 0, 0, 0],
  f: [1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 0, 0, 1, 0, 0, 0, 0, 0],
  g: [1, 1, 1, 1, 0, 0, 1, 0, 1, 1, 0, 1, 1, 1, 1, 0, 0, 0],
  h: [1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 0, 0, 0],
  i: [1, 1, 1, 0, 1, 0, 0, 1, 0, 0, 1, 0, 1, 1, 1, 0, 0, 0],
  j: [0, 0, 1, 0, 0, 1, 0, 0, 1, 1, 0, 1, 1, 1, 1, 0, 0, 0],
  k: [1, 0, 1, 1, 0, 1, 1, 1, 0, 1, 0, 1, 1, 0, 1, 0, 0, 0],
  l: [1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 1, 1, 0, 0, 0],
  m: [1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 0, 0, 0],
  n: [1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 0, 0, 0],
  o: [1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 0, 0, 0],
  p: [1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 0, 1, 0, 0, 0, 0, 0],
  q: [1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 0, 1, 1, 0, 0, 0],
  r: [1, 1, 1, 1, 0, 1, 1, 1, 0, 1, 0, 1, 1, 0, 1, 0, 0, 0],
  s: [1, 1, 1, 1, 0, 0, 1, 1, 1, 0, 0, 1, 1, 1, 1, 0, 0, 0],
  t: [1, 1, 1, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0],
  u: [1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 0, 0, 0],
  v: [1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 1, 0, 0, 0, 0],
  w: [1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 0, 0, 0],
  x: [1, 0, 1, 1, 0, 1, 0, 1, 0, 1, 0, 1, 1, 0, 1, 0, 0, 0],
  y: [1, 0, 1, 1, 0, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 0, 0, 0],
  z: [1, 1, 1, 0, 0, 1, 0, 1, 0, 1, 0, 0, 1, 1, 1, 0, 0, 0]
};
var _default = alphabet;
exports.default = _default;
},{}],"print.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _colors = _interopRequireDefault(require("./colors.js"));

var _alphabet = _interopRequireDefault(require("./alphabet.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

var printText = function printText(_ref) {
  var x = _ref.x,
      y = _ref.y,
      letters = _ref.letters,
      c = _ref.c,
      ctx = _ref.ctx;

  var color = _colors.default.triplet(c);

  var grids = letters.toString() // Split into individual letters.
  .split('') // Get the pixels and the letter's width.
  .map(function (letter) {
    var pixels = _alphabet.default[letter.toLowerCase()];

    return {
      // If we found a matching letter in the alphabet,
      // return its width.
      // Otherwise if the user tries to print a character
      // we haven't defined, just return 3.
      width: pixels ? pixels.length / 6 : 3,
      letter: letter,
      pixels: pixels
    };
  }) // Calculate running offsets.
  .reduce(function (acc, current, index) {
    var previous = acc[index - 1];
    var xOffset = previous ? previous.width + 1 + previous.xOffset : 0;
    var yOffset = previous ? previous.yOffset : 0;
    return [].concat(_toConsumableArray(acc), [_objectSpread({}, current, {
      xOffset: xOffset,
      yOffset: yOffset
    })]);
  }, []) // Ignore letters with no matches.
  .filter(function (d) {
    return d.pixels;
  }); // For each grid of pixels,

  grids.forEach(function (grid) {
    // get some properties,
    var pixels = grid.pixels,
        xOffset = grid.xOffset,
        yOffset = grid.yOffset,
        width = grid.width; // get the image data this letter will occupy,

    var imageData = ctx.getImageData(x + xOffset, y + yOffset, width, 6);
    var data = imageData.data; // and for each pixel,

    pixels.map(function (pixel, pixelIndex) {
      return {
        pixel: pixel,
        pixelIndex: pixelIndex
      };
    }) // ignore pixels set to 0,
    .filter(function (d) {
      return d.pixel;
    }) // and update the underlying canvas data.
    .forEach(function (d) {
      var offset = d.pixelIndex * 4;
      data[offset + 0] = color[0];
      data[offset + 1] = color[1];
      data[offset + 2] = color[2];
      data[offset + 3] = 255;
    }); // And draw!

    ctx.putImageData(imageData, x + xOffset, y + yOffset);
  });
};

var _default = printText;
exports.default = _default;
},{"./colors.js":"colors.js","./alphabet.js":"alphabet.js"}],"index.js":[function(require,module,exports) {
"use strict";

var _fs = require("fs");

var _clamp = _interopRequireDefault(require("lodash/clamp"));

var _isNil = _interopRequireDefault(require("lodash/isNil"));

var _colors = _interopRequireDefault(require("./colors"));

var _print = _interopRequireDefault(require("./print"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var gameCode = "// title: Destructible Terrain\r\n\r\n// Dev log can be found at http://02credits.com/projects/8bomb/\r\n// The change set is described here: http://02credits.com/blog/day15-8bomb-physics/\r\n// Update described here: http://02credits.com/blog/day17-8bomb-camera/\r\n// Update described here: http://02credits.com/blog/day18-8bomb-camera-fixes/\r\n\r\nfunction initTerrain() {\r\n  let terrain = [];\r\n  for (let y = 0; y < 300; y++) {\r\n    let row = [];\r\n    for (let x = 0; x < 128; x++) {\r\n      if (y > 90) {\r\n        row.push(1);\r\n      } else {\r\n        row.push(0);\r\n      }\r\n    }\r\n    terrain.push(row);\r\n  }\r\n  return terrain;\r\n}\r\n\r\nfunction createPhysicsObject(x, y, sprite) {\r\n  return {\r\n    previous: {\r\n      x,\r\n      y\r\n    },\r\n    position: {\r\n      x,\r\n      y\r\n    },\r\n    radius: 4,\r\n    sprite,\r\n    grounded: false\r\n  };\r\n}\r\n\r\ninitialState = {\r\n  terrain: initTerrain(),\r\n  player: createPhysicsObject(20, 20, 0),\r\n  bombs: [],\r\n  cameraY: 0,\r\n  score: 0\r\n};\r\n\r\nfunction terrainAt(x, y, terrain) {\r\n  if (terrain[y]) {\r\n    return terrain[y][x];\r\n  }\r\n  return false;\r\n}\r\n\r\nfunction getPhysicsObjects({ player, bombs }) {\r\n  return [player].concat(bombs);\r\n}\r\nconst gravity = 0.07;\r\nconst cameraMomentum = 0.8;\r\nconst cameraLag = 0.2;\r\nconst maxSpeed = 5;\r\nconst groundFriction = 0.99;\r\n\r\nfunction updatePhysicsObjects(objects) {\r\n  for (const obj of objects) {\r\n    let vx = obj.position.x - obj.previous.x;\r\n    let vy = obj.position.y - obj.previous.y;\r\n\r\n    let speed = Math.sqrt(vx * vx + vy * vy);\r\n    if (speed > maxSpeed) {\r\n      vx = vx * maxSpeed / speed;\r\n      vy = vy * maxSpeed / speed;\r\n    } else if(obj.grounded) {\r\n      vx = vx * groundFriction;\r\n      vy = vy * groundFriction;\r\n    }\r\n\r\n    obj.previous.x = obj.position.x;\r\n    obj.previous.y = obj.position.y;\r\n    vy += gravity;\r\n\r\n    obj.position.x += vx;\r\n    obj.position.y += vy;\r\n\r\n    if (obj.position.x - obj.radius < 0) {\r\n      obj.position.x = obj.radius;\r\n    }\r\n\r\n    if (obj.position.x + obj.radius > 128) {\r\n      obj.position.x = 128 - obj.radius;\r\n    }\r\n  }\r\n\r\n  for (const first of objects) {\r\n    for (const second of objects) {\r\n      if (first == second) continue;\r\n      let dx = first.position.x - second.position.x;\r\n      let dy = first.position.y - second.position.y;\r\n\r\n      let distance = Math.sqrt(dx * dx + dy * dy);\r\n\r\n      if (distance < first.radius + second.radius) {\r\n        if (dy < 0) first.grounded = true;\r\n        else second.grounded = true;\r\n        let amount = first.radius + second.radius - distance;\r\n\r\n        let nx = dx / distance;\r\n        let ny = dy / distance;\r\n\r\n        first.position.x += nx * amount / 2;\r\n        first.position.y += ny * amount / 2;\r\n        second.position.x -= nx * amount / 2;\r\n        second.position.y -= ny * amount / 2;\r\n      }\r\n    }\r\n  }\r\n}\r\n\r\nfunction handleTerrainCollisions(terrain, objects) {\r\n  for (let i = 0; i < 5; i++) {\r\n    for (const obj of objects) {\r\n      let totalX = 0;\r\n      let totalY = 0;\r\n      let count = 0;\r\n      for (let r = 0; r < Math.PI * 2; r += Math.PI / 8) {\r\n        let dx = Math.cos(r) * obj.radius;\r\n        let dy = Math.sin(r) * obj.radius;\r\n        let x = Math.floor(obj.position.x + dx);\r\n        let y = Math.floor(obj.position.y + dy);\r\n\r\n        if (terrainAt(x, y, terrain)) {\r\n          if (dy > 3) {\r\n            obj.grounded = true;\r\n          }\r\n          totalX += dx;\r\n          totalY += dy;\r\n          count++;\r\n        }\r\n      }\r\n      if (count == 0) {\r\n        continue;\r\n      }\r\n\r\n      let dx = totalX / count;\r\n      let dy = totalY / count;\r\n\r\n      let length = Math.sqrt(dx * dx + dy * dy);\r\n      let nx = dx / length;\r\n      let ny = dy / length;\r\n\r\n      let displacement = obj.radius - length;\r\n\r\n      obj.position.x -= nx * displacement * 0.3;\r\n      obj.position.y -= ny * displacement * 0.3;\r\n    }\r\n  }\r\n}\r\n\r\nfunction updateCamera(state) {\r\n  if (state.previousCameraY) {\r\n    let vy = state.cameraY - state.previousCameraY;\r\n    state.previousCameraY = state.cameraY;\r\n    state.cameraY += vy * cameraMomentum;\r\n  }\r\n\r\n  if (state.player.position.y > state.cameraY + 96) {\r\n    let cameraDiff = state.player.position.y - (state.cameraY + 96);\r\n    state.cameraY += cameraDiff * cameraLag;\r\n  }\r\n\r\n  if (state.player.position.y < state.cameraY + 32) {\r\n    let cameraDiff = state.player.position.y - (state.cameraY + 32);\r\n    state.cameraY += cameraDiff * 0.2;\r\n  }\r\n\r\n  if (!state.previousCameraY) {\r\n    state.previousCameraY = state.cameraY;\r\n  }\r\n}\r\n\r\nfunction updateScore(state) {\r\n  if (state.player.position.y > state.score) {\r\n    state.score = state.player.position.y;\r\n  }\r\n}\r\nfunction drawTerrain({ terrain, cameraY }) {\r\n  let top = Math.max(0, Math.floor(cameraY));\r\n  let bottom = Math.min(Math.floor(cameraY + 128), terrain.length);\r\n  for (let y = top; y < bottom; y++) {\r\n    for (let x = 0; x < terrain[y].length - 1; x++) {\r\n      if (terrainAt(x, y, terrain)) {\r\n        if (!terrainAt(x, y - 1, terrain)) {\r\n          setPixel(x, y, 0);\r\n        } else if (!terrainAt(x, y + 1, terrain)) {\r\n          setPixel(x, y, 2);\r\n        } else {\r\n          setPixel(x, y, 1);\r\n        }\r\n      }\r\n    }\r\n  }\r\n}\r\n\r\nfunction drawPhysicsObjects(objects) {\r\n  for (let obj of objects) {\r\n    sprite(obj.position.x - obj.radius, obj.position.y - obj.radius, obj.sprite);\r\n  }\r\n}\r\n\r\nfunction drawScoreMarker({ score }) {\r\n  sprite(0, score, 1);\r\n  sprite(120, score, 1, 0, true);\r\n}\r\n\r\nfunction drawInstructions() {\r\n  print(5, 5, \"left/right to move\");\r\n  print(5, 13, \"up to jump\");\r\n  print(5, 21, \"a to cut terrain\");\r\n}\r\nconst fuzeTime = 100;\r\nconst fuzeSpeed = 0.75;\r\nconst bombRadius = 30;\r\nconst knockBack = 50;\r\n\r\nfunction spawnBombs({ player,  bombs, score }) {\r\n  if (Math.random() * 100 <= 0.5 * (score / 100)) {\r\n    bombs.push(createPhysicsObject(Math.random() * 112 + 8, player.position.y - 300, 2));\r\n  }\r\n}\r\n\r\nfunction updateBombs(state) {\r\n  let bombsToExplode = [];\r\n  let remainingBombs = [];\r\n\r\n  for (const bomb of state.bombs) {\r\n    if (bomb.timeLeft != undefined) {\r\n      bomb.sprite = 2;\r\n      bomb.timeLeft -= 1;\r\n      if (bomb.timeLeft <= 0) {\r\n        bomb.fuze = bomb.fuze * 0.75;\r\n        if (bomb.fuze < 1) {\r\n          bombsToExplode.push(bomb);\r\n          continue;\r\n        } else {\r\n          bomb.timeLeft = bomb.fuze;\r\n          bomb.sprite = 3;\r\n        }\r\n      }\r\n    } else if (bomb.grounded) {\r\n      bomb.timeLeft = fuzeTime;\r\n      bomb.fuze = fuzeTime;\r\n    }\r\n\r\n    remainingBombs.push(bomb);\r\n  }\r\n\r\n  state.bombs = remainingBombs;\r\n\r\n  let physicsObjects = getPhysicsObjects(state);\r\n\r\n  for (const bomb of bombsToExplode) {\r\n    cutTerrain(bomb.position.x, bomb.position.y, bombRadius, state.terrain);\r\n    for (const object of physicsObjects) {\r\n      let dx = object.position.x - bomb.position.x;\r\n      let dy = object.position.y - bomb.position.y;\r\n\r\n      let length = Math.sqrt(dx * dx + dy * dy);\r\n\r\n      let nx = dx / length;\r\n      let ny = dy / length;\r\n\r\n      object.position.x += nx * knockBack / length;\r\n      object.position.y += ny * knockBack / length;\r\n    }\r\n  }\r\n}\r\nfunction cutTerrain(x, y, r, terrain) {\r\n  for (let cx = Math.floor(x - r); cx <= x + r; cx++) {\r\n    for (let cy = Math.floor(y - r); cy <= y + r; cy++) {\r\n      let dx = cx - x;\r\n      let dy = cy - y;\r\n      let cr = Math.floor(Math.sqrt(dx * dx + dy * dy));\r\n\r\n      if (cr > r) continue;\r\n\r\n      if (cy >= 0 && cy < terrain.length) {\r\n        let row = terrain[cy];\r\n        if (cx >= 0 && cx < row.length) {\r\n          row[cx] = false;\r\n        }\r\n      }\r\n    }\r\n  }\r\n}\r\nconst runSpeed = 0.05;\r\nconst airSpeed = 0.01;\r\nconst jumpSpeed = 2;\r\n\r\nfunction handleInput(input, player, terrain) {\r\n  let speed = player.grounded ? runSpeed : airSpeed;\r\n  if (input.left) {\r\n    player.position.x -= speed;\r\n  }\r\n  if (input.right) {\r\n    player.position.x += speed;\r\n  }\r\n\r\n  if (input.upPressed && player.grounded) {\r\n    player.previous.y += jumpSpeed;\r\n    player.grounded = false;\r\n  }\r\n\r\n  if (input.a) {\r\n    cutTerrain(player.position.x, player.position.y, 20, terrain);\r\n  }\r\n}\r\n\r\nupdate = (state, input) => {\r\n  let physicsObjects = getPhysicsObjects(state);\r\n  updatePhysicsObjects(physicsObjects);\r\n  handleTerrainCollisions(state.terrain, physicsObjects);\r\n  handleInput(input, state.player, state.terrain);\r\n  updateCamera(state);\r\n  updateScore(state);\r\n\r\n  spawnBombs(state);\r\n  updateBombs(state);\r\n};\r\n\r\ndraw = state => {\r\n  let physicsObjects = getPhysicsObjects(state);\r\n  clear();\r\n  camera(0, Math.floor(state.cameraY));\r\n  drawTerrain(state);\r\n  drawPhysicsObjects(physicsObjects);\r\n  drawScoreMarker(state);\r\n  drawInstructions(state);\r\n};\r\n\r\nsprites = {\r\n  \"0\": [\r\n    \"  3333  \",\r\n    \" 333333 \",\r\n    \"33333333\",\r\n    \"33333333\",\r\n    \"33333333\",\r\n    \"33333333\",\r\n    \" 333333 \",\r\n    \"  3333  \"\r\n  ],\r\n  \"1\": [\r\n    \"5       \",\r\n    \"65      \",\r\n    \"465     \",\r\n    \"3465    \",\r\n    \"3465    \",\r\n    \"465     \",\r\n    \"65      \",\r\n    \"5       \"\r\n  ],\r\n  \"2\": [\r\n    \"  6666  \",\r\n    \" 664466 \",\r\n    \"66644666\",\r\n    \"66644666\",\r\n    \"66644666\",\r\n    \"66666666\",\r\n    \" 664466 \",\r\n    \"  6666  \"\r\n  ],\r\n  \"3\": [\r\n    \"  4444  \",\r\n    \" 442244 \",\r\n    \"44422444\",\r\n    \"44422444\",\r\n    \"44422444\",\r\n    \"44444444\",\r\n    \" 442244 \",\r\n    \"  4444  \"\r\n  ]\r\n};\r\n";
var canvas = document.getElementById('game');
var ctx = canvas.getContext('2d');
var _cameraX = 0;
var _cameraY = 0;

function camera() {
  var x = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
  var y = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
  _cameraX = Math.floor(x);
  _cameraY = Math.floor(y);
  ctx.setTransform(1, 0, 0, 1, 0, 0);
  ctx.translate(-_cameraX, -_cameraY);
}

function setPixel(x, y) {
  var c = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
  ctx.fillStyle = _colors.default.rgb(c);
  ctx.fillRect(Math.floor(x), Math.floor(y), 1, 1);
}

function sprite(x, y, spriteIndex) {
  var darken = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 0;
  var flipH = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;
  var flipV = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : false;

  if (window.sprites[spriteIndex]) {
    window.sprites[spriteIndex].slice(0, 8).forEach(function (cells, rowIndex) {
      cells.split('').forEach(function (color, colIndex) {
        if (color !== ' ') {
          var clamped = (0, _clamp.default)(+color - darken, 0, 7);
          ctx.fillStyle = _colors.default.rgb(clamped);
          ctx.fillRect(Math.floor(x) + (flipH ? 7 - colIndex : colIndex), Math.floor(y) + (flipV ? 7 - rowIndex : rowIndex), 1, 1);
        }
      });
    });
  }
}

function print(x, y, letters) {
  var c = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 0;
  (0, _print.default)({
    x: x - _cameraX,
    y: y - _cameraY,
    letters: letters,
    c: c,
    ctx: ctx
  });
}

function clear(c) {
  ctx.save();
  ctx.setTransform(1, 0, 0, 1, 0, 0);

  if (!(0, _isNil.default)(c)) {
    ctx.fillStyle = _colors.default.rgb(c);
    ctx.fillRect(0, 0, 128, 128);
  } else {
    ctx.clearRect(0, 0, 128, 128);
  }

  ctx.restore();
}

window.initialState = "";

window.draw = function () {};

window.update = function () {};

window.sprites = {};
var currentKeys = new Set();
document.addEventListener('keydown', function (_ref) {
  var key = _ref.key;
  return currentKeys.add(key);
});
document.addEventListener('keyup', function (_ref2) {
  var key = _ref2.key;
  return currentKeys.delete(key);
});
eval(gameCode);
var previousInput = {};
var state = window.initialState;

function loop() {
  var input = {};
  var keyNames = {
    "up": "ArrowUp",
    "right": "ArrowRight",
    "down": "ArrowDown",
    "left": "ArrowLeft",
    "a": "a",
    "b": "b"
  };

  for (var key in keyNames) {
    input[key] = currentKeys.has(keyNames[key]);
    input[key + "Pressed"] = input[key] && !previousInput[key];
    input[key + "Released"] = !input[key] && previousInput[key];
  }

  previousInput = input;
  window.update(state, input);
  window.draw(state);
  requestAnimationFrame(loop);
}

requestAnimationFrame(loop);
},{"fs":"../../../../Users/keithsim/AppData/Roaming/npm/node_modules/parcel-bundler/src/builtins/_empty.js","lodash/clamp":"../node_modules/lodash/clamp.js","lodash/isNil":"../node_modules/lodash/isNil.js","./colors":"colors.js","./print":"print.js"}],"../../../../Users/keithsim/AppData/Roaming/npm/node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "50573" + '/');

  ws.onmessage = function (event) {
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      console.clear();
      data.assets.forEach(function (asset) {
        hmrApply(global.parcelRequire, asset);
      });
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          hmrAccept(global.parcelRequire, asset.id);
        }
      });
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAccept(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAccept(bundle.parent, id);
  }

  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAccept(global.parcelRequire, id);
  });
}
},{}]},{},["../../../../Users/keithsim/AppData/Roaming/npm/node_modules/parcel-bundler/src/builtins/hmr-runtime.js","index.js"], null)
//# sourceMappingURL=/src.e31bb0bc.map
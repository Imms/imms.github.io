/* */ 
(function e(t, n, r) {
  function s(o, u) {
    if (!n[o]) {
      if (!t[o]) {
        var a = typeof require == "function" && require;
        if (!u && a)
          return a(o, !0);
        if (i)
          return i(o, !0);
        var f = new Error("Cannot find module '" + o + "'");
        throw f.code = "MODULE_NOT_FOUND", f;
      }
      var l = n[o] = {exports: {}};
      t[o][0].call(l.exports, function(e) {
        var n = t[o][1][e];
        return s(n ? n : e);
      }, l, l.exports, e, t, n, r);
    }
    return n[o].exports;
  }
  var i = typeof require == "function" && require;
  for (var o = 0; o < r.length; o++)
    s(r[o]);
  return s;
})({
  1: [function(require, module, exports) {
    'use strict';
    var proto = require('./Array.prototype');
    module.exports = {
      prototype: proto,
      shim: function shimArray() {
        proto.shim();
      }
    };
  }, {"./Array.prototype": 3}],
  2: [function(require, module, exports) {
    'use strict';
    module.exports = require('array-includes');
  }, {"array-includes": 23}],
  3: [function(require, module, exports) {
    'use strict';
    var includes = require('./Array.prototype.includes');
    module.exports = {
      includes: includes,
      shim: function shimArrayPrototype() {
        includes.shim();
      }
    };
  }, {"./Array.prototype.includes": 2}],
  4: [function(require, module, exports) {
    'use strict';
    var proto = require('./Map.prototype');
    module.exports = {
      prototype: proto,
      shim: function shimMap() {
        proto.shim();
      }
    };
  }, {"./Map.prototype": 5}],
  5: [function(require, module, exports) {
    'use strict';
    var toJSON = require('./Map.prototype.toJSON');
    module.exports = {
      toJSON: toJSON,
      shim: function shimMapPrototype() {
        toJSON.shim();
      }
    };
  }, {"./Map.prototype.toJSON": 6}],
  6: [function(require, module, exports) {
    'use strict';
    module.exports = require('map-tojson');
  }, {"map-tojson": 45}],
  7: [function(require, module, exports) {
    'use strict';
    var getDescriptors = require('object.getownpropertydescriptors');
    var entries = require('object.entries');
    var values = require('object.values');
    module.exports = {
      entries: entries,
      getOwnPropertyDescriptors: getDescriptors,
      shim: function shimObject() {
        getDescriptors.shim();
        entries.shim();
        values.shim();
      },
      values: values
    };
  }, {
    "object.entries": 67,
    "object.getownpropertydescriptors": 91,
    "object.values": 113
  }],
  8: [function(require, module, exports) {
    'use strict';
    module.exports = require('regexp.escape');
  }, {"regexp.escape": 137}],
  9: [function(require, module, exports) {
    'use strict';
    var escapeShim = require('./RegExp.escape');
    module.exports = {
      escape: escapeShim,
      shim: function shimRegExp() {
        escapeShim.shim();
      }
    };
  }, {"./RegExp.escape": 8}],
  10: [function(require, module, exports) {
    'use strict';
    module.exports = require('simd');
  }, {"simd": 180}],
  11: [function(require, module, exports) {
    'use strict';
    var proto = require('./Set.prototype');
    module.exports = {
      prototype: proto,
      shim: function shimSet() {
        proto.shim();
      }
    };
  }, {"./Set.prototype": 12}],
  12: [function(require, module, exports) {
    'use strict';
    var toJSON = require('./Set.prototype.toJSON');
    module.exports = {
      toJSON: toJSON,
      shim: function shimSetPrototype() {
        toJSON.shim();
      }
    };
  }, {"./Set.prototype.toJSON": 13}],
  13: [function(require, module, exports) {
    'use strict';
    module.exports = require('set-tojson');
  }, {"set-tojson": 158}],
  14: [function(require, module, exports) {
    'use strict';
    var stringPrototype = require('./String.prototype');
    module.exports = {
      prototype: stringPrototype,
      shim: function shimString() {
        stringPrototype.shim();
      }
    };
  }, {"./String.prototype": 16}],
  15: [function(require, module, exports) {
    'use strict';
    module.exports = require('string-at');
  }, {"string-at": 186}],
  16: [function(require, module, exports) {
    'use strict';
    var at = require('./String.prototype.at');
    var padStart = require('./String.prototype.padStart');
    var padEnd = require('./String.prototype.padEnd');
    var trimLeft = require('./String.prototype.trimLeft');
    var trimRight = require('./String.prototype.trimRight');
    module.exports = {
      at: at,
      padStart: padStart,
      padEnd: padEnd,
      trimLeft: trimLeft,
      trimRight: trimRight,
      shim: function shimStringPrototype() {
        at.shim();
        padStart.shim();
        padEnd.shim();
        trimLeft.shim();
        trimRight.shim();
      }
    };
  }, {
    "./String.prototype.at": 15,
    "./String.prototype.padEnd": 17,
    "./String.prototype.padStart": 18,
    "./String.prototype.trimLeft": 19,
    "./String.prototype.trimRight": 20
  }],
  17: [function(require, module, exports) {
    'use strict';
    module.exports = require('string.prototype.padend');
  }, {"string.prototype.padend": 208}],
  18: [function(require, module, exports) {
    'use strict';
    module.exports = require('string.prototype.padstart');
  }, {"string.prototype.padstart": 232}],
  19: [function(require, module, exports) {
    'use strict';
    module.exports = require('string.prototype.trimleft');
  }, {"string.prototype.trimleft": 255}],
  20: [function(require, module, exports) {
    'use strict';
    module.exports = require('string.prototype.trimright');
  }, {"string.prototype.trimright": 261}],
  21: [function(require, module, exports) {
    'use strict';
    var $Array = require('./Array');
    var $Map = require('./Map');
    var $Object = require('./Object');
    var $RegExp = require('./RegExp');
    var $Set = require('./Set');
    var $SIMD = require('./SIMD');
    var $String = require('./String');
    module.exports = {
      Array: $Array,
      Map: $Map,
      Object: $Object,
      RegExp: $RegExp,
      Set: $Set,
      SIMD: $SIMD,
      String: $String,
      shim: function shimES7() {
        $Array.shim();
        $Map.shim();
        $Object.shim();
        $RegExp.shim();
        $Set.shim();
        $SIMD.shim();
        $String.shim();
      }
    };
  }, {
    "./Array": 1,
    "./Map": 4,
    "./Object": 7,
    "./RegExp": 9,
    "./SIMD": 10,
    "./Set": 11,
    "./String": 14
  }],
  22: [function(require, module, exports) {
    (function(global) {
      'use strict';
      var ES = require('es-abstract/es6');
      var $isNaN = Number.isNaN || function(a) {
        return a !== a;
      };
      var $isFinite = Number.isFinite || function(n) {
        return typeof n === 'number' && global.isFinite(n);
      };
      var indexOf = Array.prototype.indexOf;
      module.exports = function includes(searchElement) {
        var fromIndex = arguments.length > 1 ? ES.ToInteger(arguments[1]) : 0;
        if (indexOf && !$isNaN(searchElement) && $isFinite(fromIndex) && typeof searchElement !== 'undefined') {
          return indexOf.apply(this, arguments) > -1;
        }
        var O = ES.ToObject(this);
        var length = ES.ToLength(O.length);
        if (length === 0) {
          return false;
        }
        var k = fromIndex >= 0 ? fromIndex : Math.max(0, length + fromIndex);
        while (k < length) {
          if (ES.SameValueZero(searchElement, O[k])) {
            return true;
          }
          k += 1;
        }
        return false;
      };
    }).call(this, typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {});
  }, {"es-abstract/es6": 26}],
  23: [function(require, module, exports) {
    'use strict';
    var define = require('define-properties');
    var ES = require('es-abstract/es6');
    var implementation = require('./implementation');
    var getPolyfill = require('./polyfill');
    var shim = require('./shim');
    var slice = Array.prototype.slice;
    var boundIncludesShim = function includes(array, searchElement) {
      ES.RequireObjectCoercible(array);
      return implementation.apply(array, slice.call(arguments, 1));
    };
    define(boundIncludesShim, {
      implementation: implementation,
      getPolyfill: getPolyfill,
      shim: shim
    });
    module.exports = boundIncludesShim;
  }, {
    "./implementation": 22,
    "./polyfill": 43,
    "./shim": 44,
    "define-properties": 24,
    "es-abstract/es6": 26
  }],
  24: [function(require, module, exports) {
    'use strict';
    var keys = require('object-keys');
    var foreach = require('foreach');
    var hasSymbols = typeof Symbol === 'function' && typeof Symbol() === 'symbol';
    var toStr = Object.prototype.toString;
    var isFunction = function(fn) {
      return typeof fn === 'function' && toStr.call(fn) === '[object Function]';
    };
    var arePropertyDescriptorsSupported = function() {
      var obj = {};
      try {
        Object.defineProperty(obj, 'x', {
          enumerable: false,
          value: obj
        });
        for (var _ in obj) {
          return false;
        }
        return obj.x === obj;
      } catch (e) {
        return false;
      }
    };
    var supportsDescriptors = Object.defineProperty && arePropertyDescriptorsSupported();
    var defineProperty = function(object, name, value, predicate) {
      if (name in object && (!isFunction(predicate) || !predicate())) {
        return;
      }
      if (supportsDescriptors) {
        Object.defineProperty(object, name, {
          configurable: true,
          enumerable: false,
          value: value,
          writable: true
        });
      } else {
        object[name] = value;
      }
    };
    var defineProperties = function(object, map) {
      var predicates = arguments.length > 2 ? arguments[2] : {};
      var props = keys(map);
      if (hasSymbols) {
        props = props.concat(Object.getOwnPropertySymbols(map));
      }
      foreach(props, function(name) {
        defineProperty(object, name, map[name], predicates[name]);
      });
    };
    defineProperties.supportsDescriptors = !!supportsDescriptors;
    module.exports = defineProperties;
  }, {
    "foreach": 35,
    "object-keys": 41
  }],
  25: [function(require, module, exports) {
    'use strict';
    var $isNaN = Number.isNaN || function(a) {
      return a !== a;
    };
    var $isFinite = require('./helpers/isFinite');
    var sign = require('./helpers/sign');
    var mod = require('./helpers/mod');
    var IsCallable = require('is-callable');
    var toPrimitive = require('es-to-primitive/es5');
    var ES5 = {
      ToPrimitive: toPrimitive,
      ToBoolean: function ToBoolean(value) {
        return Boolean(value);
      },
      ToNumber: function ToNumber(value) {
        return Number(value);
      },
      ToInteger: function ToInteger(value) {
        var number = this.ToNumber(value);
        if ($isNaN(number)) {
          return 0;
        }
        if (number === 0 || !$isFinite(number)) {
          return number;
        }
        return sign(number) * Math.floor(Math.abs(number));
      },
      ToInt32: function ToInt32(x) {
        return this.ToNumber(x) >> 0;
      },
      ToUint32: function ToUint32(x) {
        return this.ToNumber(x) >>> 0;
      },
      ToUint16: function ToUint16(value) {
        var number = this.ToNumber(value);
        if ($isNaN(number) || number === 0 || !$isFinite(number)) {
          return 0;
        }
        var posInt = sign(number) * Math.floor(Math.abs(number));
        return mod(posInt, 0x10000);
      },
      ToString: function ToString(value) {
        return String(value);
      },
      ToObject: function ToObject(value) {
        this.CheckObjectCoercible(value);
        return Object(value);
      },
      CheckObjectCoercible: function CheckObjectCoercible(value, optMessage) {
        if (value == null) {
          throw new TypeError(optMessage || 'Cannot call method on ' + value);
        }
        return value;
      },
      IsCallable: IsCallable,
      SameValue: function SameValue(x, y) {
        if (x === y) {
          if (x === 0) {
            return 1 / x === 1 / y;
          }
          return true;
        }
        return $isNaN(x) && $isNaN(y);
      }
    };
    module.exports = ES5;
  }, {
    "./helpers/isFinite": 28,
    "./helpers/mod": 30,
    "./helpers/sign": 31,
    "es-to-primitive/es5": 32,
    "is-callable": 37
  }],
  26: [function(require, module, exports) {
    'use strict';
    var toStr = Object.prototype.toString;
    var hasSymbols = typeof Symbol === 'function' && typeof Symbol.iterator === 'symbol';
    var symbolToStr = hasSymbols ? Symbol.prototype.toString : toStr;
    var $isNaN = Number.isNaN || function(a) {
      return a !== a;
    };
    var $isFinite = require('./helpers/isFinite');
    var MAX_SAFE_INTEGER = Number.MAX_SAFE_INTEGER || Math.pow(2, 53) - 1;
    var assign = require('./helpers/assign');
    var sign = require('./helpers/sign');
    var mod = require('./helpers/mod');
    var isPrimitive = require('./helpers/isPrimitive');
    var toPrimitive = require('es-to-primitive/es6');
    var parseInteger = parseInt;
    var bind = require('function-bind');
    var strSlice = bind.call(Function.call, String.prototype.slice);
    var isBinary = bind.call(Function.call, RegExp.prototype.test, /^0b[01]+$/i);
    var isOctal = bind.call(Function.call, RegExp.prototype.test, /^0o[0-7]+$/i);
    var nonWS = ['\u0085', '\u200b', '\ufffe'].join('');
    var nonWSregex = new RegExp('[' + nonWS + ']', 'g');
    var hasNonWS = bind.call(Function.call, RegExp.prototype.test, nonWSregex);
    var invalidHexLiteral = /^[\-\+]0x[0-9a-f]+$/i;
    var isInvalidHexLiteral = bind.call(Function.call, RegExp.prototype.test, invalidHexLiteral);
    var ws = ['\x09\x0A\x0B\x0C\x0D\x20\xA0\u1680\u180E\u2000\u2001\u2002\u2003', '\u2004\u2005\u2006\u2007\u2008\u2009\u200A\u202F\u205F\u3000\u2028', '\u2029\uFEFF'].join('');
    var trimRegex = new RegExp('(^[' + ws + ']+)|([' + ws + ']+$)', 'g');
    var replace = bind.call(Function.call, String.prototype.replace);
    var trim = function(value) {
      return replace(value, trimRegex, '');
    };
    var ES5 = require('./es5');
    var hasRegExpMatcher = require('is-regex');
    var ES6 = assign(assign({}, ES5), {
      Call: function Call(F, V) {
        var args = arguments.length > 2 ? arguments[2] : [];
        if (!this.IsCallable(F)) {
          throw new TypeError(F + ' is not a function');
        }
        return F.apply(V, args);
      },
      ToPrimitive: toPrimitive,
      ToNumber: function ToNumber(argument) {
        var value = isPrimitive(argument) ? argument : toPrimitive(argument, 'number');
        if (typeof value === 'symbol') {
          throw new TypeError('Cannot convert a Symbol value to a number');
        }
        if (typeof value === 'string') {
          if (isBinary(value)) {
            return this.ToNumber(parseInteger(strSlice(value, 2), 2));
          } else if (isOctal(value)) {
            return this.ToNumber(parseInteger(strSlice(value, 2), 8));
          } else if (hasNonWS(value) || isInvalidHexLiteral(value)) {
            return NaN;
          } else {
            var trimmed = trim(value);
            if (trimmed !== value) {
              return this.ToNumber(trimmed);
            }
          }
        }
        return Number(value);
      },
      ToInt16: function ToInt16(argument) {
        var int16bit = this.ToUint16(argument);
        return int16bit >= 0x8000 ? int16bit - 0x10000 : int16bit;
      },
      ToInt8: function ToInt8(argument) {
        var int8bit = this.ToUint8(argument);
        return int8bit >= 0x80 ? int8bit - 0x100 : int8bit;
      },
      ToUint8: function ToUint8(argument) {
        var number = this.ToNumber(argument);
        if ($isNaN(number) || number === 0 || !$isFinite(number)) {
          return 0;
        }
        var posInt = sign(number) * Math.floor(Math.abs(number));
        return mod(posInt, 0x100);
      },
      ToUint8Clamp: function ToUint8Clamp(argument) {
        var number = this.ToNumber(argument);
        if ($isNaN(number) || number <= 0) {
          return 0;
        }
        if (number >= 0xFF) {
          return 0xFF;
        }
        var f = Math.floor(argument);
        if (f + 0.5 < number) {
          return f + 1;
        }
        if (number < f + 0.5) {
          return f;
        }
        if (f % 2 !== 0) {
          return f + 1;
        }
        return f;
      },
      ToString: function ToString(argument) {
        if (typeof argument === 'symbol') {
          throw new TypeError('Cannot convert a Symbol value to a string');
        }
        return String(argument);
      },
      ToObject: function ToObject(value) {
        this.RequireObjectCoercible(value);
        return Object(value);
      },
      ToPropertyKey: function ToPropertyKey(argument) {
        var key = this.ToPrimitive(argument, String);
        return typeof key === 'symbol' ? symbolToStr.call(key) : this.ToString(key);
      },
      ToLength: function ToLength(argument) {
        var len = this.ToInteger(argument);
        if (len <= 0) {
          return 0;
        }
        if (len > MAX_SAFE_INTEGER) {
          return MAX_SAFE_INTEGER;
        }
        return len;
      },
      CanonicalNumericIndexString: function CanonicalNumericIndexString(argument) {
        if (toStr.call(argument) !== '[object String]') {
          throw new TypeError('must be a string');
        }
        if (argument === '-0') {
          return -0;
        }
        var n = this.ToNumber(argument);
        if (this.SameValue(this.ToString(n), argument)) {
          return n;
        }
      },
      RequireObjectCoercible: ES5.CheckObjectCoercible,
      IsArray: Array.isArray || function IsArray(argument) {
        return toStr.call(argument) === '[object Array]';
      },
      IsConstructor: function IsConstructor(argument) {
        return this.IsCallable(argument);
      },
      IsExtensible: function IsExtensible(obj) {
        if (!Object.preventExtensions) {
          return true;
        }
        if (isPrimitive(obj)) {
          return false;
        }
        return Object.isExtensible(obj);
      },
      IsInteger: function IsInteger(argument) {
        if (typeof argument !== 'number' || $isNaN(argument) || !$isFinite(argument)) {
          return false;
        }
        var abs = Math.abs(argument);
        return Math.floor(abs) === abs;
      },
      IsPropertyKey: function IsPropertyKey(argument) {
        return typeof argument === 'string' || typeof argument === 'symbol';
      },
      IsRegExp: function IsRegExp(argument) {
        if (!argument || typeof argument !== 'object') {
          return false;
        }
        if (hasSymbols) {
          var isRegExp = RegExp[Symbol.match];
          if (typeof isRegExp !== 'undefined') {
            return ES5.ToBoolean(isRegExp);
          }
        }
        return hasRegExpMatcher(argument);
      },
      SameValueZero: function SameValueZero(x, y) {
        return (x === y) || ($isNaN(x) && $isNaN(y));
      }
    });
    delete ES6.CheckObjectCoercible;
    module.exports = ES6;
  }, {
    "./es5": 25,
    "./helpers/assign": 27,
    "./helpers/isFinite": 28,
    "./helpers/isPrimitive": 29,
    "./helpers/mod": 30,
    "./helpers/sign": 31,
    "es-to-primitive/es6": 33,
    "function-bind": 36,
    "is-regex": 39
  }],
  27: [function(require, module, exports) {
    var has = Object.prototype.hasOwnProperty;
    module.exports = Object.assign || function assign(target, source) {
      for (var key in source) {
        if (has.call(source, key)) {
          target[key] = source[key];
        }
      }
      return target;
    };
  }, {}],
  28: [function(require, module, exports) {
    var $isNaN = Number.isNaN || function(a) {
      return a !== a;
    };
    module.exports = Number.isFinite || function(x) {
      return typeof x === 'number' && !$isNaN(x) && x !== Infinity && x !== -Infinity;
    };
  }, {}],
  29: [function(require, module, exports) {
    module.exports = function isPrimitive(value) {
      return value === null || (typeof value !== 'function' && typeof value !== 'object');
    };
  }, {}],
  30: [function(require, module, exports) {
    module.exports = function mod(number, modulo) {
      var remain = number % modulo;
      return Math.floor(remain >= 0 ? remain : remain + modulo);
    };
  }, {}],
  31: [function(require, module, exports) {
    module.exports = function sign(number) {
      return number >= 0 ? 1 : -1;
    };
  }, {}],
  32: [function(require, module, exports) {
    'use strict';
    var toStr = Object.prototype.toString;
    var isPrimitive = require('./helpers/isPrimitive');
    var isCallable = require('is-callable');
    var ES5internalSlots = {'[[DefaultValue]]': function(O, hint) {
        if (!hint) {
          hint = toStr.call(O) === '[object Date]' ? String : Number;
        }
        if (hint === String || hint === Number) {
          var methods = hint === String ? ['toString', 'valueOf'] : ['valueOf', 'toString'];
          var value,
              i;
          for (i = 0; i < methods.length; ++i) {
            if (isCallable(O[methods[i]])) {
              value = O[methods[i]]();
              if (isPrimitive(value)) {
                return value;
              }
            }
          }
          throw new TypeError('No default value');
        }
        throw new TypeError('invalid [[DefaultValue]] hint supplied');
      }};
    module.exports = function ToPrimitive(input, PreferredType) {
      if (isPrimitive(input)) {
        return input;
      }
      if (arguments.length < 2) {
        PreferredType = toStr.call(input) === '[object Date]' ? String : Number;
      }
      if (PreferredType === String) {
        return String(input);
      } else if (PreferredType === Number) {
        return Number(input);
      } else {
        throw new TypeError('invalid PreferredType supplied');
      }
      return ES5internalSlots['[[DefaultValue]]'](input, PreferredType);
    };
  }, {
    "./helpers/isPrimitive": 34,
    "is-callable": 37
  }],
  33: [function(require, module, exports) {
    'use strict';
    var hasSymbols = typeof Symbol === 'function' && typeof Symbol.iterator === 'symbol';
    var isPrimitive = require('./helpers/isPrimitive');
    var isCallable = require('is-callable');
    var isDate = require('is-date-object');
    var isSymbol = require('is-symbol');
    var ordinaryToPrimitive = function OrdinaryToPrimitive(O, hint) {
      if (O == null) {
        throw new TypeError('Cannot call method on ' + O);
      }
      if (typeof hint !== 'string' || (hint !== 'number' && hint !== 'string')) {
        throw new TypeError('hint must be "string" or "number"');
      }
      var methodNames = hint === 'string' ? ['toString', 'valueOf'] : ['valueOf', 'toString'];
      var method,
          result,
          i;
      for (i = 0; i < methodNames.length; ++i) {
        method = O[methodNames[i]];
        if (isCallable(method)) {
          result = method.call(O);
          if (isPrimitive(result)) {
            return result;
          }
        }
      }
      throw new TypeError('No default value');
    };
    module.exports = function ToPrimitive(input, PreferredType) {
      if (isPrimitive(input)) {
        return input;
      }
      var hint = 'default';
      if (arguments.length > 1) {
        if (PreferredType === String) {
          hint = 'string';
        } else if (PreferredType === Number) {
          hint = 'number';
        }
      }
      var exoticToPrim;
      if (hasSymbols) {
        if (Symbol.toPrimitive) {
          throw new TypeError('Symbol.toPrimitive not supported yet');
        } else if (isSymbol(input)) {
          exoticToPrim = Symbol.prototype.valueOf;
        }
      }
      if (typeof exoticToPrim !== 'undefined') {
        var result = exoticToPrim.call(input, hint);
        if (isPrimitive(result)) {
          return result;
        }
        throw new TypeError('unable to convert exotic object to primitive');
      }
      if (hint === 'default' && (isDate(input) || isSymbol(input))) {
        hint = 'string';
      }
      return ordinaryToPrimitive(input, hint === 'default' ? 'number' : hint);
    };
  }, {
    "./helpers/isPrimitive": 34,
    "is-callable": 37,
    "is-date-object": 38,
    "is-symbol": 40
  }],
  34: [function(require, module, exports) {
    arguments[4][29][0].apply(exports, arguments);
  }, {"dup": 29}],
  35: [function(require, module, exports) {
    var hasOwn = Object.prototype.hasOwnProperty;
    var toString = Object.prototype.toString;
    module.exports = function forEach(obj, fn, ctx) {
      if (toString.call(fn) !== '[object Function]') {
        throw new TypeError('iterator must be a function');
      }
      var l = obj.length;
      if (l === +l) {
        for (var i = 0; i < l; i++) {
          fn.call(ctx, obj[i], i, obj);
        }
      } else {
        for (var k in obj) {
          if (hasOwn.call(obj, k)) {
            fn.call(ctx, obj[k], k, obj);
          }
        }
      }
    };
  }, {}],
  36: [function(require, module, exports) {
    var ERROR_MESSAGE = 'Function.prototype.bind called on incompatible ';
    var slice = Array.prototype.slice;
    var toStr = Object.prototype.toString;
    var funcType = '[object Function]';
    module.exports = function bind(that) {
      var target = this;
      if (typeof target !== 'function' || toStr.call(target) !== funcType) {
        throw new TypeError(ERROR_MESSAGE + target);
      }
      var args = slice.call(arguments, 1);
      var binder = function() {
        if (this instanceof bound) {
          var result = target.apply(this, args.concat(slice.call(arguments)));
          if (Object(result) === result) {
            return result;
          }
          return this;
        } else {
          return target.apply(that, args.concat(slice.call(arguments)));
        }
      };
      var boundLength = Math.max(0, target.length - args.length);
      var boundArgs = [];
      for (var i = 0; i < boundLength; i++) {
        boundArgs.push('$' + i);
      }
      var bound = Function('binder', 'return function (' + boundArgs.join(',') + '){ return binder.apply(this,arguments); }')(binder);
      if (target.prototype) {
        var Empty = function Empty() {};
        Empty.prototype = target.prototype;
        bound.prototype = new Empty();
        Empty.prototype = null;
      }
      return bound;
    };
  }, {}],
  37: [function(require, module, exports) {
    'use strict';
    var fnToStr = Function.prototype.toString;
    var tryFunctionObject = function tryFunctionObject(value) {
      try {
        fnToStr.call(value);
        return true;
      } catch (e) {
        return false;
      }
    };
    var toStr = Object.prototype.toString;
    var fnClass = '[object Function]';
    var genClass = '[object GeneratorFunction]';
    var constructorRegex = /\s*class /;
    var hasToStringTag = typeof Symbol === 'function' && typeof Symbol.toStringTag === 'symbol';
    module.exports = function isCallable(value) {
      if (!value) {
        return false;
      }
      if (typeof value !== 'function' && typeof value !== 'object') {
        return false;
      }
      if (constructorRegex.test(value)) {
        return false;
      }
      if (hasToStringTag) {
        return tryFunctionObject(value);
      }
      var strClass = toStr.call(value);
      return strClass === fnClass || strClass === genClass;
    };
  }, {}],
  38: [function(require, module, exports) {
    'use strict';
    var getDay = Date.prototype.getDay;
    var tryDateObject = function tryDateObject(value) {
      try {
        getDay.call(value);
        return true;
      } catch (e) {
        return false;
      }
    };
    var toStr = Object.prototype.toString;
    var dateClass = '[object Date]';
    var hasToStringTag = typeof Symbol === 'function' && typeof Symbol.toStringTag === 'symbol';
    module.exports = function isDateObject(value) {
      if (typeof value !== 'object' || value === null) {
        return false;
      }
      return hasToStringTag ? tryDateObject(value) : toStr.call(value) === dateClass;
    };
  }, {}],
  39: [function(require, module, exports) {
    'use strict';
    var regexExec = RegExp.prototype.exec;
    var tryRegexExec = function tryRegexExec(value) {
      try {
        regexExec.call(value);
        return true;
      } catch (e) {
        return false;
      }
    };
    var toStr = Object.prototype.toString;
    var regexClass = '[object RegExp]';
    var hasToStringTag = typeof Symbol === 'function' && typeof Symbol.toStringTag === 'symbol';
    module.exports = function isRegex(value) {
      if (typeof value !== 'object') {
        return false;
      }
      return hasToStringTag ? tryRegexExec(value) : toStr.call(value) === regexClass;
    };
  }, {}],
  40: [function(require, module, exports) {
    'use strict';
    var toStr = Object.prototype.toString;
    var hasSymbols = typeof Symbol === 'function' && typeof Symbol() === 'symbol';
    if (hasSymbols) {
      var symToStr = Symbol.prototype.toString;
      var symStringRegex = /^Symbol\(.*\)$/;
      var isSymbolObject = function isSymbolObject(value) {
        if (typeof value.valueOf() !== 'symbol') {
          return false;
        }
        return symStringRegex.test(symToStr.call(value));
      };
      module.exports = function isSymbol(value) {
        if (typeof value === 'symbol') {
          return true;
        }
        if (toStr.call(value) !== '[object Symbol]') {
          return false;
        }
        try {
          return isSymbolObject(value);
        } catch (e) {
          return false;
        }
      };
    } else {
      module.exports = function isSymbol(value) {
        return false;
      };
    }
  }, {}],
  41: [function(require, module, exports) {
    'use strict';
    var has = Object.prototype.hasOwnProperty;
    var toStr = Object.prototype.toString;
    var slice = Array.prototype.slice;
    var isArgs = require('./isArguments');
    var hasDontEnumBug = !({toString: null}).propertyIsEnumerable('toString');
    var hasProtoEnumBug = function() {}.propertyIsEnumerable('prototype');
    var dontEnums = ['toString', 'toLocaleString', 'valueOf', 'hasOwnProperty', 'isPrototypeOf', 'propertyIsEnumerable', 'constructor'];
    var equalsConstructorPrototype = function(o) {
      var ctor = o.constructor;
      return ctor && ctor.prototype === o;
    };
    var blacklistedKeys = {
      $console: true,
      $frame: true,
      $frameElement: true,
      $frames: true,
      $parent: true,
      $self: true,
      $webkitIndexedDB: true,
      $webkitStorageInfo: true,
      $window: true
    };
    var hasAutomationEqualityBug = (function() {
      if (typeof window === 'undefined') {
        return false;
      }
      for (var k in window) {
        try {
          if (!blacklistedKeys['$' + k] && has.call(window, k) && window[k] !== null && typeof window[k] === 'object') {
            try {
              equalsConstructorPrototype(window[k]);
            } catch (e) {
              return true;
            }
          }
        } catch (e) {
          return true;
        }
      }
      return false;
    }());
    var equalsConstructorPrototypeIfNotBuggy = function(o) {
      if (typeof window === 'undefined' || !hasAutomationEqualityBug) {
        return equalsConstructorPrototype(o);
      }
      try {
        return equalsConstructorPrototype(o);
      } catch (e) {
        return false;
      }
    };
    var keysShim = function keys(object) {
      var isObject = object !== null && typeof object === 'object';
      var isFunction = toStr.call(object) === '[object Function]';
      var isArguments = isArgs(object);
      var isString = isObject && toStr.call(object) === '[object String]';
      var theKeys = [];
      if (!isObject && !isFunction && !isArguments) {
        throw new TypeError('Object.keys called on a non-object');
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
        var skipConstructor = equalsConstructorPrototypeIfNotBuggy(object);
        for (var k = 0; k < dontEnums.length; ++k) {
          if (!(skipConstructor && dontEnums[k] === 'constructor') && has.call(object, dontEnums[k])) {
            theKeys.push(dontEnums[k]);
          }
        }
      }
      return theKeys;
    };
    keysShim.shim = function shimObjectKeys() {
      if (Object.keys) {
        var keysWorksWithArguments = (function() {
          return (Object.keys(arguments) || '').length === 2;
        }(1, 2));
        if (!keysWorksWithArguments) {
          var originalKeys = Object.keys;
          Object.keys = function keys(object) {
            if (isArgs(object)) {
              return originalKeys(slice.call(object));
            } else {
              return originalKeys(object);
            }
          };
        }
      } else {
        Object.keys = keysShim;
      }
      return Object.keys || keysShim;
    };
    module.exports = keysShim;
  }, {"./isArguments": 42}],
  42: [function(require, module, exports) {
    'use strict';
    var toStr = Object.prototype.toString;
    module.exports = function isArguments(value) {
      var str = toStr.call(value);
      var isArgs = str === '[object Arguments]';
      if (!isArgs) {
        isArgs = str !== '[object Array]' && value !== null && typeof value === 'object' && typeof value.length === 'number' && value.length >= 0 && toStr.call(value.callee) === '[object Function]';
      }
      return isArgs;
    };
  }, {}],
  43: [function(require, module, exports) {
    'use strict';
    var implementation = require('./implementation');
    module.exports = function getPolyfill() {
      return Array.prototype.includes || implementation;
    };
  }, {"./implementation": 22}],
  44: [function(require, module, exports) {
    'use strict';
    var define = require('define-properties');
    var getPolyfill = require('./polyfill');
    module.exports = function shimArrayPrototypeIncludes() {
      var polyfill = getPolyfill();
      if (Array.prototype.includes !== polyfill) {
        define(Array.prototype, {includes: polyfill});
      }
      return polyfill;
    };
  }, {
    "./polyfill": 43,
    "define-properties": 24
  }],
  45: [function(require, module, exports) {
    'use strict';
    var ES = require('es-abstract/es7');
    var define = require('define-properties');
    var hasMaps = typeof Map !== 'undefined' && ES.IsCallable(Map);
    var mapEntries;
    if (hasMaps) {
      mapEntries = Map.prototype.entries;
    }
    var iterateWithWhile = function(map, receive) {
      var entries = mapEntries.call(map);
      var next;
      do {
        next = entries.next();
      } while (!next.done && receive(next.value));
    };
    var iterate = (function() {
      try {
        return Function('mapEntries', 'map', 'receive', 'for (var entry of mapEntries.call(map)) { receive(entry); }').bind(null, mapEntries);
      } catch (e) {}
      return iterateWithWhile;
    }());
    var requireMap = function requireMap() {
      if (!hasMaps) {
        throw new TypeError('Map.prototype.toJSON requires Map (either native, or polyfilled with es6-shim)');
      }
    };
    var mapToJSONshim = function toJSON() {
      ES.RequireObjectCoercible(this);
      requireMap();
      var entries = [];
      iterate(this, Array.prototype.push.bind(entries));
      return entries;
    };
    var boundMapToJSON = function mapToJSON(map) {
      ES.RequireObjectCoercible(map);
      return mapToJSONshim.call(map);
    };
    define(boundMapToJSON, {
      method: mapToJSONshim,
      shim: function shimMapPrototypeToJSON() {
        requireMap();
        define(Map.prototype, {toJSON: mapToJSONshim});
        return Map.prototype.toJSON;
      }
    });
    module.exports = boundMapToJSON;
  }, {
    "define-properties": 46,
    "es-abstract/es7": 49
  }],
  46: [function(require, module, exports) {
    arguments[4][24][0].apply(exports, arguments);
  }, {
    "dup": 24,
    "foreach": 58,
    "object-keys": 64
  }],
  47: [function(require, module, exports) {
    arguments[4][25][0].apply(exports, arguments);
  }, {
    "./helpers/isFinite": 51,
    "./helpers/mod": 53,
    "./helpers/sign": 54,
    "dup": 25,
    "es-to-primitive/es5": 55,
    "is-callable": 60
  }],
  48: [function(require, module, exports) {
    arguments[4][26][0].apply(exports, arguments);
  }, {
    "./es5": 47,
    "./helpers/assign": 50,
    "./helpers/isFinite": 51,
    "./helpers/isPrimitive": 52,
    "./helpers/mod": 53,
    "./helpers/sign": 54,
    "dup": 26,
    "es-to-primitive/es6": 56,
    "function-bind": 59,
    "is-regex": 62
  }],
  49: [function(require, module, exports) {
    'use strict';
    var ES6 = require('./es6');
    var assign = require('./helpers/assign');
    var ES7 = assign(ES6, {SameValueNonNumber: function SameValueNonNumber(x, y) {
        if (typeof x === 'number' || typeof x !== typeof y) {
          throw new TypeError('SameValueNonNumber requires two non-number values of the same type.');
        }
        return this.SameValue(x, y);
      }});
    module.exports = ES7;
  }, {
    "./es6": 48,
    "./helpers/assign": 50
  }],
  50: [function(require, module, exports) {
    arguments[4][27][0].apply(exports, arguments);
  }, {"dup": 27}],
  51: [function(require, module, exports) {
    arguments[4][28][0].apply(exports, arguments);
  }, {"dup": 28}],
  52: [function(require, module, exports) {
    arguments[4][29][0].apply(exports, arguments);
  }, {"dup": 29}],
  53: [function(require, module, exports) {
    arguments[4][30][0].apply(exports, arguments);
  }, {"dup": 30}],
  54: [function(require, module, exports) {
    arguments[4][31][0].apply(exports, arguments);
  }, {"dup": 31}],
  55: [function(require, module, exports) {
    arguments[4][32][0].apply(exports, arguments);
  }, {
    "./helpers/isPrimitive": 57,
    "dup": 32,
    "is-callable": 60
  }],
  56: [function(require, module, exports) {
    arguments[4][33][0].apply(exports, arguments);
  }, {
    "./helpers/isPrimitive": 57,
    "dup": 33,
    "is-callable": 60,
    "is-date-object": 61,
    "is-symbol": 63
  }],
  57: [function(require, module, exports) {
    arguments[4][29][0].apply(exports, arguments);
  }, {"dup": 29}],
  58: [function(require, module, exports) {
    arguments[4][35][0].apply(exports, arguments);
  }, {"dup": 35}],
  59: [function(require, module, exports) {
    arguments[4][36][0].apply(exports, arguments);
  }, {"dup": 36}],
  60: [function(require, module, exports) {
    arguments[4][37][0].apply(exports, arguments);
  }, {"dup": 37}],
  61: [function(require, module, exports) {
    arguments[4][38][0].apply(exports, arguments);
  }, {"dup": 38}],
  62: [function(require, module, exports) {
    arguments[4][39][0].apply(exports, arguments);
  }, {"dup": 39}],
  63: [function(require, module, exports) {
    arguments[4][40][0].apply(exports, arguments);
  }, {"dup": 40}],
  64: [function(require, module, exports) {
    arguments[4][41][0].apply(exports, arguments);
  }, {
    "./isArguments": 65,
    "dup": 41
  }],
  65: [function(require, module, exports) {
    arguments[4][42][0].apply(exports, arguments);
  }, {"dup": 42}],
  66: [function(require, module, exports) {
    'use strict';
    var ES = require('es-abstract/es7');
    var has = require('has');
    var bind = require('function-bind');
    var isEnumerable = bind.call(Function.call, Object.prototype.propertyIsEnumerable);
    module.exports = function entries(O) {
      var obj = ES.RequireObjectCoercible(O);
      var entrys = [];
      for (var key in obj) {
        if (has(obj, key) && isEnumerable(obj, key)) {
          entrys.push([key, obj[key]]);
        }
      }
      return entrys;
    };
  }, {
    "es-abstract/es7": 71,
    "function-bind": 81,
    "has": 82
  }],
  67: [function(require, module, exports) {
    'use strict';
    var define = require('define-properties');
    var implementation = require('./implementation');
    var getPolyfill = require('./polyfill');
    var shim = require('./shim');
    define(implementation, {
      getPolyfill: getPolyfill,
      implementation: implementation,
      shim: shim
    });
    module.exports = implementation;
  }, {
    "./implementation": 66,
    "./polyfill": 89,
    "./shim": 90,
    "define-properties": 68
  }],
  68: [function(require, module, exports) {
    arguments[4][24][0].apply(exports, arguments);
  }, {
    "dup": 24,
    "foreach": 80,
    "object-keys": 87
  }],
  69: [function(require, module, exports) {
    arguments[4][25][0].apply(exports, arguments);
  }, {
    "./helpers/isFinite": 73,
    "./helpers/mod": 75,
    "./helpers/sign": 76,
    "dup": 25,
    "es-to-primitive/es5": 77,
    "is-callable": 83
  }],
  70: [function(require, module, exports) {
    arguments[4][26][0].apply(exports, arguments);
  }, {
    "./es5": 69,
    "./helpers/assign": 72,
    "./helpers/isFinite": 73,
    "./helpers/isPrimitive": 74,
    "./helpers/mod": 75,
    "./helpers/sign": 76,
    "dup": 26,
    "es-to-primitive/es6": 78,
    "function-bind": 81,
    "is-regex": 85
  }],
  71: [function(require, module, exports) {
    arguments[4][49][0].apply(exports, arguments);
  }, {
    "./es6": 70,
    "./helpers/assign": 72,
    "dup": 49
  }],
  72: [function(require, module, exports) {
    arguments[4][27][0].apply(exports, arguments);
  }, {"dup": 27}],
  73: [function(require, module, exports) {
    arguments[4][28][0].apply(exports, arguments);
  }, {"dup": 28}],
  74: [function(require, module, exports) {
    arguments[4][29][0].apply(exports, arguments);
  }, {"dup": 29}],
  75: [function(require, module, exports) {
    arguments[4][30][0].apply(exports, arguments);
  }, {"dup": 30}],
  76: [function(require, module, exports) {
    arguments[4][31][0].apply(exports, arguments);
  }, {"dup": 31}],
  77: [function(require, module, exports) {
    arguments[4][32][0].apply(exports, arguments);
  }, {
    "./helpers/isPrimitive": 79,
    "dup": 32,
    "is-callable": 83
  }],
  78: [function(require, module, exports) {
    arguments[4][33][0].apply(exports, arguments);
  }, {
    "./helpers/isPrimitive": 79,
    "dup": 33,
    "is-callable": 83,
    "is-date-object": 84,
    "is-symbol": 86
  }],
  79: [function(require, module, exports) {
    arguments[4][29][0].apply(exports, arguments);
  }, {"dup": 29}],
  80: [function(require, module, exports) {
    arguments[4][35][0].apply(exports, arguments);
  }, {"dup": 35}],
  81: [function(require, module, exports) {
    arguments[4][36][0].apply(exports, arguments);
  }, {"dup": 36}],
  82: [function(require, module, exports) {
    var bind = require('function-bind');
    module.exports = bind.call(Function.call, Object.prototype.hasOwnProperty);
  }, {"function-bind": 81}],
  83: [function(require, module, exports) {
    arguments[4][37][0].apply(exports, arguments);
  }, {"dup": 37}],
  84: [function(require, module, exports) {
    arguments[4][38][0].apply(exports, arguments);
  }, {"dup": 38}],
  85: [function(require, module, exports) {
    arguments[4][39][0].apply(exports, arguments);
  }, {"dup": 39}],
  86: [function(require, module, exports) {
    arguments[4][40][0].apply(exports, arguments);
  }, {"dup": 40}],
  87: [function(require, module, exports) {
    arguments[4][41][0].apply(exports, arguments);
  }, {
    "./isArguments": 88,
    "dup": 41
  }],
  88: [function(require, module, exports) {
    arguments[4][42][0].apply(exports, arguments);
  }, {"dup": 42}],
  89: [function(require, module, exports) {
    'use strict';
    var implementation = require('./implementation');
    module.exports = function getPolyfill() {
      return typeof Object.entries === 'function' ? Object.entries : implementation;
    };
  }, {"./implementation": 66}],
  90: [function(require, module, exports) {
    'use strict';
    var getPolyfill = require('./polyfill');
    var define = require('define-properties');
    module.exports = function shimEntries() {
      var polyfill = getPolyfill();
      define(Object, {entries: polyfill}, {entries: function() {
          return Object.entries !== polyfill;
        }});
      return polyfill;
    };
  }, {
    "./polyfill": 89,
    "define-properties": 68
  }],
  91: [function(require, module, exports) {
    'use strict';
    var define = require('define-properties');
    var ES = require('es-abstract/es7');
    var getDescriptor = Object.getOwnPropertyDescriptor;
    var getOwnNames = Object.getOwnPropertyNames;
    var getSymbols = Object.getOwnPropertySymbols;
    var concat = Function.call.bind(Array.prototype.concat);
    var reduce = Function.call.bind(Array.prototype.reduce);
    var getAll = !getSymbols ? getOwnNames : function(obj) {
      return concat(getOwnNames(obj), getSymbols(obj));
    };
    var isES5 = ES.IsCallable(getDescriptor) && ES.IsCallable(getOwnNames);
    var getDescriptorsShim = function getOwnPropertyDescriptors(value) {
      ES.RequireObjectCoercible(value);
      if (!isES5) {
        throw new TypeError('getOwnPropertyDescriptors requires Object.getOwnPropertyDescriptor');
      }
      var O = ES.ToObject(value);
      return reduce(getAll(O), function(acc, key) {
        acc[key] = getDescriptor(O, key);
        return acc;
      }, {});
    };
    define(getDescriptorsShim, {
      method: getDescriptorsShim,
      shim: function shimGetOwnPropertyDescriptors() {
        if (isES5) {
          define(Object, {getOwnPropertyDescriptors: getDescriptorsShim});
          return Object.getOwnPropertyDescriptors || getDescriptorsShim;
        }
      }
    });
    module.exports = getDescriptorsShim;
  }, {
    "define-properties": 92,
    "es-abstract/es7": 95
  }],
  92: [function(require, module, exports) {
    arguments[4][24][0].apply(exports, arguments);
  }, {
    "dup": 24,
    "foreach": 104,
    "object-keys": 110
  }],
  93: [function(require, module, exports) {
    arguments[4][25][0].apply(exports, arguments);
  }, {
    "./helpers/isFinite": 97,
    "./helpers/mod": 99,
    "./helpers/sign": 100,
    "dup": 25,
    "es-to-primitive/es5": 101,
    "is-callable": 106
  }],
  94: [function(require, module, exports) {
    arguments[4][26][0].apply(exports, arguments);
  }, {
    "./es5": 93,
    "./helpers/assign": 96,
    "./helpers/isFinite": 97,
    "./helpers/isPrimitive": 98,
    "./helpers/mod": 99,
    "./helpers/sign": 100,
    "dup": 26,
    "es-to-primitive/es6": 102,
    "function-bind": 105,
    "is-regex": 108
  }],
  95: [function(require, module, exports) {
    arguments[4][49][0].apply(exports, arguments);
  }, {
    "./es6": 94,
    "./helpers/assign": 96,
    "dup": 49
  }],
  96: [function(require, module, exports) {
    arguments[4][27][0].apply(exports, arguments);
  }, {"dup": 27}],
  97: [function(require, module, exports) {
    arguments[4][28][0].apply(exports, arguments);
  }, {"dup": 28}],
  98: [function(require, module, exports) {
    arguments[4][29][0].apply(exports, arguments);
  }, {"dup": 29}],
  99: [function(require, module, exports) {
    arguments[4][30][0].apply(exports, arguments);
  }, {"dup": 30}],
  100: [function(require, module, exports) {
    arguments[4][31][0].apply(exports, arguments);
  }, {"dup": 31}],
  101: [function(require, module, exports) {
    arguments[4][32][0].apply(exports, arguments);
  }, {
    "./helpers/isPrimitive": 103,
    "dup": 32,
    "is-callable": 106
  }],
  102: [function(require, module, exports) {
    arguments[4][33][0].apply(exports, arguments);
  }, {
    "./helpers/isPrimitive": 103,
    "dup": 33,
    "is-callable": 106,
    "is-date-object": 107,
    "is-symbol": 109
  }],
  103: [function(require, module, exports) {
    arguments[4][29][0].apply(exports, arguments);
  }, {"dup": 29}],
  104: [function(require, module, exports) {
    arguments[4][35][0].apply(exports, arguments);
  }, {"dup": 35}],
  105: [function(require, module, exports) {
    arguments[4][36][0].apply(exports, arguments);
  }, {"dup": 36}],
  106: [function(require, module, exports) {
    arguments[4][37][0].apply(exports, arguments);
  }, {"dup": 37}],
  107: [function(require, module, exports) {
    arguments[4][38][0].apply(exports, arguments);
  }, {"dup": 38}],
  108: [function(require, module, exports) {
    arguments[4][39][0].apply(exports, arguments);
  }, {"dup": 39}],
  109: [function(require, module, exports) {
    arguments[4][40][0].apply(exports, arguments);
  }, {"dup": 40}],
  110: [function(require, module, exports) {
    arguments[4][41][0].apply(exports, arguments);
  }, {
    "./isArguments": 111,
    "dup": 41
  }],
  111: [function(require, module, exports) {
    arguments[4][42][0].apply(exports, arguments);
  }, {"dup": 42}],
  112: [function(require, module, exports) {
    'use strict';
    var ES = require('es-abstract/es7');
    var has = require('has');
    var bind = require('function-bind');
    var isEnumerable = bind.call(Function.call, Object.prototype.propertyIsEnumerable);
    module.exports = function values(O) {
      var obj = ES.RequireObjectCoercible(O);
      var vals = [];
      for (var key in obj) {
        if (has(obj, key) && isEnumerable(obj, key)) {
          vals.push(obj[key]);
        }
      }
      return vals;
    };
  }, {
    "es-abstract/es7": 117,
    "function-bind": 127,
    "has": 128
  }],
  113: [function(require, module, exports) {
    arguments[4][67][0].apply(exports, arguments);
  }, {
    "./implementation": 112,
    "./polyfill": 135,
    "./shim": 136,
    "define-properties": 114,
    "dup": 67
  }],
  114: [function(require, module, exports) {
    arguments[4][24][0].apply(exports, arguments);
  }, {
    "dup": 24,
    "foreach": 126,
    "object-keys": 133
  }],
  115: [function(require, module, exports) {
    arguments[4][25][0].apply(exports, arguments);
  }, {
    "./helpers/isFinite": 119,
    "./helpers/mod": 121,
    "./helpers/sign": 122,
    "dup": 25,
    "es-to-primitive/es5": 123,
    "is-callable": 129
  }],
  116: [function(require, module, exports) {
    arguments[4][26][0].apply(exports, arguments);
  }, {
    "./es5": 115,
    "./helpers/assign": 118,
    "./helpers/isFinite": 119,
    "./helpers/isPrimitive": 120,
    "./helpers/mod": 121,
    "./helpers/sign": 122,
    "dup": 26,
    "es-to-primitive/es6": 124,
    "function-bind": 127,
    "is-regex": 131
  }],
  117: [function(require, module, exports) {
    arguments[4][49][0].apply(exports, arguments);
  }, {
    "./es6": 116,
    "./helpers/assign": 118,
    "dup": 49
  }],
  118: [function(require, module, exports) {
    arguments[4][27][0].apply(exports, arguments);
  }, {"dup": 27}],
  119: [function(require, module, exports) {
    arguments[4][28][0].apply(exports, arguments);
  }, {"dup": 28}],
  120: [function(require, module, exports) {
    arguments[4][29][0].apply(exports, arguments);
  }, {"dup": 29}],
  121: [function(require, module, exports) {
    arguments[4][30][0].apply(exports, arguments);
  }, {"dup": 30}],
  122: [function(require, module, exports) {
    arguments[4][31][0].apply(exports, arguments);
  }, {"dup": 31}],
  123: [function(require, module, exports) {
    arguments[4][32][0].apply(exports, arguments);
  }, {
    "./helpers/isPrimitive": 125,
    "dup": 32,
    "is-callable": 129
  }],
  124: [function(require, module, exports) {
    arguments[4][33][0].apply(exports, arguments);
  }, {
    "./helpers/isPrimitive": 125,
    "dup": 33,
    "is-callable": 129,
    "is-date-object": 130,
    "is-symbol": 132
  }],
  125: [function(require, module, exports) {
    arguments[4][29][0].apply(exports, arguments);
  }, {"dup": 29}],
  126: [function(require, module, exports) {
    arguments[4][35][0].apply(exports, arguments);
  }, {"dup": 35}],
  127: [function(require, module, exports) {
    arguments[4][36][0].apply(exports, arguments);
  }, {"dup": 36}],
  128: [function(require, module, exports) {
    arguments[4][82][0].apply(exports, arguments);
  }, {
    "dup": 82,
    "function-bind": 127
  }],
  129: [function(require, module, exports) {
    arguments[4][37][0].apply(exports, arguments);
  }, {"dup": 37}],
  130: [function(require, module, exports) {
    arguments[4][38][0].apply(exports, arguments);
  }, {"dup": 38}],
  131: [function(require, module, exports) {
    arguments[4][39][0].apply(exports, arguments);
  }, {"dup": 39}],
  132: [function(require, module, exports) {
    arguments[4][40][0].apply(exports, arguments);
  }, {"dup": 40}],
  133: [function(require, module, exports) {
    arguments[4][41][0].apply(exports, arguments);
  }, {
    "./isArguments": 134,
    "dup": 41
  }],
  134: [function(require, module, exports) {
    arguments[4][42][0].apply(exports, arguments);
  }, {"dup": 42}],
  135: [function(require, module, exports) {
    'use strict';
    var implementation = require('./implementation');
    module.exports = function getPolyfill() {
      return typeof Object.values === 'function' ? Object.values : implementation;
    };
  }, {"./implementation": 112}],
  136: [function(require, module, exports) {
    'use strict';
    var getPolyfill = require('./polyfill');
    var define = require('define-properties');
    module.exports = function shimValues() {
      var polyfill = getPolyfill();
      define(Object, {values: polyfill}, {values: function() {
          return Object.values !== polyfill;
        }});
      return polyfill;
    };
  }, {
    "./polyfill": 135,
    "define-properties": 114
  }],
  137: [function(require, module, exports) {
    'use strict';
    var define = require('define-properties');
    var ES = require('es-abstract/es7');
    var bind = require('function-bind');
    var replace = bind.call(Function.call, String.prototype.replace);
    var syntaxChars = /[\^\$\\\.\*\+\?\(\)\[\]\{\}\|]/g;
    var escapeShim = function escape(S) {
      return replace(ES.ToString(S), syntaxChars, '\\$&');
    };
    define(escapeShim, {
      method: escapeShim,
      shim: function shimRegExpEscape() {
        define(RegExp, {escape: escapeShim});
        return RegExp.escape;
      }
    });
    module.exports = escapeShim;
  }, {
    "define-properties": 138,
    "es-abstract/es7": 141,
    "function-bind": 151
  }],
  138: [function(require, module, exports) {
    arguments[4][24][0].apply(exports, arguments);
  }, {
    "dup": 24,
    "foreach": 150,
    "object-keys": 156
  }],
  139: [function(require, module, exports) {
    arguments[4][25][0].apply(exports, arguments);
  }, {
    "./helpers/isFinite": 143,
    "./helpers/mod": 145,
    "./helpers/sign": 146,
    "dup": 25,
    "es-to-primitive/es5": 147,
    "is-callable": 152
  }],
  140: [function(require, module, exports) {
    arguments[4][26][0].apply(exports, arguments);
  }, {
    "./es5": 139,
    "./helpers/assign": 142,
    "./helpers/isFinite": 143,
    "./helpers/isPrimitive": 144,
    "./helpers/mod": 145,
    "./helpers/sign": 146,
    "dup": 26,
    "es-to-primitive/es6": 148,
    "function-bind": 151,
    "is-regex": 154
  }],
  141: [function(require, module, exports) {
    arguments[4][49][0].apply(exports, arguments);
  }, {
    "./es6": 140,
    "./helpers/assign": 142,
    "dup": 49
  }],
  142: [function(require, module, exports) {
    arguments[4][27][0].apply(exports, arguments);
  }, {"dup": 27}],
  143: [function(require, module, exports) {
    arguments[4][28][0].apply(exports, arguments);
  }, {"dup": 28}],
  144: [function(require, module, exports) {
    arguments[4][29][0].apply(exports, arguments);
  }, {"dup": 29}],
  145: [function(require, module, exports) {
    arguments[4][30][0].apply(exports, arguments);
  }, {"dup": 30}],
  146: [function(require, module, exports) {
    arguments[4][31][0].apply(exports, arguments);
  }, {"dup": 31}],
  147: [function(require, module, exports) {
    arguments[4][32][0].apply(exports, arguments);
  }, {
    "./helpers/isPrimitive": 149,
    "dup": 32,
    "is-callable": 152
  }],
  148: [function(require, module, exports) {
    arguments[4][33][0].apply(exports, arguments);
  }, {
    "./helpers/isPrimitive": 149,
    "dup": 33,
    "is-callable": 152,
    "is-date-object": 153,
    "is-symbol": 155
  }],
  149: [function(require, module, exports) {
    arguments[4][29][0].apply(exports, arguments);
  }, {"dup": 29}],
  150: [function(require, module, exports) {
    arguments[4][35][0].apply(exports, arguments);
  }, {"dup": 35}],
  151: [function(require, module, exports) {
    arguments[4][36][0].apply(exports, arguments);
  }, {"dup": 36}],
  152: [function(require, module, exports) {
    arguments[4][37][0].apply(exports, arguments);
  }, {"dup": 37}],
  153: [function(require, module, exports) {
    arguments[4][38][0].apply(exports, arguments);
  }, {"dup": 38}],
  154: [function(require, module, exports) {
    arguments[4][39][0].apply(exports, arguments);
  }, {"dup": 39}],
  155: [function(require, module, exports) {
    arguments[4][40][0].apply(exports, arguments);
  }, {"dup": 40}],
  156: [function(require, module, exports) {
    arguments[4][41][0].apply(exports, arguments);
  }, {
    "./isArguments": 157,
    "dup": 41
  }],
  157: [function(require, module, exports) {
    arguments[4][42][0].apply(exports, arguments);
  }, {"dup": 42}],
  158: [function(require, module, exports) {
    'use strict';
    var ES = require('es-abstract/es7');
    var define = require('define-properties');
    var hasSets = typeof Set !== 'undefined' && ES.IsCallable(Set);
    var setValues;
    if (hasSets) {
      setValues = Set.prototype.values;
    }
    var push = Array.prototype.push;
    var iterateWithWhile = function(set, receive) {
      var values = setValues.call(set);
      var next;
      do {
        next = values.next();
      } while (!next.done && receive(next.value));
    };
    var iterate = (function() {
      try {
        return Function('setValues', 'set', 'receive', 'for (var value of setValues.call(set)) { receive(value); }').bind(null, setValues);
      } catch (e) {}
      return iterateWithWhile;
    }());
    var requireSet = function requireSet() {
      if (!hasSets) {
        throw new TypeError('Set.prototype.toJSON requires Set (either native, or polyfilled with es6-shim)');
      }
    };
    var setToJSONshim = function toJSON() {
      ES.RequireObjectCoercible(this);
      requireSet();
      var values = [];
      iterate(this, push.bind(values));
      return values;
    };
    var boundSetToJSON = function setToJSON(set) {
      ES.RequireObjectCoercible(set);
      return setToJSONshim.call(set);
    };
    define(boundSetToJSON, {
      method: setToJSONshim,
      shim: function shimSetPrototypeToJSON() {
        requireSet();
        define(Set.prototype, {toJSON: setToJSONshim});
        return Set.prototype.toJSON;
      }
    });
    module.exports = boundSetToJSON;
  }, {
    "define-properties": 159,
    "es-abstract/es7": 162
  }],
  159: [function(require, module, exports) {
    arguments[4][24][0].apply(exports, arguments);
  }, {
    "dup": 24,
    "foreach": 171,
    "object-keys": 177
  }],
  160: [function(require, module, exports) {
    arguments[4][25][0].apply(exports, arguments);
  }, {
    "./helpers/isFinite": 164,
    "./helpers/mod": 166,
    "./helpers/sign": 167,
    "dup": 25,
    "es-to-primitive/es5": 168,
    "is-callable": 173
  }],
  161: [function(require, module, exports) {
    arguments[4][26][0].apply(exports, arguments);
  }, {
    "./es5": 160,
    "./helpers/assign": 163,
    "./helpers/isFinite": 164,
    "./helpers/isPrimitive": 165,
    "./helpers/mod": 166,
    "./helpers/sign": 167,
    "dup": 26,
    "es-to-primitive/es6": 169,
    "function-bind": 172,
    "is-regex": 175
  }],
  162: [function(require, module, exports) {
    arguments[4][49][0].apply(exports, arguments);
  }, {
    "./es6": 161,
    "./helpers/assign": 163,
    "dup": 49
  }],
  163: [function(require, module, exports) {
    arguments[4][27][0].apply(exports, arguments);
  }, {"dup": 27}],
  164: [function(require, module, exports) {
    arguments[4][28][0].apply(exports, arguments);
  }, {"dup": 28}],
  165: [function(require, module, exports) {
    arguments[4][29][0].apply(exports, arguments);
  }, {"dup": 29}],
  166: [function(require, module, exports) {
    arguments[4][30][0].apply(exports, arguments);
  }, {"dup": 30}],
  167: [function(require, module, exports) {
    arguments[4][31][0].apply(exports, arguments);
  }, {"dup": 31}],
  168: [function(require, module, exports) {
    arguments[4][32][0].apply(exports, arguments);
  }, {
    "./helpers/isPrimitive": 170,
    "dup": 32,
    "is-callable": 173
  }],
  169: [function(require, module, exports) {
    arguments[4][33][0].apply(exports, arguments);
  }, {
    "./helpers/isPrimitive": 170,
    "dup": 33,
    "is-callable": 173,
    "is-date-object": 174,
    "is-symbol": 176
  }],
  170: [function(require, module, exports) {
    arguments[4][29][0].apply(exports, arguments);
  }, {"dup": 29}],
  171: [function(require, module, exports) {
    arguments[4][35][0].apply(exports, arguments);
  }, {"dup": 35}],
  172: [function(require, module, exports) {
    arguments[4][36][0].apply(exports, arguments);
  }, {"dup": 36}],
  173: [function(require, module, exports) {
    arguments[4][37][0].apply(exports, arguments);
  }, {"dup": 37}],
  174: [function(require, module, exports) {
    arguments[4][38][0].apply(exports, arguments);
  }, {"dup": 38}],
  175: [function(require, module, exports) {
    arguments[4][39][0].apply(exports, arguments);
  }, {"dup": 39}],
  176: [function(require, module, exports) {
    arguments[4][40][0].apply(exports, arguments);
  }, {"dup": 40}],
  177: [function(require, module, exports) {
    arguments[4][41][0].apply(exports, arguments);
  }, {
    "./isArguments": 178,
    "dup": 41
  }],
  178: [function(require, module, exports) {
    arguments[4][42][0].apply(exports, arguments);
  }, {"dup": 42}],
  179: [function(require, module, exports) {
    (function(global) {
      module.exports = function getGlobal() {
        if (typeof window !== 'undefined') {
          return window;
        }
        if (typeof global !== 'undefined') {
          return global;
        }
        if (typeof self !== 'undefined') {
          return self;
        }
        return Function('return this')();
      };
    }).call(this, typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {});
  }, {}],
  180: [function(require, module, exports) {
    var installShim = require('./simd');
    var define = require('define-properties');
    var fakeGlobal = {};
    installShim(fakeGlobal);
    var simd = fakeGlobal.SIMD;
    var getGlobal = require('./getGlobal');
    define(simd, {shim: function shim() {
        var globalObject = getGlobal();
        var predicates = {SIMD: function() {
            return globalObject.SIMD && typeof globalObject.SIMD.float32x4.extractLane !== 'function';
          }};
        define(globalObject, {SIMD: simd}, predicates);
        return globalObject.SIMD || simd;
      }});
    module.exports = simd;
  }, {
    "./getGlobal": 179,
    "./simd": 185,
    "define-properties": 181
  }],
  181: [function(require, module, exports) {
    arguments[4][24][0].apply(exports, arguments);
  }, {
    "dup": 24,
    "foreach": 182,
    "object-keys": 183
  }],
  182: [function(require, module, exports) {
    arguments[4][35][0].apply(exports, arguments);
  }, {"dup": 35}],
  183: [function(require, module, exports) {
    arguments[4][41][0].apply(exports, arguments);
  }, {
    "./isArguments": 184,
    "dup": 41
  }],
  184: [function(require, module, exports) {
    arguments[4][42][0].apply(exports, arguments);
  }, {"dup": 42}],
  185: [function(require, module, exports) {
    module.exports = function(global) {
      if (typeof global.SIMD === "undefined") {
        global.SIMD = {};
      }
      if (typeof module !== "undefined") {}
      var SIMD = global.SIMD;
      var _f32x4 = new Float32Array(4);
      var _f64x2 = new Float64Array(_f32x4.buffer);
      var _i32x4 = new Int32Array(_f32x4.buffer);
      var _i16x8 = new Int16Array(_f32x4.buffer);
      var _i8x16 = new Int8Array(_f32x4.buffer);
      var _f32;
      var truncatef32;
      if (typeof Math.fround !== 'undefined') {
        truncatef32 = Math.fround;
      } else {
        _f32 = new Float32Array(1);
        truncatef32 = function(x) {
          _f32[0] = x;
          return _f32[0];
        };
      }
      function isInt32(o) {
        return (o | 0) === o;
      }
      function isTypedArray(o) {
        return (o instanceof Int8Array) || (o instanceof Uint8Array) || (o instanceof Uint8ClampedArray) || (o instanceof Int16Array) || (o instanceof Uint16Array) || (o instanceof Int32Array) || (o instanceof Uint32Array) || (o instanceof Float32Array) || (o instanceof Float64Array);
      }
      function minNum(x, y) {
        return x != x ? y : y != y ? x : Math.min(x, y);
      }
      function maxNum(x, y) {
        return x != x ? y : y != y ? x : Math.max(x, y);
      }
      function int32FromFloat(x) {
        if (x > -2147483649.0 && x < 2147483648.0)
          return x | 0;
        throw new RangeError("Conversion from floating-point to integer failed");
      }
      function checkLaneIndex(numLanes) {
        return function(lane) {
          if (!isInt32(lane))
            throw new TypeError('lane index must be an int32');
          if (lane < 0 || lane >= numLanes)
            throw new RangeError('lane index must be in bounds');
        };
      }
      var check2 = checkLaneIndex(2);
      var check4 = checkLaneIndex(4);
      var check8 = checkLaneIndex(8);
      var check16 = checkLaneIndex(16);
      var check32 = checkLaneIndex(32);
      function saveBool32x4(x) {
        x = SIMD.Bool32x4.check(x);
        _i32x4[0] = SIMD.Bool32x4.extractLane(x, 0);
        _i32x4[1] = SIMD.Bool32x4.extractLane(x, 1);
        _i32x4[2] = SIMD.Bool32x4.extractLane(x, 2);
        _i32x4[3] = SIMD.Bool32x4.extractLane(x, 3);
      }
      function saveBool16x8(x) {
        x = SIMD.Bool16x8.check(x);
        _i16x8[0] = SIMD.Bool16x8.extractLane(x, 0);
        _i16x8[1] = SIMD.Bool16x8.extractLane(x, 1);
        _i16x8[2] = SIMD.Bool16x8.extractLane(x, 2);
        _i16x8[3] = SIMD.Bool16x8.extractLane(x, 3);
        _i16x8[4] = SIMD.Bool16x8.extractLane(x, 4);
        _i16x8[5] = SIMD.Bool16x8.extractLane(x, 5);
        _i16x8[6] = SIMD.Bool16x8.extractLane(x, 6);
        _i16x8[7] = SIMD.Bool16x8.extractLane(x, 7);
      }
      function saveBool8x16(x) {
        x = SIMD.Bool8x16.check(x);
        _i8x16[0] = SIMD.Bool8x16.extractLane(x, 0);
        _i8x16[1] = SIMD.Bool8x16.extractLane(x, 1);
        _i8x16[2] = SIMD.Bool8x16.extractLane(x, 2);
        _i8x16[3] = SIMD.Bool8x16.extractLane(x, 3);
        _i8x16[4] = SIMD.Bool8x16.extractLane(x, 4);
        _i8x16[5] = SIMD.Bool8x16.extractLane(x, 5);
        _i8x16[6] = SIMD.Bool8x16.extractLane(x, 6);
        _i8x16[7] = SIMD.Bool8x16.extractLane(x, 7);
        _i8x16[8] = SIMD.Bool8x16.extractLane(x, 8);
        _i8x16[9] = SIMD.Bool8x16.extractLane(x, 9);
        _i8x16[10] = SIMD.Bool8x16.extractLane(x, 10);
        _i8x16[11] = SIMD.Bool8x16.extractLane(x, 11);
        _i8x16[12] = SIMD.Bool8x16.extractLane(x, 12);
        _i8x16[13] = SIMD.Bool8x16.extractLane(x, 13);
        _i8x16[14] = SIMD.Bool8x16.extractLane(x, 14);
        _i8x16[15] = SIMD.Bool8x16.extractLane(x, 15);
      }
      function saveFloat64x2(x) {
        x = SIMD.Float64x2.check(x);
        _f64x2[0] = SIMD.Float64x2.extractLane(x, 0);
        _f64x2[1] = SIMD.Float64x2.extractLane(x, 1);
      }
      function saveFloat32x4(x) {
        x = SIMD.Float32x4.check(x);
        _f32x4[0] = SIMD.Float32x4.extractLane(x, 0);
        _f32x4[1] = SIMD.Float32x4.extractLane(x, 1);
        _f32x4[2] = SIMD.Float32x4.extractLane(x, 2);
        _f32x4[3] = SIMD.Float32x4.extractLane(x, 3);
      }
      function saveInt32x4(x) {
        x = SIMD.Int32x4.check(x);
        _i32x4[0] = SIMD.Int32x4.extractLane(x, 0);
        _i32x4[1] = SIMD.Int32x4.extractLane(x, 1);
        _i32x4[2] = SIMD.Int32x4.extractLane(x, 2);
        _i32x4[3] = SIMD.Int32x4.extractLane(x, 3);
      }
      function saveInt16x8(x) {
        x = SIMD.Int16x8.check(x);
        _i16x8[0] = SIMD.Int16x8.extractLane(x, 0);
        _i16x8[1] = SIMD.Int16x8.extractLane(x, 1);
        _i16x8[2] = SIMD.Int16x8.extractLane(x, 2);
        _i16x8[3] = SIMD.Int16x8.extractLane(x, 3);
        _i16x8[4] = SIMD.Int16x8.extractLane(x, 4);
        _i16x8[5] = SIMD.Int16x8.extractLane(x, 5);
        _i16x8[6] = SIMD.Int16x8.extractLane(x, 6);
        _i16x8[7] = SIMD.Int16x8.extractLane(x, 7);
      }
      function saveInt8x16(x) {
        x = SIMD.Int8x16.check(x);
        _i8x16[0] = SIMD.Int8x16.extractLane(x, 0);
        _i8x16[1] = SIMD.Int8x16.extractLane(x, 1);
        _i8x16[2] = SIMD.Int8x16.extractLane(x, 2);
        _i8x16[3] = SIMD.Int8x16.extractLane(x, 3);
        _i8x16[4] = SIMD.Int8x16.extractLane(x, 4);
        _i8x16[5] = SIMD.Int8x16.extractLane(x, 5);
        _i8x16[6] = SIMD.Int8x16.extractLane(x, 6);
        _i8x16[7] = SIMD.Int8x16.extractLane(x, 7);
        _i8x16[8] = SIMD.Int8x16.extractLane(x, 8);
        _i8x16[9] = SIMD.Int8x16.extractLane(x, 9);
        _i8x16[10] = SIMD.Int8x16.extractLane(x, 10);
        _i8x16[11] = SIMD.Int8x16.extractLane(x, 11);
        _i8x16[12] = SIMD.Int8x16.extractLane(x, 12);
        _i8x16[13] = SIMD.Int8x16.extractLane(x, 13);
        _i8x16[14] = SIMD.Int8x16.extractLane(x, 14);
        _i8x16[15] = SIMD.Int8x16.extractLane(x, 15);
      }
      function restoreBool32x4() {
        var alias = _i32x4;
        return SIMD.Bool32x4(alias[0], alias[1], alias[2], alias[3]);
      }
      function restoreBool16x8() {
        var alias = _i16x8;
        return SIMD.Bool16x8(alias[0], alias[1], alias[2], alias[3], alias[4], alias[5], alias[6], alias[7]);
      }
      function restoreBool8x16() {
        var alias = _i8x16;
        return SIMD.Bool8x16(alias[0], alias[1], alias[2], alias[3], alias[4], alias[5], alias[6], alias[7], alias[8], alias[9], alias[10], alias[11], alias[12], alias[13], alias[14], alias[15]);
      }
      function restoreFloat64x2() {
        var alias = _f64x2;
        return SIMD.Float64x2(alias[0], alias[1]);
      }
      function restoreFloat32x4() {
        var alias = _f32x4;
        return SIMD.Float32x4(alias[0], alias[1], alias[2], alias[3]);
      }
      function restoreInt32x4() {
        var alias = _i32x4;
        return SIMD.Int32x4(alias[0], alias[1], alias[2], alias[3]);
      }
      function restoreInt16x8() {
        var alias = _i16x8;
        return SIMD.Int16x8(alias[0], alias[1], alias[2], alias[3], alias[4], alias[5], alias[6], alias[7]);
      }
      function restoreInt8x16() {
        var alias = _i8x16;
        return SIMD.Int8x16(alias[0], alias[1], alias[2], alias[3], alias[4], alias[5], alias[6], alias[7], alias[8], alias[9], alias[10], alias[11], alias[12], alias[13], alias[14], alias[15]);
      }
      if (typeof SIMD.Bool64x2 === "undefined") {
        SIMD.Bool64x2 = function(x, y) {
          if (!(this instanceof SIMD.Bool64x2)) {
            return new SIMD.Bool64x2(x, y);
          }
          this.x_ = !!x;
          this.y_ = !!y;
        };
      }
      if (typeof SIMD.Bool64x2.check === "undefined") {
        SIMD.Bool64x2.check = function(v) {
          if (!(v instanceof SIMD.Bool64x2)) {
            throw new TypeError("argument is not a bool64x2.");
          }
          return v;
        };
      }
      if (typeof SIMD.Bool64x2.splat === "undefined") {
        SIMD.Bool64x2.splat = function(s) {
          return SIMD.Bool64x2(s, s);
        };
      }
      if (typeof SIMD.Bool64x2.extractLane === "undefined") {
        SIMD.Bool64x2.extractLane = function(v, i) {
          v = SIMD.Bool64x2.check(v);
          check2(i);
          switch (i) {
            case 0:
              return v.x_;
            case 1:
              return v.y_;
          }
        };
      }
      if (typeof SIMD.Bool64x2.replaceLane === "undefined") {
        SIMD.Bool64x2.replaceLane = function(v, i, s) {
          v = SIMD.Bool64x2.check(v);
          check2(i);
          return i == 0 ? SIMD.Bool64x2(s, SIMD.Bool64x2.extractLane(v, 1)) : SIMD.Bool64x2(SIMD.Bool64x2.extractLane(v, 0), s);
        };
      }
      if (typeof SIMD.Bool64x2.allTrue === "undefined") {
        SIMD.Bool64x2.allTrue = function(v) {
          v = SIMD.Bool64x2.check(v);
          return SIMD.Bool64x2.extractLane(v, 0) && SIMD.Bool64x2.extractLane(v, 1);
        };
      }
      if (typeof SIMD.Bool64x2.anyTrue === "undefined") {
        SIMD.Bool64x2.anyTrue = function(v) {
          v = SIMD.Bool64x2.check(v);
          return SIMD.Bool64x2.extractLane(v, 0) || SIMD.Bool64x2.extractLane(v, 1);
        };
      }
      if (typeof SIMD.Bool64x2.and === "undefined") {
        SIMD.Bool64x2.and = function(a, b) {
          a = SIMD.Bool64x2.check(a);
          b = SIMD.Bool64x2.check(b);
          return SIMD.Bool64x2(SIMD.Bool64x2.extractLane(a, 0) & SIMD.Bool64x2.extractLane(b, 0), SIMD.Bool64x2.extractLane(a, 1) & SIMD.Bool64x2.extractLane(b, 1));
        };
      }
      if (typeof SIMD.Bool64x2.or === "undefined") {
        SIMD.Bool64x2.or = function(a, b) {
          a = SIMD.Bool64x2.check(a);
          b = SIMD.Bool64x2.check(b);
          return SIMD.Bool64x2(SIMD.Bool64x2.extractLane(a, 0) | SIMD.Bool64x2.extractLane(b, 0), SIMD.Bool64x2.extractLane(a, 1) | SIMD.Bool64x2.extractLane(b, 1));
        };
      }
      if (typeof SIMD.Bool64x2.xor === "undefined") {
        SIMD.Bool64x2.xor = function(a, b) {
          a = SIMD.Bool64x2.check(a);
          b = SIMD.Bool64x2.check(b);
          return SIMD.Bool64x2(SIMD.Bool64x2.extractLane(a, 0) ^ SIMD.Bool64x2.extractLane(b, 0), SIMD.Bool64x2.extractLane(a, 1) ^ SIMD.Bool64x2.extractLane(b, 1));
        };
      }
      if (typeof SIMD.Bool64x2.not === "undefined") {
        SIMD.Bool64x2.not = function(a) {
          a = SIMD.Bool64x2.check(a);
          return SIMD.Bool64x2(!SIMD.Bool64x2.extractLane(a, 0), !SIMD.Bool64x2.extractLane(a, 1));
        };
      }
      if (typeof SIMD.Bool64x2.equal === "undefined") {
        SIMD.Bool64x2.equal = function(a, b) {
          a = SIMD.Bool64x2.check(a);
          b = SIMD.Bool64x2.check(b);
          return SIMD.Bool64x2(SIMD.Bool64x2.extractLane(a, 0) == SIMD.Bool64x2.extractLane(b, 0), SIMD.Bool64x2.extractLane(a, 1) == SIMD.Bool64x2.extractLane(b, 1));
        };
      }
      if (typeof SIMD.Bool64x2.notEqual === "undefined") {
        SIMD.Bool64x2.notEqual = function(a, b) {
          a = SIMD.Bool64x2.check(a);
          b = SIMD.Bool64x2.check(b);
          return SIMD.Bool64x2(SIMD.Bool64x2.extractLane(a, 0) != SIMD.Bool64x2.extractLane(b, 0), SIMD.Bool64x2.extractLane(a, 1) != SIMD.Bool64x2.extractLane(b, 1));
        };
      }
      if (typeof SIMD.Bool64x2.select === "undefined") {
        SIMD.Bool64x2.select = function(mask, trueValue, falseValue) {
          mask = SIMD.Bool64x2.check(mask);
          trueValue = SIMD.Bool64x2.check(trueValue);
          falseValue = SIMD.Bool64x2.check(falseValue);
          var tr = SIMD.Bool64x2.and(mask, trueValue);
          var fr = SIMD.Bool64x2.and(SIMD.Bool64x2.not(mask), falseValue);
          return SIMD.Bool64x2.or(tr, fr);
        };
      }
      if (typeof SIMD.Bool32x4 === "undefined") {
        SIMD.Bool32x4 = function(x, y, z, w) {
          if (!(this instanceof SIMD.Bool32x4)) {
            return new SIMD.Bool32x4(x, y, z, w);
          }
          this.x_ = !!x;
          this.y_ = !!y;
          this.z_ = !!z;
          this.w_ = !!w;
        };
      }
      if (typeof SIMD.Bool32x4.check === "undefined") {
        SIMD.Bool32x4.check = function(v) {
          if (!(v instanceof SIMD.Bool32x4)) {
            throw new TypeError("argument is not a Bool32x4.");
          }
          return v;
        };
      }
      if (typeof SIMD.Bool32x4.splat === "undefined") {
        SIMD.Bool32x4.splat = function(s) {
          return SIMD.Bool32x4(s, s, s, s);
        };
      }
      if (typeof SIMD.Bool32x4.extractLane === "undefined") {
        SIMD.Bool32x4.extractLane = function(v, i) {
          v = SIMD.Bool32x4.check(v);
          check4(i);
          switch (i) {
            case 0:
              return v.x_;
            case 1:
              return v.y_;
            case 2:
              return v.z_;
            case 3:
              return v.w_;
          }
        };
      }
      if (typeof SIMD.Bool32x4.replaceLane === "undefined") {
        SIMD.Bool32x4.replaceLane = function(v, i, s) {
          v = SIMD.Bool32x4.check(v);
          check4(i);
          saveBool32x4(v);
          _i32x4[i] = s;
          return restoreBool32x4();
        };
      }
      if (typeof SIMD.Bool32x4.allTrue === "undefined") {
        SIMD.Bool32x4.allTrue = function(v) {
          v = SIMD.Bool32x4.check(v);
          return SIMD.Bool32x4.extractLane(v, 0) && SIMD.Bool32x4.extractLane(v, 1) && SIMD.Bool32x4.extractLane(v, 2) && SIMD.Bool32x4.extractLane(v, 3);
        };
      }
      if (typeof SIMD.Bool32x4.anyTrue === "undefined") {
        SIMD.Bool32x4.anyTrue = function(v) {
          v = SIMD.Bool32x4.check(v);
          return SIMD.Bool32x4.extractLane(v, 0) || SIMD.Bool32x4.extractLane(v, 1) || SIMD.Bool32x4.extractLane(v, 2) || SIMD.Bool32x4.extractLane(v, 3);
        };
      }
      if (typeof SIMD.Bool32x4.and === "undefined") {
        SIMD.Bool32x4.and = function(a, b) {
          a = SIMD.Bool32x4.check(a);
          b = SIMD.Bool32x4.check(b);
          return SIMD.Bool32x4(SIMD.Bool32x4.extractLane(a, 0) & SIMD.Bool32x4.extractLane(b, 0), SIMD.Bool32x4.extractLane(a, 1) & SIMD.Bool32x4.extractLane(b, 1), SIMD.Bool32x4.extractLane(a, 2) & SIMD.Bool32x4.extractLane(b, 2), SIMD.Bool32x4.extractLane(a, 3) & SIMD.Bool32x4.extractLane(b, 3));
        };
      }
      if (typeof SIMD.Bool32x4.or === "undefined") {
        SIMD.Bool32x4.or = function(a, b) {
          a = SIMD.Bool32x4.check(a);
          b = SIMD.Bool32x4.check(b);
          return SIMD.Bool32x4(SIMD.Bool32x4.extractLane(a, 0) | SIMD.Bool32x4.extractLane(b, 0), SIMD.Bool32x4.extractLane(a, 1) | SIMD.Bool32x4.extractLane(b, 1), SIMD.Bool32x4.extractLane(a, 2) | SIMD.Bool32x4.extractLane(b, 2), SIMD.Bool32x4.extractLane(a, 3) | SIMD.Bool32x4.extractLane(b, 3));
        };
      }
      if (typeof SIMD.Bool32x4.xor === "undefined") {
        SIMD.Bool32x4.xor = function(a, b) {
          a = SIMD.Bool32x4.check(a);
          b = SIMD.Bool32x4.check(b);
          return SIMD.Bool32x4(SIMD.Bool32x4.extractLane(a, 0) ^ SIMD.Bool32x4.extractLane(b, 0), SIMD.Bool32x4.extractLane(a, 1) ^ SIMD.Bool32x4.extractLane(b, 1), SIMD.Bool32x4.extractLane(a, 2) ^ SIMD.Bool32x4.extractLane(b, 2), SIMD.Bool32x4.extractLane(a, 3) ^ SIMD.Bool32x4.extractLane(b, 3));
        };
      }
      if (typeof SIMD.Bool32x4.not === "undefined") {
        SIMD.Bool32x4.not = function(a) {
          a = SIMD.Bool32x4.check(a);
          return SIMD.Bool32x4(!SIMD.Bool32x4.extractLane(a, 0), !SIMD.Bool32x4.extractLane(a, 1), !SIMD.Bool32x4.extractLane(a, 2), !SIMD.Bool32x4.extractLane(a, 3));
        };
      }
      if (typeof SIMD.Bool32x4.equal === "undefined") {
        SIMD.Bool32x4.equal = function(a, b) {
          a = SIMD.Bool32x4.check(a);
          b = SIMD.Bool32x4.check(b);
          return SIMD.Bool32x4(SIMD.Bool32x4.extractLane(a, 0) == SIMD.Bool32x4.extractLane(b, 0), SIMD.Bool32x4.extractLane(a, 1) == SIMD.Bool32x4.extractLane(b, 1), SIMD.Bool32x4.extractLane(a, 2) == SIMD.Bool32x4.extractLane(b, 2), SIMD.Bool32x4.extractLane(a, 3) == SIMD.Bool32x4.extractLane(b, 3));
        };
      }
      if (typeof SIMD.Bool32x4.notEqual === "undefined") {
        SIMD.Bool32x4.notEqual = function(a, b) {
          a = SIMD.Bool32x4.check(a);
          b = SIMD.Bool32x4.check(b);
          return SIMD.Bool32x4(SIMD.Bool32x4.extractLane(a, 0) != SIMD.Bool32x4.extractLane(b, 0), SIMD.Bool32x4.extractLane(a, 1) != SIMD.Bool32x4.extractLane(b, 1), SIMD.Bool32x4.extractLane(a, 2) != SIMD.Bool32x4.extractLane(b, 2), SIMD.Bool32x4.extractLane(a, 3) != SIMD.Bool32x4.extractLane(b, 3));
        };
      }
      if (typeof SIMD.Bool32x4.select === "undefined") {
        SIMD.Bool32x4.select = function(mask, trueValue, falseValue) {
          mask = SIMD.Bool32x4.check(mask);
          trueValue = SIMD.Bool32x4.check(trueValue);
          falseValue = SIMD.Bool32x4.check(falseValue);
          var tr = SIMD.Bool32x4.and(mask, trueValue);
          var fr = SIMD.Bool32x4.and(SIMD.Bool32x4.not(mask), falseValue);
          return SIMD.Bool32x4.or(tr, fr);
        };
      }
      if (typeof SIMD.Bool16x8 === "undefined") {
        SIMD.Bool16x8 = function(s0, s1, s2, s3, s4, s5, s6, s7) {
          if (!(this instanceof SIMD.Bool16x8)) {
            return new SIMD.Bool16x8(s0, s1, s2, s3, s4, s5, s6, s7);
          }
          this.s0_ = !!s0;
          this.s1_ = !!s1;
          this.s2_ = !!s2;
          this.s3_ = !!s3;
          this.s4_ = !!s4;
          this.s5_ = !!s5;
          this.s6_ = !!s6;
          this.s7_ = !!s7;
        };
      }
      if (typeof SIMD.Bool16x8.check === "undefined") {
        SIMD.Bool16x8.check = function(v) {
          if (!(v instanceof SIMD.Bool16x8)) {
            throw new TypeError("argument is not a Bool16x8.");
          }
          return v;
        };
      }
      if (typeof SIMD.Bool16x8.splat === "undefined") {
        SIMD.Bool16x8.splat = function(s) {
          return SIMD.Bool16x8(s, s, s, s, s, s, s, s);
        };
      }
      if (typeof SIMD.Bool16x8.extractLane === "undefined") {
        SIMD.Bool16x8.extractLane = function(v, i) {
          v = SIMD.Bool16x8.check(v);
          check8(i);
          switch (i) {
            case 0:
              return v.s0_;
            case 1:
              return v.s1_;
            case 2:
              return v.s2_;
            case 3:
              return v.s3_;
            case 4:
              return v.s4_;
            case 5:
              return v.s5_;
            case 6:
              return v.s6_;
            case 7:
              return v.s7_;
          }
        };
      }
      if (typeof SIMD.Bool16x8.replaceLane === "undefined") {
        SIMD.Bool16x8.replaceLane = function(v, i, s) {
          v = SIMD.Bool16x8.check(v);
          check8(i);
          saveBool16x8(v);
          _i16x8[i] = s;
          return restoreBool16x8();
        };
      }
      if (typeof SIMD.Bool16x8.allTrue === "undefined") {
        SIMD.Bool16x8.allTrue = function(v) {
          v = SIMD.Bool16x8.check(v);
          return SIMD.Bool16x8.extractLane(v, 0) && SIMD.Bool16x8.extractLane(v, 1) && SIMD.Bool16x8.extractLane(v, 2) && SIMD.Bool16x8.extractLane(v, 3) && SIMD.Bool16x8.extractLane(v, 4) && SIMD.Bool16x8.extractLane(v, 5) && SIMD.Bool16x8.extractLane(v, 6) && SIMD.Bool16x8.extractLane(v, 7);
        };
      }
      if (typeof SIMD.Bool16x8.anyTrue === "undefined") {
        SIMD.Bool16x8.anyTrue = function(v) {
          v = SIMD.Bool16x8.check(v);
          return SIMD.Bool16x8.extractLane(v, 0) || SIMD.Bool16x8.extractLane(v, 1) || SIMD.Bool16x8.extractLane(v, 2) || SIMD.Bool16x8.extractLane(v, 3) || SIMD.Bool16x8.extractLane(v, 4) || SIMD.Bool16x8.extractLane(v, 5) || SIMD.Bool16x8.extractLane(v, 6) || SIMD.Bool16x8.extractLane(v, 7);
        };
      }
      if (typeof SIMD.Bool16x8.and === "undefined") {
        SIMD.Bool16x8.and = function(a, b) {
          a = SIMD.Bool16x8.check(a);
          b = SIMD.Bool16x8.check(b);
          return SIMD.Bool16x8(SIMD.Bool16x8.extractLane(a, 0) & SIMD.Bool16x8.extractLane(b, 0), SIMD.Bool16x8.extractLane(a, 1) & SIMD.Bool16x8.extractLane(b, 1), SIMD.Bool16x8.extractLane(a, 2) & SIMD.Bool16x8.extractLane(b, 2), SIMD.Bool16x8.extractLane(a, 3) & SIMD.Bool16x8.extractLane(b, 3), SIMD.Bool16x8.extractLane(a, 4) & SIMD.Bool16x8.extractLane(b, 4), SIMD.Bool16x8.extractLane(a, 5) & SIMD.Bool16x8.extractLane(b, 5), SIMD.Bool16x8.extractLane(a, 6) & SIMD.Bool16x8.extractLane(b, 6), SIMD.Bool16x8.extractLane(a, 7) & SIMD.Bool16x8.extractLane(b, 7));
        };
      }
      if (typeof SIMD.Bool16x8.or === "undefined") {
        SIMD.Bool16x8.or = function(a, b) {
          a = SIMD.Bool16x8.check(a);
          b = SIMD.Bool16x8.check(b);
          return SIMD.Bool16x8(SIMD.Bool16x8.extractLane(a, 0) | SIMD.Bool16x8.extractLane(b, 0), SIMD.Bool16x8.extractLane(a, 1) | SIMD.Bool16x8.extractLane(b, 1), SIMD.Bool16x8.extractLane(a, 2) | SIMD.Bool16x8.extractLane(b, 2), SIMD.Bool16x8.extractLane(a, 3) | SIMD.Bool16x8.extractLane(b, 3), SIMD.Bool16x8.extractLane(a, 4) | SIMD.Bool16x8.extractLane(b, 4), SIMD.Bool16x8.extractLane(a, 5) | SIMD.Bool16x8.extractLane(b, 5), SIMD.Bool16x8.extractLane(a, 6) | SIMD.Bool16x8.extractLane(b, 6), SIMD.Bool16x8.extractLane(a, 7) | SIMD.Bool16x8.extractLane(b, 7));
        };
      }
      if (typeof SIMD.Bool16x8.xor === "undefined") {
        SIMD.Bool16x8.xor = function(a, b) {
          a = SIMD.Bool16x8.check(a);
          b = SIMD.Bool16x8.check(b);
          return SIMD.Bool16x8(SIMD.Bool16x8.extractLane(a, 0) ^ SIMD.Bool16x8.extractLane(b, 0), SIMD.Bool16x8.extractLane(a, 1) ^ SIMD.Bool16x8.extractLane(b, 1), SIMD.Bool16x8.extractLane(a, 2) ^ SIMD.Bool16x8.extractLane(b, 2), SIMD.Bool16x8.extractLane(a, 3) ^ SIMD.Bool16x8.extractLane(b, 3), SIMD.Bool16x8.extractLane(a, 4) ^ SIMD.Bool16x8.extractLane(b, 4), SIMD.Bool16x8.extractLane(a, 5) ^ SIMD.Bool16x8.extractLane(b, 5), SIMD.Bool16x8.extractLane(a, 6) ^ SIMD.Bool16x8.extractLane(b, 6), SIMD.Bool16x8.extractLane(a, 7) ^ SIMD.Bool16x8.extractLane(b, 7));
        };
      }
      if (typeof SIMD.Bool16x8.not === "undefined") {
        SIMD.Bool16x8.not = function(a) {
          a = SIMD.Bool16x8.check(a);
          return SIMD.Bool16x8(!SIMD.Bool16x8.extractLane(a, 0), !SIMD.Bool16x8.extractLane(a, 1), !SIMD.Bool16x8.extractLane(a, 2), !SIMD.Bool16x8.extractLane(a, 3), !SIMD.Bool16x8.extractLane(a, 4), !SIMD.Bool16x8.extractLane(a, 5), !SIMD.Bool16x8.extractLane(a, 6), !SIMD.Bool16x8.extractLane(a, 7));
        };
      }
      if (typeof SIMD.Bool16x8.equal === "undefined") {
        SIMD.Bool16x8.equal = function(a, b) {
          a = SIMD.Bool16x8.check(a);
          b = SIMD.Bool16x8.check(b);
          return SIMD.Bool16x8(SIMD.Bool16x8.extractLane(a, 0) == SIMD.Bool16x8.extractLane(b, 0), SIMD.Bool16x8.extractLane(a, 1) == SIMD.Bool16x8.extractLane(b, 1), SIMD.Bool16x8.extractLane(a, 2) == SIMD.Bool16x8.extractLane(b, 2), SIMD.Bool16x8.extractLane(a, 3) == SIMD.Bool16x8.extractLane(b, 3), SIMD.Bool16x8.extractLane(a, 4) == SIMD.Bool16x8.extractLane(b, 4), SIMD.Bool16x8.extractLane(a, 5) == SIMD.Bool16x8.extractLane(b, 5), SIMD.Bool16x8.extractLane(a, 6) == SIMD.Bool16x8.extractLane(b, 6), SIMD.Bool16x8.extractLane(a, 7) == SIMD.Bool16x8.extractLane(b, 7));
        };
      }
      if (typeof SIMD.Bool16x8.notEqual === "undefined") {
        SIMD.Bool16x8.notEqual = function(a, b) {
          a = SIMD.Bool16x8.check(a);
          b = SIMD.Bool16x8.check(b);
          return SIMD.Bool16x8(SIMD.Bool16x8.extractLane(a, 0) != SIMD.Bool16x8.extractLane(b, 0), SIMD.Bool16x8.extractLane(a, 1) != SIMD.Bool16x8.extractLane(b, 1), SIMD.Bool16x8.extractLane(a, 2) != SIMD.Bool16x8.extractLane(b, 2), SIMD.Bool16x8.extractLane(a, 3) != SIMD.Bool16x8.extractLane(b, 3), SIMD.Bool16x8.extractLane(a, 4) != SIMD.Bool16x8.extractLane(b, 4), SIMD.Bool16x8.extractLane(a, 5) != SIMD.Bool16x8.extractLane(b, 5), SIMD.Bool16x8.extractLane(a, 6) != SIMD.Bool16x8.extractLane(b, 6), SIMD.Bool16x8.extractLane(a, 7) != SIMD.Bool16x8.extractLane(b, 7));
        };
      }
      if (typeof SIMD.Bool16x8.select === "undefined") {
        SIMD.Bool16x8.select = function(mask, trueValue, falseValue) {
          mask = SIMD.Bool16x8.check(mask);
          trueValue = SIMD.Bool16x8.check(trueValue);
          falseValue = SIMD.Bool16x8.check(falseValue);
          var tr = SIMD.Bool16x8.and(mask, trueValue);
          var fr = SIMD.Bool16x8.and(SIMD.Bool16x8.not(mask), falseValue);
          return SIMD.Bool16x8.or(tr, fr);
        };
      }
      if (typeof SIMD.Bool8x16 === "undefined") {
        SIMD.Bool8x16 = function(s0, s1, s2, s3, s4, s5, s6, s7, s8, s9, s10, s11, s12, s13, s14, s15) {
          if (!(this instanceof SIMD.Bool8x16)) {
            return new SIMD.Bool8x16(s0, s1, s2, s3, s4, s5, s6, s7, s8, s9, s10, s11, s12, s13, s14, s15);
          }
          this.s0_ = !!s0;
          this.s1_ = !!s1;
          this.s2_ = !!s2;
          this.s3_ = !!s3;
          this.s4_ = !!s4;
          this.s5_ = !!s5;
          this.s6_ = !!s6;
          this.s7_ = !!s7;
          this.s8_ = !!s8;
          this.s9_ = !!s9;
          this.s10_ = !!s10;
          this.s11_ = !!s11;
          this.s12_ = !!s12;
          this.s13_ = !!s13;
          this.s14_ = !!s14;
          this.s15_ = !!s15;
        };
      }
      if (typeof SIMD.Bool8x16.check === "undefined") {
        SIMD.Bool8x16.check = function(v) {
          if (!(v instanceof SIMD.Bool8x16)) {
            throw new TypeError("argument is not a Bool8x16.");
          }
          return v;
        };
      }
      if (typeof SIMD.Bool8x16.splat === "undefined") {
        SIMD.Bool8x16.splat = function(s) {
          return SIMD.Bool8x16(s, s, s, s, s, s, s, s, s, s, s, s, s, s, s, s);
        };
      }
      if (typeof SIMD.Bool8x16.extractLane === "undefined") {
        SIMD.Bool8x16.extractLane = function(v, i) {
          v = SIMD.Bool8x16.check(v);
          check16(i);
          switch (i) {
            case 0:
              return v.s0_;
            case 1:
              return v.s1_;
            case 2:
              return v.s2_;
            case 3:
              return v.s3_;
            case 4:
              return v.s4_;
            case 5:
              return v.s5_;
            case 6:
              return v.s6_;
            case 7:
              return v.s7_;
            case 8:
              return v.s8_;
            case 9:
              return v.s9_;
            case 10:
              return v.s10_;
            case 11:
              return v.s11_;
            case 12:
              return v.s12_;
            case 13:
              return v.s13_;
            case 14:
              return v.s14_;
            case 15:
              return v.s15_;
          }
        };
      }
      if (typeof SIMD.Bool8x16.replaceLane === "undefined") {
        SIMD.Bool8x16.replaceLane = function(v, i, s) {
          v = SIMD.Bool8x16.check(v);
          check16(i);
          saveBool8x16(v);
          _i8x16[i] = s;
          return restoreBool8x16();
        };
      }
      if (typeof SIMD.Bool8x16.allTrue === "undefined") {
        SIMD.Bool8x16.allTrue = function(v) {
          v = SIMD.Bool8x16.check(v);
          return SIMD.Bool8x16.extractLane(v, 0) && SIMD.Bool8x16.extractLane(v, 1) && SIMD.Bool8x16.extractLane(v, 2) && SIMD.Bool8x16.extractLane(v, 3) && SIMD.Bool8x16.extractLane(v, 4) && SIMD.Bool8x16.extractLane(v, 5) && SIMD.Bool8x16.extractLane(v, 6) && SIMD.Bool8x16.extractLane(v, 7) && SIMD.Bool8x16.extractLane(v, 8) && SIMD.Bool8x16.extractLane(v, 9) && SIMD.Bool8x16.extractLane(v, 10) && SIMD.Bool8x16.extractLane(v, 11) && SIMD.Bool8x16.extractLane(v, 12) && SIMD.Bool8x16.extractLane(v, 13) && SIMD.Bool8x16.extractLane(v, 14) && SIMD.Bool8x16.extractLane(v, 15);
        };
      }
      if (typeof SIMD.Bool8x16.anyTrue === "undefined") {
        SIMD.Bool8x16.anyTrue = function(v) {
          v = SIMD.Bool8x16.check(v);
          return SIMD.Bool8x16.extractLane(v, 0) || SIMD.Bool8x16.extractLane(v, 1) || SIMD.Bool8x16.extractLane(v, 2) || SIMD.Bool8x16.extractLane(v, 3) || SIMD.Bool8x16.extractLane(v, 4) || SIMD.Bool8x16.extractLane(v, 5) || SIMD.Bool8x16.extractLane(v, 6) || SIMD.Bool8x16.extractLane(v, 7) || SIMD.Bool8x16.extractLane(v, 8) || SIMD.Bool8x16.extractLane(v, 9) || SIMD.Bool8x16.extractLane(v, 10) || SIMD.Bool8x16.extractLane(v, 11) || SIMD.Bool8x16.extractLane(v, 12) || SIMD.Bool8x16.extractLane(v, 13) || SIMD.Bool8x16.extractLane(v, 14) || SIMD.Bool8x16.extractLane(v, 15);
        };
      }
      if (typeof SIMD.Bool8x16.and === "undefined") {
        SIMD.Bool8x16.and = function(a, b) {
          a = SIMD.Bool8x16.check(a);
          b = SIMD.Bool8x16.check(b);
          return SIMD.Bool8x16(SIMD.Bool8x16.extractLane(a, 0) & SIMD.Bool8x16.extractLane(b, 0), SIMD.Bool8x16.extractLane(a, 1) & SIMD.Bool8x16.extractLane(b, 1), SIMD.Bool8x16.extractLane(a, 2) & SIMD.Bool8x16.extractLane(b, 2), SIMD.Bool8x16.extractLane(a, 3) & SIMD.Bool8x16.extractLane(b, 3), SIMD.Bool8x16.extractLane(a, 4) & SIMD.Bool8x16.extractLane(b, 4), SIMD.Bool8x16.extractLane(a, 5) & SIMD.Bool8x16.extractLane(b, 5), SIMD.Bool8x16.extractLane(a, 6) & SIMD.Bool8x16.extractLane(b, 6), SIMD.Bool8x16.extractLane(a, 7) & SIMD.Bool8x16.extractLane(b, 7), SIMD.Bool8x16.extractLane(a, 8) & SIMD.Bool8x16.extractLane(b, 8), SIMD.Bool8x16.extractLane(a, 9) & SIMD.Bool8x16.extractLane(b, 9), SIMD.Bool8x16.extractLane(a, 10) & SIMD.Bool8x16.extractLane(b, 10), SIMD.Bool8x16.extractLane(a, 11) & SIMD.Bool8x16.extractLane(b, 11), SIMD.Bool8x16.extractLane(a, 12) & SIMD.Bool8x16.extractLane(b, 12), SIMD.Bool8x16.extractLane(a, 13) & SIMD.Bool8x16.extractLane(b, 13), SIMD.Bool8x16.extractLane(a, 14) & SIMD.Bool8x16.extractLane(b, 14), SIMD.Bool8x16.extractLane(a, 15) & SIMD.Bool8x16.extractLane(b, 15));
        };
      }
      if (typeof SIMD.Bool8x16.or === "undefined") {
        SIMD.Bool8x16.or = function(a, b) {
          a = SIMD.Bool8x16.check(a);
          b = SIMD.Bool8x16.check(b);
          return SIMD.Bool8x16(SIMD.Bool8x16.extractLane(a, 0) | SIMD.Bool8x16.extractLane(b, 0), SIMD.Bool8x16.extractLane(a, 1) | SIMD.Bool8x16.extractLane(b, 1), SIMD.Bool8x16.extractLane(a, 2) | SIMD.Bool8x16.extractLane(b, 2), SIMD.Bool8x16.extractLane(a, 3) | SIMD.Bool8x16.extractLane(b, 3), SIMD.Bool8x16.extractLane(a, 4) | SIMD.Bool8x16.extractLane(b, 4), SIMD.Bool8x16.extractLane(a, 5) | SIMD.Bool8x16.extractLane(b, 5), SIMD.Bool8x16.extractLane(a, 6) | SIMD.Bool8x16.extractLane(b, 6), SIMD.Bool8x16.extractLane(a, 7) | SIMD.Bool8x16.extractLane(b, 7), SIMD.Bool8x16.extractLane(a, 8) | SIMD.Bool8x16.extractLane(b, 8), SIMD.Bool8x16.extractLane(a, 9) | SIMD.Bool8x16.extractLane(b, 9), SIMD.Bool8x16.extractLane(a, 10) | SIMD.Bool8x16.extractLane(b, 10), SIMD.Bool8x16.extractLane(a, 11) | SIMD.Bool8x16.extractLane(b, 11), SIMD.Bool8x16.extractLane(a, 12) | SIMD.Bool8x16.extractLane(b, 12), SIMD.Bool8x16.extractLane(a, 13) | SIMD.Bool8x16.extractLane(b, 13), SIMD.Bool8x16.extractLane(a, 14) | SIMD.Bool8x16.extractLane(b, 14), SIMD.Bool8x16.extractLane(a, 15) | SIMD.Bool8x16.extractLane(b, 15));
        };
      }
      if (typeof SIMD.Bool8x16.xor === "undefined") {
        SIMD.Bool8x16.xor = function(a, b) {
          a = SIMD.Bool8x16.check(a);
          b = SIMD.Bool8x16.check(b);
          return SIMD.Bool8x16(SIMD.Bool8x16.extractLane(a, 0) ^ SIMD.Bool8x16.extractLane(b, 0), SIMD.Bool8x16.extractLane(a, 1) ^ SIMD.Bool8x16.extractLane(b, 1), SIMD.Bool8x16.extractLane(a, 2) ^ SIMD.Bool8x16.extractLane(b, 2), SIMD.Bool8x16.extractLane(a, 3) ^ SIMD.Bool8x16.extractLane(b, 3), SIMD.Bool8x16.extractLane(a, 4) ^ SIMD.Bool8x16.extractLane(b, 4), SIMD.Bool8x16.extractLane(a, 5) ^ SIMD.Bool8x16.extractLane(b, 5), SIMD.Bool8x16.extractLane(a, 6) ^ SIMD.Bool8x16.extractLane(b, 6), SIMD.Bool8x16.extractLane(a, 7) ^ SIMD.Bool8x16.extractLane(b, 7), SIMD.Bool8x16.extractLane(a, 8) ^ SIMD.Bool8x16.extractLane(b, 8), SIMD.Bool8x16.extractLane(a, 9) ^ SIMD.Bool8x16.extractLane(b, 9), SIMD.Bool8x16.extractLane(a, 10) ^ SIMD.Bool8x16.extractLane(b, 10), SIMD.Bool8x16.extractLane(a, 11) ^ SIMD.Bool8x16.extractLane(b, 11), SIMD.Bool8x16.extractLane(a, 12) ^ SIMD.Bool8x16.extractLane(b, 12), SIMD.Bool8x16.extractLane(a, 13) ^ SIMD.Bool8x16.extractLane(b, 13), SIMD.Bool8x16.extractLane(a, 14) ^ SIMD.Bool8x16.extractLane(b, 14), SIMD.Bool8x16.extractLane(a, 15) ^ SIMD.Bool8x16.extractLane(b, 15));
        };
      }
      if (typeof SIMD.Bool8x16.not === "undefined") {
        SIMD.Bool8x16.not = function(a) {
          a = SIMD.Bool8x16.check(a);
          return SIMD.Bool8x16(!SIMD.Bool8x16.extractLane(a, 0), !SIMD.Bool8x16.extractLane(a, 1), !SIMD.Bool8x16.extractLane(a, 2), !SIMD.Bool8x16.extractLane(a, 3), !SIMD.Bool8x16.extractLane(a, 4), !SIMD.Bool8x16.extractLane(a, 5), !SIMD.Bool8x16.extractLane(a, 6), !SIMD.Bool8x16.extractLane(a, 7), !SIMD.Bool8x16.extractLane(a, 8), !SIMD.Bool8x16.extractLane(a, 9), !SIMD.Bool8x16.extractLane(a, 10), !SIMD.Bool8x16.extractLane(a, 11), !SIMD.Bool8x16.extractLane(a, 12), !SIMD.Bool8x16.extractLane(a, 13), !SIMD.Bool8x16.extractLane(a, 14), !SIMD.Bool8x16.extractLane(a, 15));
        };
      }
      if (typeof SIMD.Bool8x16.equal === "undefined") {
        SIMD.Bool8x16.equal = function(a, b) {
          a = SIMD.Bool8x16.check(a);
          b = SIMD.Bool8x16.check(b);
          return SIMD.Bool8x16(SIMD.Bool8x16.extractLane(a, 0) == SIMD.Bool8x16.extractLane(b, 0), SIMD.Bool8x16.extractLane(a, 1) == SIMD.Bool8x16.extractLane(b, 1), SIMD.Bool8x16.extractLane(a, 2) == SIMD.Bool8x16.extractLane(b, 2), SIMD.Bool8x16.extractLane(a, 3) == SIMD.Bool8x16.extractLane(b, 3), SIMD.Bool8x16.extractLane(a, 4) == SIMD.Bool8x16.extractLane(b, 4), SIMD.Bool8x16.extractLane(a, 5) == SIMD.Bool8x16.extractLane(b, 5), SIMD.Bool8x16.extractLane(a, 6) == SIMD.Bool8x16.extractLane(b, 6), SIMD.Bool8x16.extractLane(a, 7) == SIMD.Bool8x16.extractLane(b, 7), SIMD.Bool8x16.extractLane(a, 8) == SIMD.Bool8x16.extractLane(b, 8), SIMD.Bool8x16.extractLane(a, 9) == SIMD.Bool8x16.extractLane(b, 9), SIMD.Bool8x16.extractLane(a, 10) == SIMD.Bool8x16.extractLane(b, 10), SIMD.Bool8x16.extractLane(a, 11) == SIMD.Bool8x16.extractLane(b, 11), SIMD.Bool8x16.extractLane(a, 12) == SIMD.Bool8x16.extractLane(b, 12), SIMD.Bool8x16.extractLane(a, 13) == SIMD.Bool8x16.extractLane(b, 13), SIMD.Bool8x16.extractLane(a, 14) == SIMD.Bool8x16.extractLane(b, 14), SIMD.Bool8x16.extractLane(a, 15) == SIMD.Bool8x16.extractLane(b, 15));
        };
      }
      if (typeof SIMD.Bool8x16.notEqual === "undefined") {
        SIMD.Bool8x16.notEqual = function(a, b) {
          a = SIMD.Bool8x16.check(a);
          b = SIMD.Bool8x16.check(b);
          return SIMD.Bool8x16(SIMD.Bool8x16.extractLane(a, 0) != SIMD.Bool8x16.extractLane(b, 0), SIMD.Bool8x16.extractLane(a, 1) != SIMD.Bool8x16.extractLane(b, 1), SIMD.Bool8x16.extractLane(a, 2) != SIMD.Bool8x16.extractLane(b, 2), SIMD.Bool8x16.extractLane(a, 3) != SIMD.Bool8x16.extractLane(b, 3), SIMD.Bool8x16.extractLane(a, 4) != SIMD.Bool8x16.extractLane(b, 4), SIMD.Bool8x16.extractLane(a, 5) != SIMD.Bool8x16.extractLane(b, 5), SIMD.Bool8x16.extractLane(a, 6) != SIMD.Bool8x16.extractLane(b, 6), SIMD.Bool8x16.extractLane(a, 7) != SIMD.Bool8x16.extractLane(b, 7), SIMD.Bool8x16.extractLane(a, 8) != SIMD.Bool8x16.extractLane(b, 8), SIMD.Bool8x16.extractLane(a, 9) != SIMD.Bool8x16.extractLane(b, 9), SIMD.Bool8x16.extractLane(a, 10) != SIMD.Bool8x16.extractLane(b, 10), SIMD.Bool8x16.extractLane(a, 11) != SIMD.Bool8x16.extractLane(b, 11), SIMD.Bool8x16.extractLane(a, 12) != SIMD.Bool8x16.extractLane(b, 12), SIMD.Bool8x16.extractLane(a, 13) != SIMD.Bool8x16.extractLane(b, 13), SIMD.Bool8x16.extractLane(a, 14) != SIMD.Bool8x16.extractLane(b, 14), SIMD.Bool8x16.extractLane(a, 15) != SIMD.Bool8x16.extractLane(b, 15));
        };
      }
      if (typeof SIMD.Bool8x16.select === "undefined") {
        SIMD.Bool8x16.select = function(mask, trueValue, falseValue) {
          mask = SIMD.Bool8x16.check(mask);
          trueValue = SIMD.Bool8x16.check(trueValue);
          falseValue = SIMD.Bool8x16.check(falseValue);
          var tr = SIMD.Bool8x16.and(mask, trueValue);
          var fr = SIMD.Bool8x16.and(SIMD.Bool8x16.not(mask), falseValue);
          return SIMD.Bool8x16.or(tr, fr);
        };
      }
      if (typeof SIMD.Float32x4 === "undefined") {
        SIMD.Float32x4 = function(x, y, z, w) {
          if (!(this instanceof SIMD.Float32x4)) {
            return new SIMD.Float32x4(x, y, z, w);
          }
          this.x_ = truncatef32(x);
          this.y_ = truncatef32(y);
          this.z_ = truncatef32(z);
          this.w_ = truncatef32(w);
        };
      }
      if (typeof SIMD.Float32x4.extractLane === "undefined") {
        SIMD.Float32x4.extractLane = function(t, i) {
          t = SIMD.Float32x4.check(t);
          check4(i);
          switch (i) {
            case 0:
              return t.x_;
            case 1:
              return t.y_;
            case 2:
              return t.z_;
            case 3:
              return t.w_;
          }
        };
      }
      if (typeof SIMD.Float32x4.replaceLane === "undefined") {
        SIMD.Float32x4.replaceLane = function(t, i, v) {
          t = SIMD.Float32x4.check(t);
          check4(i);
          saveFloat32x4(t);
          _f32x4[i] = v;
          return restoreFloat32x4();
        };
      }
      if (typeof SIMD.Float32x4.check === "undefined") {
        SIMD.Float32x4.check = function(v) {
          if (!(v instanceof SIMD.Float32x4)) {
            throw new TypeError("argument is not a Float32x4.");
          }
          return v;
        };
      }
      if (typeof SIMD.Float32x4.splat === "undefined") {
        SIMD.Float32x4.splat = function(s) {
          return SIMD.Float32x4(s, s, s, s);
        };
      }
      if (typeof SIMD.Float32x4.fromFloat64x2 === "undefined") {
        SIMD.Float32x4.fromFloat64x2 = function(t) {
          t = SIMD.Float64x2.check(t);
          return SIMD.Float32x4(SIMD.Float64x2.extractLane(t, 0), SIMD.Float64x2.extractLane(t, 1), 0, 0);
        };
      }
      if (typeof SIMD.Float32x4.fromInt32x4 === "undefined") {
        SIMD.Float32x4.fromInt32x4 = function(t) {
          t = SIMD.Int32x4.check(t);
          return SIMD.Float32x4(SIMD.Int32x4.extractLane(t, 0), SIMD.Int32x4.extractLane(t, 1), SIMD.Int32x4.extractLane(t, 2), SIMD.Int32x4.extractLane(t, 3));
        };
      }
      if (typeof SIMD.Float32x4.fromFloat64x2Bits === "undefined") {
        SIMD.Float32x4.fromFloat64x2Bits = function(t) {
          saveFloat64x2(t);
          return restoreFloat32x4();
        };
      }
      if (typeof SIMD.Float32x4.fromInt32x4Bits === "undefined") {
        SIMD.Float32x4.fromInt32x4Bits = function(t) {
          saveInt32x4(t);
          return restoreFloat32x4();
        };
      }
      if (typeof SIMD.Float32x4.fromInt16x8Bits === "undefined") {
        SIMD.Float32x4.fromInt16x8Bits = function(t) {
          saveInt16x8(t);
          return restoreFloat32x4();
        };
      }
      if (typeof SIMD.Float32x4.fromInt8x16Bits === "undefined") {
        SIMD.Float32x4.fromInt8x16Bits = function(t) {
          saveInt8x16(t);
          return restoreFloat32x4();
        };
      }
      if (!Object.hasOwnProperty(SIMD.Float32x4.prototype, 'toString')) {
        SIMD.Float32x4.prototype.toString = function() {
          return "Float32x4(" + this.x_ + ", " + this.y_ + ", " + this.z_ + ", " + this.w_ + ")";
        };
      }
      if (!Object.hasOwnProperty(SIMD.Float32x4.prototype, 'toLocaleString')) {
        SIMD.Float32x4.prototype.toLocaleString = function() {
          return "Float32x4(" + this.x_.toLocaleString() + ", " + this.y_.toLocaleString() + ", " + this.z_.toLocaleString() + ", " + this.w_.toLocaleString() + ")";
        };
      }
      if (!Object.hasOwnProperty(SIMD.Float32x4.prototype, 'valueOf')) {
        SIMD.Float32x4.prototype.valueOf = function() {
          throw new TypeError("Float32x4 cannot be converted to a number");
        };
      }
      if (typeof SIMD.Float64x2 === "undefined") {
        SIMD.Float64x2 = function(x, y) {
          if (!(this instanceof SIMD.Float64x2)) {
            return new SIMD.Float64x2(x, y);
          }
          this.x_ = +x;
          this.y_ = +y;
        };
      }
      if (typeof SIMD.Float64x2.extractLane === "undefined") {
        SIMD.Float64x2.extractLane = function(t, i) {
          t = SIMD.Float64x2.check(t);
          check2(i);
          switch (i) {
            case 0:
              return t.x_;
            case 1:
              return t.y_;
          }
        };
      }
      if (typeof SIMD.Float64x2.replaceLane === "undefined") {
        SIMD.Float64x2.replaceLane = function(t, i, v) {
          t = SIMD.Float64x2.check(t);
          check2(i);
          saveFloat64x2(t);
          _f64x2[i] = v;
          return restoreFloat64x2();
        };
      }
      if (typeof SIMD.Float64x2.check === "undefined") {
        SIMD.Float64x2.check = function(v) {
          if (!(v instanceof SIMD.Float64x2)) {
            throw new TypeError("argument is not a Float64x2.");
          }
          return v;
        };
      }
      if (typeof SIMD.Float64x2.splat === "undefined") {
        SIMD.Float64x2.splat = function(s) {
          return SIMD.Float64x2(s, s);
        };
      }
      if (typeof SIMD.Float64x2.fromFloat32x4 === "undefined") {
        SIMD.Float64x2.fromFloat32x4 = function(t) {
          t = SIMD.Float32x4.check(t);
          return SIMD.Float64x2(SIMD.Float32x4.extractLane(t, 0), SIMD.Float32x4.extractLane(t, 1));
        };
      }
      if (typeof SIMD.Float64x2.fromInt32x4 === "undefined") {
        SIMD.Float64x2.fromInt32x4 = function(t) {
          t = SIMD.Int32x4.check(t);
          return SIMD.Float64x2(SIMD.Int32x4.extractLane(t, 0), SIMD.Int32x4.extractLane(t, 1));
        };
      }
      if (typeof SIMD.Float64x2.fromFloat32x4Bits === "undefined") {
        SIMD.Float64x2.fromFloat32x4Bits = function(t) {
          saveFloat32x4(t);
          return restoreFloat64x2();
        };
      }
      if (typeof SIMD.Float64x2.fromInt32x4Bits === "undefined") {
        SIMD.Float64x2.fromInt32x4Bits = function(t) {
          saveInt32x4(t);
          return restoreFloat64x2();
        };
      }
      if (typeof SIMD.Float64x2.fromInt16x8Bits === "undefined") {
        SIMD.Float64x2.fromInt16x8Bits = function(t) {
          saveInt16x8(t);
          return restoreFloat64x2();
        };
      }
      if (typeof SIMD.Float64x2.fromInt8x16Bits === "undefined") {
        SIMD.Float64x2.fromInt8x16Bits = function(t) {
          saveInt8x16(t);
          return restoreFloat64x2();
        };
      }
      if (!Object.hasOwnProperty(SIMD.Float64x2.prototype, 'toString')) {
        SIMD.Float64x2.prototype.toString = function() {
          return "Float64x2(" + this.x_ + ", " + this.y_ + ")";
        };
      }
      if (!Object.hasOwnProperty(SIMD.Float64x2.prototype, 'toLocaleString')) {
        SIMD.Float64x2.prototype.toLocaleString = function() {
          return "Float64x2(" + this.x_.toLocaleString() + ", " + this.y_.toLocaleString() + ")";
        };
      }
      if (!Object.hasOwnProperty(SIMD.Float64x2.prototype, 'valueOf')) {
        SIMD.Float64x2.prototype.valueOf = function() {
          throw new TypeError("Float64x2 cannot be converted to a number");
        };
      }
      if (typeof SIMD.Int32x4 === "undefined") {
        SIMD.Int32x4 = function(x, y, z, w) {
          if (!(this instanceof SIMD.Int32x4)) {
            return new SIMD.Int32x4(x, y, z, w);
          }
          this.x_ = x | 0;
          this.y_ = y | 0;
          this.z_ = z | 0;
          this.w_ = w | 0;
        };
      }
      if (typeof SIMD.Int32x4.extractLane === "undefined") {
        SIMD.Int32x4.extractLane = function(t, i) {
          t = SIMD.Int32x4.check(t);
          check4(i);
          switch (i) {
            case 0:
              return t.x_;
            case 1:
              return t.y_;
            case 2:
              return t.z_;
            case 3:
              return t.w_;
          }
        };
      }
      if (typeof SIMD.Int32x4.replaceLane === "undefined") {
        SIMD.Int32x4.replaceLane = function(t, i, v) {
          t = SIMD.Int32x4.check(t);
          check4(i);
          saveInt32x4(t);
          _i32x4[i] = v;
          return restoreInt32x4();
        };
      }
      if (typeof SIMD.Int32x4.check === "undefined") {
        SIMD.Int32x4.check = function(v) {
          if (!(v instanceof SIMD.Int32x4)) {
            throw new TypeError("argument is not a Int32x4.");
          }
          return v;
        };
      }
      if (typeof SIMD.Int32x4.splat === "undefined") {
        SIMD.Int32x4.splat = function(s) {
          return SIMD.Int32x4(s, s, s, s);
        };
      }
      if (typeof SIMD.Int32x4.fromFloat32x4 === "undefined") {
        SIMD.Int32x4.fromFloat32x4 = function(t) {
          t = SIMD.Float32x4.check(t);
          return SIMD.Int32x4(int32FromFloat(SIMD.Float32x4.extractLane(t, 0)), int32FromFloat(SIMD.Float32x4.extractLane(t, 1)), int32FromFloat(SIMD.Float32x4.extractLane(t, 2)), int32FromFloat(SIMD.Float32x4.extractLane(t, 3)));
        };
      }
      if (typeof SIMD.Int32x4.fromFloat64x2 === "undefined") {
        SIMD.Int32x4.fromFloat64x2 = function(t) {
          t = SIMD.Float64x2.check(t);
          return SIMD.Int32x4(int32FromFloat(SIMD.Float64x2.extractLane(t, 0)), int32FromFloat(SIMD.Float64x2.extractLane(t, 1)), 0, 0);
        };
      }
      if (typeof SIMD.Int32x4.fromFloat32x4Bits === "undefined") {
        SIMD.Int32x4.fromFloat32x4Bits = function(t) {
          saveFloat32x4(t);
          return restoreInt32x4();
        };
      }
      if (typeof SIMD.Int32x4.fromFloat64x2Bits === "undefined") {
        SIMD.Int32x4.fromFloat64x2Bits = function(t) {
          saveFloat64x2(t);
          return restoreInt32x4();
        };
      }
      if (typeof SIMD.Int32x4.fromInt16x8Bits === "undefined") {
        SIMD.Int32x4.fromInt16x8Bits = function(t) {
          saveInt16x8(t);
          return restoreInt32x4();
        };
      }
      if (typeof SIMD.Int32x4.fromInt8x16Bits === "undefined") {
        SIMD.Int32x4.fromInt8x16Bits = function(t) {
          saveInt8x16(t);
          return restoreInt32x4();
        };
      }
      if (!Object.hasOwnProperty(SIMD.Int32x4.prototype, 'toString')) {
        SIMD.Int32x4.prototype.toString = function() {
          return "Int32x4(" + this.x_ + ", " + this.y_ + ", " + this.z_ + ", " + this.w_ + ")";
        };
      }
      if (!Object.hasOwnProperty(SIMD.Int32x4.prototype, 'toLocaleString')) {
        SIMD.Int32x4.prototype.toLocaleString = function() {
          return "Int32x4(" + this.x_.toLocaleString() + ", " + this.y_.toLocaleString() + ", " + this.z_.toLocaleString() + ", " + this.w_.toLocaleString() + ")";
        };
      }
      if (!Object.hasOwnProperty(SIMD.Int32x4.prototype, 'valueOf')) {
        SIMD.Int32x4.prototype.valueOf = function() {
          throw new TypeError("Int32x4 cannot be converted to a number");
        };
      }
      if (typeof SIMD.Int16x8 === "undefined") {
        SIMD.Int16x8 = function(s0, s1, s2, s3, s4, s5, s6, s7) {
          if (!(this instanceof SIMD.Int16x8)) {
            return new SIMD.Int16x8(s0, s1, s2, s3, s4, s5, s6, s7);
          }
          this.s0_ = s0 << 16 >> 16;
          this.s1_ = s1 << 16 >> 16;
          this.s2_ = s2 << 16 >> 16;
          this.s3_ = s3 << 16 >> 16;
          this.s4_ = s4 << 16 >> 16;
          this.s5_ = s5 << 16 >> 16;
          this.s6_ = s6 << 16 >> 16;
          this.s7_ = s7 << 16 >> 16;
        };
      }
      if (typeof SIMD.Int16x8.extractLane === "undefined") {
        SIMD.Int16x8.extractLane = function(t, i) {
          t = SIMD.Int16x8.check(t);
          check8(i);
          switch (i) {
            case 0:
              return t.s0_;
            case 1:
              return t.s1_;
            case 2:
              return t.s2_;
            case 3:
              return t.s3_;
            case 4:
              return t.s4_;
            case 5:
              return t.s5_;
            case 6:
              return t.s6_;
            case 7:
              return t.s7_;
          }
        };
      }
      if (typeof SIMD.Int16x8.replaceLane === "undefined") {
        SIMD.Int16x8.replaceLane = function(t, i, v) {
          t = SIMD.Int16x8.check(t);
          check8(i);
          saveInt16x8(t);
          _i16x8[i] = v;
          return restoreInt16x8();
        };
      }
      if (typeof SIMD.Int16x8.check === "undefined") {
        SIMD.Int16x8.check = function(v) {
          if (!(v instanceof SIMD.Int16x8)) {
            throw new TypeError("argument is not a Int16x8.");
          }
          return v;
        };
      }
      if (typeof SIMD.Int16x8.splat === "undefined") {
        SIMD.Int16x8.splat = function(s) {
          return SIMD.Int16x8(s, s, s, s, s, s, s, s);
        };
      }
      if (typeof SIMD.Int16x8.fromFloat32x4Bits === "undefined") {
        SIMD.Int16x8.fromFloat32x4Bits = function(t) {
          saveFloat32x4(t);
          return restoreInt16x8();
        };
      }
      if (typeof SIMD.Int16x8.fromFloat64x2Bits === "undefined") {
        SIMD.Int16x8.fromFloat64x2Bits = function(t) {
          saveFloat64x2(t);
          return restoreInt16x8();
        };
      }
      if (typeof SIMD.Int16x8.fromInt32x4Bits === "undefined") {
        SIMD.Int16x8.fromInt32x4Bits = function(t) {
          saveInt32x4(t);
          return restoreInt16x8();
        };
      }
      if (typeof SIMD.Int16x8.fromInt8x16Bits === "undefined") {
        SIMD.Int16x8.fromInt8x16Bits = function(t) {
          saveInt8x16(t);
          return restoreInt16x8();
        };
      }
      if (!Object.hasOwnProperty(SIMD.Int16x8.prototype, 'toString')) {
        SIMD.Int16x8.prototype.toString = function() {
          return "Int16x8(" + this.s0_ + ", " + this.s1_ + ", " + this.s2_ + ", " + this.s3_ + ", " + this.s4_ + ", " + this.s5_ + ", " + this.s6_ + ", " + this.s7_ + ")";
        };
      }
      if (!Object.hasOwnProperty(SIMD.Int16x8.prototype, 'toLocaleString')) {
        SIMD.Int16x8.prototype.toLocaleString = function() {
          return "Int16x8(" + this.s0_.toLocaleString() + ", " + this.s1_.toLocaleString() + ", " + this.s2_.toLocaleString() + ", " + this.s3_.toLocaleString() + ", " + this.s4_.toLocaleString() + ", " + this.s5_.toLocaleString() + ", " + this.s6_.toLocaleString() + ", " + this.s7_.toLocaleString() + ")";
        };
      }
      if (!Object.hasOwnProperty(SIMD.Int16x8.prototype, 'valueOf')) {
        SIMD.Int16x8.prototype.valueOf = function() {
          throw new TypeError("Int16x8 cannot be converted to a number");
        };
      }
      if (typeof SIMD.Int8x16 === "undefined") {
        SIMD.Int8x16 = function(s0, s1, s2, s3, s4, s5, s6, s7, s8, s9, s10, s11, s12, s13, s14, s15) {
          if (!(this instanceof SIMD.Int8x16)) {
            return new SIMD.Int8x16(s0, s1, s2, s3, s4, s5, s6, s7, s8, s9, s10, s11, s12, s13, s14, s15);
          }
          this.s0_ = s0 << 24 >> 24;
          this.s1_ = s1 << 24 >> 24;
          this.s2_ = s2 << 24 >> 24;
          this.s3_ = s3 << 24 >> 24;
          this.s4_ = s4 << 24 >> 24;
          this.s5_ = s5 << 24 >> 24;
          this.s6_ = s6 << 24 >> 24;
          this.s7_ = s7 << 24 >> 24;
          this.s8_ = s8 << 24 >> 24;
          this.s9_ = s9 << 24 >> 24;
          this.s10_ = s10 << 24 >> 24;
          this.s11_ = s11 << 24 >> 24;
          this.s12_ = s12 << 24 >> 24;
          this.s13_ = s13 << 24 >> 24;
          this.s14_ = s14 << 24 >> 24;
          this.s15_ = s15 << 24 >> 24;
        };
      }
      if (typeof SIMD.Int8x16.extractLane === "undefined") {
        SIMD.Int8x16.extractLane = function(t, i) {
          t = SIMD.Int8x16.check(t);
          check16(i);
          switch (i) {
            case 0:
              return t.s0_;
            case 1:
              return t.s1_;
            case 2:
              return t.s2_;
            case 3:
              return t.s3_;
            case 4:
              return t.s4_;
            case 5:
              return t.s5_;
            case 6:
              return t.s6_;
            case 7:
              return t.s7_;
            case 8:
              return t.s8_;
            case 9:
              return t.s9_;
            case 10:
              return t.s10_;
            case 11:
              return t.s11_;
            case 12:
              return t.s12_;
            case 13:
              return t.s13_;
            case 14:
              return t.s14_;
            case 15:
              return t.s15_;
          }
        };
      }
      if (typeof SIMD.Int8x16.replaceLane === "undefined") {
        SIMD.Int8x16.replaceLane = function(t, i, v) {
          t = SIMD.Int8x16.check(t);
          check16(i);
          saveInt8x16(t);
          _i8x16[i] = v;
          return restoreInt8x16();
        };
      }
      if (typeof SIMD.Int8x16.check === "undefined") {
        SIMD.Int8x16.check = function(v) {
          if (!(v instanceof SIMD.Int8x16)) {
            throw new TypeError("argument is not a Int8x16.");
          }
          return v;
        };
      }
      if (typeof SIMD.Int8x16.splat === "undefined") {
        SIMD.Int8x16.splat = function(s) {
          return SIMD.Int8x16(s, s, s, s, s, s, s, s, s, s, s, s, s, s, s, s);
        };
      }
      if (typeof SIMD.Int8x16.fromFloat32x4Bits === "undefined") {
        SIMD.Int8x16.fromFloat32x4Bits = function(t) {
          saveFloat32x4(t);
          return restoreInt8x16();
        };
      }
      if (typeof SIMD.Int8x16.fromFloat64x2Bits === "undefined") {
        SIMD.Int8x16.fromFloat64x2Bits = function(t) {
          saveFloat64x2(t);
          return restoreInt8x16();
        };
      }
      if (typeof SIMD.Int8x16.fromInt32x4Bits === "undefined") {
        SIMD.Int8x16.fromInt32x4Bits = function(t) {
          saveInt32x4(t);
          return restoreInt8x16();
        };
      }
      if (typeof SIMD.Int8x16.fromInt16x8Bits === "undefined") {
        SIMD.Int8x16.fromInt16x8Bits = function(t) {
          saveInt16x8(t);
          return restoreInt8x16();
        };
      }
      if (!Object.hasOwnProperty(SIMD.Int8x16.prototype, 'toString')) {
        SIMD.Int8x16.prototype.toString = function() {
          return "Int8x16(" + this.s0_ + ", " + this.s1_ + ", " + this.s2_ + ", " + this.s3_ + ", " + this.s4_ + ", " + this.s5_ + ", " + this.s6_ + ", " + this.s7_ + ", " + this.s8_ + ", " + this.s9_ + ", " + this.s10_ + ", " + this.s11_ + ", " + this.s12_ + ", " + this.s13_ + ", " + this.s14_ + ", " + this.s15_ + ")";
        };
      }
      if (!Object.hasOwnProperty(SIMD.Int8x16.prototype, 'toLocaleString')) {
        SIMD.Int8x16.prototype.toLocaleString = function() {
          return "Int8x16(" + this.s0_.toLocaleString() + ", " + this.s1_.toLocaleString() + ", " + this.s2_.toLocaleString() + ", " + this.s3_.toLocaleString() + ", " + this.s4_.toLocaleString() + ", " + this.s5_.toLocaleString() + ", " + this.s6_.toLocaleString() + ", " + this.s7_.toLocaleString() + ", " + this.s8_.toLocaleString() + ", " + this.s9_.toLocaleString() + ", " + this.s10_.toLocaleString() + ", " + this.s11_.toLocaleString() + ", " + this.s12_.toLocaleString() + ", " + this.s13_.toLocaleString() + ", " + this.s14_.toLocaleString() + ", " + this.s15_.toLocaleString() + ")";
        };
      }
      if (!Object.hasOwnProperty(SIMD.Int8x16.prototype, 'valueOf')) {
        SIMD.Int8x16.prototype.valueOf = function() {
          throw new TypeError("Int8x16 cannot be converted to a number");
        };
      }
      if (typeof SIMD.Float32x4.abs === "undefined") {
        SIMD.Float32x4.abs = function(t) {
          t = SIMD.Float32x4.check(t);
          return SIMD.Float32x4(Math.abs(SIMD.Float32x4.extractLane(t, 0)), Math.abs(SIMD.Float32x4.extractLane(t, 1)), Math.abs(SIMD.Float32x4.extractLane(t, 2)), Math.abs(SIMD.Float32x4.extractLane(t, 3)));
        };
      }
      if (typeof SIMD.Float32x4.neg === "undefined") {
        SIMD.Float32x4.neg = function(t) {
          t = SIMD.Float32x4.check(t);
          return SIMD.Float32x4(-SIMD.Float32x4.extractLane(t, 0), -SIMD.Float32x4.extractLane(t, 1), -SIMD.Float32x4.extractLane(t, 2), -SIMD.Float32x4.extractLane(t, 3));
        };
      }
      if (typeof SIMD.Float32x4.add === "undefined") {
        SIMD.Float32x4.add = function(a, b) {
          a = SIMD.Float32x4.check(a);
          b = SIMD.Float32x4.check(b);
          return SIMD.Float32x4(SIMD.Float32x4.extractLane(a, 0) + SIMD.Float32x4.extractLane(b, 0), SIMD.Float32x4.extractLane(a, 1) + SIMD.Float32x4.extractLane(b, 1), SIMD.Float32x4.extractLane(a, 2) + SIMD.Float32x4.extractLane(b, 2), SIMD.Float32x4.extractLane(a, 3) + SIMD.Float32x4.extractLane(b, 3));
        };
      }
      if (typeof SIMD.Float32x4.sub === "undefined") {
        SIMD.Float32x4.sub = function(a, b) {
          a = SIMD.Float32x4.check(a);
          b = SIMD.Float32x4.check(b);
          return SIMD.Float32x4(SIMD.Float32x4.extractLane(a, 0) - SIMD.Float32x4.extractLane(b, 0), SIMD.Float32x4.extractLane(a, 1) - SIMD.Float32x4.extractLane(b, 1), SIMD.Float32x4.extractLane(a, 2) - SIMD.Float32x4.extractLane(b, 2), SIMD.Float32x4.extractLane(a, 3) - SIMD.Float32x4.extractLane(b, 3));
        };
      }
      if (typeof SIMD.Float32x4.mul === "undefined") {
        SIMD.Float32x4.mul = function(a, b) {
          a = SIMD.Float32x4.check(a);
          b = SIMD.Float32x4.check(b);
          return SIMD.Float32x4(SIMD.Float32x4.extractLane(a, 0) * SIMD.Float32x4.extractLane(b, 0), SIMD.Float32x4.extractLane(a, 1) * SIMD.Float32x4.extractLane(b, 1), SIMD.Float32x4.extractLane(a, 2) * SIMD.Float32x4.extractLane(b, 2), SIMD.Float32x4.extractLane(a, 3) * SIMD.Float32x4.extractLane(b, 3));
        };
      }
      if (typeof SIMD.Float32x4.div === "undefined") {
        SIMD.Float32x4.div = function(a, b) {
          a = SIMD.Float32x4.check(a);
          b = SIMD.Float32x4.check(b);
          return SIMD.Float32x4(SIMD.Float32x4.extractLane(a, 0) / SIMD.Float32x4.extractLane(b, 0), SIMD.Float32x4.extractLane(a, 1) / SIMD.Float32x4.extractLane(b, 1), SIMD.Float32x4.extractLane(a, 2) / SIMD.Float32x4.extractLane(b, 2), SIMD.Float32x4.extractLane(a, 3) / SIMD.Float32x4.extractLane(b, 3));
        };
      }
      if (typeof SIMD.Float32x4.min === "undefined") {
        SIMD.Float32x4.min = function(t, other) {
          t = SIMD.Float32x4.check(t);
          other = SIMD.Float32x4.check(other);
          var cx = Math.min(SIMD.Float32x4.extractLane(t, 0), SIMD.Float32x4.extractLane(other, 0));
          var cy = Math.min(SIMD.Float32x4.extractLane(t, 1), SIMD.Float32x4.extractLane(other, 1));
          var cz = Math.min(SIMD.Float32x4.extractLane(t, 2), SIMD.Float32x4.extractLane(other, 2));
          var cw = Math.min(SIMD.Float32x4.extractLane(t, 3), SIMD.Float32x4.extractLane(other, 3));
          return SIMD.Float32x4(cx, cy, cz, cw);
        };
      }
      if (typeof SIMD.Float32x4.max === "undefined") {
        SIMD.Float32x4.max = function(t, other) {
          t = SIMD.Float32x4.check(t);
          other = SIMD.Float32x4.check(other);
          var cx = Math.max(SIMD.Float32x4.extractLane(t, 0), SIMD.Float32x4.extractLane(other, 0));
          var cy = Math.max(SIMD.Float32x4.extractLane(t, 1), SIMD.Float32x4.extractLane(other, 1));
          var cz = Math.max(SIMD.Float32x4.extractLane(t, 2), SIMD.Float32x4.extractLane(other, 2));
          var cw = Math.max(SIMD.Float32x4.extractLane(t, 3), SIMD.Float32x4.extractLane(other, 3));
          return SIMD.Float32x4(cx, cy, cz, cw);
        };
      }
      if (typeof SIMD.Float32x4.minNum === "undefined") {
        SIMD.Float32x4.minNum = function(t, other) {
          t = SIMD.Float32x4.check(t);
          other = SIMD.Float32x4.check(other);
          var cx = minNum(SIMD.Float32x4.extractLane(t, 0), SIMD.Float32x4.extractLane(other, 0));
          var cy = minNum(SIMD.Float32x4.extractLane(t, 1), SIMD.Float32x4.extractLane(other, 1));
          var cz = minNum(SIMD.Float32x4.extractLane(t, 2), SIMD.Float32x4.extractLane(other, 2));
          var cw = minNum(SIMD.Float32x4.extractLane(t, 3), SIMD.Float32x4.extractLane(other, 3));
          return SIMD.Float32x4(cx, cy, cz, cw);
        };
      }
      if (typeof SIMD.Float32x4.maxNum === "undefined") {
        SIMD.Float32x4.maxNum = function(t, other) {
          t = SIMD.Float32x4.check(t);
          other = SIMD.Float32x4.check(other);
          var cx = maxNum(SIMD.Float32x4.extractLane(t, 0), SIMD.Float32x4.extractLane(other, 0));
          var cy = maxNum(SIMD.Float32x4.extractLane(t, 1), SIMD.Float32x4.extractLane(other, 1));
          var cz = maxNum(SIMD.Float32x4.extractLane(t, 2), SIMD.Float32x4.extractLane(other, 2));
          var cw = maxNum(SIMD.Float32x4.extractLane(t, 3), SIMD.Float32x4.extractLane(other, 3));
          return SIMD.Float32x4(cx, cy, cz, cw);
        };
      }
      if (typeof SIMD.Float32x4.reciprocalApproximation === "undefined") {
        SIMD.Float32x4.reciprocalApproximation = function(t) {
          t = SIMD.Float32x4.check(t);
          return SIMD.Float32x4.div(SIMD.Float32x4.splat(1.0), t);
        };
      }
      if (typeof SIMD.Float32x4.reciprocalSqrtApproximation === "undefined") {
        SIMD.Float32x4.reciprocalSqrtApproximation = function(t) {
          t = SIMD.Float32x4.check(t);
          return SIMD.Float32x4.reciprocalApproximation(SIMD.Float32x4.sqrt(t));
        };
      }
      if (typeof SIMD.Float32x4.sqrt === "undefined") {
        SIMD.Float32x4.sqrt = function(t) {
          t = SIMD.Float32x4.check(t);
          return SIMD.Float32x4(Math.sqrt(SIMD.Float32x4.extractLane(t, 0)), Math.sqrt(SIMD.Float32x4.extractLane(t, 1)), Math.sqrt(SIMD.Float32x4.extractLane(t, 2)), Math.sqrt(SIMD.Float32x4.extractLane(t, 3)));
        };
      }
      if (typeof SIMD.Float32x4.swizzle === "undefined") {
        SIMD.Float32x4.swizzle = function(t, x, y, z, w) {
          t = SIMD.Float32x4.check(t);
          check4(x);
          check4(y);
          check4(z);
          check4(w);
          _f32x4[0] = SIMD.Float32x4.extractLane(t, 0);
          _f32x4[1] = SIMD.Float32x4.extractLane(t, 1);
          _f32x4[2] = SIMD.Float32x4.extractLane(t, 2);
          _f32x4[3] = SIMD.Float32x4.extractLane(t, 3);
          var storage = _f32x4;
          return SIMD.Float32x4(storage[x], storage[y], storage[z], storage[w]);
        };
      }
      if (typeof SIMD.Float32x4.shuffle === "undefined") {
        _f32x8 = new Float32Array(8);
        SIMD.Float32x4.shuffle = function(t1, t2, x, y, z, w) {
          t1 = SIMD.Float32x4.check(t1);
          t2 = SIMD.Float32x4.check(t2);
          check8(x);
          check8(y);
          check8(z);
          check8(w);
          var storage = _f32x8;
          storage[0] = SIMD.Float32x4.extractLane(t1, 0);
          storage[1] = SIMD.Float32x4.extractLane(t1, 1);
          storage[2] = SIMD.Float32x4.extractLane(t1, 2);
          storage[3] = SIMD.Float32x4.extractLane(t1, 3);
          storage[4] = SIMD.Float32x4.extractLane(t2, 0);
          storage[5] = SIMD.Float32x4.extractLane(t2, 1);
          storage[6] = SIMD.Float32x4.extractLane(t2, 2);
          storage[7] = SIMD.Float32x4.extractLane(t2, 3);
          return SIMD.Float32x4(storage[x], storage[y], storage[z], storage[w]);
        };
      }
      if (typeof SIMD.Float32x4.lessThan === "undefined") {
        SIMD.Float32x4.lessThan = function(t, other) {
          t = SIMD.Float32x4.check(t);
          other = SIMD.Float32x4.check(other);
          var cx = SIMD.Float32x4.extractLane(t, 0) < SIMD.Float32x4.extractLane(other, 0);
          var cy = SIMD.Float32x4.extractLane(t, 1) < SIMD.Float32x4.extractLane(other, 1);
          var cz = SIMD.Float32x4.extractLane(t, 2) < SIMD.Float32x4.extractLane(other, 2);
          var cw = SIMD.Float32x4.extractLane(t, 3) < SIMD.Float32x4.extractLane(other, 3);
          return SIMD.Bool32x4(cx, cy, cz, cw);
        };
      }
      if (typeof SIMD.Float32x4.lessThanOrEqual === "undefined") {
        SIMD.Float32x4.lessThanOrEqual = function(t, other) {
          t = SIMD.Float32x4.check(t);
          other = SIMD.Float32x4.check(other);
          var cx = SIMD.Float32x4.extractLane(t, 0) <= SIMD.Float32x4.extractLane(other, 0);
          var cy = SIMD.Float32x4.extractLane(t, 1) <= SIMD.Float32x4.extractLane(other, 1);
          var cz = SIMD.Float32x4.extractLane(t, 2) <= SIMD.Float32x4.extractLane(other, 2);
          var cw = SIMD.Float32x4.extractLane(t, 3) <= SIMD.Float32x4.extractLane(other, 3);
          return SIMD.Bool32x4(cx, cy, cz, cw);
        };
      }
      if (typeof SIMD.Float32x4.equal === "undefined") {
        SIMD.Float32x4.equal = function(t, other) {
          t = SIMD.Float32x4.check(t);
          other = SIMD.Float32x4.check(other);
          var cx = SIMD.Float32x4.extractLane(t, 0) == SIMD.Float32x4.extractLane(other, 0);
          var cy = SIMD.Float32x4.extractLane(t, 1) == SIMD.Float32x4.extractLane(other, 1);
          var cz = SIMD.Float32x4.extractLane(t, 2) == SIMD.Float32x4.extractLane(other, 2);
          var cw = SIMD.Float32x4.extractLane(t, 3) == SIMD.Float32x4.extractLane(other, 3);
          return SIMD.Bool32x4(cx, cy, cz, cw);
        };
      }
      if (typeof SIMD.Float32x4.notEqual === "undefined") {
        SIMD.Float32x4.notEqual = function(t, other) {
          t = SIMD.Float32x4.check(t);
          other = SIMD.Float32x4.check(other);
          var cx = SIMD.Float32x4.extractLane(t, 0) != SIMD.Float32x4.extractLane(other, 0);
          var cy = SIMD.Float32x4.extractLane(t, 1) != SIMD.Float32x4.extractLane(other, 1);
          var cz = SIMD.Float32x4.extractLane(t, 2) != SIMD.Float32x4.extractLane(other, 2);
          var cw = SIMD.Float32x4.extractLane(t, 3) != SIMD.Float32x4.extractLane(other, 3);
          return SIMD.Bool32x4(cx, cy, cz, cw);
        };
      }
      if (typeof SIMD.Float32x4.greaterThanOrEqual === "undefined") {
        SIMD.Float32x4.greaterThanOrEqual = function(t, other) {
          t = SIMD.Float32x4.check(t);
          other = SIMD.Float32x4.check(other);
          var cx = SIMD.Float32x4.extractLane(t, 0) >= SIMD.Float32x4.extractLane(other, 0);
          var cy = SIMD.Float32x4.extractLane(t, 1) >= SIMD.Float32x4.extractLane(other, 1);
          var cz = SIMD.Float32x4.extractLane(t, 2) >= SIMD.Float32x4.extractLane(other, 2);
          var cw = SIMD.Float32x4.extractLane(t, 3) >= SIMD.Float32x4.extractLane(other, 3);
          return SIMD.Bool32x4(cx, cy, cz, cw);
        };
      }
      if (typeof SIMD.Float32x4.greaterThan === "undefined") {
        SIMD.Float32x4.greaterThan = function(t, other) {
          t = SIMD.Float32x4.check(t);
          other = SIMD.Float32x4.check(other);
          var cx = SIMD.Float32x4.extractLane(t, 0) > SIMD.Float32x4.extractLane(other, 0);
          var cy = SIMD.Float32x4.extractLane(t, 1) > SIMD.Float32x4.extractLane(other, 1);
          var cz = SIMD.Float32x4.extractLane(t, 2) > SIMD.Float32x4.extractLane(other, 2);
          var cw = SIMD.Float32x4.extractLane(t, 3) > SIMD.Float32x4.extractLane(other, 3);
          return SIMD.Bool32x4(cx, cy, cz, cw);
        };
      }
      if (typeof SIMD.Float32x4.select === "undefined") {
        SIMD.Float32x4.select = function(t, trueValue, falseValue) {
          t = SIMD.Bool32x4.check(t);
          trueValue = SIMD.Float32x4.check(trueValue);
          falseValue = SIMD.Float32x4.check(falseValue);
          return SIMD.Float32x4(SIMD.Bool32x4.extractLane(t, 0) ? SIMD.Float32x4.extractLane(trueValue, 0) : SIMD.Float32x4.extractLane(falseValue, 0), SIMD.Bool32x4.extractLane(t, 1) ? SIMD.Float32x4.extractLane(trueValue, 1) : SIMD.Float32x4.extractLane(falseValue, 1), SIMD.Bool32x4.extractLane(t, 2) ? SIMD.Float32x4.extractLane(trueValue, 2) : SIMD.Float32x4.extractLane(falseValue, 2), SIMD.Bool32x4.extractLane(t, 3) ? SIMD.Float32x4.extractLane(trueValue, 3) : SIMD.Float32x4.extractLane(falseValue, 3));
        };
      }
      if (typeof SIMD.Float32x4.load === "undefined") {
        SIMD.Float32x4.load = function(tarray, index) {
          if (!isTypedArray(tarray))
            throw new TypeError("The 1st argument must be a typed array.");
          if (!isInt32(index))
            throw new TypeError("The 2nd argument must be an Int32.");
          var bpe = tarray.BYTES_PER_ELEMENT;
          if (index < 0 || (index * bpe + 16) > tarray.byteLength)
            throw new RangeError("The value of index is invalid.");
          var f32temp = _f32x4;
          var array = bpe == 1 ? _i8x16 : bpe == 2 ? _i16x8 : bpe == 4 ? (tarray instanceof Float32Array ? f32temp : _i32x4) : _f64x2;
          var n = 16 / bpe;
          for (var i = 0; i < n; ++i)
            array[i] = tarray[index + i];
          return SIMD.Float32x4(f32temp[0], f32temp[1], f32temp[2], f32temp[3]);
        };
      }
      if (typeof SIMD.Float32x4.load1 === "undefined") {
        SIMD.Float32x4.load1 = function(tarray, index) {
          if (!isTypedArray(tarray))
            throw new TypeError("The 1st argument must be a typed array.");
          if (!isInt32(index))
            throw new TypeError("The 2nd argument must be an Int32.");
          var bpe = tarray.BYTES_PER_ELEMENT;
          if (index < 0 || (index * bpe + 4) > tarray.byteLength)
            throw new RangeError("The value of index is invalid.");
          var f32temp = _f32x4;
          var array = bpe == 1 ? _i8x16 : bpe == 2 ? _i16x8 : bpe == 4 ? (tarray instanceof Float32Array ? f32temp : _i32x4) : _f64x2;
          var n = 4 / bpe;
          for (var i = 0; i < n; ++i)
            array[i] = tarray[index + i];
          return SIMD.Float32x4(f32temp[0], 0.0, 0.0, 0.0);
        };
      }
      if (typeof SIMD.Float32x4.load2 === "undefined") {
        SIMD.Float32x4.load2 = function(tarray, index) {
          if (!isTypedArray(tarray))
            throw new TypeError("The 1st argument must be a typed array.");
          if (!isInt32(index))
            throw new TypeError("The 2nd argument must be an Int32.");
          var bpe = tarray.BYTES_PER_ELEMENT;
          if (index < 0 || (index * bpe + 8) > tarray.byteLength)
            throw new RangeError("The value of index is invalid.");
          var f32temp = _f32x4;
          var array = bpe == 1 ? _i8x16 : bpe == 2 ? _i16x8 : bpe == 4 ? (tarray instanceof Float32Array ? f32temp : _i32x4) : _f64x2;
          var n = 8 / bpe;
          for (var i = 0; i < n; ++i)
            array[i] = tarray[index + i];
          return SIMD.Float32x4(f32temp[0], f32temp[1], 0.0, 0.0);
        };
      }
      if (typeof SIMD.Float32x4.load3 === "undefined") {
        SIMD.Float32x4.load3 = function(tarray, index) {
          if (!isTypedArray(tarray))
            throw new TypeError("The 1st argument must be a typed array.");
          if (!isInt32(index))
            throw new TypeError("The 2nd argument must be an Int32.");
          var bpe = tarray.BYTES_PER_ELEMENT;
          if (index < 0 || (index * bpe + 12) > tarray.byteLength)
            throw new RangeError("The value of index is invalid.");
          var f32temp = _f32x4;
          var array = bpe == 1 ? _i8x16 : bpe == 2 ? _i16x8 : bpe == 4 ? (tarray instanceof Float32Array ? f32temp : _i32x4) : _f64x2;
          var n = 12 / bpe;
          for (var i = 0; i < n; ++i)
            array[i] = tarray[index + i];
          return SIMD.Float32x4(f32temp[0], f32temp[1], f32temp[2], 0.0);
        };
      }
      if (typeof SIMD.Float32x4.store === "undefined") {
        SIMD.Float32x4.store = function(tarray, index, value) {
          if (!isTypedArray(tarray))
            throw new TypeError("The 1st argument must be a typed array.");
          if (!isInt32(index))
            throw new TypeError("The 2nd argument must be an Int32.");
          var bpe = tarray.BYTES_PER_ELEMENT;
          if (index < 0 || (index * bpe + 16) > tarray.byteLength)
            throw new RangeError("The value of index is invalid.");
          value = SIMD.Float32x4.check(value);
          _f32x4[0] = SIMD.Float32x4.extractLane(value, 0);
          _f32x4[1] = SIMD.Float32x4.extractLane(value, 1);
          _f32x4[2] = SIMD.Float32x4.extractLane(value, 2);
          _f32x4[3] = SIMD.Float32x4.extractLane(value, 3);
          var array = bpe == 1 ? _i8x16 : bpe == 2 ? _i16x8 : bpe == 4 ? (tarray instanceof Float32Array ? _f32x4 : _i32x4) : _f64x2;
          var n = 16 / bpe;
          for (var i = 0; i < n; ++i)
            tarray[index + i] = array[i];
          return value;
        };
      }
      if (typeof SIMD.Float32x4.store1 === "undefined") {
        SIMD.Float32x4.store1 = function(tarray, index, value) {
          if (!isTypedArray(tarray))
            throw new TypeError("The 1st argument must be a typed array.");
          if (!isInt32(index))
            throw new TypeError("The 2nd argument must be an Int32.");
          var bpe = tarray.BYTES_PER_ELEMENT;
          if (index < 0 || (index * bpe + 4) > tarray.byteLength)
            throw new RangeError("The value of index is invalid.");
          value = SIMD.Float32x4.check(value);
          if (bpe == 8) {
            var view = new Float32Array(tarray.buffer, tarray.byteOffset + index * 8, 1);
            view[0] = SIMD.Float32x4.extractLane(value, 0);
          } else {
            _f32x4[0] = SIMD.Float32x4.extractLane(value, 0);
            var array = bpe == 1 ? _i8x16 : bpe == 2 ? _i16x8 : (tarray instanceof Float32Array ? _f32x4 : _i32x4);
            var n = 4 / bpe;
            for (var i = 0; i < n; ++i)
              tarray[index + i] = array[i];
            return value;
          }
        };
      }
      if (typeof SIMD.Float32x4.store2 === "undefined") {
        SIMD.Float32x4.store2 = function(tarray, index, value) {
          if (!isTypedArray(tarray))
            throw new TypeError("The 1st argument must be a typed array.");
          if (!isInt32(index))
            throw new TypeError("The 2nd argument must be an Int32.");
          var bpe = tarray.BYTES_PER_ELEMENT;
          if (index < 0 || (index * bpe + 8) > tarray.byteLength)
            throw new RangeError("The value of index is invalid.");
          value = SIMD.Float32x4.check(value);
          _f32x4[0] = SIMD.Float32x4.extractLane(value, 0);
          _f32x4[1] = SIMD.Float32x4.extractLane(value, 1);
          var array = bpe == 1 ? _i8x16 : bpe == 2 ? _i16x8 : bpe == 4 ? (tarray instanceof Float32Array ? _f32x4 : _i32x4) : _f64x2;
          var n = 8 / bpe;
          for (var i = 0; i < n; ++i)
            tarray[index + i] = array[i];
          return value;
        };
      }
      if (typeof SIMD.Float32x4.store3 === "undefined") {
        SIMD.Float32x4.store3 = function(tarray, index, value) {
          if (!isTypedArray(tarray))
            throw new TypeError("The 1st argument must be a typed array.");
          if (!isInt32(index))
            throw new TypeError("The 2nd argument must be an Int32.");
          var bpe = tarray.BYTES_PER_ELEMENT;
          if (index < 0 || (index * bpe + 12) > tarray.byteLength)
            throw new RangeError("The value of index is invalid.");
          value = SIMD.Float32x4.check(value);
          if (bpe == 8) {
            var view = new Float32Array(tarray.buffer, tarray.byteOffset + index * 8, 3);
            view[0] = SIMD.Float32x4.extractLane(value, 0);
            view[1] = SIMD.Float32x4.extractLane(value, 1);
            view[2] = SIMD.Float32x4.extractLane(value, 2);
          } else {
            _f32x4[0] = SIMD.Float32x4.extractLane(value, 0);
            _f32x4[1] = SIMD.Float32x4.extractLane(value, 1);
            _f32x4[2] = SIMD.Float32x4.extractLane(value, 2);
            var array = bpe == 1 ? _i8x16 : bpe == 2 ? _i16x8 : (tarray instanceof Float32Array ? _f32x4 : _i32x4);
            var n = 12 / bpe;
            for (var i = 0; i < n; ++i)
              tarray[index + i] = array[i];
            return value;
          }
        };
      }
      if (typeof SIMD.Float64x2.abs === "undefined") {
        SIMD.Float64x2.abs = function(t) {
          t = SIMD.Float64x2.check(t);
          return SIMD.Float64x2(Math.abs(SIMD.Float64x2.extractLane(t, 0)), Math.abs(SIMD.Float64x2.extractLane(t, 1)));
        };
      }
      if (typeof SIMD.Float64x2.neg === "undefined") {
        SIMD.Float64x2.neg = function(t) {
          t = SIMD.Float64x2.check(t);
          return SIMD.Float64x2(-SIMD.Float64x2.extractLane(t, 0), -SIMD.Float64x2.extractLane(t, 1));
        };
      }
      if (typeof SIMD.Float64x2.add === "undefined") {
        SIMD.Float64x2.add = function(a, b) {
          a = SIMD.Float64x2.check(a);
          b = SIMD.Float64x2.check(b);
          return SIMD.Float64x2(SIMD.Float64x2.extractLane(a, 0) + SIMD.Float64x2.extractLane(b, 0), SIMD.Float64x2.extractLane(a, 1) + SIMD.Float64x2.extractLane(b, 1));
        };
      }
      if (typeof SIMD.Float64x2.sub === "undefined") {
        SIMD.Float64x2.sub = function(a, b) {
          a = SIMD.Float64x2.check(a);
          b = SIMD.Float64x2.check(b);
          return SIMD.Float64x2(SIMD.Float64x2.extractLane(a, 0) - SIMD.Float64x2.extractLane(b, 0), SIMD.Float64x2.extractLane(a, 1) - SIMD.Float64x2.extractLane(b, 1));
        };
      }
      if (typeof SIMD.Float64x2.mul === "undefined") {
        SIMD.Float64x2.mul = function(a, b) {
          a = SIMD.Float64x2.check(a);
          b = SIMD.Float64x2.check(b);
          return SIMD.Float64x2(SIMD.Float64x2.extractLane(a, 0) * SIMD.Float64x2.extractLane(b, 0), SIMD.Float64x2.extractLane(a, 1) * SIMD.Float64x2.extractLane(b, 1));
        };
      }
      if (typeof SIMD.Float64x2.div === "undefined") {
        SIMD.Float64x2.div = function(a, b) {
          a = SIMD.Float64x2.check(a);
          b = SIMD.Float64x2.check(b);
          return SIMD.Float64x2(SIMD.Float64x2.extractLane(a, 0) / SIMD.Float64x2.extractLane(b, 0), SIMD.Float64x2.extractLane(a, 1) / SIMD.Float64x2.extractLane(b, 1));
        };
      }
      if (typeof SIMD.Float64x2.min === "undefined") {
        SIMD.Float64x2.min = function(t, other) {
          t = SIMD.Float64x2.check(t);
          other = SIMD.Float64x2.check(other);
          var cx = Math.min(SIMD.Float64x2.extractLane(t, 0), SIMD.Float64x2.extractLane(other, 0));
          var cy = Math.min(SIMD.Float64x2.extractLane(t, 1), SIMD.Float64x2.extractLane(other, 1));
          return SIMD.Float64x2(cx, cy);
        };
      }
      if (typeof SIMD.Float64x2.max === "undefined") {
        SIMD.Float64x2.max = function(t, other) {
          t = SIMD.Float64x2.check(t);
          other = SIMD.Float64x2.check(other);
          var cx = Math.max(SIMD.Float64x2.extractLane(t, 0), SIMD.Float64x2.extractLane(other, 0));
          var cy = Math.max(SIMD.Float64x2.extractLane(t, 1), SIMD.Float64x2.extractLane(other, 1));
          return SIMD.Float64x2(cx, cy);
        };
      }
      if (typeof SIMD.Float64x2.minNum === "undefined") {
        SIMD.Float64x2.minNum = function(t, other) {
          t = SIMD.Float64x2.check(t);
          other = SIMD.Float64x2.check(other);
          var cx = minNum(SIMD.Float64x2.extractLane(t, 0), SIMD.Float64x2.extractLane(other, 0));
          var cy = minNum(SIMD.Float64x2.extractLane(t, 1), SIMD.Float64x2.extractLane(other, 1));
          return SIMD.Float64x2(cx, cy);
        };
      }
      if (typeof SIMD.Float64x2.maxNum === "undefined") {
        SIMD.Float64x2.maxNum = function(t, other) {
          t = SIMD.Float64x2.check(t);
          other = SIMD.Float64x2.check(other);
          var cx = maxNum(SIMD.Float64x2.extractLane(t, 0), SIMD.Float64x2.extractLane(other, 0));
          var cy = maxNum(SIMD.Float64x2.extractLane(t, 1), SIMD.Float64x2.extractLane(other, 1));
          return SIMD.Float64x2(cx, cy);
        };
      }
      if (typeof SIMD.Float64x2.reciprocalApproximation === "undefined") {
        SIMD.Float64x2.reciprocalApproximation = function(t) {
          t = SIMD.Float64x2.check(t);
          return SIMD.Float64x2.div(SIMD.Float64x2.splat(1.0), t);
        };
      }
      if (typeof SIMD.Float64x2.reciprocalSqrtApproximation === "undefined") {
        SIMD.Float64x2.reciprocalSqrtApproximation = function(t) {
          t = SIMD.Float64x2.check(t);
          return SIMD.Float64x2.reciprocalApproximation(SIMD.Float64x2.sqrt(t));
        };
      }
      if (typeof SIMD.Float64x2.sqrt === "undefined") {
        SIMD.Float64x2.sqrt = function(t) {
          t = SIMD.Float64x2.check(t);
          return SIMD.Float64x2(Math.sqrt(SIMD.Float64x2.extractLane(t, 0)), Math.sqrt(SIMD.Float64x2.extractLane(t, 1)));
        };
      }
      if (typeof SIMD.Float64x2.swizzle === "undefined") {
        SIMD.Float64x2.swizzle = function(t, x, y) {
          t = SIMD.Float64x2.check(t);
          check2(x);
          check2(y);
          var storage = _f64x2;
          storage[0] = SIMD.Float64x2.extractLane(t, 0);
          storage[1] = SIMD.Float64x2.extractLane(t, 1);
          return SIMD.Float64x2(storage[x], storage[y]);
        };
      }
      if (typeof SIMD.Float64x2.shuffle === "undefined") {
        _f64x4 = new Float64Array(4);
        SIMD.Float64x2.shuffle = function(t1, t2, x, y) {
          t1 = SIMD.Float64x2.check(t1);
          t2 = SIMD.Float64x2.check(t2);
          check4(x);
          check4(y);
          var storage = _f64x4;
          storage[0] = SIMD.Float64x2.extractLane(t1, 0);
          storage[1] = SIMD.Float64x2.extractLane(t1, 1);
          storage[2] = SIMD.Float64x2.extractLane(t2, 0);
          storage[3] = SIMD.Float64x2.extractLane(t2, 1);
          return SIMD.Float64x2(storage[x], storage[y]);
        };
      }
      if (typeof SIMD.Float64x2.lessThan === "undefined") {
        SIMD.Float64x2.lessThan = function(t, other) {
          t = SIMD.Float64x2.check(t);
          other = SIMD.Float64x2.check(other);
          var cx = SIMD.Float64x2.extractLane(t, 0) < SIMD.Float64x2.extractLane(other, 0);
          var cy = SIMD.Float64x2.extractLane(t, 1) < SIMD.Float64x2.extractLane(other, 1);
          return SIMD.Bool64x2(cx, cy);
        };
      }
      if (typeof SIMD.Float64x2.lessThanOrEqual === "undefined") {
        SIMD.Float64x2.lessThanOrEqual = function(t, other) {
          t = SIMD.Float64x2.check(t);
          other = SIMD.Float64x2.check(other);
          var cx = SIMD.Float64x2.extractLane(t, 0) <= SIMD.Float64x2.extractLane(other, 0);
          var cy = SIMD.Float64x2.extractLane(t, 1) <= SIMD.Float64x2.extractLane(other, 1);
          return SIMD.Bool64x2(cx, cy);
        };
      }
      if (typeof SIMD.Float64x2.equal === "undefined") {
        SIMD.Float64x2.equal = function(t, other) {
          t = SIMD.Float64x2.check(t);
          other = SIMD.Float64x2.check(other);
          var cx = SIMD.Float64x2.extractLane(t, 0) == SIMD.Float64x2.extractLane(other, 0);
          var cy = SIMD.Float64x2.extractLane(t, 1) == SIMD.Float64x2.extractLane(other, 1);
          return SIMD.Bool64x2(cx, cy);
        };
      }
      if (typeof SIMD.Float64x2.notEqual === "undefined") {
        SIMD.Float64x2.notEqual = function(t, other) {
          t = SIMD.Float64x2.check(t);
          other = SIMD.Float64x2.check(other);
          var cx = SIMD.Float64x2.extractLane(t, 0) != SIMD.Float64x2.extractLane(other, 0);
          var cy = SIMD.Float64x2.extractLane(t, 1) != SIMD.Float64x2.extractLane(other, 1);
          return SIMD.Bool64x2(cx, cy);
        };
      }
      if (typeof SIMD.Float64x2.greaterThanOrEqual === "undefined") {
        SIMD.Float64x2.greaterThanOrEqual = function(t, other) {
          t = SIMD.Float64x2.check(t);
          other = SIMD.Float64x2.check(other);
          var cx = SIMD.Float64x2.extractLane(t, 0) >= SIMD.Float64x2.extractLane(other, 0);
          var cy = SIMD.Float64x2.extractLane(t, 1) >= SIMD.Float64x2.extractLane(other, 1);
          return SIMD.Bool64x2(cx, cy);
        };
      }
      if (typeof SIMD.Float64x2.greaterThan === "undefined") {
        SIMD.Float64x2.greaterThan = function(t, other) {
          t = SIMD.Float64x2.check(t);
          other = SIMD.Float64x2.check(other);
          var cx = SIMD.Float64x2.extractLane(t, 0) > SIMD.Float64x2.extractLane(other, 0);
          var cy = SIMD.Float64x2.extractLane(t, 1) > SIMD.Float64x2.extractLane(other, 1);
          return SIMD.Bool64x2(cx, cy);
        };
      }
      if (typeof SIMD.Float64x2.select === "undefined") {
        SIMD.Float64x2.select = function(t, trueValue, falseValue) {
          t = SIMD.Bool64x2.check(t);
          trueValue = SIMD.Float64x2.check(trueValue);
          falseValue = SIMD.Float64x2.check(falseValue);
          return SIMD.Float64x2(SIMD.Bool64x2.extractLane(t, 0) ? SIMD.Float64x2.extractLane(trueValue, 0) : SIMD.Float64x2.extractLane(falseValue, 0), SIMD.Bool64x2.extractLane(t, 1) ? SIMD.Float64x2.extractLane(trueValue, 1) : SIMD.Float64x2.extractLane(falseValue, 1));
        };
      }
      if (typeof SIMD.Float64x2.load === "undefined") {
        SIMD.Float64x2.load = function(tarray, index) {
          if (!isTypedArray(tarray))
            throw new TypeError("The 1st argument must be a typed array.");
          if (!isInt32(index))
            throw new TypeError("The 2nd argument must be an Int32.");
          var bpe = tarray.BYTES_PER_ELEMENT;
          if (index < 0 || (index * bpe + 16) > tarray.byteLength)
            throw new RangeError("The value of index is invalid.");
          var f64temp = _f64x2;
          var array = bpe == 1 ? _i8x16 : bpe == 2 ? _i16x8 : bpe == 4 ? (tarray instanceof Float32Array ? _f32x4 : _i32x4) : f64temp;
          var n = 16 / bpe;
          for (var i = 0; i < n; ++i)
            array[i] = tarray[index + i];
          return SIMD.Float64x2(f64temp[0], f64temp[1]);
        };
      }
      if (typeof SIMD.Float64x2.load1 === "undefined") {
        SIMD.Float64x2.load1 = function(tarray, index) {
          if (!isTypedArray(tarray))
            throw new TypeError("The 1st argument must be a typed array.");
          if (!isInt32(index))
            throw new TypeError("The 2nd argument must be an Int32.");
          var bpe = tarray.BYTES_PER_ELEMENT;
          if (index < 0 || (index * bpe + 8) > tarray.byteLength)
            throw new RangeError("The value of index is invalid.");
          var f64temp = _f64x2;
          var array = bpe == 1 ? _i8x16 : bpe == 2 ? _i16x8 : bpe == 4 ? (tarray instanceof Float32Array ? _f32x4 : _i32x4) : f64temp;
          var n = 8 / bpe;
          for (var i = 0; i < n; ++i)
            array[i] = tarray[index + i];
          return SIMD.Float64x2(f64temp[0], 0.0);
        };
      }
      if (typeof SIMD.Float64x2.store === "undefined") {
        SIMD.Float64x2.store = function(tarray, index, value) {
          if (!isTypedArray(tarray))
            throw new TypeError("The 1st argument must be a typed array.");
          if (!isInt32(index))
            throw new TypeError("The 2nd argument must be an Int32.");
          var bpe = tarray.BYTES_PER_ELEMENT;
          if (index < 0 || (index * bpe + 16) > tarray.byteLength)
            throw new RangeError("The value of index is invalid.");
          value = SIMD.Float64x2.check(value);
          _f64x2[0] = SIMD.Float64x2.extractLane(value, 0);
          _f64x2[1] = SIMD.Float64x2.extractLane(value, 1);
          var array = bpe == 1 ? _i8x16 : bpe == 2 ? _i16x8 : bpe == 4 ? (tarray instanceof Float32Array ? _f32x4 : _i32x4) : _f64x2;
          var n = 16 / bpe;
          for (var i = 0; i < n; ++i)
            tarray[index + i] = array[i];
          return value;
        };
      }
      if (typeof SIMD.Float64x2.store1 === "undefined") {
        SIMD.Float64x2.store1 = function(tarray, index, value) {
          if (!isTypedArray(tarray))
            throw new TypeError("The 1st argument must be a typed array.");
          if (!isInt32(index))
            throw new TypeError("The 2nd argument must be an Int32.");
          var bpe = tarray.BYTES_PER_ELEMENT;
          if (index < 0 || (index * bpe + 8) > tarray.byteLength)
            throw new RangeError("The value of index is invalid.");
          value = SIMD.Float64x2.check(value);
          _f64x2[0] = SIMD.Float64x2.extractLane(value, 0);
          var array = bpe == 1 ? _i8x16 : bpe == 2 ? _i16x8 : bpe == 4 ? (tarray instanceof Float32Array ? _f32x4 : _i32x4) : _f64x2;
          var n = 8 / bpe;
          for (var i = 0; i < n; ++i)
            tarray[index + i] = array[i];
          return value;
        };
      }
      if (typeof SIMD.Int32x4.and === "undefined") {
        SIMD.Int32x4.and = function(a, b) {
          a = SIMD.Int32x4.check(a);
          b = SIMD.Int32x4.check(b);
          return SIMD.Int32x4(SIMD.Int32x4.extractLane(a, 0) & SIMD.Int32x4.extractLane(b, 0), SIMD.Int32x4.extractLane(a, 1) & SIMD.Int32x4.extractLane(b, 1), SIMD.Int32x4.extractLane(a, 2) & SIMD.Int32x4.extractLane(b, 2), SIMD.Int32x4.extractLane(a, 3) & SIMD.Int32x4.extractLane(b, 3));
        };
      }
      if (typeof SIMD.Int32x4.or === "undefined") {
        SIMD.Int32x4.or = function(a, b) {
          a = SIMD.Int32x4.check(a);
          b = SIMD.Int32x4.check(b);
          return SIMD.Int32x4(SIMD.Int32x4.extractLane(a, 0) | SIMD.Int32x4.extractLane(b, 0), SIMD.Int32x4.extractLane(a, 1) | SIMD.Int32x4.extractLane(b, 1), SIMD.Int32x4.extractLane(a, 2) | SIMD.Int32x4.extractLane(b, 2), SIMD.Int32x4.extractLane(a, 3) | SIMD.Int32x4.extractLane(b, 3));
        };
      }
      if (typeof SIMD.Int32x4.xor === "undefined") {
        SIMD.Int32x4.xor = function(a, b) {
          a = SIMD.Int32x4.check(a);
          b = SIMD.Int32x4.check(b);
          return SIMD.Int32x4(SIMD.Int32x4.extractLane(a, 0) ^ SIMD.Int32x4.extractLane(b, 0), SIMD.Int32x4.extractLane(a, 1) ^ SIMD.Int32x4.extractLane(b, 1), SIMD.Int32x4.extractLane(a, 2) ^ SIMD.Int32x4.extractLane(b, 2), SIMD.Int32x4.extractLane(a, 3) ^ SIMD.Int32x4.extractLane(b, 3));
        };
      }
      if (typeof SIMD.Int32x4.not === "undefined") {
        SIMD.Int32x4.not = function(t) {
          t = SIMD.Int32x4.check(t);
          return SIMD.Int32x4(~SIMD.Int32x4.extractLane(t, 0), ~SIMD.Int32x4.extractLane(t, 1), ~SIMD.Int32x4.extractLane(t, 2), ~SIMD.Int32x4.extractLane(t, 3));
        };
      }
      if (typeof SIMD.Int32x4.neg === "undefined") {
        SIMD.Int32x4.neg = function(t) {
          t = SIMD.Int32x4.check(t);
          return SIMD.Int32x4(-SIMD.Int32x4.extractLane(t, 0), -SIMD.Int32x4.extractLane(t, 1), -SIMD.Int32x4.extractLane(t, 2), -SIMD.Int32x4.extractLane(t, 3));
        };
      }
      if (typeof SIMD.Int32x4.add === "undefined") {
        SIMD.Int32x4.add = function(a, b) {
          a = SIMD.Int32x4.check(a);
          b = SIMD.Int32x4.check(b);
          return SIMD.Int32x4(SIMD.Int32x4.extractLane(a, 0) + SIMD.Int32x4.extractLane(b, 0), SIMD.Int32x4.extractLane(a, 1) + SIMD.Int32x4.extractLane(b, 1), SIMD.Int32x4.extractLane(a, 2) + SIMD.Int32x4.extractLane(b, 2), SIMD.Int32x4.extractLane(a, 3) + SIMD.Int32x4.extractLane(b, 3));
        };
      }
      if (typeof SIMD.Int32x4.sub === "undefined") {
        SIMD.Int32x4.sub = function(a, b) {
          a = SIMD.Int32x4.check(a);
          b = SIMD.Int32x4.check(b);
          return SIMD.Int32x4(SIMD.Int32x4.extractLane(a, 0) - SIMD.Int32x4.extractLane(b, 0), SIMD.Int32x4.extractLane(a, 1) - SIMD.Int32x4.extractLane(b, 1), SIMD.Int32x4.extractLane(a, 2) - SIMD.Int32x4.extractLane(b, 2), SIMD.Int32x4.extractLane(a, 3) - SIMD.Int32x4.extractLane(b, 3));
        };
      }
      if (typeof SIMD.Int32x4.mul === "undefined") {
        SIMD.Int32x4.mul = function(a, b) {
          a = SIMD.Int32x4.check(a);
          b = SIMD.Int32x4.check(b);
          return SIMD.Int32x4(Math.imul(SIMD.Int32x4.extractLane(a, 0), SIMD.Int32x4.extractLane(b, 0)), Math.imul(SIMD.Int32x4.extractLane(a, 1), SIMD.Int32x4.extractLane(b, 1)), Math.imul(SIMD.Int32x4.extractLane(a, 2), SIMD.Int32x4.extractLane(b, 2)), Math.imul(SIMD.Int32x4.extractLane(a, 3), SIMD.Int32x4.extractLane(b, 3)));
        };
      }
      if (typeof SIMD.Int32x4.swizzle === "undefined") {
        SIMD.Int32x4.swizzle = function(t, x, y, z, w) {
          t = SIMD.Int32x4.check(t);
          check4(x);
          check4(y);
          check4(z);
          check4(w);
          var storage = _i32x4;
          storage[0] = SIMD.Int32x4.extractLane(t, 0);
          storage[1] = SIMD.Int32x4.extractLane(t, 1);
          storage[2] = SIMD.Int32x4.extractLane(t, 2);
          storage[3] = SIMD.Int32x4.extractLane(t, 3);
          return SIMD.Int32x4(storage[x], storage[y], storage[z], storage[w]);
        };
      }
      if (typeof SIMD.Int32x4.shuffle === "undefined") {
        _i32x8 = new Int32Array(8);
        SIMD.Int32x4.shuffle = function(t1, t2, x, y, z, w) {
          t1 = SIMD.Int32x4.check(t1);
          t2 = SIMD.Int32x4.check(t2);
          check8(x);
          check8(y);
          check8(z);
          check8(w);
          var storage = _i32x8;
          storage[0] = SIMD.Int32x4.extractLane(t1, 0);
          storage[1] = SIMD.Int32x4.extractLane(t1, 1);
          storage[2] = SIMD.Int32x4.extractLane(t1, 2);
          storage[3] = SIMD.Int32x4.extractLane(t1, 3);
          storage[4] = SIMD.Int32x4.extractLane(t2, 0);
          storage[5] = SIMD.Int32x4.extractLane(t2, 1);
          storage[6] = SIMD.Int32x4.extractLane(t2, 2);
          storage[7] = SIMD.Int32x4.extractLane(t2, 3);
          return SIMD.Int32x4(storage[x], storage[y], storage[z], storage[w]);
        };
      }
      if (typeof SIMD.Int32x4.select === "undefined") {
        SIMD.Int32x4.select = function(t, trueValue, falseValue) {
          t = SIMD.Bool32x4.check(t);
          trueValue = SIMD.Int32x4.check(trueValue);
          falseValue = SIMD.Int32x4.check(falseValue);
          return SIMD.Int32x4(SIMD.Bool32x4.extractLane(t, 0) ? SIMD.Int32x4.extractLane(trueValue, 0) : SIMD.Int32x4.extractLane(falseValue, 0), SIMD.Bool32x4.extractLane(t, 1) ? SIMD.Int32x4.extractLane(trueValue, 1) : SIMD.Int32x4.extractLane(falseValue, 1), SIMD.Bool32x4.extractLane(t, 2) ? SIMD.Int32x4.extractLane(trueValue, 2) : SIMD.Int32x4.extractLane(falseValue, 2), SIMD.Bool32x4.extractLane(t, 3) ? SIMD.Int32x4.extractLane(trueValue, 3) : SIMD.Int32x4.extractLane(falseValue, 3));
        };
      }
      if (typeof SIMD.Int32x4.selectBits === "undefined") {
        SIMD.Int32x4.selectBits = function(t, trueValue, falseValue) {
          t = SIMD.Int32x4.check(t);
          trueValue = SIMD.Int32x4.check(trueValue);
          falseValue = SIMD.Int32x4.check(falseValue);
          var tr = SIMD.Int32x4.and(t, trueValue);
          var fr = SIMD.Int32x4.and(SIMD.Int32x4.not(t), falseValue);
          return SIMD.Int32x4.or(tr, fr);
        };
      }
      if (typeof SIMD.Int32x4.equal === "undefined") {
        SIMD.Int32x4.equal = function(t, other) {
          t = SIMD.Int32x4.check(t);
          other = SIMD.Int32x4.check(other);
          var cx = SIMD.Int32x4.extractLane(t, 0) == SIMD.Int32x4.extractLane(other, 0);
          var cy = SIMD.Int32x4.extractLane(t, 1) == SIMD.Int32x4.extractLane(other, 1);
          var cz = SIMD.Int32x4.extractLane(t, 2) == SIMD.Int32x4.extractLane(other, 2);
          var cw = SIMD.Int32x4.extractLane(t, 3) == SIMD.Int32x4.extractLane(other, 3);
          return SIMD.Bool32x4(cx, cy, cz, cw);
        };
      }
      if (typeof SIMD.Int32x4.notEqual === "undefined") {
        SIMD.Int32x4.notEqual = function(t, other) {
          t = SIMD.Int32x4.check(t);
          other = SIMD.Int32x4.check(other);
          var cx = SIMD.Int32x4.extractLane(t, 0) != SIMD.Int32x4.extractLane(other, 0);
          var cy = SIMD.Int32x4.extractLane(t, 1) != SIMD.Int32x4.extractLane(other, 1);
          var cz = SIMD.Int32x4.extractLane(t, 2) != SIMD.Int32x4.extractLane(other, 2);
          var cw = SIMD.Int32x4.extractLane(t, 3) != SIMD.Int32x4.extractLane(other, 3);
          return SIMD.Bool32x4(cx, cy, cz, cw);
        };
      }
      if (typeof SIMD.Int32x4.greaterThan === "undefined") {
        SIMD.Int32x4.greaterThan = function(t, other) {
          t = SIMD.Int32x4.check(t);
          other = SIMD.Int32x4.check(other);
          var cx = SIMD.Int32x4.extractLane(t, 0) > SIMD.Int32x4.extractLane(other, 0);
          var cy = SIMD.Int32x4.extractLane(t, 1) > SIMD.Int32x4.extractLane(other, 1);
          var cz = SIMD.Int32x4.extractLane(t, 2) > SIMD.Int32x4.extractLane(other, 2);
          var cw = SIMD.Int32x4.extractLane(t, 3) > SIMD.Int32x4.extractLane(other, 3);
          return SIMD.Bool32x4(cx, cy, cz, cw);
        };
      }
      if (typeof SIMD.Int32x4.greaterThanOrEqual === "undefined") {
        SIMD.Int32x4.greaterThanOrEqual = function(t, other) {
          t = SIMD.Int32x4.check(t);
          other = SIMD.Int32x4.check(other);
          var cx = SIMD.Int32x4.extractLane(t, 0) >= SIMD.Int32x4.extractLane(other, 0);
          var cy = SIMD.Int32x4.extractLane(t, 1) >= SIMD.Int32x4.extractLane(other, 1);
          var cz = SIMD.Int32x4.extractLane(t, 2) >= SIMD.Int32x4.extractLane(other, 2);
          var cw = SIMD.Int32x4.extractLane(t, 3) >= SIMD.Int32x4.extractLane(other, 3);
          return SIMD.Bool32x4(cx, cy, cz, cw);
        };
      }
      if (typeof SIMD.Int32x4.lessThan === "undefined") {
        SIMD.Int32x4.lessThan = function(t, other) {
          t = SIMD.Int32x4.check(t);
          other = SIMD.Int32x4.check(other);
          var cx = SIMD.Int32x4.extractLane(t, 0) < SIMD.Int32x4.extractLane(other, 0);
          var cy = SIMD.Int32x4.extractLane(t, 1) < SIMD.Int32x4.extractLane(other, 1);
          var cz = SIMD.Int32x4.extractLane(t, 2) < SIMD.Int32x4.extractLane(other, 2);
          var cw = SIMD.Int32x4.extractLane(t, 3) < SIMD.Int32x4.extractLane(other, 3);
          return SIMD.Bool32x4(cx, cy, cz, cw);
        };
      }
      if (typeof SIMD.Int32x4.lessThanOrEqual === "undefined") {
        SIMD.Int32x4.lessThanOrEqual = function(t, other) {
          t = SIMD.Int32x4.check(t);
          other = SIMD.Int32x4.check(other);
          var cx = SIMD.Int32x4.extractLane(t, 0) <= SIMD.Int32x4.extractLane(other, 0);
          var cy = SIMD.Int32x4.extractLane(t, 1) <= SIMD.Int32x4.extractLane(other, 1);
          var cz = SIMD.Int32x4.extractLane(t, 2) <= SIMD.Int32x4.extractLane(other, 2);
          var cw = SIMD.Int32x4.extractLane(t, 3) <= SIMD.Int32x4.extractLane(other, 3);
          return SIMD.Bool32x4(cx, cy, cz, cw);
        };
      }
      if (typeof SIMD.Int32x4.shiftLeftByScalar === "undefined") {
        SIMD.Int32x4.shiftLeftByScalar = function(a, bits) {
          a = SIMD.Int32x4.check(a);
          if (bits >>> 0 >= 32)
            return SIMD.Int32x4.splat(0.0);
          var x = SIMD.Int32x4.extractLane(a, 0) << bits;
          var y = SIMD.Int32x4.extractLane(a, 1) << bits;
          var z = SIMD.Int32x4.extractLane(a, 2) << bits;
          var w = SIMD.Int32x4.extractLane(a, 3) << bits;
          return SIMD.Int32x4(x, y, z, w);
        };
      }
      if (typeof SIMD.Int32x4.shiftRightLogicalByScalar === "undefined") {
        SIMD.Int32x4.shiftRightLogicalByScalar = function(a, bits) {
          a = SIMD.Int32x4.check(a);
          if (bits >>> 0 >= 32)
            return SIMD.Int32x4.splat(0.0);
          var x = SIMD.Int32x4.extractLane(a, 0) >>> bits;
          var y = SIMD.Int32x4.extractLane(a, 1) >>> bits;
          var z = SIMD.Int32x4.extractLane(a, 2) >>> bits;
          var w = SIMD.Int32x4.extractLane(a, 3) >>> bits;
          return SIMD.Int32x4(x, y, z, w);
        };
      }
      if (typeof SIMD.Int32x4.shiftRightArithmeticByScalar === "undefined") {
        SIMD.Int32x4.shiftRightArithmeticByScalar = function(a, bits) {
          a = SIMD.Int32x4.check(a);
          if (bits >>> 0 >= 32)
            bits = 31;
          var x = SIMD.Int32x4.extractLane(a, 0) >> bits;
          var y = SIMD.Int32x4.extractLane(a, 1) >> bits;
          var z = SIMD.Int32x4.extractLane(a, 2) >> bits;
          var w = SIMD.Int32x4.extractLane(a, 3) >> bits;
          return SIMD.Int32x4(x, y, z, w);
        };
      }
      if (typeof SIMD.Int32x4.load === "undefined") {
        SIMD.Int32x4.load = function(tarray, index) {
          if (!isTypedArray(tarray))
            throw new TypeError("The 1st argument must be a typed array.");
          if (!isInt32(index))
            throw new TypeError("The 2nd argument must be an Int32.");
          var bpe = tarray.BYTES_PER_ELEMENT;
          if (index < 0 || (index * bpe + 16) > tarray.byteLength)
            throw new RangeError("The value of index is invalid.");
          var i32temp = _i32x4;
          var array = bpe == 1 ? _i8x16 : bpe == 2 ? _i16x8 : bpe == 4 ? (tarray instanceof Float32Array ? _f32x4 : i32temp) : _f64x2;
          var n = 16 / bpe;
          for (var i = 0; i < n; ++i)
            array[i] = tarray[index + i];
          return SIMD.Int32x4(i32temp[0], i32temp[1], i32temp[2], i32temp[3]);
        };
      }
      if (typeof SIMD.Int32x4.load1 === "undefined") {
        SIMD.Int32x4.load1 = function(tarray, index) {
          if (!isTypedArray(tarray))
            throw new TypeError("The 1st argument must be a typed array.");
          if (!isInt32(index))
            throw new TypeError("The 2nd argument must be an Int32.");
          var bpe = tarray.BYTES_PER_ELEMENT;
          if (index < 0 || (index * bpe + 4) > tarray.byteLength)
            throw new RangeError("The value of index is invalid.");
          var i32temp = _i32x4;
          var array = bpe == 1 ? _i8x16 : bpe == 2 ? _i16x8 : bpe == 4 ? (tarray instanceof Float32Array ? _f32x4 : i32temp) : _f64x2;
          var n = 4 / bpe;
          for (var i = 0; i < n; ++i)
            array[i] = tarray[index + i];
          return SIMD.Int32x4(i32temp[0], 0, 0, 0);
        };
      }
      if (typeof SIMD.Int32x4.load2 === "undefined") {
        SIMD.Int32x4.load2 = function(tarray, index) {
          if (!isTypedArray(tarray))
            throw new TypeError("The 1st argument must be a typed array.");
          if (!isInt32(index))
            throw new TypeError("The 2nd argument must be an Int32.");
          var bpe = tarray.BYTES_PER_ELEMENT;
          if (index < 0 || (index * bpe + 8) > tarray.byteLength)
            throw new RangeError("The value of index is invalid.");
          var i32temp = _i32x4;
          var array = bpe == 1 ? _i8x16 : bpe == 2 ? _i16x8 : bpe == 4 ? (tarray instanceof Float32Array ? _f32x4 : i32temp) : _f64x2;
          var n = 8 / bpe;
          for (var i = 0; i < n; ++i)
            array[i] = tarray[index + i];
          return SIMD.Int32x4(i32temp[0], i32temp[1], 0, 0);
        };
      }
      if (typeof SIMD.Int32x4.load3 === "undefined") {
        SIMD.Int32x4.load3 = function(tarray, index) {
          if (!isTypedArray(tarray))
            throw new TypeError("The 1st argument must be a typed array.");
          if (!isInt32(index))
            throw new TypeError("The 2nd argument must be an Int32.");
          var bpe = tarray.BYTES_PER_ELEMENT;
          if (index < 0 || (index * bpe + 12) > tarray.byteLength)
            throw new RangeError("The value of index is invalid.");
          var i32temp = _i32x4;
          var array = bpe == 1 ? _i8x16 : bpe == 2 ? _i16x8 : bpe == 4 ? (tarray instanceof Float32Array ? _f32x4 : i32temp) : _f64x2;
          var n = 12 / bpe;
          for (var i = 0; i < n; ++i)
            array[i] = tarray[index + i];
          return SIMD.Int32x4(i32temp[0], i32temp[1], i32temp[2], 0);
        };
      }
      if (typeof SIMD.Int32x4.store === "undefined") {
        SIMD.Int32x4.store = function(tarray, index, value) {
          if (!isTypedArray(tarray))
            throw new TypeError("The 1st argument must be a typed array.");
          if (!isInt32(index))
            throw new TypeError("The 2nd argument must be an Int32.");
          var bpe = tarray.BYTES_PER_ELEMENT;
          if (index < 0 || (index * bpe + 16) > tarray.byteLength)
            throw new RangeError("The value of index is invalid.");
          value = SIMD.Int32x4.check(value);
          _i32x4[0] = SIMD.Int32x4.extractLane(value, 0);
          _i32x4[1] = SIMD.Int32x4.extractLane(value, 1);
          _i32x4[2] = SIMD.Int32x4.extractLane(value, 2);
          _i32x4[3] = SIMD.Int32x4.extractLane(value, 3);
          var array = bpe == 1 ? _i8x16 : bpe == 2 ? _i16x8 : bpe == 4 ? (tarray instanceof Float32Array ? _f32x4 : _i32x4) : _f64x2;
          var n = 16 / bpe;
          for (var i = 0; i < n; ++i)
            tarray[index + i] = array[i];
          return value;
        };
      }
      if (typeof SIMD.Int32x4.store1 === "undefined") {
        SIMD.Int32x4.store1 = function(tarray, index, value) {
          if (!isTypedArray(tarray))
            throw new TypeError("The 1st argument must be a typed array.");
          if (!isInt32(index))
            throw new TypeError("The 2nd argument must be an Int32.");
          var bpe = tarray.BYTES_PER_ELEMENT;
          if (index < 0 || (index * bpe + 4) > tarray.byteLength)
            throw new RangeError("The value of index is invalid.");
          value = SIMD.Int32x4.check(value);
          if (bpe == 8) {
            var view = new Int32Array(tarray.buffer, tarray.byteOffset + index * 8, 1);
            view[0] = SIMD.Int32x4.extractLane(value, 0);
          } else {
            _i32x4[0] = SIMD.Int32x4.extractLane(value, 0);
            var array = bpe == 1 ? _i8x16 : bpe == 2 ? _i16x8 : (tarray instanceof Float32Array ? _f32x4 : _i32x4);
            var n = 4 / bpe;
            for (var i = 0; i < n; ++i)
              tarray[index + i] = array[i];
            return value;
          }
        };
      }
      if (typeof SIMD.Int32x4.store2 === "undefined") {
        SIMD.Int32x4.store2 = function(tarray, index, value) {
          if (!isTypedArray(tarray))
            throw new TypeError("The 1st argument must be a typed array.");
          if (!isInt32(index))
            throw new TypeError("The 2nd argument must be an Int32.");
          var bpe = tarray.BYTES_PER_ELEMENT;
          if (index < 0 || (index * bpe + 8) > tarray.byteLength)
            throw new RangeError("The value of index is invalid.");
          value = SIMD.Int32x4.check(value);
          _i32x4[0] = SIMD.Int32x4.extractLane(value, 0);
          _i32x4[1] = SIMD.Int32x4.extractLane(value, 1);
          var array = bpe == 1 ? _i8x16 : bpe == 2 ? _i16x8 : bpe == 4 ? (tarray instanceof Float32Array ? _f32x4 : _i32x4) : _f64x2;
          var n = 8 / bpe;
          for (var i = 0; i < n; ++i)
            tarray[index + i] = array[i];
          return value;
        };
      }
      if (typeof SIMD.Int32x4.store3 === "undefined") {
        SIMD.Int32x4.store3 = function(tarray, index, value) {
          if (!isTypedArray(tarray))
            throw new TypeError("The 1st argument must be a typed array.");
          if (!isInt32(index))
            throw new TypeError("The 2nd argument must be an Int32.");
          var bpe = tarray.BYTES_PER_ELEMENT;
          if (index < 0 || (index * bpe + 12) > tarray.byteLength)
            throw new RangeError("The value of index is invalid.");
          value = SIMD.Int32x4.check(value);
          if (bpe == 8) {
            var view = new Int32Array(tarray.buffer, tarray.byteOffset + index * 8, 3);
            view[0] = SIMD.Int32x4.extractLane(value, 0);
            view[1] = SIMD.Int32x4.extractLane(value, 1);
            view[2] = SIMD.Int32x4.extractLane(value, 2);
          } else {
            _i32x4[0] = SIMD.Int32x4.extractLane(value, 0);
            _i32x4[1] = SIMD.Int32x4.extractLane(value, 1);
            _i32x4[2] = SIMD.Int32x4.extractLane(value, 2);
            var array = bpe == 1 ? _i8x16 : bpe == 2 ? _i16x8 : (tarray instanceof Float32Array ? _f32x4 : _i32x4);
            var n = 12 / bpe;
            for (var i = 0; i < n; ++i)
              tarray[index + i] = array[i];
            return value;
          }
        };
      }
      if (typeof SIMD.Int16x8.and === "undefined") {
        SIMD.Int16x8.and = function(a, b) {
          a = SIMD.Int16x8.check(a);
          b = SIMD.Int16x8.check(b);
          return SIMD.Int16x8(SIMD.Int16x8.extractLane(a, 0) & SIMD.Int16x8.extractLane(b, 0), SIMD.Int16x8.extractLane(a, 1) & SIMD.Int16x8.extractLane(b, 1), SIMD.Int16x8.extractLane(a, 2) & SIMD.Int16x8.extractLane(b, 2), SIMD.Int16x8.extractLane(a, 3) & SIMD.Int16x8.extractLane(b, 3), SIMD.Int16x8.extractLane(a, 4) & SIMD.Int16x8.extractLane(b, 4), SIMD.Int16x8.extractLane(a, 5) & SIMD.Int16x8.extractLane(b, 5), SIMD.Int16x8.extractLane(a, 6) & SIMD.Int16x8.extractLane(b, 6), SIMD.Int16x8.extractLane(a, 7) & SIMD.Int16x8.extractLane(b, 7));
        };
      }
      if (typeof SIMD.Int16x8.or === "undefined") {
        SIMD.Int16x8.or = function(a, b) {
          a = SIMD.Int16x8.check(a);
          b = SIMD.Int16x8.check(b);
          return SIMD.Int16x8(SIMD.Int16x8.extractLane(a, 0) | SIMD.Int16x8.extractLane(b, 0), SIMD.Int16x8.extractLane(a, 1) | SIMD.Int16x8.extractLane(b, 1), SIMD.Int16x8.extractLane(a, 2) | SIMD.Int16x8.extractLane(b, 2), SIMD.Int16x8.extractLane(a, 3) | SIMD.Int16x8.extractLane(b, 3), SIMD.Int16x8.extractLane(a, 4) | SIMD.Int16x8.extractLane(b, 4), SIMD.Int16x8.extractLane(a, 5) | SIMD.Int16x8.extractLane(b, 5), SIMD.Int16x8.extractLane(a, 6) | SIMD.Int16x8.extractLane(b, 6), SIMD.Int16x8.extractLane(a, 7) | SIMD.Int16x8.extractLane(b, 7));
        };
      }
      if (typeof SIMD.Int16x8.xor === "undefined") {
        SIMD.Int16x8.xor = function(a, b) {
          a = SIMD.Int16x8.check(a);
          b = SIMD.Int16x8.check(b);
          return SIMD.Int16x8(SIMD.Int16x8.extractLane(a, 0) ^ SIMD.Int16x8.extractLane(b, 0), SIMD.Int16x8.extractLane(a, 1) ^ SIMD.Int16x8.extractLane(b, 1), SIMD.Int16x8.extractLane(a, 2) ^ SIMD.Int16x8.extractLane(b, 2), SIMD.Int16x8.extractLane(a, 3) ^ SIMD.Int16x8.extractLane(b, 3), SIMD.Int16x8.extractLane(a, 4) ^ SIMD.Int16x8.extractLane(b, 4), SIMD.Int16x8.extractLane(a, 5) ^ SIMD.Int16x8.extractLane(b, 5), SIMD.Int16x8.extractLane(a, 6) ^ SIMD.Int16x8.extractLane(b, 6), SIMD.Int16x8.extractLane(a, 7) ^ SIMD.Int16x8.extractLane(b, 7));
        };
      }
      if (typeof SIMD.Int16x8.not === "undefined") {
        SIMD.Int16x8.not = function(t) {
          t = SIMD.Int16x8.check(t);
          return SIMD.Int16x8(~SIMD.Int16x8.extractLane(t, 0), ~SIMD.Int16x8.extractLane(t, 1), ~SIMD.Int16x8.extractLane(t, 2), ~SIMD.Int16x8.extractLane(t, 3), ~SIMD.Int16x8.extractLane(t, 4), ~SIMD.Int16x8.extractLane(t, 5), ~SIMD.Int16x8.extractLane(t, 6), ~SIMD.Int16x8.extractLane(t, 7));
        };
      }
      if (typeof SIMD.Int16x8.neg === "undefined") {
        SIMD.Int16x8.neg = function(t) {
          t = SIMD.Int16x8.check(t);
          return SIMD.Int16x8(-SIMD.Int16x8.extractLane(t, 0), -SIMD.Int16x8.extractLane(t, 1), -SIMD.Int16x8.extractLane(t, 2), -SIMD.Int16x8.extractLane(t, 3), -SIMD.Int16x8.extractLane(t, 4), -SIMD.Int16x8.extractLane(t, 5), -SIMD.Int16x8.extractLane(t, 6), -SIMD.Int16x8.extractLane(t, 7));
        };
      }
      if (typeof SIMD.Int16x8.add === "undefined") {
        SIMD.Int16x8.add = function(a, b) {
          a = SIMD.Int16x8.check(a);
          b = SIMD.Int16x8.check(b);
          return SIMD.Int16x8(SIMD.Int16x8.extractLane(a, 0) + SIMD.Int16x8.extractLane(b, 0), SIMD.Int16x8.extractLane(a, 1) + SIMD.Int16x8.extractLane(b, 1), SIMD.Int16x8.extractLane(a, 2) + SIMD.Int16x8.extractLane(b, 2), SIMD.Int16x8.extractLane(a, 3) + SIMD.Int16x8.extractLane(b, 3), SIMD.Int16x8.extractLane(a, 4) + SIMD.Int16x8.extractLane(b, 4), SIMD.Int16x8.extractLane(a, 5) + SIMD.Int16x8.extractLane(b, 5), SIMD.Int16x8.extractLane(a, 6) + SIMD.Int16x8.extractLane(b, 6), SIMD.Int16x8.extractLane(a, 7) + SIMD.Int16x8.extractLane(b, 7));
        };
      }
      if (typeof SIMD.Int16x8.sub === "undefined") {
        SIMD.Int16x8.sub = function(a, b) {
          a = SIMD.Int16x8.check(a);
          b = SIMD.Int16x8.check(b);
          return SIMD.Int16x8(SIMD.Int16x8.extractLane(a, 0) - SIMD.Int16x8.extractLane(b, 0), SIMD.Int16x8.extractLane(a, 1) - SIMD.Int16x8.extractLane(b, 1), SIMD.Int16x8.extractLane(a, 2) - SIMD.Int16x8.extractLane(b, 2), SIMD.Int16x8.extractLane(a, 3) - SIMD.Int16x8.extractLane(b, 3), SIMD.Int16x8.extractLane(a, 4) - SIMD.Int16x8.extractLane(b, 4), SIMD.Int16x8.extractLane(a, 5) - SIMD.Int16x8.extractLane(b, 5), SIMD.Int16x8.extractLane(a, 6) - SIMD.Int16x8.extractLane(b, 6), SIMD.Int16x8.extractLane(a, 7) - SIMD.Int16x8.extractLane(b, 7));
        };
      }
      if (typeof SIMD.Int16x8.mul === "undefined") {
        SIMD.Int16x8.mul = function(a, b) {
          a = SIMD.Int16x8.check(a);
          b = SIMD.Int16x8.check(b);
          return SIMD.Int16x8(Math.imul(SIMD.Int16x8.extractLane(a, 0), SIMD.Int16x8.extractLane(b, 0)), Math.imul(SIMD.Int16x8.extractLane(a, 1), SIMD.Int16x8.extractLane(b, 1)), Math.imul(SIMD.Int16x8.extractLane(a, 2), SIMD.Int16x8.extractLane(b, 2)), Math.imul(SIMD.Int16x8.extractLane(a, 3), SIMD.Int16x8.extractLane(b, 3)), Math.imul(SIMD.Int16x8.extractLane(a, 4), SIMD.Int16x8.extractLane(b, 4)), Math.imul(SIMD.Int16x8.extractLane(a, 5), SIMD.Int16x8.extractLane(b, 5)), Math.imul(SIMD.Int16x8.extractLane(a, 6), SIMD.Int16x8.extractLane(b, 6)), Math.imul(SIMD.Int16x8.extractLane(a, 7), SIMD.Int16x8.extractLane(b, 7)));
        };
      }
      if (typeof SIMD.Int16x8.swizzle === "undefined") {
        SIMD.Int16x8.swizzle = function(t, s0, s1, s2, s3, s4, s5, s6, s7) {
          t = SIMD.Int16x8.check(t);
          check8(s0);
          check8(s1);
          check8(s2);
          check8(s3);
          check8(s4);
          check8(s5);
          check8(s6);
          check8(s7);
          var storage = _i16x8;
          storage[0] = SIMD.Int16x8.extractLane(t, 0);
          storage[1] = SIMD.Int16x8.extractLane(t, 1);
          storage[2] = SIMD.Int16x8.extractLane(t, 2);
          storage[3] = SIMD.Int16x8.extractLane(t, 3);
          storage[4] = SIMD.Int16x8.extractLane(t, 4);
          storage[5] = SIMD.Int16x8.extractLane(t, 5);
          storage[6] = SIMD.Int16x8.extractLane(t, 6);
          storage[7] = SIMD.Int16x8.extractLane(t, 7);
          return SIMD.Int16x8(storage[s0], storage[s1], storage[s2], storage[s3], storage[s4], storage[s5], storage[s6], storage[s7]);
        };
      }
      if (typeof SIMD.Int16x8.shuffle === "undefined") {
        _i16x16 = new Int16Array(16);
        SIMD.Int16x8.shuffle = function(t0, t1, s0, s1, s2, s3, s4, s5, s6, s7) {
          t0 = SIMD.Int16x8.check(t0);
          t1 = SIMD.Int16x8.check(t1);
          check16(s0);
          check16(s1);
          check16(s2);
          check16(s3);
          check16(s4);
          check16(s5);
          check16(s6);
          check16(s7);
          var storage = _i16x16;
          storage[0] = SIMD.Int16x8.extractLane(t0, 0);
          storage[1] = SIMD.Int16x8.extractLane(t0, 1);
          storage[2] = SIMD.Int16x8.extractLane(t0, 2);
          storage[3] = SIMD.Int16x8.extractLane(t0, 3);
          storage[4] = SIMD.Int16x8.extractLane(t0, 4);
          storage[5] = SIMD.Int16x8.extractLane(t0, 5);
          storage[6] = SIMD.Int16x8.extractLane(t0, 6);
          storage[7] = SIMD.Int16x8.extractLane(t0, 7);
          storage[8] = SIMD.Int16x8.extractLane(t1, 0);
          storage[9] = SIMD.Int16x8.extractLane(t1, 1);
          storage[10] = SIMD.Int16x8.extractLane(t1, 2);
          storage[11] = SIMD.Int16x8.extractLane(t1, 3);
          storage[12] = SIMD.Int16x8.extractLane(t1, 4);
          storage[13] = SIMD.Int16x8.extractLane(t1, 5);
          storage[14] = SIMD.Int16x8.extractLane(t1, 6);
          storage[15] = SIMD.Int16x8.extractLane(t1, 7);
          return SIMD.Int16x8(storage[s0], storage[s1], storage[s2], storage[s3], storage[s4], storage[s5], storage[s6], storage[s7]);
        };
      }
      if (typeof SIMD.Int16x8.addSaturate === "undefined") {
        SIMD.Int16x8.addSaturate = function(a, b) {
          a = SIMD.Int16x8.check(a);
          b = SIMD.Int16x8.check(b);
          var c = SIMD.Int16x8.add(a, b);
          var max = SIMD.Int16x8.splat(0x7fff);
          var min = SIMD.Int16x8.splat(0x8000);
          var mask = SIMD.Int16x8.lessThan(c, a);
          var bneg = SIMD.Int16x8.lessThan(b, SIMD.Int16x8.splat(0));
          return SIMD.Int16x8.select(SIMD.Bool16x8.and(mask, SIMD.Bool16x8.not(bneg)), max, SIMD.Int16x8.select(SIMD.Bool16x8.and(SIMD.Bool16x8.not(mask), bneg), min, c));
        };
      }
      if (typeof SIMD.Int16x8.subSaturate === "undefined") {
        SIMD.Int16x8.subSaturate = function(a, b) {
          a = SIMD.Int16x8.check(a);
          b = SIMD.Int16x8.check(b);
          var c = SIMD.Int16x8.sub(a, b);
          var max = SIMD.Int16x8.splat(0x7fff);
          var min = SIMD.Int16x8.splat(0x8000);
          var mask = SIMD.Int16x8.greaterThan(c, a);
          var bneg = SIMD.Int16x8.lessThan(b, SIMD.Int16x8.splat(0));
          return SIMD.Int16x8.select(SIMD.Bool16x8.and(mask, SIMD.Bool16x8.not(bneg)), min, SIMD.Int16x8.select(SIMD.Bool16x8.and(SIMD.Bool16x8.not(mask), bneg), max, c));
        };
      }
      if (typeof SIMD.Int16x8.select === "undefined") {
        SIMD.Int16x8.select = function(t, trueValue, falseValue) {
          t = SIMD.Bool16x8.check(t);
          trueValue = SIMD.Int16x8.check(trueValue);
          falseValue = SIMD.Int16x8.check(falseValue);
          return SIMD.Int16x8(SIMD.Bool16x8.extractLane(t, 0) ? SIMD.Int16x8.extractLane(trueValue, 0) : SIMD.Int16x8.extractLane(falseValue, 0), SIMD.Bool16x8.extractLane(t, 1) ? SIMD.Int16x8.extractLane(trueValue, 1) : SIMD.Int16x8.extractLane(falseValue, 1), SIMD.Bool16x8.extractLane(t, 2) ? SIMD.Int16x8.extractLane(trueValue, 2) : SIMD.Int16x8.extractLane(falseValue, 2), SIMD.Bool16x8.extractLane(t, 3) ? SIMD.Int16x8.extractLane(trueValue, 3) : SIMD.Int16x8.extractLane(falseValue, 3), SIMD.Bool16x8.extractLane(t, 4) ? SIMD.Int16x8.extractLane(trueValue, 4) : SIMD.Int16x8.extractLane(falseValue, 4), SIMD.Bool16x8.extractLane(t, 5) ? SIMD.Int16x8.extractLane(trueValue, 5) : SIMD.Int16x8.extractLane(falseValue, 5), SIMD.Bool16x8.extractLane(t, 6) ? SIMD.Int16x8.extractLane(trueValue, 6) : SIMD.Int16x8.extractLane(falseValue, 6), SIMD.Bool16x8.extractLane(t, 7) ? SIMD.Int16x8.extractLane(trueValue, 7) : SIMD.Int16x8.extractLane(falseValue, 7));
        };
      }
      if (typeof SIMD.Int16x8.selectBits === "undefined") {
        SIMD.Int16x8.selectBits = function(t, trueValue, falseValue) {
          t = SIMD.Int16x8.check(t);
          trueValue = SIMD.Int16x8.check(trueValue);
          falseValue = SIMD.Int16x8.check(falseValue);
          var tr = SIMD.Int16x8.and(t, trueValue);
          var fr = SIMD.Int16x8.and(SIMD.Int16x8.not(t), falseValue);
          return SIMD.Int16x8.or(tr, fr);
        };
      }
      if (typeof SIMD.Int16x8.equal === "undefined") {
        SIMD.Int16x8.equal = function(t, other) {
          t = SIMD.Int16x8.check(t);
          other = SIMD.Int16x8.check(other);
          var cs0 = SIMD.Int16x8.extractLane(t, 0) == SIMD.Int16x8.extractLane(other, 0);
          var cs1 = SIMD.Int16x8.extractLane(t, 1) == SIMD.Int16x8.extractLane(other, 1);
          var cs2 = SIMD.Int16x8.extractLane(t, 2) == SIMD.Int16x8.extractLane(other, 2);
          var cs3 = SIMD.Int16x8.extractLane(t, 3) == SIMD.Int16x8.extractLane(other, 3);
          var cs4 = SIMD.Int16x8.extractLane(t, 4) == SIMD.Int16x8.extractLane(other, 4);
          var cs5 = SIMD.Int16x8.extractLane(t, 5) == SIMD.Int16x8.extractLane(other, 5);
          var cs6 = SIMD.Int16x8.extractLane(t, 6) == SIMD.Int16x8.extractLane(other, 6);
          var cs7 = SIMD.Int16x8.extractLane(t, 7) == SIMD.Int16x8.extractLane(other, 7);
          return SIMD.Bool16x8(cs0, cs1, cs2, cs3, cs4, cs5, cs6, cs7);
        };
      }
      if (typeof SIMD.Int16x8.notEqual === "undefined") {
        SIMD.Int16x8.notEqual = function(t, other) {
          t = SIMD.Int16x8.check(t);
          other = SIMD.Int16x8.check(other);
          var cs0 = SIMD.Int16x8.extractLane(t, 0) != SIMD.Int16x8.extractLane(other, 0);
          var cs1 = SIMD.Int16x8.extractLane(t, 1) != SIMD.Int16x8.extractLane(other, 1);
          var cs2 = SIMD.Int16x8.extractLane(t, 2) != SIMD.Int16x8.extractLane(other, 2);
          var cs3 = SIMD.Int16x8.extractLane(t, 3) != SIMD.Int16x8.extractLane(other, 3);
          var cs4 = SIMD.Int16x8.extractLane(t, 4) != SIMD.Int16x8.extractLane(other, 4);
          var cs5 = SIMD.Int16x8.extractLane(t, 5) != SIMD.Int16x8.extractLane(other, 5);
          var cs6 = SIMD.Int16x8.extractLane(t, 6) != SIMD.Int16x8.extractLane(other, 6);
          var cs7 = SIMD.Int16x8.extractLane(t, 7) != SIMD.Int16x8.extractLane(other, 7);
          return SIMD.Bool16x8(cs0, cs1, cs2, cs3, cs4, cs5, cs6, cs7);
        };
      }
      if (typeof SIMD.Int16x8.greaterThan === "undefined") {
        SIMD.Int16x8.greaterThan = function(t, other) {
          t = SIMD.Int16x8.check(t);
          other = SIMD.Int16x8.check(other);
          var cs0 = SIMD.Int16x8.extractLane(t, 0) > SIMD.Int16x8.extractLane(other, 0);
          var cs1 = SIMD.Int16x8.extractLane(t, 1) > SIMD.Int16x8.extractLane(other, 1);
          var cs2 = SIMD.Int16x8.extractLane(t, 2) > SIMD.Int16x8.extractLane(other, 2);
          var cs3 = SIMD.Int16x8.extractLane(t, 3) > SIMD.Int16x8.extractLane(other, 3);
          var cs4 = SIMD.Int16x8.extractLane(t, 4) > SIMD.Int16x8.extractLane(other, 4);
          var cs5 = SIMD.Int16x8.extractLane(t, 5) > SIMD.Int16x8.extractLane(other, 5);
          var cs6 = SIMD.Int16x8.extractLane(t, 6) > SIMD.Int16x8.extractLane(other, 6);
          var cs7 = SIMD.Int16x8.extractLane(t, 7) > SIMD.Int16x8.extractLane(other, 7);
          return SIMD.Bool16x8(cs0, cs1, cs2, cs3, cs4, cs5, cs6, cs7);
        };
      }
      if (typeof SIMD.Int16x8.greaterThanOrEqual === "undefined") {
        SIMD.Int16x8.greaterThanOrEqual = function(t, other) {
          t = SIMD.Int16x8.check(t);
          other = SIMD.Int16x8.check(other);
          var cs0 = SIMD.Int16x8.extractLane(t, 0) >= SIMD.Int16x8.extractLane(other, 0);
          var cs1 = SIMD.Int16x8.extractLane(t, 1) >= SIMD.Int16x8.extractLane(other, 1);
          var cs2 = SIMD.Int16x8.extractLane(t, 2) >= SIMD.Int16x8.extractLane(other, 2);
          var cs3 = SIMD.Int16x8.extractLane(t, 3) >= SIMD.Int16x8.extractLane(other, 3);
          var cs4 = SIMD.Int16x8.extractLane(t, 4) >= SIMD.Int16x8.extractLane(other, 4);
          var cs5 = SIMD.Int16x8.extractLane(t, 5) >= SIMD.Int16x8.extractLane(other, 5);
          var cs6 = SIMD.Int16x8.extractLane(t, 6) >= SIMD.Int16x8.extractLane(other, 6);
          var cs7 = SIMD.Int16x8.extractLane(t, 7) >= SIMD.Int16x8.extractLane(other, 7);
          return SIMD.Bool16x8(cs0, cs1, cs2, cs3, cs4, cs5, cs6, cs7);
        };
      }
      if (typeof SIMD.Int16x8.lessThan === "undefined") {
        SIMD.Int16x8.lessThan = function(t, other) {
          t = SIMD.Int16x8.check(t);
          other = SIMD.Int16x8.check(other);
          var cs0 = SIMD.Int16x8.extractLane(t, 0) < SIMD.Int16x8.extractLane(other, 0);
          var cs1 = SIMD.Int16x8.extractLane(t, 1) < SIMD.Int16x8.extractLane(other, 1);
          var cs2 = SIMD.Int16x8.extractLane(t, 2) < SIMD.Int16x8.extractLane(other, 2);
          var cs3 = SIMD.Int16x8.extractLane(t, 3) < SIMD.Int16x8.extractLane(other, 3);
          var cs4 = SIMD.Int16x8.extractLane(t, 4) < SIMD.Int16x8.extractLane(other, 4);
          var cs5 = SIMD.Int16x8.extractLane(t, 5) < SIMD.Int16x8.extractLane(other, 5);
          var cs6 = SIMD.Int16x8.extractLane(t, 6) < SIMD.Int16x8.extractLane(other, 6);
          var cs7 = SIMD.Int16x8.extractLane(t, 7) < SIMD.Int16x8.extractLane(other, 7);
          return SIMD.Bool16x8(cs0, cs1, cs2, cs3, cs4, cs5, cs6, cs7);
        };
      }
      if (typeof SIMD.Int16x8.lessThanOrEqual === "undefined") {
        SIMD.Int16x8.lessThanOrEqual = function(t, other) {
          t = SIMD.Int16x8.check(t);
          other = SIMD.Int16x8.check(other);
          var cs0 = SIMD.Int16x8.extractLane(t, 0) <= SIMD.Int16x8.extractLane(other, 0);
          var cs1 = SIMD.Int16x8.extractLane(t, 1) <= SIMD.Int16x8.extractLane(other, 1);
          var cs2 = SIMD.Int16x8.extractLane(t, 2) <= SIMD.Int16x8.extractLane(other, 2);
          var cs3 = SIMD.Int16x8.extractLane(t, 3) <= SIMD.Int16x8.extractLane(other, 3);
          var cs4 = SIMD.Int16x8.extractLane(t, 4) <= SIMD.Int16x8.extractLane(other, 4);
          var cs5 = SIMD.Int16x8.extractLane(t, 5) <= SIMD.Int16x8.extractLane(other, 5);
          var cs6 = SIMD.Int16x8.extractLane(t, 6) <= SIMD.Int16x8.extractLane(other, 6);
          var cs7 = SIMD.Int16x8.extractLane(t, 7) <= SIMD.Int16x8.extractLane(other, 7);
          return SIMD.Bool16x8(cs0, cs1, cs2, cs3, cs4, cs5, cs6, cs7);
        };
      }
      if (typeof SIMD.Int16x8.shiftLeftByScalar === "undefined") {
        SIMD.Int16x8.shiftLeftByScalar = function(a, bits) {
          a = SIMD.Int16x8.check(a);
          if (bits >>> 0 > 16)
            bits = 16;
          var s0 = SIMD.Int16x8.extractLane(a, 0) << bits;
          var s1 = SIMD.Int16x8.extractLane(a, 1) << bits;
          var s2 = SIMD.Int16x8.extractLane(a, 2) << bits;
          var s3 = SIMD.Int16x8.extractLane(a, 3) << bits;
          var s4 = SIMD.Int16x8.extractLane(a, 4) << bits;
          var s5 = SIMD.Int16x8.extractLane(a, 5) << bits;
          var s6 = SIMD.Int16x8.extractLane(a, 6) << bits;
          var s7 = SIMD.Int16x8.extractLane(a, 7) << bits;
          return SIMD.Int16x8(s0, s1, s2, s3, s4, s5, s6, s7);
        };
      }
      if (typeof SIMD.Int16x8.shiftRightLogicalByScalar === "undefined") {
        SIMD.Int16x8.shiftRightLogicalByScalar = function(a, bits) {
          a = SIMD.Int16x8.check(a);
          if (bits >>> 0 > 16)
            bits = 16;
          var s0 = (SIMD.Int16x8.extractLane(a, 0) & 0xffff) >>> bits;
          var s1 = (SIMD.Int16x8.extractLane(a, 1) & 0xffff) >>> bits;
          var s2 = (SIMD.Int16x8.extractLane(a, 2) & 0xffff) >>> bits;
          var s3 = (SIMD.Int16x8.extractLane(a, 3) & 0xffff) >>> bits;
          var s4 = (SIMD.Int16x8.extractLane(a, 4) & 0xffff) >>> bits;
          var s5 = (SIMD.Int16x8.extractLane(a, 5) & 0xffff) >>> bits;
          var s6 = (SIMD.Int16x8.extractLane(a, 6) & 0xffff) >>> bits;
          var s7 = (SIMD.Int16x8.extractLane(a, 7) & 0xffff) >>> bits;
          return SIMD.Int16x8(s0, s1, s2, s3, s4, s5, s6, s7);
        };
      }
      if (typeof SIMD.Int16x8.shiftRightArithmeticByScalar === "undefined") {
        SIMD.Int16x8.shiftRightArithmeticByScalar = function(a, bits) {
          a = SIMD.Int16x8.check(a);
          if (bits >>> 0 > 16)
            bits = 16;
          var s0 = SIMD.Int16x8.extractLane(a, 0) >> bits;
          var s1 = SIMD.Int16x8.extractLane(a, 1) >> bits;
          var s2 = SIMD.Int16x8.extractLane(a, 2) >> bits;
          var s3 = SIMD.Int16x8.extractLane(a, 3) >> bits;
          var s4 = SIMD.Int16x8.extractLane(a, 4) >> bits;
          var s5 = SIMD.Int16x8.extractLane(a, 5) >> bits;
          var s6 = SIMD.Int16x8.extractLane(a, 6) >> bits;
          var s7 = SIMD.Int16x8.extractLane(a, 7) >> bits;
          return SIMD.Int16x8(s0, s1, s2, s3, s4, s5, s6, s7);
        };
      }
      if (typeof SIMD.Int16x8.load === "undefined") {
        SIMD.Int16x8.load = function(tarray, index) {
          if (!isTypedArray(tarray))
            throw new TypeError("The 1st argument must be a typed array.");
          if (!isInt32(index))
            throw new TypeError("The 2nd argument must be an Int32.");
          var bpe = tarray.BYTES_PER_ELEMENT;
          if (index < 0 || (index * bpe + 16) > tarray.byteLength)
            throw new RangeError("The value of index is invalid.");
          var i16temp = _i16x8;
          var array = bpe == 1 ? _i8x16 : bpe == 2 ? i16temp : bpe == 4 ? (tarray instanceof Float32Array ? _f32x4 : _i32x4) : _f64x2;
          var n = 16 / bpe;
          for (var i = 0; i < n; ++i)
            array[i] = tarray[index + i];
          return SIMD.Int16x8(i16temp[0], i16temp[1], i16temp[2], i16temp[3], i16temp[4], i16temp[5], i16temp[6], i16temp[7]);
        };
      }
      if (typeof SIMD.Int16x8.store === "undefined") {
        SIMD.Int16x8.store = function(tarray, index, value) {
          if (!isTypedArray(tarray))
            throw new TypeError("The 1st argument must be a typed array.");
          if (!isInt32(index))
            throw new TypeError("The 2nd argument must be an Int32.");
          var bpe = tarray.BYTES_PER_ELEMENT;
          if (index < 0 || (index * bpe + 16) > tarray.byteLength)
            throw new RangeError("The value of index is invalid.");
          value = SIMD.Int16x8.check(value);
          _i16x8[0] = SIMD.Int16x8.extractLane(value, 0);
          _i16x8[1] = SIMD.Int16x8.extractLane(value, 1);
          _i16x8[2] = SIMD.Int16x8.extractLane(value, 2);
          _i16x8[3] = SIMD.Int16x8.extractLane(value, 3);
          _i16x8[4] = SIMD.Int16x8.extractLane(value, 4);
          _i16x8[5] = SIMD.Int16x8.extractLane(value, 5);
          _i16x8[6] = SIMD.Int16x8.extractLane(value, 6);
          _i16x8[7] = SIMD.Int16x8.extractLane(value, 7);
          var array = bpe == 1 ? _i8x16 : bpe == 2 ? _i16x8 : bpe == 4 ? (tarray instanceof Float32Array ? _f32x4 : _i32x4) : _f64x2;
          var n = 16 / bpe;
          for (var i = 0; i < n; ++i)
            tarray[index + i] = array[i];
          return value;
        };
      }
      if (typeof SIMD.Int8x16.and === "undefined") {
        SIMD.Int8x16.and = function(a, b) {
          a = SIMD.Int8x16.check(a);
          b = SIMD.Int8x16.check(b);
          return SIMD.Int8x16(SIMD.Int8x16.extractLane(a, 0) & SIMD.Int8x16.extractLane(b, 0), SIMD.Int8x16.extractLane(a, 1) & SIMD.Int8x16.extractLane(b, 1), SIMD.Int8x16.extractLane(a, 2) & SIMD.Int8x16.extractLane(b, 2), SIMD.Int8x16.extractLane(a, 3) & SIMD.Int8x16.extractLane(b, 3), SIMD.Int8x16.extractLane(a, 4) & SIMD.Int8x16.extractLane(b, 4), SIMD.Int8x16.extractLane(a, 5) & SIMD.Int8x16.extractLane(b, 5), SIMD.Int8x16.extractLane(a, 6) & SIMD.Int8x16.extractLane(b, 6), SIMD.Int8x16.extractLane(a, 7) & SIMD.Int8x16.extractLane(b, 7), SIMD.Int8x16.extractLane(a, 8) & SIMD.Int8x16.extractLane(b, 8), SIMD.Int8x16.extractLane(a, 9) & SIMD.Int8x16.extractLane(b, 9), SIMD.Int8x16.extractLane(a, 10) & SIMD.Int8x16.extractLane(b, 10), SIMD.Int8x16.extractLane(a, 11) & SIMD.Int8x16.extractLane(b, 11), SIMD.Int8x16.extractLane(a, 12) & SIMD.Int8x16.extractLane(b, 12), SIMD.Int8x16.extractLane(a, 13) & SIMD.Int8x16.extractLane(b, 13), SIMD.Int8x16.extractLane(a, 14) & SIMD.Int8x16.extractLane(b, 14), SIMD.Int8x16.extractLane(a, 15) & SIMD.Int8x16.extractLane(b, 15));
        };
      }
      if (typeof SIMD.Int8x16.or === "undefined") {
        SIMD.Int8x16.or = function(a, b) {
          a = SIMD.Int8x16.check(a);
          b = SIMD.Int8x16.check(b);
          return SIMD.Int8x16(SIMD.Int8x16.extractLane(a, 0) | SIMD.Int8x16.extractLane(b, 0), SIMD.Int8x16.extractLane(a, 1) | SIMD.Int8x16.extractLane(b, 1), SIMD.Int8x16.extractLane(a, 2) | SIMD.Int8x16.extractLane(b, 2), SIMD.Int8x16.extractLane(a, 3) | SIMD.Int8x16.extractLane(b, 3), SIMD.Int8x16.extractLane(a, 4) | SIMD.Int8x16.extractLane(b, 4), SIMD.Int8x16.extractLane(a, 5) | SIMD.Int8x16.extractLane(b, 5), SIMD.Int8x16.extractLane(a, 6) | SIMD.Int8x16.extractLane(b, 6), SIMD.Int8x16.extractLane(a, 7) | SIMD.Int8x16.extractLane(b, 7), SIMD.Int8x16.extractLane(a, 8) | SIMD.Int8x16.extractLane(b, 8), SIMD.Int8x16.extractLane(a, 9) | SIMD.Int8x16.extractLane(b, 9), SIMD.Int8x16.extractLane(a, 10) | SIMD.Int8x16.extractLane(b, 10), SIMD.Int8x16.extractLane(a, 11) | SIMD.Int8x16.extractLane(b, 11), SIMD.Int8x16.extractLane(a, 12) | SIMD.Int8x16.extractLane(b, 12), SIMD.Int8x16.extractLane(a, 13) | SIMD.Int8x16.extractLane(b, 13), SIMD.Int8x16.extractLane(a, 14) | SIMD.Int8x16.extractLane(b, 14), SIMD.Int8x16.extractLane(a, 15) | SIMD.Int8x16.extractLane(b, 15));
        };
      }
      if (typeof SIMD.Int8x16.xor === "undefined") {
        SIMD.Int8x16.xor = function(a, b) {
          a = SIMD.Int8x16.check(a);
          b = SIMD.Int8x16.check(b);
          return SIMD.Int8x16(SIMD.Int8x16.extractLane(a, 0) ^ SIMD.Int8x16.extractLane(b, 0), SIMD.Int8x16.extractLane(a, 1) ^ SIMD.Int8x16.extractLane(b, 1), SIMD.Int8x16.extractLane(a, 2) ^ SIMD.Int8x16.extractLane(b, 2), SIMD.Int8x16.extractLane(a, 3) ^ SIMD.Int8x16.extractLane(b, 3), SIMD.Int8x16.extractLane(a, 4) ^ SIMD.Int8x16.extractLane(b, 4), SIMD.Int8x16.extractLane(a, 5) ^ SIMD.Int8x16.extractLane(b, 5), SIMD.Int8x16.extractLane(a, 6) ^ SIMD.Int8x16.extractLane(b, 6), SIMD.Int8x16.extractLane(a, 7) ^ SIMD.Int8x16.extractLane(b, 7), SIMD.Int8x16.extractLane(a, 8) ^ SIMD.Int8x16.extractLane(b, 8), SIMD.Int8x16.extractLane(a, 9) ^ SIMD.Int8x16.extractLane(b, 9), SIMD.Int8x16.extractLane(a, 10) ^ SIMD.Int8x16.extractLane(b, 10), SIMD.Int8x16.extractLane(a, 11) ^ SIMD.Int8x16.extractLane(b, 11), SIMD.Int8x16.extractLane(a, 12) ^ SIMD.Int8x16.extractLane(b, 12), SIMD.Int8x16.extractLane(a, 13) ^ SIMD.Int8x16.extractLane(b, 13), SIMD.Int8x16.extractLane(a, 14) ^ SIMD.Int8x16.extractLane(b, 14), SIMD.Int8x16.extractLane(a, 15) ^ SIMD.Int8x16.extractLane(b, 15));
        };
      }
      if (typeof SIMD.Int8x16.not === "undefined") {
        SIMD.Int8x16.not = function(t) {
          t = SIMD.Int8x16.check(t);
          return SIMD.Int8x16(~SIMD.Int8x16.extractLane(t, 0), ~SIMD.Int8x16.extractLane(t, 1), ~SIMD.Int8x16.extractLane(t, 2), ~SIMD.Int8x16.extractLane(t, 3), ~SIMD.Int8x16.extractLane(t, 4), ~SIMD.Int8x16.extractLane(t, 5), ~SIMD.Int8x16.extractLane(t, 6), ~SIMD.Int8x16.extractLane(t, 7), ~SIMD.Int8x16.extractLane(t, 8), ~SIMD.Int8x16.extractLane(t, 9), ~SIMD.Int8x16.extractLane(t, 10), ~SIMD.Int8x16.extractLane(t, 11), ~SIMD.Int8x16.extractLane(t, 12), ~SIMD.Int8x16.extractLane(t, 13), ~SIMD.Int8x16.extractLane(t, 14), ~SIMD.Int8x16.extractLane(t, 15));
        };
      }
      if (typeof SIMD.Int8x16.neg === "undefined") {
        SIMD.Int8x16.neg = function(t) {
          t = SIMD.Int8x16.check(t);
          return SIMD.Int8x16(-SIMD.Int8x16.extractLane(t, 0), -SIMD.Int8x16.extractLane(t, 1), -SIMD.Int8x16.extractLane(t, 2), -SIMD.Int8x16.extractLane(t, 3), -SIMD.Int8x16.extractLane(t, 4), -SIMD.Int8x16.extractLane(t, 5), -SIMD.Int8x16.extractLane(t, 6), -SIMD.Int8x16.extractLane(t, 7), -SIMD.Int8x16.extractLane(t, 8), -SIMD.Int8x16.extractLane(t, 9), -SIMD.Int8x16.extractLane(t, 10), -SIMD.Int8x16.extractLane(t, 11), -SIMD.Int8x16.extractLane(t, 12), -SIMD.Int8x16.extractLane(t, 13), -SIMD.Int8x16.extractLane(t, 14), -SIMD.Int8x16.extractLane(t, 15));
        };
      }
      if (typeof SIMD.Int8x16.add === "undefined") {
        SIMD.Int8x16.add = function(a, b) {
          a = SIMD.Int8x16.check(a);
          b = SIMD.Int8x16.check(b);
          return SIMD.Int8x16(SIMD.Int8x16.extractLane(a, 0) + SIMD.Int8x16.extractLane(b, 0), SIMD.Int8x16.extractLane(a, 1) + SIMD.Int8x16.extractLane(b, 1), SIMD.Int8x16.extractLane(a, 2) + SIMD.Int8x16.extractLane(b, 2), SIMD.Int8x16.extractLane(a, 3) + SIMD.Int8x16.extractLane(b, 3), SIMD.Int8x16.extractLane(a, 4) + SIMD.Int8x16.extractLane(b, 4), SIMD.Int8x16.extractLane(a, 5) + SIMD.Int8x16.extractLane(b, 5), SIMD.Int8x16.extractLane(a, 6) + SIMD.Int8x16.extractLane(b, 6), SIMD.Int8x16.extractLane(a, 7) + SIMD.Int8x16.extractLane(b, 7), SIMD.Int8x16.extractLane(a, 8) + SIMD.Int8x16.extractLane(b, 8), SIMD.Int8x16.extractLane(a, 9) + SIMD.Int8x16.extractLane(b, 9), SIMD.Int8x16.extractLane(a, 10) + SIMD.Int8x16.extractLane(b, 10), SIMD.Int8x16.extractLane(a, 11) + SIMD.Int8x16.extractLane(b, 11), SIMD.Int8x16.extractLane(a, 12) + SIMD.Int8x16.extractLane(b, 12), SIMD.Int8x16.extractLane(a, 13) + SIMD.Int8x16.extractLane(b, 13), SIMD.Int8x16.extractLane(a, 14) + SIMD.Int8x16.extractLane(b, 14), SIMD.Int8x16.extractLane(a, 15) + SIMD.Int8x16.extractLane(b, 15));
        };
      }
      if (typeof SIMD.Int8x16.sub === "undefined") {
        SIMD.Int8x16.sub = function(a, b) {
          a = SIMD.Int8x16.check(a);
          b = SIMD.Int8x16.check(b);
          return SIMD.Int8x16(SIMD.Int8x16.extractLane(a, 0) - SIMD.Int8x16.extractLane(b, 0), SIMD.Int8x16.extractLane(a, 1) - SIMD.Int8x16.extractLane(b, 1), SIMD.Int8x16.extractLane(a, 2) - SIMD.Int8x16.extractLane(b, 2), SIMD.Int8x16.extractLane(a, 3) - SIMD.Int8x16.extractLane(b, 3), SIMD.Int8x16.extractLane(a, 4) - SIMD.Int8x16.extractLane(b, 4), SIMD.Int8x16.extractLane(a, 5) - SIMD.Int8x16.extractLane(b, 5), SIMD.Int8x16.extractLane(a, 6) - SIMD.Int8x16.extractLane(b, 6), SIMD.Int8x16.extractLane(a, 7) - SIMD.Int8x16.extractLane(b, 7), SIMD.Int8x16.extractLane(a, 8) - SIMD.Int8x16.extractLane(b, 8), SIMD.Int8x16.extractLane(a, 9) - SIMD.Int8x16.extractLane(b, 9), SIMD.Int8x16.extractLane(a, 10) - SIMD.Int8x16.extractLane(b, 10), SIMD.Int8x16.extractLane(a, 11) - SIMD.Int8x16.extractLane(b, 11), SIMD.Int8x16.extractLane(a, 12) - SIMD.Int8x16.extractLane(b, 12), SIMD.Int8x16.extractLane(a, 13) - SIMD.Int8x16.extractLane(b, 13), SIMD.Int8x16.extractLane(a, 14) - SIMD.Int8x16.extractLane(b, 14), SIMD.Int8x16.extractLane(a, 15) - SIMD.Int8x16.extractLane(b, 15));
        };
      }
      if (typeof SIMD.Int8x16.mul === "undefined") {
        SIMD.Int8x16.mul = function(a, b) {
          a = SIMD.Int8x16.check(a);
          b = SIMD.Int8x16.check(b);
          return SIMD.Int8x16(Math.imul(SIMD.Int8x16.extractLane(a, 0), SIMD.Int8x16.extractLane(b, 0)), Math.imul(SIMD.Int8x16.extractLane(a, 1), SIMD.Int8x16.extractLane(b, 1)), Math.imul(SIMD.Int8x16.extractLane(a, 2), SIMD.Int8x16.extractLane(b, 2)), Math.imul(SIMD.Int8x16.extractLane(a, 3), SIMD.Int8x16.extractLane(b, 3)), Math.imul(SIMD.Int8x16.extractLane(a, 4), SIMD.Int8x16.extractLane(b, 4)), Math.imul(SIMD.Int8x16.extractLane(a, 5), SIMD.Int8x16.extractLane(b, 5)), Math.imul(SIMD.Int8x16.extractLane(a, 6), SIMD.Int8x16.extractLane(b, 6)), Math.imul(SIMD.Int8x16.extractLane(a, 7), SIMD.Int8x16.extractLane(b, 7)), Math.imul(SIMD.Int8x16.extractLane(a, 8), SIMD.Int8x16.extractLane(b, 8)), Math.imul(SIMD.Int8x16.extractLane(a, 9), SIMD.Int8x16.extractLane(b, 9)), Math.imul(SIMD.Int8x16.extractLane(a, 10), SIMD.Int8x16.extractLane(b, 10)), Math.imul(SIMD.Int8x16.extractLane(a, 11), SIMD.Int8x16.extractLane(b, 11)), Math.imul(SIMD.Int8x16.extractLane(a, 12), SIMD.Int8x16.extractLane(b, 12)), Math.imul(SIMD.Int8x16.extractLane(a, 13), SIMD.Int8x16.extractLane(b, 13)), Math.imul(SIMD.Int8x16.extractLane(a, 14), SIMD.Int8x16.extractLane(b, 14)), Math.imul(SIMD.Int8x16.extractLane(a, 15), SIMD.Int8x16.extractLane(b, 15)));
        };
      }
      if (typeof SIMD.Int8x16.swizzle === "undefined") {
        SIMD.Int8x16.swizzle = function(t, s0, s1, s2, s3, s4, s5, s6, s7, s8, s9, s10, s11, s12, s13, s14, s15) {
          t = SIMD.Int8x16.check(t);
          check16(s0);
          check16(s1);
          check16(s2);
          check16(s3);
          check16(s4);
          check16(s5);
          check16(s6);
          check16(s7);
          check16(s8);
          check16(s9);
          check16(s10);
          check16(s11);
          check16(s12);
          check16(s13);
          check16(s14);
          check16(s15);
          var storage = _i8x16;
          storage[0] = SIMD.Int8x16.extractLane(t, 0);
          storage[1] = SIMD.Int8x16.extractLane(t, 1);
          storage[2] = SIMD.Int8x16.extractLane(t, 2);
          storage[3] = SIMD.Int8x16.extractLane(t, 3);
          storage[4] = SIMD.Int8x16.extractLane(t, 4);
          storage[5] = SIMD.Int8x16.extractLane(t, 5);
          storage[6] = SIMD.Int8x16.extractLane(t, 6);
          storage[7] = SIMD.Int8x16.extractLane(t, 7);
          storage[8] = SIMD.Int8x16.extractLane(t, 8);
          storage[9] = SIMD.Int8x16.extractLane(t, 9);
          storage[10] = SIMD.Int8x16.extractLane(t, 10);
          storage[11] = SIMD.Int8x16.extractLane(t, 11);
          storage[12] = SIMD.Int8x16.extractLane(t, 12);
          storage[13] = SIMD.Int8x16.extractLane(t, 13);
          storage[14] = SIMD.Int8x16.extractLane(t, 14);
          storage[15] = SIMD.Int8x16.extractLane(t, 15);
          return SIMD.Int8x16(storage[s0], storage[s1], storage[s2], storage[s3], storage[s4], storage[s5], storage[s6], storage[s7], storage[s8], storage[s9], storage[s10], storage[s11], storage[s12], storage[s13], storage[s14], storage[s15]);
        };
      }
      if (typeof SIMD.Int8x16.shuffle === "undefined") {
        _i8x32 = new Int8Array(32);
        SIMD.Int8x16.shuffle = function(t0, t1, s0, s1, s2, s3, s4, s5, s6, s7, s8, s9, s10, s11, s12, s13, s14, s15) {
          t0 = SIMD.Int8x16.check(t0);
          t1 = SIMD.Int8x16.check(t1);
          check32(s0);
          check32(s1);
          check32(s2);
          check32(s3);
          check32(s4);
          check32(s5);
          check32(s6);
          check32(s7);
          check32(s8);
          check32(s9);
          check32(s10);
          check32(s11);
          check32(s12);
          check32(s13);
          check32(s14);
          check32(s15);
          var storage = _i8x32;
          storage[0] = SIMD.Int8x16.extractLane(t0, 0);
          storage[1] = SIMD.Int8x16.extractLane(t0, 1);
          storage[2] = SIMD.Int8x16.extractLane(t0, 2);
          storage[3] = SIMD.Int8x16.extractLane(t0, 3);
          storage[4] = SIMD.Int8x16.extractLane(t0, 4);
          storage[5] = SIMD.Int8x16.extractLane(t0, 5);
          storage[6] = SIMD.Int8x16.extractLane(t0, 6);
          storage[7] = SIMD.Int8x16.extractLane(t0, 7);
          storage[8] = SIMD.Int8x16.extractLane(t0, 8);
          storage[9] = SIMD.Int8x16.extractLane(t0, 9);
          storage[10] = SIMD.Int8x16.extractLane(t0, 10);
          storage[11] = SIMD.Int8x16.extractLane(t0, 11);
          storage[12] = SIMD.Int8x16.extractLane(t0, 12);
          storage[13] = SIMD.Int8x16.extractLane(t0, 13);
          storage[14] = SIMD.Int8x16.extractLane(t0, 14);
          storage[15] = SIMD.Int8x16.extractLane(t0, 15);
          storage[16] = SIMD.Int8x16.extractLane(t1, 0);
          storage[17] = SIMD.Int8x16.extractLane(t1, 1);
          storage[18] = SIMD.Int8x16.extractLane(t1, 2);
          storage[19] = SIMD.Int8x16.extractLane(t1, 3);
          storage[20] = SIMD.Int8x16.extractLane(t1, 4);
          storage[21] = SIMD.Int8x16.extractLane(t1, 5);
          storage[22] = SIMD.Int8x16.extractLane(t1, 6);
          storage[23] = SIMD.Int8x16.extractLane(t1, 7);
          storage[24] = SIMD.Int8x16.extractLane(t1, 8);
          storage[25] = SIMD.Int8x16.extractLane(t1, 9);
          storage[26] = SIMD.Int8x16.extractLane(t1, 10);
          storage[27] = SIMD.Int8x16.extractLane(t1, 11);
          storage[28] = SIMD.Int8x16.extractLane(t1, 12);
          storage[29] = SIMD.Int8x16.extractLane(t1, 13);
          storage[30] = SIMD.Int8x16.extractLane(t1, 14);
          storage[31] = SIMD.Int8x16.extractLane(t1, 15);
          return SIMD.Int8x16(storage[s0], storage[s1], storage[s2], storage[s3], storage[s4], storage[s5], storage[s6], storage[s7], storage[s8], storage[s9], storage[s10], storage[s11], storage[s12], storage[s13], storage[s14], storage[s15]);
        };
      }
      if (typeof SIMD.Int8x16.addSaturate === "undefined") {
        SIMD.Int8x16.addSaturate = function(a, b) {
          a = SIMD.Int8x16.check(a);
          b = SIMD.Int8x16.check(b);
          var c = SIMD.Int8x16.add(a, b);
          var max = SIMD.Int8x16.splat(0x7f);
          var min = SIMD.Int8x16.splat(0x80);
          var mask = SIMD.Int8x16.lessThan(c, a);
          var bneg = SIMD.Int8x16.lessThan(b, SIMD.Int8x16.splat(0));
          return SIMD.Int8x16.select(SIMD.Bool8x16.and(mask, SIMD.Bool8x16.not(bneg)), max, SIMD.Int8x16.select(SIMD.Bool8x16.and(SIMD.Bool8x16.not(mask), bneg), min, c));
        };
      }
      if (typeof SIMD.Int8x16.subSaturate === "undefined") {
        SIMD.Int8x16.subSaturate = function(a, b) {
          a = SIMD.Int8x16.check(a);
          b = SIMD.Int8x16.check(b);
          var c = SIMD.Int8x16.sub(a, b);
          var max = SIMD.Int8x16.splat(0x7f);
          var min = SIMD.Int8x16.splat(0x80);
          var mask = SIMD.Int8x16.greaterThan(c, a);
          var bneg = SIMD.Int8x16.lessThan(b, SIMD.Int8x16.splat(0));
          return SIMD.Int8x16.select(SIMD.Bool8x16.and(mask, SIMD.Bool8x16.not(bneg)), min, SIMD.Int8x16.select(SIMD.Bool8x16.and(SIMD.Bool8x16.not(mask), bneg), max, c));
        };
      }
      if (typeof SIMD.Int8x16.sumOfAbsoluteDifferences === "undefined") {
        SIMD.Int8x16.sumOfAbsoluteDifferences = function(a, b) {
          a = SIMD.Int8x16.check(a);
          b = SIMD.Int8x16.check(b);
          return Math.abs(SIMD.Int8x16.extractLane(a, 0) - SIMD.Int8x16.extractLane(b, 0)) + Math.abs(SIMD.Int8x16.extractLane(a, 1) - SIMD.Int8x16.extractLane(b, 1)) + Math.abs(SIMD.Int8x16.extractLane(a, 2) - SIMD.Int8x16.extractLane(b, 2)) + Math.abs(SIMD.Int8x16.extractLane(a, 3) - SIMD.Int8x16.extractLane(b, 3)) + Math.abs(SIMD.Int8x16.extractLane(a, 4) - SIMD.Int8x16.extractLane(b, 4)) + Math.abs(SIMD.Int8x16.extractLane(a, 5) - SIMD.Int8x16.extractLane(b, 5)) + Math.abs(SIMD.Int8x16.extractLane(a, 6) - SIMD.Int8x16.extractLane(b, 6)) + Math.abs(SIMD.Int8x16.extractLane(a, 7) - SIMD.Int8x16.extractLane(b, 7)) + Math.abs(SIMD.Int8x16.extractLane(a, 8) - SIMD.Int8x16.extractLane(b, 8)) + Math.abs(SIMD.Int8x16.extractLane(a, 9) - SIMD.Int8x16.extractLane(b, 9)) + Math.abs(SIMD.Int8x16.extractLane(a, 10) - SIMD.Int8x16.extractLane(b, 10)) + Math.abs(SIMD.Int8x16.extractLane(a, 11) - SIMD.Int8x16.extractLane(b, 11)) + Math.abs(SIMD.Int8x16.extractLane(a, 12) - SIMD.Int8x16.extractLane(b, 12)) + Math.abs(SIMD.Int8x16.extractLane(a, 13) - SIMD.Int8x16.extractLane(b, 13)) + Math.abs(SIMD.Int8x16.extractLane(a, 14) - SIMD.Int8x16.extractLane(b, 14)) + Math.abs(SIMD.Int8x16.extractLane(a, 15) - SIMD.Int8x16.extractLane(b, 15));
        };
      }
      if (typeof SIMD.Int8x16.select === "undefined") {
        SIMD.Int8x16.select = function(t, trueValue, falseValue) {
          t = SIMD.Bool8x16.check(t);
          trueValue = SIMD.Int8x16.check(trueValue);
          falseValue = SIMD.Int8x16.check(falseValue);
          return SIMD.Int8x16(SIMD.Bool8x16.extractLane(t, 0) ? SIMD.Int8x16.extractLane(trueValue, 0) : SIMD.Int8x16.extractLane(falseValue, 0), SIMD.Bool8x16.extractLane(t, 1) ? SIMD.Int8x16.extractLane(trueValue, 1) : SIMD.Int8x16.extractLane(falseValue, 1), SIMD.Bool8x16.extractLane(t, 2) ? SIMD.Int8x16.extractLane(trueValue, 2) : SIMD.Int8x16.extractLane(falseValue, 2), SIMD.Bool8x16.extractLane(t, 3) ? SIMD.Int8x16.extractLane(trueValue, 3) : SIMD.Int8x16.extractLane(falseValue, 3), SIMD.Bool8x16.extractLane(t, 4) ? SIMD.Int8x16.extractLane(trueValue, 4) : SIMD.Int8x16.extractLane(falseValue, 4), SIMD.Bool8x16.extractLane(t, 5) ? SIMD.Int8x16.extractLane(trueValue, 5) : SIMD.Int8x16.extractLane(falseValue, 5), SIMD.Bool8x16.extractLane(t, 6) ? SIMD.Int8x16.extractLane(trueValue, 6) : SIMD.Int8x16.extractLane(falseValue, 6), SIMD.Bool8x16.extractLane(t, 7) ? SIMD.Int8x16.extractLane(trueValue, 7) : SIMD.Int8x16.extractLane(falseValue, 7), SIMD.Bool8x16.extractLane(t, 8) ? SIMD.Int8x16.extractLane(trueValue, 8) : SIMD.Int8x16.extractLane(falseValue, 8), SIMD.Bool8x16.extractLane(t, 9) ? SIMD.Int8x16.extractLane(trueValue, 9) : SIMD.Int8x16.extractLane(falseValue, 9), SIMD.Bool8x16.extractLane(t, 10) ? SIMD.Int8x16.extractLane(trueValue, 10) : SIMD.Int8x16.extractLane(falseValue, 10), SIMD.Bool8x16.extractLane(t, 11) ? SIMD.Int8x16.extractLane(trueValue, 11) : SIMD.Int8x16.extractLane(falseValue, 11), SIMD.Bool8x16.extractLane(t, 12) ? SIMD.Int8x16.extractLane(trueValue, 12) : SIMD.Int8x16.extractLane(falseValue, 12), SIMD.Bool8x16.extractLane(t, 13) ? SIMD.Int8x16.extractLane(trueValue, 13) : SIMD.Int8x16.extractLane(falseValue, 13), SIMD.Bool8x16.extractLane(t, 14) ? SIMD.Int8x16.extractLane(trueValue, 14) : SIMD.Int8x16.extractLane(falseValue, 14), SIMD.Bool8x16.extractLane(t, 15) ? SIMD.Int8x16.extractLane(trueValue, 15) : SIMD.Int8x16.extractLane(falseValue, 15));
        };
      }
      if (typeof SIMD.Int8x16.selectBits === "undefined") {
        SIMD.Int8x16.selectBits = function(t, trueValue, falseValue) {
          t = SIMD.Int8x16.check(t);
          trueValue = SIMD.Int8x16.check(trueValue);
          falseValue = SIMD.Int8x16.check(falseValue);
          var tr = SIMD.Int8x16.and(t, trueValue);
          var fr = SIMD.Int8x16.and(SIMD.Int8x16.not(t), falseValue);
          return SIMD.Int8x16.or(tr, fr);
        };
      }
      if (typeof SIMD.Int8x16.equal === "undefined") {
        SIMD.Int8x16.equal = function(t, other) {
          t = SIMD.Int8x16.check(t);
          other = SIMD.Int8x16.check(other);
          var cs0 = SIMD.Int8x16.extractLane(t, 0) == SIMD.Int8x16.extractLane(other, 0);
          var cs1 = SIMD.Int8x16.extractLane(t, 1) == SIMD.Int8x16.extractLane(other, 1);
          var cs2 = SIMD.Int8x16.extractLane(t, 2) == SIMD.Int8x16.extractLane(other, 2);
          var cs3 = SIMD.Int8x16.extractLane(t, 3) == SIMD.Int8x16.extractLane(other, 3);
          var cs4 = SIMD.Int8x16.extractLane(t, 4) == SIMD.Int8x16.extractLane(other, 4);
          var cs5 = SIMD.Int8x16.extractLane(t, 5) == SIMD.Int8x16.extractLane(other, 5);
          var cs6 = SIMD.Int8x16.extractLane(t, 6) == SIMD.Int8x16.extractLane(other, 6);
          var cs7 = SIMD.Int8x16.extractLane(t, 7) == SIMD.Int8x16.extractLane(other, 7);
          var cs8 = SIMD.Int8x16.extractLane(t, 8) == SIMD.Int8x16.extractLane(other, 8);
          var cs9 = SIMD.Int8x16.extractLane(t, 9) == SIMD.Int8x16.extractLane(other, 9);
          var cs10 = SIMD.Int8x16.extractLane(t, 10) == SIMD.Int8x16.extractLane(other, 10);
          var cs11 = SIMD.Int8x16.extractLane(t, 11) == SIMD.Int8x16.extractLane(other, 11);
          var cs12 = SIMD.Int8x16.extractLane(t, 12) == SIMD.Int8x16.extractLane(other, 12);
          var cs13 = SIMD.Int8x16.extractLane(t, 13) == SIMD.Int8x16.extractLane(other, 13);
          var cs14 = SIMD.Int8x16.extractLane(t, 14) == SIMD.Int8x16.extractLane(other, 14);
          var cs15 = SIMD.Int8x16.extractLane(t, 15) == SIMD.Int8x16.extractLane(other, 15);
          return SIMD.Bool8x16(cs0, cs1, cs2, cs3, cs4, cs5, cs6, cs7, cs8, cs9, cs10, cs11, cs12, cs13, cs14, cs15);
        };
      }
      if (typeof SIMD.Int8x16.notEqual === "undefined") {
        SIMD.Int8x16.notEqual = function(t, other) {
          t = SIMD.Int8x16.check(t);
          other = SIMD.Int8x16.check(other);
          var cs0 = SIMD.Int8x16.extractLane(t, 0) != SIMD.Int8x16.extractLane(other, 0);
          var cs1 = SIMD.Int8x16.extractLane(t, 1) != SIMD.Int8x16.extractLane(other, 1);
          var cs2 = SIMD.Int8x16.extractLane(t, 2) != SIMD.Int8x16.extractLane(other, 2);
          var cs3 = SIMD.Int8x16.extractLane(t, 3) != SIMD.Int8x16.extractLane(other, 3);
          var cs4 = SIMD.Int8x16.extractLane(t, 4) != SIMD.Int8x16.extractLane(other, 4);
          var cs5 = SIMD.Int8x16.extractLane(t, 5) != SIMD.Int8x16.extractLane(other, 5);
          var cs6 = SIMD.Int8x16.extractLane(t, 6) != SIMD.Int8x16.extractLane(other, 6);
          var cs7 = SIMD.Int8x16.extractLane(t, 7) != SIMD.Int8x16.extractLane(other, 7);
          var cs8 = SIMD.Int8x16.extractLane(t, 8) != SIMD.Int8x16.extractLane(other, 8);
          var cs9 = SIMD.Int8x16.extractLane(t, 9) != SIMD.Int8x16.extractLane(other, 9);
          var cs10 = SIMD.Int8x16.extractLane(t, 10) != SIMD.Int8x16.extractLane(other, 10);
          var cs11 = SIMD.Int8x16.extractLane(t, 11) != SIMD.Int8x16.extractLane(other, 11);
          var cs12 = SIMD.Int8x16.extractLane(t, 12) != SIMD.Int8x16.extractLane(other, 12);
          var cs13 = SIMD.Int8x16.extractLane(t, 13) != SIMD.Int8x16.extractLane(other, 13);
          var cs14 = SIMD.Int8x16.extractLane(t, 14) != SIMD.Int8x16.extractLane(other, 14);
          var cs15 = SIMD.Int8x16.extractLane(t, 15) != SIMD.Int8x16.extractLane(other, 15);
          return SIMD.Bool8x16(cs0, cs1, cs2, cs3, cs4, cs5, cs6, cs7, cs8, cs9, cs10, cs11, cs12, cs13, cs14, cs15);
        };
      }
      if (typeof SIMD.Int8x16.greaterThan === "undefined") {
        SIMD.Int8x16.greaterThan = function(t, other) {
          t = SIMD.Int8x16.check(t);
          other = SIMD.Int8x16.check(other);
          var cs0 = SIMD.Int8x16.extractLane(t, 0) > SIMD.Int8x16.extractLane(other, 0);
          var cs1 = SIMD.Int8x16.extractLane(t, 1) > SIMD.Int8x16.extractLane(other, 1);
          var cs2 = SIMD.Int8x16.extractLane(t, 2) > SIMD.Int8x16.extractLane(other, 2);
          var cs3 = SIMD.Int8x16.extractLane(t, 3) > SIMD.Int8x16.extractLane(other, 3);
          var cs4 = SIMD.Int8x16.extractLane(t, 4) > SIMD.Int8x16.extractLane(other, 4);
          var cs5 = SIMD.Int8x16.extractLane(t, 5) > SIMD.Int8x16.extractLane(other, 5);
          var cs6 = SIMD.Int8x16.extractLane(t, 6) > SIMD.Int8x16.extractLane(other, 6);
          var cs7 = SIMD.Int8x16.extractLane(t, 7) > SIMD.Int8x16.extractLane(other, 7);
          var cs8 = SIMD.Int8x16.extractLane(t, 8) > SIMD.Int8x16.extractLane(other, 8);
          var cs9 = SIMD.Int8x16.extractLane(t, 9) > SIMD.Int8x16.extractLane(other, 9);
          var cs10 = SIMD.Int8x16.extractLane(t, 10) > SIMD.Int8x16.extractLane(other, 10);
          var cs11 = SIMD.Int8x16.extractLane(t, 11) > SIMD.Int8x16.extractLane(other, 11);
          var cs12 = SIMD.Int8x16.extractLane(t, 12) > SIMD.Int8x16.extractLane(other, 12);
          var cs13 = SIMD.Int8x16.extractLane(t, 13) > SIMD.Int8x16.extractLane(other, 13);
          var cs14 = SIMD.Int8x16.extractLane(t, 14) > SIMD.Int8x16.extractLane(other, 14);
          var cs15 = SIMD.Int8x16.extractLane(t, 15) > SIMD.Int8x16.extractLane(other, 15);
          return SIMD.Bool8x16(cs0, cs1, cs2, cs3, cs4, cs5, cs6, cs7, cs8, cs9, cs10, cs11, cs12, cs13, cs14, cs15);
        };
      }
      if (typeof SIMD.Int8x16.greaterThanOrEqual === "undefined") {
        SIMD.Int8x16.greaterThanOrEqual = function(t, other) {
          t = SIMD.Int8x16.check(t);
          other = SIMD.Int8x16.check(other);
          var cs0 = SIMD.Int8x16.extractLane(t, 0) >= SIMD.Int8x16.extractLane(other, 0);
          var cs1 = SIMD.Int8x16.extractLane(t, 1) >= SIMD.Int8x16.extractLane(other, 1);
          var cs2 = SIMD.Int8x16.extractLane(t, 2) >= SIMD.Int8x16.extractLane(other, 2);
          var cs3 = SIMD.Int8x16.extractLane(t, 3) >= SIMD.Int8x16.extractLane(other, 3);
          var cs4 = SIMD.Int8x16.extractLane(t, 4) >= SIMD.Int8x16.extractLane(other, 4);
          var cs5 = SIMD.Int8x16.extractLane(t, 5) >= SIMD.Int8x16.extractLane(other, 5);
          var cs6 = SIMD.Int8x16.extractLane(t, 6) >= SIMD.Int8x16.extractLane(other, 6);
          var cs7 = SIMD.Int8x16.extractLane(t, 7) >= SIMD.Int8x16.extractLane(other, 7);
          var cs8 = SIMD.Int8x16.extractLane(t, 8) >= SIMD.Int8x16.extractLane(other, 8);
          var cs9 = SIMD.Int8x16.extractLane(t, 9) >= SIMD.Int8x16.extractLane(other, 9);
          var cs10 = SIMD.Int8x16.extractLane(t, 10) >= SIMD.Int8x16.extractLane(other, 10);
          var cs11 = SIMD.Int8x16.extractLane(t, 11) >= SIMD.Int8x16.extractLane(other, 11);
          var cs12 = SIMD.Int8x16.extractLane(t, 12) >= SIMD.Int8x16.extractLane(other, 12);
          var cs13 = SIMD.Int8x16.extractLane(t, 13) >= SIMD.Int8x16.extractLane(other, 13);
          var cs14 = SIMD.Int8x16.extractLane(t, 14) >= SIMD.Int8x16.extractLane(other, 14);
          var cs15 = SIMD.Int8x16.extractLane(t, 15) >= SIMD.Int8x16.extractLane(other, 15);
          return SIMD.Bool8x16(cs0, cs1, cs2, cs3, cs4, cs5, cs6, cs7, cs8, cs9, cs10, cs11, cs12, cs13, cs14, cs15);
        };
      }
      if (typeof SIMD.Int8x16.lessThan === "undefined") {
        SIMD.Int8x16.lessThan = function(t, other) {
          t = SIMD.Int8x16.check(t);
          other = SIMD.Int8x16.check(other);
          var cs0 = SIMD.Int8x16.extractLane(t, 0) < SIMD.Int8x16.extractLane(other, 0);
          var cs1 = SIMD.Int8x16.extractLane(t, 1) < SIMD.Int8x16.extractLane(other, 1);
          var cs2 = SIMD.Int8x16.extractLane(t, 2) < SIMD.Int8x16.extractLane(other, 2);
          var cs3 = SIMD.Int8x16.extractLane(t, 3) < SIMD.Int8x16.extractLane(other, 3);
          var cs4 = SIMD.Int8x16.extractLane(t, 4) < SIMD.Int8x16.extractLane(other, 4);
          var cs5 = SIMD.Int8x16.extractLane(t, 5) < SIMD.Int8x16.extractLane(other, 5);
          var cs6 = SIMD.Int8x16.extractLane(t, 6) < SIMD.Int8x16.extractLane(other, 6);
          var cs7 = SIMD.Int8x16.extractLane(t, 7) < SIMD.Int8x16.extractLane(other, 7);
          var cs8 = SIMD.Int8x16.extractLane(t, 8) < SIMD.Int8x16.extractLane(other, 8);
          var cs9 = SIMD.Int8x16.extractLane(t, 9) < SIMD.Int8x16.extractLane(other, 9);
          var cs10 = SIMD.Int8x16.extractLane(t, 10) < SIMD.Int8x16.extractLane(other, 10);
          var cs11 = SIMD.Int8x16.extractLane(t, 11) < SIMD.Int8x16.extractLane(other, 11);
          var cs12 = SIMD.Int8x16.extractLane(t, 12) < SIMD.Int8x16.extractLane(other, 12);
          var cs13 = SIMD.Int8x16.extractLane(t, 13) < SIMD.Int8x16.extractLane(other, 13);
          var cs14 = SIMD.Int8x16.extractLane(t, 14) < SIMD.Int8x16.extractLane(other, 14);
          var cs15 = SIMD.Int8x16.extractLane(t, 15) < SIMD.Int8x16.extractLane(other, 15);
          return SIMD.Bool8x16(cs0, cs1, cs2, cs3, cs4, cs5, cs6, cs7, cs8, cs9, cs10, cs11, cs12, cs13, cs14, cs15);
        };
      }
      if (typeof SIMD.Int8x16.lessThanOrEqual === "undefined") {
        SIMD.Int8x16.lessThanOrEqual = function(t, other) {
          t = SIMD.Int8x16.check(t);
          other = SIMD.Int8x16.check(other);
          var cs0 = SIMD.Int8x16.extractLane(t, 0) <= SIMD.Int8x16.extractLane(other, 0);
          var cs1 = SIMD.Int8x16.extractLane(t, 1) <= SIMD.Int8x16.extractLane(other, 1);
          var cs2 = SIMD.Int8x16.extractLane(t, 2) <= SIMD.Int8x16.extractLane(other, 2);
          var cs3 = SIMD.Int8x16.extractLane(t, 3) <= SIMD.Int8x16.extractLane(other, 3);
          var cs4 = SIMD.Int8x16.extractLane(t, 4) <= SIMD.Int8x16.extractLane(other, 4);
          var cs5 = SIMD.Int8x16.extractLane(t, 5) <= SIMD.Int8x16.extractLane(other, 5);
          var cs6 = SIMD.Int8x16.extractLane(t, 6) <= SIMD.Int8x16.extractLane(other, 6);
          var cs7 = SIMD.Int8x16.extractLane(t, 7) <= SIMD.Int8x16.extractLane(other, 7);
          var cs8 = SIMD.Int8x16.extractLane(t, 8) <= SIMD.Int8x16.extractLane(other, 8);
          var cs9 = SIMD.Int8x16.extractLane(t, 9) <= SIMD.Int8x16.extractLane(other, 9);
          var cs10 = SIMD.Int8x16.extractLane(t, 10) <= SIMD.Int8x16.extractLane(other, 10);
          var cs11 = SIMD.Int8x16.extractLane(t, 11) <= SIMD.Int8x16.extractLane(other, 11);
          var cs12 = SIMD.Int8x16.extractLane(t, 12) <= SIMD.Int8x16.extractLane(other, 12);
          var cs13 = SIMD.Int8x16.extractLane(t, 13) <= SIMD.Int8x16.extractLane(other, 13);
          var cs14 = SIMD.Int8x16.extractLane(t, 14) <= SIMD.Int8x16.extractLane(other, 14);
          var cs15 = SIMD.Int8x16.extractLane(t, 15) <= SIMD.Int8x16.extractLane(other, 15);
          return SIMD.Bool8x16(cs0, cs1, cs2, cs3, cs4, cs5, cs6, cs7, cs8, cs9, cs10, cs11, cs12, cs13, cs14, cs15);
        };
      }
      if (typeof SIMD.Int8x16.shiftLeftByScalar === "undefined") {
        SIMD.Int8x16.shiftLeftByScalar = function(a, bits) {
          a = SIMD.Int8x16.check(a);
          if (bits >>> 0 > 8)
            bits = 8;
          var s0 = SIMD.Int8x16.extractLane(a, 0) << bits;
          var s1 = SIMD.Int8x16.extractLane(a, 1) << bits;
          var s2 = SIMD.Int8x16.extractLane(a, 2) << bits;
          var s3 = SIMD.Int8x16.extractLane(a, 3) << bits;
          var s4 = SIMD.Int8x16.extractLane(a, 4) << bits;
          var s5 = SIMD.Int8x16.extractLane(a, 5) << bits;
          var s6 = SIMD.Int8x16.extractLane(a, 6) << bits;
          var s7 = SIMD.Int8x16.extractLane(a, 7) << bits;
          var s8 = SIMD.Int8x16.extractLane(a, 8) << bits;
          var s9 = SIMD.Int8x16.extractLane(a, 9) << bits;
          var s10 = SIMD.Int8x16.extractLane(a, 10) << bits;
          var s11 = SIMD.Int8x16.extractLane(a, 11) << bits;
          var s12 = SIMD.Int8x16.extractLane(a, 12) << bits;
          var s13 = SIMD.Int8x16.extractLane(a, 13) << bits;
          var s14 = SIMD.Int8x16.extractLane(a, 14) << bits;
          var s15 = SIMD.Int8x16.extractLane(a, 15) << bits;
          return SIMD.Int8x16(s0, s1, s2, s3, s4, s5, s6, s7, s8, s9, s10, s11, s12, s13, s14, s15);
        };
      }
      if (typeof SIMD.Int8x16.shiftRightLogicalByScalar === "undefined") {
        SIMD.Int8x16.shiftRightLogicalByScalar = function(a, bits) {
          a = SIMD.Int8x16.check(a);
          if (bits >>> 0 > 8)
            bits = 8;
          var s0 = (SIMD.Int8x16.extractLane(a, 0) & 0xff) >>> bits;
          var s1 = (SIMD.Int8x16.extractLane(a, 1) & 0xff) >>> bits;
          var s2 = (SIMD.Int8x16.extractLane(a, 2) & 0xff) >>> bits;
          var s3 = (SIMD.Int8x16.extractLane(a, 3) & 0xff) >>> bits;
          var s4 = (SIMD.Int8x16.extractLane(a, 4) & 0xff) >>> bits;
          var s5 = (SIMD.Int8x16.extractLane(a, 5) & 0xff) >>> bits;
          var s6 = (SIMD.Int8x16.extractLane(a, 6) & 0xff) >>> bits;
          var s7 = (SIMD.Int8x16.extractLane(a, 7) & 0xff) >>> bits;
          var s8 = (SIMD.Int8x16.extractLane(a, 8) & 0xff) >>> bits;
          var s9 = (SIMD.Int8x16.extractLane(a, 9) & 0xff) >>> bits;
          var s10 = (SIMD.Int8x16.extractLane(a, 10) & 0xff) >>> bits;
          var s11 = (SIMD.Int8x16.extractLane(a, 11) & 0xff) >>> bits;
          var s12 = (SIMD.Int8x16.extractLane(a, 12) & 0xff) >>> bits;
          var s13 = (SIMD.Int8x16.extractLane(a, 13) & 0xff) >>> bits;
          var s14 = (SIMD.Int8x16.extractLane(a, 14) & 0xff) >>> bits;
          var s15 = (SIMD.Int8x16.extractLane(a, 15) & 0xff) >>> bits;
          return SIMD.Int8x16(s0, s1, s2, s3, s4, s5, s6, s7, s8, s9, s10, s11, s12, s13, s14, s15);
        };
      }
      if (typeof SIMD.Int8x16.shiftRightArithmeticByScalar === "undefined") {
        SIMD.Int8x16.shiftRightArithmeticByScalar = function(a, bits) {
          a = SIMD.Int8x16.check(a);
          if (bits >>> 0 > 8)
            bits = 8;
          var s0 = SIMD.Int8x16.extractLane(a, 0) >> bits;
          var s1 = SIMD.Int8x16.extractLane(a, 1) >> bits;
          var s2 = SIMD.Int8x16.extractLane(a, 2) >> bits;
          var s3 = SIMD.Int8x16.extractLane(a, 3) >> bits;
          var s4 = SIMD.Int8x16.extractLane(a, 4) >> bits;
          var s5 = SIMD.Int8x16.extractLane(a, 5) >> bits;
          var s6 = SIMD.Int8x16.extractLane(a, 6) >> bits;
          var s7 = SIMD.Int8x16.extractLane(a, 7) >> bits;
          var s8 = SIMD.Int8x16.extractLane(a, 8) >> bits;
          var s9 = SIMD.Int8x16.extractLane(a, 9) >> bits;
          var s10 = SIMD.Int8x16.extractLane(a, 10) >> bits;
          var s11 = SIMD.Int8x16.extractLane(a, 11) >> bits;
          var s12 = SIMD.Int8x16.extractLane(a, 12) >> bits;
          var s13 = SIMD.Int8x16.extractLane(a, 13) >> bits;
          var s14 = SIMD.Int8x16.extractLane(a, 14) >> bits;
          var s15 = SIMD.Int8x16.extractLane(a, 15) >> bits;
          return SIMD.Int8x16(s0, s1, s2, s3, s4, s5, s6, s7, s8, s9, s10, s11, s12, s13, s14, s15);
        };
      }
      if (typeof SIMD.Int8x16.load === "undefined") {
        SIMD.Int8x16.load = function(tarray, index) {
          if (!isTypedArray(tarray))
            throw new TypeError("The 1st argument must be a typed array.");
          if (!isInt32(index))
            throw new TypeError("The 2nd argument must be an Int32.");
          var bpe = tarray.BYTES_PER_ELEMENT;
          if (index < 0 || (index * bpe + 16) > tarray.byteLength)
            throw new RangeError("The value of index is invalid.");
          var i8temp = _i8x16;
          var array = bpe == 1 ? i8temp : bpe == 2 ? _i16x8 : bpe == 4 ? (tarray instanceof Float32Array ? _f32x4 : _i32x4) : _f64x2;
          var n = 16 / bpe;
          for (var i = 0; i < n; ++i)
            array[i] = tarray[index + i];
          return SIMD.Int8x16(i8temp[0], i8temp[1], i8temp[2], i8temp[3], i8temp[4], i8temp[5], i8temp[6], i8temp[7], i8temp[8], i8temp[9], i8temp[10], i8temp[11], i8temp[12], i8temp[13], i8temp[14], i8temp[15]);
        };
      }
      if (typeof SIMD.Int8x16.store === "undefined") {
        SIMD.Int8x16.store = function(tarray, index, value) {
          if (!isTypedArray(tarray))
            throw new TypeError("The 1st argument must be a typed array.");
          if (!isInt32(index))
            throw new TypeError("The 2nd argument must be an Int32.");
          var bpe = tarray.BYTES_PER_ELEMENT;
          if (index < 0 || (index * bpe + 16) > tarray.byteLength)
            throw new RangeError("The value of index is invalid.");
          value = SIMD.Int8x16.check(value);
          _i8x16[0] = SIMD.Int8x16.extractLane(value, 0);
          _i8x16[1] = SIMD.Int8x16.extractLane(value, 1);
          _i8x16[2] = SIMD.Int8x16.extractLane(value, 2);
          _i8x16[3] = SIMD.Int8x16.extractLane(value, 3);
          _i8x16[4] = SIMD.Int8x16.extractLane(value, 4);
          _i8x16[5] = SIMD.Int8x16.extractLane(value, 5);
          _i8x16[6] = SIMD.Int8x16.extractLane(value, 6);
          _i8x16[7] = SIMD.Int8x16.extractLane(value, 7);
          _i8x16[8] = SIMD.Int8x16.extractLane(value, 8);
          _i8x16[9] = SIMD.Int8x16.extractLane(value, 9);
          _i8x16[10] = SIMD.Int8x16.extractLane(value, 10);
          _i8x16[11] = SIMD.Int8x16.extractLane(value, 11);
          _i8x16[12] = SIMD.Int8x16.extractLane(value, 12);
          _i8x16[13] = SIMD.Int8x16.extractLane(value, 13);
          _i8x16[14] = SIMD.Int8x16.extractLane(value, 14);
          _i8x16[15] = SIMD.Int8x16.extractLane(value, 15);
          var array = bpe == 1 ? _i8x16 : bpe == 2 ? _i16x8 : bpe == 4 ? (tarray instanceof Float32Array ? _f32x4 : _i32x4) : _f64x2;
          var n = 16 / bpe;
          for (var i = 0; i < n; ++i)
            tarray[index + i] = array[i];
          return value;
        };
      }
    };
  }, {}],
  186: [function(require, module, exports) {
    'use strict';
    var define = require('define-properties');
    var ES = require('es-abstract/es7');
    var bind = require('function-bind');
    var atShim = function at(pos) {
      ES.RequireObjectCoercible(this);
      var O = ES.ToObject(this);
      var S = ES.ToString(O);
      var position = ES.ToInteger(pos);
      var size = S.length;
      if (position < 0 || position >= size) {
        return '';
      }
      var cuFirst = S.charCodeAt(position);
      var cuSecond;
      var nextIndex = position + 1;
      var len = 1;
      var isHighSurrogate = cuFirst >= 0xD800 && cuFirst <= 0xDBFF;
      if (isHighSurrogate && size > nextIndex) {
        cuSecond = S.charCodeAt(nextIndex);
        if (cuSecond >= 0xDC00 && cuSecond <= 0xDFFF) {
          len = 2;
        }
      }
      return S.slice(position, position + len);
    };
    var at = bind.call(Function.call, atShim);
    define(at, {
      method: atShim,
      shim: function shimStringPrototypeAt() {
        define(String.prototype, {at: atShim});
        return String.prototype.at;
      }
    });
    module.exports = at;
  }, {
    "define-properties": 187,
    "es-abstract/es7": 190,
    "function-bind": 200
  }],
  187: [function(require, module, exports) {
    arguments[4][24][0].apply(exports, arguments);
  }, {
    "dup": 24,
    "foreach": 199,
    "object-keys": 205
  }],
  188: [function(require, module, exports) {
    arguments[4][25][0].apply(exports, arguments);
  }, {
    "./helpers/isFinite": 192,
    "./helpers/mod": 194,
    "./helpers/sign": 195,
    "dup": 25,
    "es-to-primitive/es5": 196,
    "is-callable": 201
  }],
  189: [function(require, module, exports) {
    arguments[4][26][0].apply(exports, arguments);
  }, {
    "./es5": 188,
    "./helpers/assign": 191,
    "./helpers/isFinite": 192,
    "./helpers/isPrimitive": 193,
    "./helpers/mod": 194,
    "./helpers/sign": 195,
    "dup": 26,
    "es-to-primitive/es6": 197,
    "function-bind": 200,
    "is-regex": 203
  }],
  190: [function(require, module, exports) {
    arguments[4][49][0].apply(exports, arguments);
  }, {
    "./es6": 189,
    "./helpers/assign": 191,
    "dup": 49
  }],
  191: [function(require, module, exports) {
    arguments[4][27][0].apply(exports, arguments);
  }, {"dup": 27}],
  192: [function(require, module, exports) {
    arguments[4][28][0].apply(exports, arguments);
  }, {"dup": 28}],
  193: [function(require, module, exports) {
    arguments[4][29][0].apply(exports, arguments);
  }, {"dup": 29}],
  194: [function(require, module, exports) {
    arguments[4][30][0].apply(exports, arguments);
  }, {"dup": 30}],
  195: [function(require, module, exports) {
    arguments[4][31][0].apply(exports, arguments);
  }, {"dup": 31}],
  196: [function(require, module, exports) {
    arguments[4][32][0].apply(exports, arguments);
  }, {
    "./helpers/isPrimitive": 198,
    "dup": 32,
    "is-callable": 201
  }],
  197: [function(require, module, exports) {
    arguments[4][33][0].apply(exports, arguments);
  }, {
    "./helpers/isPrimitive": 198,
    "dup": 33,
    "is-callable": 201,
    "is-date-object": 202,
    "is-symbol": 204
  }],
  198: [function(require, module, exports) {
    arguments[4][29][0].apply(exports, arguments);
  }, {"dup": 29}],
  199: [function(require, module, exports) {
    arguments[4][35][0].apply(exports, arguments);
  }, {"dup": 35}],
  200: [function(require, module, exports) {
    arguments[4][36][0].apply(exports, arguments);
  }, {"dup": 36}],
  201: [function(require, module, exports) {
    arguments[4][37][0].apply(exports, arguments);
  }, {"dup": 37}],
  202: [function(require, module, exports) {
    arguments[4][38][0].apply(exports, arguments);
  }, {"dup": 38}],
  203: [function(require, module, exports) {
    arguments[4][39][0].apply(exports, arguments);
  }, {"dup": 39}],
  204: [function(require, module, exports) {
    arguments[4][40][0].apply(exports, arguments);
  }, {"dup": 40}],
  205: [function(require, module, exports) {
    arguments[4][41][0].apply(exports, arguments);
  }, {
    "./isArguments": 206,
    "dup": 41
  }],
  206: [function(require, module, exports) {
    arguments[4][42][0].apply(exports, arguments);
  }, {"dup": 42}],
  207: [function(require, module, exports) {
    'use strict';
    var bind = require('function-bind');
    var ES = require('es-abstract/es7');
    var slice = bind.call(Function.call, String.prototype.slice);
    module.exports = function padEnd(maxLength) {
      var O = ES.RequireObjectCoercible(this);
      var S = ES.ToString(O);
      var stringLength = ES.ToLength(S.length);
      var fillString;
      if (arguments.length > 1) {
        fillString = arguments[1];
      }
      var filler = typeof fillString === 'undefined' ? '' : ES.ToString(fillString);
      if (filler === '') {
        filler = ' ';
      }
      var intMaxLength = ES.ToLength(maxLength);
      if (intMaxLength <= stringLength) {
        return S;
      }
      var fillLen = intMaxLength - stringLength;
      while (filler.length < fillLen) {
        var fLen = filler.length;
        var remainingCodeUnits = fillLen - fLen;
        filler += fLen > remainingCodeUnits ? slice(filler, 0, remainingCodeUnits) : filler;
      }
      var truncatedStringFiller = filler.length > fillLen ? slice(filler, 0, fillLen) : filler;
      return S + truncatedStringFiller;
    };
  }, {
    "es-abstract/es7": 212,
    "function-bind": 222
  }],
  208: [function(require, module, exports) {
    'use strict';
    var bind = require('function-bind');
    var define = require('define-properties');
    var ES = require('es-abstract/es7');
    var implementation = require('./implementation');
    var getPolyfill = require('./polyfill');
    var shim = require('./shim');
    var bound = bind.call(Function.apply, implementation);
    var boundPadEnd = function padEnd(str, maxLength) {
      ES.RequireObjectCoercible(str);
      var args = [maxLength];
      if (arguments.length > 2) {
        args.push(arguments[2]);
      }
      return bound(str, args);
    };
    define(boundPadEnd, {
      getPolyfill: getPolyfill,
      implementation: implementation,
      shim: shim
    });
    module.exports = boundPadEnd;
  }, {
    "./implementation": 207,
    "./polyfill": 229,
    "./shim": 230,
    "define-properties": 209,
    "es-abstract/es7": 212,
    "function-bind": 222
  }],
  209: [function(require, module, exports) {
    arguments[4][24][0].apply(exports, arguments);
  }, {
    "dup": 24,
    "foreach": 221,
    "object-keys": 227
  }],
  210: [function(require, module, exports) {
    arguments[4][25][0].apply(exports, arguments);
  }, {
    "./helpers/isFinite": 214,
    "./helpers/mod": 216,
    "./helpers/sign": 217,
    "dup": 25,
    "es-to-primitive/es5": 218,
    "is-callable": 223
  }],
  211: [function(require, module, exports) {
    arguments[4][26][0].apply(exports, arguments);
  }, {
    "./es5": 210,
    "./helpers/assign": 213,
    "./helpers/isFinite": 214,
    "./helpers/isPrimitive": 215,
    "./helpers/mod": 216,
    "./helpers/sign": 217,
    "dup": 26,
    "es-to-primitive/es6": 219,
    "function-bind": 222,
    "is-regex": 225
  }],
  212: [function(require, module, exports) {
    arguments[4][49][0].apply(exports, arguments);
  }, {
    "./es6": 211,
    "./helpers/assign": 213,
    "dup": 49
  }],
  213: [function(require, module, exports) {
    arguments[4][27][0].apply(exports, arguments);
  }, {"dup": 27}],
  214: [function(require, module, exports) {
    arguments[4][28][0].apply(exports, arguments);
  }, {"dup": 28}],
  215: [function(require, module, exports) {
    arguments[4][29][0].apply(exports, arguments);
  }, {"dup": 29}],
  216: [function(require, module, exports) {
    arguments[4][30][0].apply(exports, arguments);
  }, {"dup": 30}],
  217: [function(require, module, exports) {
    arguments[4][31][0].apply(exports, arguments);
  }, {"dup": 31}],
  218: [function(require, module, exports) {
    arguments[4][32][0].apply(exports, arguments);
  }, {
    "./helpers/isPrimitive": 220,
    "dup": 32,
    "is-callable": 223
  }],
  219: [function(require, module, exports) {
    arguments[4][33][0].apply(exports, arguments);
  }, {
    "./helpers/isPrimitive": 220,
    "dup": 33,
    "is-callable": 223,
    "is-date-object": 224,
    "is-symbol": 226
  }],
  220: [function(require, module, exports) {
    arguments[4][29][0].apply(exports, arguments);
  }, {"dup": 29}],
  221: [function(require, module, exports) {
    arguments[4][35][0].apply(exports, arguments);
  }, {"dup": 35}],
  222: [function(require, module, exports) {
    arguments[4][36][0].apply(exports, arguments);
  }, {"dup": 36}],
  223: [function(require, module, exports) {
    arguments[4][37][0].apply(exports, arguments);
  }, {"dup": 37}],
  224: [function(require, module, exports) {
    arguments[4][38][0].apply(exports, arguments);
  }, {"dup": 38}],
  225: [function(require, module, exports) {
    arguments[4][39][0].apply(exports, arguments);
  }, {"dup": 39}],
  226: [function(require, module, exports) {
    arguments[4][40][0].apply(exports, arguments);
  }, {"dup": 40}],
  227: [function(require, module, exports) {
    arguments[4][41][0].apply(exports, arguments);
  }, {
    "./isArguments": 228,
    "dup": 41
  }],
  228: [function(require, module, exports) {
    arguments[4][42][0].apply(exports, arguments);
  }, {"dup": 42}],
  229: [function(require, module, exports) {
    'use strict';
    var implementation = require('./implementation');
    module.exports = function getPolyfill() {
      return typeof String.prototype.padEnd === 'function' ? String.prototype.padEnd : implementation;
    };
  }, {"./implementation": 207}],
  230: [function(require, module, exports) {
    'use strict';
    var getPolyfill = require('./polyfill');
    var define = require('define-properties');
    module.exports = function shimPadEnd() {
      var polyfill = getPolyfill();
      define(String.prototype, {padEnd: polyfill}, {padEnd: function() {
          return String.prototype.padEnd !== polyfill;
        }});
      return polyfill;
    };
  }, {
    "./polyfill": 229,
    "define-properties": 209
  }],
  231: [function(require, module, exports) {
    'use strict';
    var bind = require('function-bind');
    var ES = require('es-abstract/es7');
    var slice = bind.call(Function.call, String.prototype.slice);
    module.exports = function padStart(maxLength) {
      var O = ES.RequireObjectCoercible(this);
      var S = ES.ToString(O);
      var stringLength = ES.ToLength(S.length);
      var fillString;
      if (arguments.length > 1) {
        fillString = arguments[1];
      }
      var filler = typeof fillString === 'undefined' ? '' : ES.ToString(fillString);
      if (filler === '') {
        filler = ' ';
      }
      var intMaxLength = ES.ToLength(maxLength);
      if (intMaxLength <= stringLength) {
        return S;
      }
      var fillLen = intMaxLength - stringLength;
      while (filler.length < fillLen) {
        var fLen = filler.length;
        var remainingCodeUnits = fillLen - fLen;
        filler += fLen > remainingCodeUnits ? slice(filler, 0, remainingCodeUnits) : filler;
      }
      var truncatedStringFiller = filler.length > fillLen ? slice(filler, 0, fillLen) : filler;
      return truncatedStringFiller + S;
    };
  }, {
    "es-abstract/es7": 236,
    "function-bind": 246
  }],
  232: [function(require, module, exports) {
    'use strict';
    var bind = require('function-bind');
    var define = require('define-properties');
    var ES = require('es-abstract/es7');
    var implementation = require('./implementation');
    var getPolyfill = require('./polyfill');
    var shim = require('./shim');
    var bound = bind.call(Function.apply, implementation);
    var boundPadStart = function padStart(str, maxLength) {
      ES.RequireObjectCoercible(str);
      var args = [maxLength];
      if (arguments.length > 2) {
        args.push(arguments[2]);
      }
      return bound(str, args);
    };
    define(boundPadStart, {
      getPolyfill: getPolyfill,
      implementation: implementation,
      shim: shim
    });
    module.exports = boundPadStart;
  }, {
    "./implementation": 231,
    "./polyfill": 253,
    "./shim": 254,
    "define-properties": 233,
    "es-abstract/es7": 236,
    "function-bind": 246
  }],
  233: [function(require, module, exports) {
    arguments[4][24][0].apply(exports, arguments);
  }, {
    "dup": 24,
    "foreach": 245,
    "object-keys": 251
  }],
  234: [function(require, module, exports) {
    arguments[4][25][0].apply(exports, arguments);
  }, {
    "./helpers/isFinite": 238,
    "./helpers/mod": 240,
    "./helpers/sign": 241,
    "dup": 25,
    "es-to-primitive/es5": 242,
    "is-callable": 247
  }],
  235: [function(require, module, exports) {
    arguments[4][26][0].apply(exports, arguments);
  }, {
    "./es5": 234,
    "./helpers/assign": 237,
    "./helpers/isFinite": 238,
    "./helpers/isPrimitive": 239,
    "./helpers/mod": 240,
    "./helpers/sign": 241,
    "dup": 26,
    "es-to-primitive/es6": 243,
    "function-bind": 246,
    "is-regex": 249
  }],
  236: [function(require, module, exports) {
    arguments[4][49][0].apply(exports, arguments);
  }, {
    "./es6": 235,
    "./helpers/assign": 237,
    "dup": 49
  }],
  237: [function(require, module, exports) {
    arguments[4][27][0].apply(exports, arguments);
  }, {"dup": 27}],
  238: [function(require, module, exports) {
    arguments[4][28][0].apply(exports, arguments);
  }, {"dup": 28}],
  239: [function(require, module, exports) {
    arguments[4][29][0].apply(exports, arguments);
  }, {"dup": 29}],
  240: [function(require, module, exports) {
    arguments[4][30][0].apply(exports, arguments);
  }, {"dup": 30}],
  241: [function(require, module, exports) {
    arguments[4][31][0].apply(exports, arguments);
  }, {"dup": 31}],
  242: [function(require, module, exports) {
    arguments[4][32][0].apply(exports, arguments);
  }, {
    "./helpers/isPrimitive": 244,
    "dup": 32,
    "is-callable": 247
  }],
  243: [function(require, module, exports) {
    arguments[4][33][0].apply(exports, arguments);
  }, {
    "./helpers/isPrimitive": 244,
    "dup": 33,
    "is-callable": 247,
    "is-date-object": 248,
    "is-symbol": 250
  }],
  244: [function(require, module, exports) {
    arguments[4][29][0].apply(exports, arguments);
  }, {"dup": 29}],
  245: [function(require, module, exports) {
    arguments[4][35][0].apply(exports, arguments);
  }, {"dup": 35}],
  246: [function(require, module, exports) {
    arguments[4][36][0].apply(exports, arguments);
  }, {"dup": 36}],
  247: [function(require, module, exports) {
    arguments[4][37][0].apply(exports, arguments);
  }, {"dup": 37}],
  248: [function(require, module, exports) {
    arguments[4][38][0].apply(exports, arguments);
  }, {"dup": 38}],
  249: [function(require, module, exports) {
    arguments[4][39][0].apply(exports, arguments);
  }, {"dup": 39}],
  250: [function(require, module, exports) {
    arguments[4][40][0].apply(exports, arguments);
  }, {"dup": 40}],
  251: [function(require, module, exports) {
    arguments[4][41][0].apply(exports, arguments);
  }, {
    "./isArguments": 252,
    "dup": 41
  }],
  252: [function(require, module, exports) {
    arguments[4][42][0].apply(exports, arguments);
  }, {"dup": 42}],
  253: [function(require, module, exports) {
    'use strict';
    var implementation = require('./implementation');
    module.exports = function getPolyfill() {
      return typeof String.prototype.padStart === 'function' ? String.prototype.padStart : implementation;
    };
  }, {"./implementation": 231}],
  254: [function(require, module, exports) {
    'use strict';
    var getPolyfill = require('./polyfill');
    var define = require('define-properties');
    module.exports = function shimPadStart() {
      var polyfill = getPolyfill();
      define(String.prototype, {padStart: polyfill}, {padStart: function() {
          return String.prototype.padStart !== polyfill;
        }});
      return polyfill;
    };
  }, {
    "./polyfill": 253,
    "define-properties": 233
  }],
  255: [function(require, module, exports) {
    'use strict';
    var bind = require('function-bind');
    var define = require('define-properties');
    var replace = bind.call(Function.call, String.prototype.replace);
    var leftWhitespace = /^[\x09\x0A\x0B\x0C\x0D\x20\xA0\u1680\u180E\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200A\u202F\u205F\u3000\u2028\u2029\uFEFF]*/;
    var trimLeft = function trimLeft() {
      return replace(this, leftWhitespace, '');
    };
    var boundTrimLeft = bind.call(Function.call, trimLeft);
    define(boundTrimLeft, {shim: function shimTrimLeft() {
        var zeroWidthSpace = '\u200b';
        define(String.prototype, {trimLeft: trimLeft}, {trimLeft: function() {
            return zeroWidthSpace.trimLeft() !== zeroWidthSpace;
          }});
        return String.prototype.trimLeft;
      }});
    module.exports = boundTrimLeft;
  }, {
    "define-properties": 256,
    "function-bind": 258
  }],
  256: [function(require, module, exports) {
    arguments[4][24][0].apply(exports, arguments);
  }, {
    "dup": 24,
    "foreach": 257,
    "object-keys": 259
  }],
  257: [function(require, module, exports) {
    arguments[4][35][0].apply(exports, arguments);
  }, {"dup": 35}],
  258: [function(require, module, exports) {
    arguments[4][36][0].apply(exports, arguments);
  }, {"dup": 36}],
  259: [function(require, module, exports) {
    arguments[4][41][0].apply(exports, arguments);
  }, {
    "./isArguments": 260,
    "dup": 41
  }],
  260: [function(require, module, exports) {
    arguments[4][42][0].apply(exports, arguments);
  }, {"dup": 42}],
  261: [function(require, module, exports) {
    'use strict';
    var bind = require('function-bind');
    var define = require('define-properties');
    var replace = bind.call(Function.call, String.prototype.replace);
    var rightWhitespace = /[\x09\x0A\x0B\x0C\x0D\x20\xA0\u1680\u180E\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200A\u202F\u205F\u3000\u2028\u2029\uFEFF]*$/;
    var trimRight = function trimRight() {
      return replace(this, rightWhitespace, '');
    };
    var boundTrimRight = bind.call(Function.call, trimRight);
    define(boundTrimRight, {shim: function shimTrimRight() {
        var zeroWidthSpace = '\u200b';
        define(String.prototype, {trimRight: trimRight}, {trimRight: function() {
            return zeroWidthSpace.trimRight() !== zeroWidthSpace;
          }});
        return String.prototype.trimRight;
      }});
    module.exports = boundTrimRight;
  }, {
    "define-properties": 262,
    "function-bind": 264
  }],
  262: [function(require, module, exports) {
    arguments[4][24][0].apply(exports, arguments);
  }, {
    "dup": 24,
    "foreach": 263,
    "object-keys": 265
  }],
  263: [function(require, module, exports) {
    arguments[4][35][0].apply(exports, arguments);
  }, {"dup": 35}],
  264: [function(require, module, exports) {
    arguments[4][36][0].apply(exports, arguments);
  }, {"dup": 36}],
  265: [function(require, module, exports) {
    arguments[4][41][0].apply(exports, arguments);
  }, {
    "./isArguments": 266,
    "dup": 41
  }],
  266: [function(require, module, exports) {
    arguments[4][42][0].apply(exports, arguments);
  }, {"dup": 42}],
  267: [function(require, module, exports) {
    'use strict';
    module.exports = require('./es7-shim').shim();
  }, {"./es7-shim": 21}]
}, {}, [267]);

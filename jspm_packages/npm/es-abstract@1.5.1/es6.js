/* */ 
'use strict';
var toStr = Object.prototype.toString;
var hasSymbols = typeof Symbol === 'function' && typeof Symbol.iterator === 'symbol';
var symbolToStr = hasSymbols ? Symbol.prototype.toString : toStr;
var $isNaN = require('./helpers/isNaN');
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
    return void 0;
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
      var isRegExp = argument[Symbol.match];
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

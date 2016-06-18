/* */ 
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

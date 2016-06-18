/* */ 
'use strict';
var toStr = Object.prototype.toString;
var isPrimitive = require('./helpers/isPrimitive');
var isCallable = require('is-callable');
var ES5internalSlots = {'[[DefaultValue]]': function(O, hint) {
    var actualHint = hint || (toStr.call(O) === '[object Date]' ? String : Number);
    if (actualHint === String || actualHint === Number) {
      var methods = actualHint === String ? ['toString', 'valueOf'] : ['valueOf', 'toString'];
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
  return ES5internalSlots['[[DefaultValue]]'](input, PreferredType);
};

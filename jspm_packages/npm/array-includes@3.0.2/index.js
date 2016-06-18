/* */ 
'use strict';
var define = require('define-properties');
var ES = require('es-abstract/es6');
var implementation = require('./implementation');
var getPolyfill = require('./polyfill');
var polyfill = getPolyfill();
var shim = require('./shim');
var slice = Array.prototype.slice;
var boundIncludesShim = function includes(array, searchElement) {
  ES.RequireObjectCoercible(array);
  return polyfill.apply(array, slice.call(arguments, 1));
};
define(boundIncludesShim, {
  implementation: implementation,
  getPolyfill: getPolyfill,
  shim: shim
});
module.exports = boundIncludesShim;

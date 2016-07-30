/* */ 
'use strict';
var $$ = require('./utils');
var Namespace = module.exports = function Namespace(options) {
  $$.extend(this, options);
};
Namespace.prototype.isset = function(key) {
  return $$.has(this, key);
};
Namespace.prototype.set = function(key, value) {
  if (typeof(key) === 'object') {
    $$.extend(this, key);
  } else {
    this[key] = value;
  }
  return this;
};
Namespace.prototype.get = function(key, defaultValue) {
  return !this[key] ? defaultValue : this[key];
};
Namespace.prototype.unset = function(key, defaultValue) {
  var value = this[key];
  if (value !== null) {
    delete this[key];
    return value;
  }
  return defaultValue;
};

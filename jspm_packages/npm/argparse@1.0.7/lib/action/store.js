/* */ 
'use strict';
var util = require('util');
var Action = require('../action');
var c = require('../const');
var ActionStore = module.exports = function ActionStore(options) {
  options = options || {};
  if (this.nargs <= 0) {
    throw new Error('nargs for store actions must be > 0; if you ' + 'have nothing to store, actions such as store ' + 'true or store const may be more appropriate');
  }
  if (typeof this.constant !== 'undefined' && this.nargs !== c.OPTIONAL) {
    throw new Error('nargs must be OPTIONAL to supply const');
  }
  Action.call(this, options);
};
util.inherits(ActionStore, Action);
ActionStore.prototype.call = function(parser, namespace, values) {
  namespace.set(this.dest, values);
};

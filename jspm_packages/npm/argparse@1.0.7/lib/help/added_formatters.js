/* */ 
'use strict';
var util = require('util');
var c = require('../const');
var $$ = require('../utils');
var HelpFormatter = require('./formatter');
function ArgumentDefaultsHelpFormatter(options) {
  HelpFormatter.call(this, options);
}
util.inherits(ArgumentDefaultsHelpFormatter, HelpFormatter);
ArgumentDefaultsHelpFormatter.prototype._getHelpString = function(action) {
  var help = action.help;
  if (action.help.indexOf('%(defaultValue)s') === -1) {
    if (action.defaultValue !== c.SUPPRESS) {
      var defaulting_nargs = [c.OPTIONAL, c.ZERO_OR_MORE];
      if (action.isOptional() || (defaulting_nargs.indexOf(action.nargs) >= 0)) {
        help += ' (default: %(defaultValue)s)';
      }
    }
  }
  return help;
};
module.exports.ArgumentDefaultsHelpFormatter = ArgumentDefaultsHelpFormatter;
function RawDescriptionHelpFormatter(options) {
  HelpFormatter.call(this, options);
}
util.inherits(RawDescriptionHelpFormatter, HelpFormatter);
RawDescriptionHelpFormatter.prototype._fillText = function(text, width, indent) {
  var lines = text.split('\n');
  lines = lines.map(function(line) {
    return $$.trimEnd(indent + line);
  });
  return lines.join('\n');
};
module.exports.RawDescriptionHelpFormatter = RawDescriptionHelpFormatter;
function RawTextHelpFormatter(options) {
  RawDescriptionHelpFormatter.call(this, options);
}
util.inherits(RawTextHelpFormatter, RawDescriptionHelpFormatter);
RawTextHelpFormatter.prototype._splitLines = function(text) {
  return text.split('\n');
};
module.exports.RawTextHelpFormatter = RawTextHelpFormatter;

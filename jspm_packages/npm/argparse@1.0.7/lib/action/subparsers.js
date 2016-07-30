/* */ 
'use strict';
var util = require('util');
var format = require('util').format;
var Action = require('../action');
var c = require('../const');
var argumentErrorHelper = require('../argument/error');
function ChoicesPseudoAction(name, help) {
  var options = {
    optionStrings: [],
    dest: name,
    help: help
  };
  Action.call(this, options);
}
util.inherits(ChoicesPseudoAction, Action);
function ActionSubparsers(options) {
  options = options || {};
  options.dest = options.dest || c.SUPPRESS;
  options.nargs = c.PARSER;
  this.debug = (options.debug === true);
  this._progPrefix = options.prog;
  this._parserClass = options.parserClass;
  this._nameParserMap = {};
  this._choicesActions = [];
  options.choices = this._nameParserMap;
  Action.call(this, options);
}
util.inherits(ActionSubparsers, Action);
ActionSubparsers.prototype.addParser = function(name, options) {
  var parser;
  var self = this;
  options = options || {};
  options.debug = (this.debug === true);
  if (!options.prog) {
    options.prog = this._progPrefix + ' ' + name;
  }
  var aliases = options.aliases || [];
  if (!!options.help || typeof options.help === 'string') {
    var help = options.help;
    delete options.help;
    var choiceAction = new ChoicesPseudoAction(name, help);
    this._choicesActions.push(choiceAction);
  }
  parser = new this._parserClass(options);
  this._nameParserMap[name] = parser;
  aliases.forEach(function(alias) {
    self._nameParserMap[alias] = parser;
  });
  return parser;
};
ActionSubparsers.prototype._getSubactions = function() {
  return this._choicesActions;
};
ActionSubparsers.prototype.call = function(parser, namespace, values) {
  var parserName = values[0];
  var argStrings = values.slice(1);
  if (this.dest !== c.SUPPRESS) {
    namespace[this.dest] = parserName;
  }
  if (this._nameParserMap[parserName]) {
    parser = this._nameParserMap[parserName];
  } else {
    throw argumentErrorHelper(format('Unknown parser "%s" (choices: [%s]).', parserName, Object.keys(this._nameParserMap).join(', ')));
  }
  parser.parseArgs(argStrings, namespace);
};
module.exports = ActionSubparsers;

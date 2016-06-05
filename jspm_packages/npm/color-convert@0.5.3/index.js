/* */ 
var conversions = require('./conversions');
var convert = function() {
  return new Converter();
};
for (var func in conversions) {
  convert[func + "Raw"] = (function(func) {
    return function(arg) {
      if (typeof arg == "number")
        arg = Array.prototype.slice.call(arguments);
      return conversions[func](arg);
    };
  })(func);
  var pair = /(\w+)2(\w+)/.exec(func),
      from = pair[1],
      to = pair[2];
  convert[from] = convert[from] || {};
  convert[from][to] = convert[func] = (function(func) {
    return function(arg) {
      if (typeof arg == "number")
        arg = Array.prototype.slice.call(arguments);
      var val = conversions[func](arg);
      if (typeof val == "string" || val === undefined)
        return val;
      for (var i = 0; i < val.length; i++)
        val[i] = Math.round(val[i]);
      return val;
    };
  })(func);
}
var Converter = function() {
  this.convs = {};
};
Converter.prototype.routeSpace = function(space, args) {
  var values = args[0];
  if (values === undefined) {
    return this.getValues(space);
  }
  if (typeof values == "number") {
    values = Array.prototype.slice.call(args);
  }
  return this.setValues(space, values);
};
Converter.prototype.setValues = function(space, values) {
  this.space = space;
  this.convs = {};
  this.convs[space] = values;
  return this;
};
Converter.prototype.getValues = function(space) {
  var vals = this.convs[space];
  if (!vals) {
    var fspace = this.space,
        from = this.convs[fspace];
    vals = convert[fspace][space](from);
    this.convs[space] = vals;
  }
  return vals;
};
["rgb", "hsl", "hsv", "cmyk", "keyword"].forEach(function(space) {
  Converter.prototype[space] = function(vals) {
    return this.routeSpace(space, arguments);
  };
});
module.exports = convert;

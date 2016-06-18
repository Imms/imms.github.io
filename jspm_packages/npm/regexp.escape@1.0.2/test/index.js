/* */ 
'use strict';
var escape = require('../index');
var test = require('tape');
test('as a function', function(t) {
  require('./tests')(escape, t);
  t.end();
});

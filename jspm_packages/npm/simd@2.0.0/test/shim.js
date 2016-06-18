/* */ 
var test = require('tape');
require('./test-shim');
var simd = require('../index');
var getGlobal = require('../getGlobal');
var preserve = require('./preserve');
test('shimmed global', preserve(getGlobal(), 'SIMD', function(t) {
  simd.shim();
  require('./simd')(t.test, SIMD);
  t.end();
}));

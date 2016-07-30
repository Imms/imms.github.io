/**
 * Created by GregRos on 27/05/2016.
 */
"use strict";
var helpers_1 = require('../../helpers');
var TestSuites = (function () {
    function TestSuites() {
    }
    TestSuites.byName = function (arr, name) {
        return arr.find(function (x) { return x.name == name; });
    };
    TestSuites.toSuite = function (data, suite) {
        var arr = data;
        var newSuite = helpers_1.clone(suite);
        newSuite.groups = [];
        for (var _i = 0, _a = suite.groups; _i < _a.length; _i++) {
            var group = _a[_i];
            var newGroup = helpers_1.clone(group);
            newGroup.tests = [];
            var _loop_1 = function(test) {
                var resultsOfTest = arr.filter(function (x) { return x.Test === test.test; }).map(function (x) {
                    var result = {
                        result: x.Time.Fields[0],
                        footnote: "sdf",
                        target: x.Target
                    };
                    return result;
                });
                var newTest = helpers_1.clone(test);
                newTest.results = resultsOfTest;
                newGroup.tests.push(newTest);
            };
            for (var _b = 0, _c = group.tests; _b < _c.length; _b++) {
                var test = _c[_b];
                _loop_1(test);
            }
            newSuite.groups.push(newGroup);
        }
        return newSuite;
    };
    return TestSuites;
}());
exports.TestSuites = TestSuites;
//# sourceMappingURL=types.js.map
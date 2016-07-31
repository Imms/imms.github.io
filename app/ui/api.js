"use strict";
var YAML = require('yamljs');
var $ = require('jquery');
var types_1 = require('./charts/types');
var Api;
(function (Api) {
    var srcArticles = "/data/articles.yaml";
    var srcComplexity = "/data/complexity.yaml";
    var srcTestSuites = "/data/testSuites.yaml";
    var srcApiRefs = "/API/index.json";
    var ix = "027";
    var srcTestData = "/data/Benchmarks/" + ix + ".log.json";
    var _articles;
    var _complexity;
    var _testSuites;
    var _apiRefs;
    var _testData;
    function articles() {
        return _articles || (_articles = $.get(srcArticles)
            .then(function (text) { return YAML.parse(text); }));
    }
    Api.articles = articles;
    function complexity() {
        return _complexity || (_complexity = $.get(srcComplexity)
            .then(function (text) { return YAML.parse(text); }));
    }
    Api.complexity = complexity;
    function apiRefs() {
        return _apiRefs || (_apiRefs = $.get(srcApiRefs));
    }
    Api.apiRefs = apiRefs;
    function testSuite(suite) {
        _testSuites || (_testSuites = $.get(srcTestSuites)
            .then(function (text) { return YAML.parse(text); }));
        _testData || (_testData = $.get(srcTestData).then(function (x) { return x; }));
        return $.when(_testData, _testSuites).then(function (data, suites) { return types_1.Charts.open(data, suites[suite]); });
    }
    Api.testSuite = testSuite;
})(Api = exports.Api || (exports.Api = {}));
//# sourceMappingURL=api.js.map
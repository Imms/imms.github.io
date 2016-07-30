"use strict";
var YAML = require('yamljs');
var $ = require('jquery');
var Api;
(function (Api) {
    var srcArticles = "/data/articles.yaml";
    var srcComplexity = "/data/complexity.yaml";
    var srcTestSuites = "/data/testSuites.yaml";
    function articles() {
        return $.get(srcArticles)
            .then(function (text) { return YAML.parse(text); });
    }
    Api.articles = articles;
    function complexity() {
        return $.get(srcComplexity)
            .then(function (text) { return YAML.parse(text); });
    }
    Api.complexity = complexity;
    function testSuites() {
        return $.get(srcTestSuites)
            .then(function (text) { return YAML.parse(text); });
    }
    Api.testSuites = testSuites;
})(Api = exports.Api || (exports.Api = {}));
//# sourceMappingURL=api.js.map
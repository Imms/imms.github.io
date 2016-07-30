"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator.throw(value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments)).next());
    });
};
var CmChartSuite_1 = require("./CmChartSuite");
var React = require('react');
var ReactDOM = require('react-dom');
var types_1 = require("./types");
/**
 * Created by GregRos on 17/06/2016.
 */
var RnArticleNav = (function () {
    function RnArticleNav(urlSuite, urlData) {
        this.urlSuite = urlSuite;
        this.urlData = urlData;
    }
    RnArticleNav.prototype.render = function () {
        return __awaiter(this, void 0, void 0, function* () {
            var _this = this;
            var pSuite = $.get(this.urlSuite).then(function (text) { return YAML.parse(text); });
            var pData = $.get(this.urlData).then(function (data) { return data; });
            this._suites = yield pSuite;
            this._data = yield pData;
            $(".react-chart-suite").each(function (i, e) {
                var suiteName = e.getAttribute("data-suite");
                var dimensions = e.getBoundingClientRect();
                var populatedSuite = types_1.TestSuites.toSuite(_this._data, _this._suites[suiteName]);
                ReactDOM.render(React.createElement(CmChartSuite_1.CmChartSuite, {suite: populatedSuite, rendering: { height: 300, width: 600 }}), e);
            });
        });
    };
    return RnArticleNav;
}());
var n = "027";
new RnArticleNav("/data/testSuites.yaml", "/data/Benchmarks/" + n + ".log.json").render();
//# sourceMappingURL=RnChartSuite.js.map
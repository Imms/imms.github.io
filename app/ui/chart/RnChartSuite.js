"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator.throw(value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments)).next());
    });
};
const CmChartSuite_1 = require("./CmChartSuite");
const React = require('react');
const ReactDOM = require('react-dom');
const types_1 = require("./types");
/**
 * Created by GregRos on 17/06/2016.
 */
class RnArticleNav {
    constructor(urlSuite, urlData) {
        this.urlSuite = urlSuite;
        this.urlData = urlData;
    }
    render() {
        return __awaiter(this, void 0, void 0, function* () {
            let pSuite = $.get(this.urlSuite).then(text => YAML.parse(text));
            let pData = $.get(this.urlData).then(data => data);
            this._suites = yield pSuite;
            this._data = yield pData;
            $(".react-chart-suite").each((i, e) => {
                let suiteName = e.getAttribute("data-suite");
                let dimensions = e.getBoundingClientRect();
                let populatedSuite = types_1.TestSuites.toSuite(this._data, this._suites[suiteName]);
                ReactDOM.render(React.createElement(CmChartSuite_1.CmChartSuite, {suite: populatedSuite, rendering: { height: 300, width: 600 }}), e);
            });
        });
    }
}
new RnArticleNav("/data/testSuites.yaml", "/data/Benchmarks/013.log.json").render();
//# sourceMappingURL=RnChartSuite.js.map
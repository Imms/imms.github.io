"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var React = require('react');
var CmChart_1 = require('./CmChart');
var CmChartGroup = (function (_super) {
    __extends(CmChartGroup, _super);
    function CmChartGroup(props) {
        _super.call(this, props);
    }
    Object.defineProperty(CmChartGroup.prototype, "chartData", {
        get: function () {
            return this.toSeries();
        },
        enumerable: true,
        configurable: true
    });
    CmChartGroup.prototype.toSeries = function () {
        var group = this.props.group;
        var targets = this.props.targets;
        var testNames = group.tests.map(function (x) { return x.title || x.test; });
        var targetNames = targets.map(function (x) { return x.target; });
        var dataSets = targets.map(function (target, i) {
            var results = group.tests.map(function (test) { return test.results.find(function (r) { return r.target === target.target; }); }).map(function (x) { return x ? x.result.toPrecision(3) : null; });
            var color = target.color;
            var dataSet = {
                data: results,
                label: target.target,
                backgroundColor: color,
                hoverBackgroundColor: color,
                borderColor: "black",
                hoverBorderColor: "black",
                borderWidth: 0,
                hoverBorderWidth: 1
            };
            return dataSet;
        });
        var data = {
            datasets: dataSets,
            labels: testNames
        };
        return data;
    };
    CmChartGroup.prototype.render = function () {
        return React.createElement("div", {className: "cm-chart-group"}, React.createElement("div", {className: "cm-chart-group__header"}, this.props.group.long), React.createElement(CmChart_1.CmChart, {rendering: this.props.rendering, data: this.chartData}));
    };
    return CmChartGroup;
}(React.Component));
exports.CmChartGroup = CmChartGroup;
//# sourceMappingURL=CmChartGroup.js.map
"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var React = require('react');
var CmChartGroup_1 = require('./CmChartGroup');
var ChartSuiteProps = (function () {
    function ChartSuiteProps() {
    }
    return ChartSuiteProps;
}());
var ChartState = (function () {
    function ChartState() {
    }
    return ChartState;
}());
var CmChartSuite = (function (_super) {
    __extends(CmChartSuite, _super);
    function CmChartSuite(props) {
        _super.call(this, props);
        // set initial state
        this.state = { active: this.props.suite.groups[0].group };
    }
    Object.defineProperty(CmChartSuite.prototype, "currentGroup", {
        get: function () {
            var _this = this;
            return this.props.suite.groups.find(function (x) { return x.group == _this.state.active; });
        },
        enumerable: true,
        configurable: true
    });
    CmChartSuite.prototype.onSwitchPage = function (name) {
        if (this.state.active == name) {
            return;
        }
        this.setState(function (x) {
            x.active = name;
            return x;
        });
    };
    CmChartSuite.prototype.render = function () {
        var _this = this;
        var tabs = [];
        var _loop_1 = function(group) {
            var className = "cm-chart-tabs__tab";
            if (group.group == this_1.state.active) {
                className = className + (" " + className + "--active");
            }
            tabs.push(React.createElement("li", {role: "presentation", key: group.group, className: className}, React.createElement("a", {onClick: function (e) { return _this.onSwitchPage(group.group); }}, group.title || group.group)));
        };
        var this_1 = this;
        for (var _i = 0, _a = this.props.suite.groups; _i < _a.length; _i++) {
            var group = _a[_i];
            _loop_1(group);
        }
        var tabList = React.createElement("ul", {className: "tab-list"}, tabs);
        var chartBox = React.createElement(CmChartGroup_1.CmChartGroup, {rendering: this.props.rendering, targets: this.props.suite.targets, group: this.currentGroup});
        var body = React.createElement("div", {className: "cm-chart"}, tabList, React.createElement("div", {className: "cm-chart-inner"}, chartBox, React.createElement("div", {className: "cm-chart__footer"}, this.props.suite.footer)));
        return body;
    };
    return CmChartSuite;
}(React.Component));
exports.CmChartSuite = CmChartSuite;
//# sourceMappingURL=CmChartSuite.js.map
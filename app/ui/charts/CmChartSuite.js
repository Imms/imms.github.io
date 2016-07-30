"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var React = require('react');
var CmChartGroup_1 = require('./CmChartGroup');
var MyComponent_1 = require("../../MyComponent");
var decorators_1 = require('../../react-ext/decorators');
var CmChartSuite = (function (_super) {
    __extends(CmChartSuite, _super);
    function CmChartSuite(props) {
        _super.call(this, props);
        // set initial state
        this.state = { active: "", suite: null };
    }
    Object.defineProperty(CmChartSuite.prototype, "currentGroup", {
        get: function () {
            var _this = this;
            return this.state.suite.groups.find(function (x) { return x.group == _this.state.active; });
        },
        enumerable: true,
        configurable: true
    });
    CmChartSuite.prototype.willReceiveProps = function (props) {
        var _this = this;
        props.suite && props.suite.then(function (suite) { return _this.withState(function (s) { return s.suite = suite; }); });
    };
    CmChartSuite.prototype.onSwitchPage = function (name) {
        if (this.state.active == name) {
            return;
        }
        this.withState(function (s) { return s.active = name; });
    };
    CmChartSuite.prototype.render = function () {
        var _this = this;
        var tabs = [];
        var suite = this.state.suite;
        if (!suite) {
            return null;
        }
        var _loop_1 = function(group) {
            var className = "cm-chart-tabs__tab";
            if (group.group == this_1.state.active) {
                className = className + (" " + className + "--active");
            }
            tabs.push(React.createElement("li", {role: "presentation", key: group.group, className: className}, React.createElement("a", {onClick: function (e) { return _this.onSwitchPage(group.group); }}, group.title || group.group)));
        };
        var this_1 = this;
        for (var _i = 0, _a = this.state.suite.groups; _i < _a.length; _i++) {
            var group = _a[_i];
            _loop_1(group);
        }
        var tabList = React.createElement("ul", {className: "tab-list"}, tabs);
        var chartBox = React.createElement(CmChartGroup_1.CmChartGroup, {rendering: this.props.rendering, targets: suite.targets, group: this.currentGroup});
        var body = React.createElement("div", {className: "cm-chart"}, tabList, React.createElement("div", {className: "cm-chart-inner"}, chartBox, React.createElement("div", {className: "cm-chart__footer"}, this.state.suite.footer)));
        return body;
    };
    __decorate([
        decorators_1.At.willReceiveProps()
    ], CmChartSuite.prototype, "willReceiveProps", null);
    return CmChartSuite;
}(MyComponent_1.MyComponent));
exports.CmChartSuite = CmChartSuite;
//# sourceMappingURL=CmChartSuite.js.map
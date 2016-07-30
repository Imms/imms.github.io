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
var decorators_1 = require('../../react-ext/decorators');
var MyComponent_1 = require("../../MyComponent");
var CmComplexityTable = (function (_super) {
    __extends(CmComplexityTable, _super);
    function CmComplexityTable(props) {
        _super.call(this, props);
        this.state = { table: null };
    }
    CmComplexityTable.prototype.componentWillReceiveProps = function (props) {
        var _this = this;
        if (props.complexities && props.table) {
            props.complexities.then(function (root) {
                _this.withState(function (s) { return s.table = root.tables.find(function (tbl) { return tbl.table == props.table; }); });
            });
        }
    };
    CmComplexityTable.prototype.render = function () {
        var myTable = this.state.table;
        if (!myTable) {
            return null;
        }
        var collections = myTable.collections;
        var operations = myTable.operations;
        var cls = "complexity-table__heading";
        var headingItems = operations.map(function (op) { return React.createElement("th", {key: op.name, className: cls + "-math"}, op.title || op.name); });
        var headings = React.createElement("thead", null, React.createElement("tr", null, React.createElement("th", {className: cls + "-info"}, "Collection"), React.createElement("th", {className: cls + "-info"}, "Implementation"), headingItems));
        var lines = collections.map(function (col) {
            var ops = operations.map(function (op) {
                var tryOp = col.operations.find(function (myOp) { return myOp.operation.name == op.name; });
                var mathString = tryOp ? tryOp.simple : "";
                mathString = mathString ? "$" + mathString + "$" : "—";
                return React.createElement("td", {key: op.name, className: "complexity-table__math"}, mathString);
            });
            return React.createElement("tr", {className: col.rowclass}, React.createElement("td", {className: "complexity-table__info"}, col.collection), React.createElement("td", {className: "complexity-table__info"}, col.implementation), ops);
        });
        var body = React.createElement("tbody", null, lines);
        var footnotes = myTable.footnotes;
        var footnoteItems = 
        //Note that the "$" appear INSIDE the { ... }. Otherwise, react and MathJax don't play well.
        footnotes.map(function (note) { return React.createElement("li", {key: note.name, className: "complexity-table__footnote"}, "$" + note.math + "$", " - ", note.text); });
        var table = React.createElement("div", {className: "complexity-table"}, React.createElement("table", {className: "complexity-table__table"}, headings, body), React.createElement("ul", {className: "complexity-table__footer"}, footnoteItems));
        return table;
    };
    __decorate([
        decorators_1.At.willReceiveProps()
    ], CmComplexityTable.prototype, "componentWillReceiveProps", null);
    return CmComplexityTable;
}(MyComponent_1.MyComponent));
exports.CmComplexityTable = CmComplexityTable;
//# sourceMappingURL=CmComplexityTable.js.map
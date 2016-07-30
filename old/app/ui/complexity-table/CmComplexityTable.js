"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var React = require('react');
require('../../helpers');
var CmComplexityTableProps = (function () {
    function CmComplexityTableProps() {
    }
    return CmComplexityTableProps;
}());
var CmComplexityTable = (function (_super) {
    __extends(CmComplexityTable, _super);
    function CmComplexityTable() {
        _super.apply(this, arguments);
    }
    CmComplexityTable.prototype.render = function () {
        var complexities = this.props.complexities;
        var myTable = this.props.table;
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
    return CmComplexityTable;
}(React.Component));
exports.CmComplexityTable = CmComplexityTable;
//# sourceMappingURL=CmComplexityTable.js.map
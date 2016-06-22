"use strict";
const React = require('react');
require('../../helpers');
class CmComplexityTableProps {
}
class CmComplexityTable extends React.Component {
    render() {
        let complexities = this.props.complexities;
        let myTable = this.props.table;
        let collections = myTable.collections;
        let operations = myTable.operations;
        let cls = "complexity-table__heading";
        let headingItems = operations.map(op => React.createElement("th", {key: op.name, className: cls + "-math"}, op.title || op.name));
        let headings = React.createElement("thead", null, React.createElement("tr", null, React.createElement("th", {className: cls + "-info"}, "Collection"), React.createElement("th", {className: cls + "-info"}, "Implementation"), headingItems));
        let lines = collections.map(col => {
            let ops = operations.map(op => {
                let tryOp = col.operations.find(myOp => myOp.operation.name == op.name);
                let mathString = tryOp ? tryOp.simple : "";
                mathString = mathString ? `$${mathString}$` : "—";
                return React.createElement("td", {key: op.name, className: "complexity-table__math"}, mathString);
            });
            return React.createElement("tr", {className: col.rowclass}, React.createElement("td", {className: "complexity-table__info"}, col.collection), React.createElement("td", {className: "complexity-table__info"}, col.implementation), ops);
        });
        let body = React.createElement("tbody", null, lines);
        let footnotes = myTable.footnotes;
        let footnoteItems = 
        //Note that the "$" appear INSIDE the { ... }. Otherwise, react and MathJax don't play well.
        footnotes.map(note => React.createElement("li", {key: note.name, className: "complexity-table__footnote"}, "$" + note.math + "$", " - ", note.text));
        let table = React.createElement("div", {className: "complexity-table"}, React.createElement("table", {className: "complexity-table__table"}, headings, body), React.createElement("ul", {className: "complexity-table__footer"}, footnoteItems));
        return table;
    }
}
exports.CmComplexityTable = CmComplexityTable;
//# sourceMappingURL=CmComplexityTable.js.map
"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var React = require('react');
var ReactDOM = require('react-dom');
require('es6-shim');
var PgRoot = (function (_super) {
    __extends(PgRoot, _super);
    function PgRoot() {
        _super.apply(this, arguments);
    }
    PgRoot.prototype.render = function () {
        return React.createElement("div", null, "d");
    };
    return PgRoot;
}(React.Component));
ReactDOM.render(React.createElement(PgRoot, null), document.getElementById("react-root"));
//# sourceMappingURL=main.js.map
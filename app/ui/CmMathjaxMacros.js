"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var React = require('react');
var CmMathjaxMacros = (function (_super) {
    __extends(CmMathjaxMacros, _super);
    function CmMathjaxMacros() {
        _super.apply(this, arguments);
    }
    CmMathjaxMacros.prototype.render = function () {
        return React.createElement("div", {class: "mathjax-macros"}, React.createElement("script", {type: "math/tex"}, this.props.children));
    };
    return CmMathjaxMacros;
}(React.Component));
exports.CmMathjaxMacros = CmMathjaxMacros;
//# sourceMappingURL=CmMathjaxMacros.js.map
"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var React = require('react');
var CmArticleEntry = (function (_super) {
    __extends(CmArticleEntry, _super);
    function CmArticleEntry() {
        _super.apply(this, arguments);
    }
    Object.defineProperty(CmArticleEntry.prototype, "article", {
        get: function () {
            return this.props.entry;
        },
        enumerable: true,
        configurable: true
    });
    CmArticleEntry.prototype.render = function () {
        var _this = this;
        var headingClass = "nav-heading nav-heading--depth-" + this.props.nesting + " " + this.props.entry.text_class;
        var containerClass = "nav-container nav-container--depth-" + this.props.nesting;
        var list = null;
        if (this.article.children && this.article.children.length) {
            var children = this.article.children.map(function (child) { return React.createElement(CmArticleEntry, {entry: child, key: child.link, nesting: _this.props.nesting + 1}); });
            containerClass += " imms-nav-item-w-children";
            list = React.createElement("ul", null, children);
        }
        var link = this.article.link ? React.createElement("a", {href: "" + this.article.link}, this.article.text) : React.createElement("span", null, this.article.text);
        var container = React.createElement("li", {className: containerClass}, React.createElement("div", {className: headingClass}, link), list);
        return container;
    };
    return CmArticleEntry;
}(React.Component));
var CmArticleTreeProps = (function () {
    function CmArticleTreeProps() {
    }
    return CmArticleTreeProps;
}());
var CmArticleTree = (function (_super) {
    __extends(CmArticleTree, _super);
    function CmArticleTree() {
        _super.apply(this, arguments);
    }
    CmArticleTree.prototype.render = function () {
        var x = this.props.articles.map(function (node) { return React.createElement(CmArticleEntry, {entry: node, key: node.link, nesting: 0}); });
        return React.createElement("ul", null, x);
    };
    return CmArticleTree;
}(React.Component));
exports.CmArticleTree = CmArticleTree;
//# sourceMappingURL=CmArticleNav.js.map
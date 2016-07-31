"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var React = require('react');
var MyComponent_1 = require("../../MyComponent");
var api_1 = require('../api');
var react_router_1 = require('react-router');
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
        var link = this.article.link ? React.createElement(react_router_1.Link, {to: "" + this.article.link}, this.article.text) : React.createElement("span", null, this.article.text);
        var container = React.createElement("li", {className: containerClass}, React.createElement("div", {className: headingClass}, link), list);
        return container;
    };
    return CmArticleEntry;
}(React.Component));
var CmArticleTree = (function (_super) {
    __extends(CmArticleTree, _super);
    function CmArticleTree(props) {
        var _this = this;
        _super.call(this, props);
        this.state = { articles: null };
        api_1.Api.articles().then(function (articles) {
            _this.withState(function (s) {
                s.articles = articles;
            });
        });
    }
    CmArticleTree.prototype.render = function () {
        if (!this.state.articles) {
            return React.createElement("div", null, "Loading...");
        }
        var x = this.state.articles.map(function (node) { return React.createElement(CmArticleEntry, {entry: node, key: node.link, nesting: 0}); });
        return React.createElement("ul", null, x);
    };
    return CmArticleTree;
}(MyComponent_1.MyComponent));
exports.CmArticleTree = CmArticleTree;
//# sourceMappingURL=CmArticleNav.js.map
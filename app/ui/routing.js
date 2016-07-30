"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var React = require('react');
var react_router_1 = require('react-router');
var links_1 = require('./links');
var CmRoute = (function (_super) {
    __extends(CmRoute, _super);
    function CmRoute() {
        _super.apply(this, arguments);
    }
    return CmRoute;
}(React.Component));
var RtArticle = (function (_super) {
    __extends(RtArticle, _super);
    function RtArticle() {
        _super.apply(this, arguments);
    }
    RtArticle.prototype.render = function () {
        var path = name + ".md";
    };
    return RtArticle;
}(CmRoute));
var App = (function (_super) {
    __extends(App, _super);
    function App(props) {
        _super.call(this, props);
        this.state = { articles: null };
    }
    App.prototype.render = function () {
        if (!this.state.articles) {
            return null;
        }
        return React.createElement(react_router_1.Router, {history: react_router_1.browserHistory}, React.createElement(react_router_1.Route, {path: links_1.Links.article(":name")}));
    };
    return App;
}(React.Component));
exports.App = App;
//# sourceMappingURL=routing.js.map
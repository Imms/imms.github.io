"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var React = require('react');
var react_router_1 = require('react-router');
var $ = require('jquery');
var links_1 = require('./links');
var CmTopLogo_1 = require("./pages/CmTopLogo");
var MyComponent_1 = require("../MyComponent");
var CmRoute = (function (_super) {
    __extends(CmRoute, _super);
    function CmRoute() {
        _super.apply(this, arguments);
    }
    return CmRoute;
}(React.Component));
var RtArticle = (function (_super) {
    __extends(RtArticle, _super);
    function RtArticle(props) {
        _super.call(this, props);
        this.state = { articles: null };
    }
    RtArticle.prototype.render = function () {
        var params = this.props.params;
        var path = links_1.Links.article(params.name) + ".md";
        var content = $.get(path);
        return React.createElement(CmTopLogo_1.PgArticle, {src: path});
    };
    return RtArticle;
}(MyComponent_1.MyComponent));
var App = (function (_super) {
    __extends(App, _super);
    function App(props) {
        _super.call(this, props);
        this.state = { articles: null };
    }
    App.prototype.render = function () {
        return React.createElement(react_router_1.Router, {history: react_router_1.hashHistory}, React.createElement(react_router_1.Route, {path: links_1.Links.article(":name"), component: RtArticle}), React.createElement(react_router_1.Redirect, {from: "/", to: links_1.Links.article("index")}));
    };
    return App;
}(React.Component));
exports.App = App;
//# sourceMappingURL=routing.js.map
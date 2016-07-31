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
var MyComponent_1 = require('../../MyComponent');
var $ = require('jquery');
var decorators_1 = require('../../react-ext/decorators');
var ReactMarkdown = require('react-markdown');
var nameAttr = "data-component";
var propAttrRegex = /data-props-([\w\d]+)/;
var defaultRenderers = ReactMarkdown.renderers;
var apiRefRegex = /^\w:/;
var CmMarkdown = (function (_super) {
    __extends(CmMarkdown, _super);
    function CmMarkdown(props) {
        _super.call(this, props);
        this._nodes = [];
        this.state = { content: null, apiLinkResolver: null, header: null };
        this.downloadUrl(props);
    }
    CmMarkdown.prototype.downloadUrl = function (props) {
        var _this = this;
        props.content.then(function (text) {
            _this.withState(function (s) { return s.content = text; });
        });
        props.apiLinks.then(function (data) { return _this.withState(function (s) { return s.apiLinkResolver = function (s) { return data[s]; }; }); });
    };
    CmMarkdown.prototype.componentWillReceiveProps = function (props) {
        if (this.props.content !== props.content) {
            this.downloadUrl(props);
        }
    };
    CmMarkdown.prototype.renderLink = function (renderProps) {
        var link = renderProps.href;
        if (this.state.apiLinkResolver && apiRefRegex.test(link)) {
            link = this.state.apiLinkResolver(link);
        }
        return React.createElement("a", {href: link, title: renderProps.title});
    };
    CmMarkdown.prototype.renderHtmlBlock = function (renderProps) {
        var props = this.props;
        var html = renderProps.literal;
        var tmpContainer = document.createElement("div");
        tmpContainer.innerHTML = html;
        var e = tmpContainer.children.item(0);
        if (!props.isComponentPlaceholder(e))
            return defaultRenderers.HtmlBlock(renderProps);
        var componentName = e.getAttribute(nameAttr);
        var FoundComponent = props.components[componentName];
        if (!FoundComponent) {
            throw new Error("Component not found.");
        }
        var componentProps = {};
        for (var i = 0, attrs = e.attributes, len = attrs.length; i < len; i++) {
            var attr = attrs.item(i);
            var result = propAttrRegex.exec(attr.name);
            if (result && result.length >= 2) {
                var propName = result[1];
                var propValue = attr.value;
                componentProps[propName] = propValue;
            }
        }
        var componentInstance = FoundComponent(componentProps);
        return componentInstance;
    };
    CmMarkdown.prototype.render = function () {
        var _this = this;
        this._root = null;
        var props = this.props;
        var defaultRenderers = ReactMarkdown.renderers;
        var renderers = {
            HtmlBlock: function (props) { return _this.renderHtmlBlock(props); },
            Link: function (props) { return _this.renderLink(props); }
        };
        var innerHtml = "";
        if (this.state.content) {
            var e = React.createElement("div", {ref: function (e) { return _this._root = e; }}, React.createElement(ReactMarkdown, {source: this.state.content, renderers: renderers}));
            return e;
        }
        return React.createElement("div", null);
    };
    CmMarkdown.defaultProps = {
        isComponentPlaceholder: function (e) {
            return e.tagName === "DIV" && e.hasAttribute(nameAttr);
        },
        content: $.Deferred(function () { return ""; }).promise(),
        components: {},
        apiLinks: $.Deferred(function () { return ({}); }).promise()
    };
    __decorate([
        decorators_1.At.willReceiveProps()
    ], CmMarkdown.prototype, "componentWillReceiveProps", null);
    return CmMarkdown;
}(MyComponent_1.MyComponent));
exports.CmMarkdown = CmMarkdown;
//# sourceMappingURL=CmMarkdown.js.map
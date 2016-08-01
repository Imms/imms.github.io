"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var React = require('react');
var react_router_1 = require('react-router');
var $ = require('jquery');
var links_1 = require('../links');
var YAML = require('yamljs');
var data_1 = require('../data');
var api_1 = require('../api');
var CmArticleNav_1 = require('../navbar/CmArticleNav');
var CmMathjaxMacros_1 = require('../CmMathjaxMacros');
var CmMarkdown_1 = require('../markdown/CmMarkdown');
var CmChartSuite_1 = require('../charts/CmChartSuite');
var CmComplexityTable_1 = require('../complexity-table/CmComplexityTable');
var CmTopLogo = (function (_super) {
    __extends(CmTopLogo, _super);
    function CmTopLogo() {
        _super.apply(this, arguments);
    }
    CmTopLogo.prototype.render = function () {
        return React.createElement("div", {className: "imms-logo"}, React.createElement("img", {src: "/images/Imms%20Tree.png"}));
    };
    return CmTopLogo;
}(React.Component));
var CmMainHeading = (function (_super) {
    __extends(CmMainHeading, _super);
    function CmMainHeading() {
        _super.apply(this, arguments);
    }
    CmMainHeading.prototype.render = function () {
        return React.createElement("div", {className: "main-heading"}, React.createElement(react_router_1.Link, {to: links_1.Links.home}, React.createElement("h1", {className: "library-title"}, "Imms"), React.createElement("div", {className: "b-library-subtitle"}, React.createElement("h2", {className: "library-subtitle__text"}, "Immutable collections for .NET"))));
    };
    return CmMainHeading;
}(React.Component));
var CmFooterMenu = (function (_super) {
    __extends(CmFooterMenu, _super);
    function CmFooterMenu() {
        _super.apply(this, arguments);
    }
    CmFooterMenu.prototype.render = function () {
        return React.createElement("div", {className: "footer-menu"}, React.createElement("ul", null, React.createElement("li", null, React.createElement("a", {href: links_1.Links.External.sources}, "Imms on GitHub")), React.createElement("li", null, React.createElement("a", {href: links_1.Links.External.nuget}, "Imms on NuGet"))));
    };
    return CmFooterMenu;
}(React.Component));
var CmFooter = (function (_super) {
    __extends(CmFooter, _super);
    function CmFooter() {
        _super.apply(this, arguments);
    }
    CmFooter.prototype.render = function () {
        return React.createElement("div", {className: "footer-box container"}, React.createElement("div", {className: "footer-box__menu"}, React.createElement(CmFooterMenu, null)), React.createElement("div", {className: "b-footer-box__author"}, "Imms was created by ", React.createElement("a", {href: links_1.Links.External.gregrosProfile}, "@GregRos"), ", and is released under the MIT license."), React.createElement("div", {className: "b-footer-box__lang"}, "Website in HTML, CSS, and Javascript, using the ", React.createElement("a", {href: links_1.Links.External.webstorm}, "WebStorm"), " IDE." + ' ' + "Sources on ", React.createElement("a", {href: links_1.Links.External.siteSources}, "GitHub"), "."), React.createElement("div", {className: "b-footer-box__techs"}, "Some of the technologies used by this website: ", React.createElement("a", {href: links_1.Links.External.bootstrap}, "Bootstrap"), ",", React.createElement("a", {href: links_1.Links.External.typescript}, "TypeScript"), ",", React.createElement("a", {href: links_1.Links.External.sass}, "Sass/SCSS"), ",", React.createElement("a", {href: links_1.Links.External.react}, "ReactJS"), "."));
    };
    return CmFooter;
}(React.Component));
var CmForkMe = (function (_super) {
    __extends(CmForkMe, _super);
    function CmForkMe() {
        _super.apply(this, arguments);
    }
    CmForkMe.prototype.render = function () {
        return React.createElement("a", {href: links_1.Links.External.sources}, React.createElement("img", {"data-canonical-src": "https://s3.amazonaws.com/github/ribbons/forkme_right_green_007200.png", alt: "Fork me on GitHub", src: "https://camo.githubusercontent.com/e7bbb0521b397edbd5fe43e7f760759336b5e05f/68747470733a2f2f73332e616d617a6f6e6177732e636f6d2f6769746875622f726962626f6e732f666f726b6d655f72696768745f677265656e5f3030373230302e706e67", className: "imms-github-forkme"}));
    };
    return CmForkMe;
}(React.Component));
var CmDownloadBox = (function (_super) {
    __extends(CmDownloadBox, _super);
    function CmDownloadBox() {
        _super.apply(this, arguments);
    }
    CmDownloadBox.prototype.render = function () {
        return React.createElement("div", {className: "download-box"}, React.createElement(react_router_1.Link, {to: links_1.Links.getImms}, React.createElement("div", {className: "download-box__symbol"}), React.createElement("div", {className: "download-box__text"}, "Get Imms"), React.createElement("div", {className: "download-box__version"}, "Version ", data_1.Data.version)));
    };
    return CmDownloadBox;
}(React.Component));
var CmDownloadOptions = (function (_super) {
    __extends(CmDownloadOptions, _super);
    function CmDownloadOptions() {
        _super.apply(this, arguments);
    }
    CmDownloadOptions.prototype.render = function () {
        return React.createElement("div", {className: "down-options"}, React.createElement("div", {className: "down-options__col"}, React.createElement("a", {href: links_1.Links.External.nuget}, React.createElement("div", {className: "down-option down-option--nuget down-option--primary"}, React.createElement("div", {className: "down-option__icon"}, React.createElement("img", {src: "/images/nugetlogo.png"})), React.createElement("h3", {className: "down-option__title"}, "NuGet"), React.createElement("div", {className: "down-option__content"}, "The best way to get the latest version of Imms is through NuGet.")))), React.createElement("div", {className: "down-options__col"}, React.createElement("a", {href: links_1.Links.External.binaries}, React.createElement("div", {className: "down-option down-option--binaries"}, React.createElement("div", {className: "down-option__icon"}, React.createElement("img", {src: "/images/zip.png"})), React.createElement("h3", {className: "down-option__title"}, "Binaries"), React.createElement("div", {className: "down-option__content"}, "You can also download the binaries directly in a zip file.")))), React.createElement("div", {className: "down-options__col"}, React.createElement("a", {href: links_1.Links.External.sources}, React.createElement("div", {className: "down-option down-option--sources"}, React.createElement("div", {className: "down-option__icon"}, React.createElement("img", {src: "/images/GitHub_Logo.png"})), React.createElement("h3", {className: "down-option__title"}, "Sources"), React.createElement("div", {className: "down-option__content"}, "You could even get the sources and include them in your solution directly.")))));
    };
    return CmDownloadOptions;
}(React.Component));
var CmTopNavBar = (function (_super) {
    __extends(CmTopNavBar, _super);
    function CmTopNavBar() {
        _super.apply(this, arguments);
    }
    CmTopNavBar.prototype.render = function () {
        return React.createElement("ul", {className: "top-navbar"}, React.createElement("li", {className: "top-navbar__item"}, React.createElement("h4", null, React.createElement(react_router_1.Link, {href: links_1.Links.whyImmutable}, "Why Immutable?"))), React.createElement("li", {className: "top-navbar__item"}, React.createElement("h4", null, React.createElement(react_router_1.Link, {href: links_1.Links.whyImms}, "Why Imms?"))), React.createElement("li", {className: "top-navbar__item"}, React.createElement("h4", null, React.createElement(react_router_1.Link, {href: links_1.Links.general}, "Documentation"))), React.createElement("li", {className: "top-navbar__item"}, React.createElement("h4", null, React.createElement(react_router_1.Link, {href: links_1.Links.getImms}, "Get Imms"))));
    };
    return CmTopNavBar;
}(React.Component));
var mathjaxDefs = "\n    |newcommand{|amr}{ {^|text{amr}}}\n    |newcommand{|fast}{\u26A1}\n    |newcommand{|fastt}{\u26A1\u26A1}\n    |newcommand{|u}[1]{|underline{ #1}}\n    |newcommand{|o}[1]{|overline{ #1}}\n".replace(/\|/g, "\\");
var components = {
    CmChartSuite: function (props) { return React.createElement(CmChartSuite_1.CmChartSuite, {suite: $.when(api_1.Api.testSuite(props.suite)), rendering: { height: 300, width: 600 }}); },
    CmComplexityTable: function (props) {
        return React.createElement(CmComplexityTable_1.CmComplexityTable, {complexities: api_1.Api.complexity(), table: props.table});
    },
    CmDownloadOptions: function (props) { return React.createElement(CmDownloadOptions, null); }
};
var markdownHeader = /^---$/m;
var PgArticle = (function (_super) {
    __extends(PgArticle, _super);
    function PgArticle() {
        _super.apply(this, arguments);
    }
    PgArticle.prototype.readHeader = function (header) {
        document.title = header.title + " | Imms - Immutable Collections for .NET";
        var descElement = $("head meta[name='description']")[0];
        if (!descElement) {
            $("head").append($("<meta name='description' content='" + header.description + "'/>"));
        }
        else {
            descElement.setAttribute("content", header.description);
        }
        var kwElement = $("head meta[name='keywords']")[0];
        if (!kwElement) {
            $("head").append($("<meta name='keywords' content='" + header.keywords + "'/>"));
        }
        else {
            kwElement.setAttribute("content", header.keywords);
        }
    };
    PgArticle.prototype.render = function () {
        var _this = this;
        var article = $.get(this.props.src).then(function (text) {
            if (text.startsWith("---")) {
                var split = text.split("---", 3);
                var headerText = split[1];
                var header = YAML.parse(headerText.trim());
                var content = split[2];
                _this.readHeader(header);
                return content;
            }
            else {
                return text;
            }
        });
        return React.createElement("div", {className: "imms-root"}, React.createElement(CmMathjaxMacros_1.CmMathjaxMacros, null, mathjaxDefs), React.createElement(CmForkMe, null), React.createElement("div", {className: "title-backdrop"}, React.createElement("div", {className: "title-box"}, React.createElement("div", {className: "title-row"}, React.createElement(CmTopLogo, null), React.createElement(CmMainHeading, null), React.createElement(CmDownloadBox, null)))), React.createElement("div", {className: "central-backdrop"}, React.createElement("div", {className: "central-layout"}, React.createElement("div", {className: "central-nav-column-box"}, React.createElement(CmArticleNav_1.CmArticleTree, null)), React.createElement("div", {className: "central-text"}, React.createElement(CmMarkdown_1.CmMarkdown, {apiLinks: api_1.Api.apiRefs(), content: article, components: components})))), React.createElement("div", {className: "footer-backdrop"}, React.createElement(CmFooter, null)));
    };
    return PgArticle;
}(React.Component));
exports.PgArticle = PgArticle;
//# sourceMappingURL=CmTopLogo.js.map
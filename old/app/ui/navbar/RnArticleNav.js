"use strict";
var CmArticleNav_1 = require("./CmArticleNav");
var React = require('react');
var ReactDOM = require('react-dom');
/**
 * Created by GregRos on 17/06/2016.
 */
var RnArticleNav = (function () {
    function RnArticleNav(navUrl) {
        var _this = this;
        this.navUrl = navUrl;
        $.get(navUrl, function (data) {
            _this._articles = YAML.parse(data);
            _this.render();
        });
    }
    RnArticleNav.prototype.render = function () {
        for (var _i = 0, _a = $(".react-article-tree").toArray(); _i < _a.length; _i++) {
            var dom = _a[_i];
            ReactDOM.render(React.createElement(CmArticleNav_1.CmArticleTree, {articles: this._articles}), dom);
        }
    };
    return RnArticleNav;
}());
new RnArticleNav("/data/articles.yaml");
//# sourceMappingURL=RnArticleNav.js.map
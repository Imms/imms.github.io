"use strict";
const CmArticleNav_1 = require("./CmArticleNav");
const React = require('react');
const ReactDOM = require('react-dom');
/**
 * Created by GregRos on 17/06/2016.
 */
class RnArticleNav {
    constructor(navUrl) {
        this.navUrl = navUrl;
        $.get(navUrl, data => {
            this._articles = YAML.parse(data);
            this.render();
        });
    }
    render() {
        for (let dom of $(".react-article-tree").toArray()) {
            ReactDOM.render(React.createElement(CmArticleNav_1.CmArticleTree, {articles: this._articles}), dom);
        }
    }
}
new RnArticleNav("/data/articles.yaml");
//# sourceMappingURL=RnArticleNav.js.map
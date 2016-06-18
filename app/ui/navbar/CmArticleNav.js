"use strict";
const React = require('react');
class ArticleTreeEntry {
}
exports.ArticleTreeEntry = ArticleTreeEntry;
class CmArticleEntryProps {
}
class CmArticleEntry extends React.Component {
    get article() {
        return this.props.entry;
    }
    render() {
        var headingClass = `nav-heading nav-heading--depth-${this.props.nesting}`;
        var containerClass = `nav-container nav-container--depth-${this.props.nesting}`;
        var list = null;
        if (this.article.children && this.article.children.length) {
            var children = this.article.children.map(child => React.createElement(CmArticleEntry, {entry: child, key: child.link, nesting: this.props.nesting + 1}));
            containerClass += " imms-nav-item-w-children";
            list = React.createElement("ul", null, children);
        }
        var link = this.article.link ? React.createElement("a", {href: `/pages/${this.article.link}`}, this.article.text) : React.createElement("span", null, this.article.text);
        var container = React.createElement("li", {className: containerClass}, React.createElement("div", {className: headingClass}, link), list);
        return container;
    }
}
class CmArticleTreeProps {
}
class CmArticleTree extends React.Component {
    render() {
        let x = this.props.articles.map(node => React.createElement(CmArticleEntry, {entry: node, key: node.link, nesting: 0}));
        return React.createElement("ul", null, x);
    }
}
exports.CmArticleTree = CmArticleTree;
//# sourceMappingURL=CmArticleNav.js.map
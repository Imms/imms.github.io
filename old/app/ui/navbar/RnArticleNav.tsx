import {ArticleTreeEntry, CmArticleTree} from "./CmArticleNav";
import * as React from 'react';
import * as ReactDOM from 'react-dom';
/**
 * Created by GregRos on 17/06/2016.
 */

class RnArticleNav {
	private _articles : ArticleTreeEntry[];
	private _container : JQuery;
	constructor(private navUrl : string) {
		$.get(navUrl, data => {
			this._articles = YAML.parse(data) as ArticleTreeEntry[];
			this.render();
		});
	}

	private render() {
		for (let dom of $(".react-article-tree").toArray()) {
			ReactDOM.render(<CmArticleTree articles={this._articles} />, dom)
		}
	}
}
new RnArticleNav("/data/articles.yaml");


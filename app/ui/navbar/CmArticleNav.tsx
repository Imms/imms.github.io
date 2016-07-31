
import * as React from 'react';
import {MyComponent} from "../../MyComponent";
import {Api} from '../api';
import {Link} from 'react-router';
export interface ArticleTreeEntry {
	text:string;
	link:string;
	text_class?: string;
	children:Array<ArticleTreeEntry>;
}

interface CmArticleEntryProps {
	entry : ArticleTreeEntry;
	nesting : number;
}

class CmArticleEntry extends React.Component<CmArticleEntryProps, {}> {

	get article() {
		return this.props.entry;
	}
	render() {

		var headingClass = `nav-heading nav-heading--depth-${this.props.nesting} ${this.props.entry.text_class}`;
		var containerClass = `nav-container nav-container--depth-${this.props.nesting}`;

		var list = null;
		if (this.article.children && this.article.children.length) {
			var children = this.article.children.map(child => <CmArticleEntry entry={child} key={child.link} nesting={this.props.nesting + 1}/>)
			containerClass += " imms-nav-item-w-children";
			list = <ul>
				{children}
			</ul>
		}

		var link = this.article.link ? <Link to={`${this.article.link}`}>{this.article.text}</Link> : <span>{this.article.text}</span>;

		var container = <li className={containerClass}>
			<div className={headingClass}>
				{link}
			</div>
			{list}
		</li>;
		return container;
	}
}



interface CmArticleTreeState {
	articles : ArticleTreeEntry[];
}

export class CmArticleTree extends MyComponent<{}, CmArticleTreeState> {
	constructor(props) {
		super(props);
		this.state = {articles : null};
		Api.articles().then(articles => {
			this.withState(s => {
				s.articles = articles;
			});
		});
	}

	render() {
		if (!this.state.articles) {
			return <div>Loading...</div>;
		}
		let x = this.state.articles.map((node, n) => <CmArticleEntry entry={node} key={node.link || node.text} nesting={0}/>);
		return <ul>
			{x}
		</ul>  
	}
}
import React = require('react');
import {Route, Router, browserHistory} from 'react-router';
import {ArticleTreeEntry} from './navbar/CmArticleNav';
import {Links} from './links';

interface AppState {
	articles : ArticleTreeEntry[];
}

abstract class CmRoute<TParams> extends React.Component<{params : TParams}, {}> {
	
}

class RtArticle extends CmRoute<{name : string}, {}> {
	render() {
		let path = `${name}.md`;
		
	}
}

export class App extends React.Component<{}, AppState> {

	constructor(props) {
		super(props);
		this.state = {articles: null};
	}

	render() {
		if (!this.state.articles) {
			return null;
		}
		return <Router history={browserHistory}>
			<Route path={Links.article(":name")}  />
		</Router>;
	}
}

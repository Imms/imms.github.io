import React = require('react');
import {Route, Router, browserHistory} from 'react-router';
import {ArticleTreeEntry} from './navbar/CmArticleNav';
import {Links} from './links';
import {PgArticle} from "./pages/CmTopLogo";

interface AppState {
	articles : ArticleTreeEntry[];
}

abstract class CmRoute<TParams> extends React.Component<{params : TParams}, {}> {
	
}

class RtArticle extends CmRoute<{name : string}> {
	render() {
		let params = this.props.params;
		let path = Links.article(params.name) + ".md";
		let content = $.get(path);
		return <PgArticle />;
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

import React = require('react');
import {Route, Router, browserHistory} from 'react-router';
import {ArticleTreeEntry} from './navbar/CmArticleNav';
import {Links} from './links';
import {PgArticle} from "./pages/CmTopLogo";
import {MyComponent} from "../MyComponent";
import {Api} from './api';


abstract class CmRoute<TParams> extends React.Component<{params : TParams}, {}> {
	
}

interface RtArticleProps {
	params : {name : string};

}

class RtArticle extends MyComponent<RtArticleProps, {}> {

	constructor(props : RtArticleProps) {
		super(props);
		this.state = {articles : null};
	}

	render() {
		let params = this.props.params;
		let path = Links.article(params.name) + ".md";
		let content = $.get(path);
		return <PgArticle src={path} />;
	}
}

export class App extends React.Component<{}, {}> {

	constructor(props) {
		super(props);
		this.state = {articles: null};
	}

	render() {
		return <Router history={browserHistory}>
			<Route path={Links.article(":name")} component={RtArticle}  />
		</Router>;
	}
}

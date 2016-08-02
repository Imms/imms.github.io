import React = require('react');
import {Route, Router, Redirect ,browserHistory, hashHistory} from 'react-router';
import {ArticleTreeEntry} from './navbar/CmArticleNav';
import $ = require('jquery');
import {Links} from './links';
import {PgArticle} from "./content/CmTopLogo";
import {MyComponent} from "../MyComponent";
import {At} from '../react-ext/decorators';
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
		let path = Links.article(params.name) + ".markdown";
		let content = $.get(path);
		return <PgArticle src={path} />;
	}
}

interface RtPageProps {
	params : {page : string};
}

class RtPage extends MyComponent<RtPageProps, {content : string}> {

	constructor(props) {
		super(props);
		this.state = {content : ""};
	}

	render() {
		let element = <iframe style={{width: '100%', height: '100%'}} src={`/API/${this.props.params.page}`}></iframe>;
		return element;
	}
}

export class App extends React.Component<{}, {}> {

	constructor(props) {
		super(props);
		this.state = {articles: null};
	}

	render() {
		return <Router history={hashHistory}>
			<Route path={Links.article(":name")} component={RtArticle}  />
			<Redirect from="/" to={Links.article("index")}/>
			<Redirect from="/index" to="/"/>
		</Router>;
	}
}

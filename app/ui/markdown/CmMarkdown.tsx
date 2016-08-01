import React = require('react')
import {MyComponent} from '../../MyComponent';
import $ = require('jquery');
import {At} from '../../react-ext/decorators'
import ReactDOM = require('react-dom');
import YAML = require('yamljs');
import {Link} from "react-router";

let ReactHighlight = require('react-highlight');
let ReactMarkdown = require('react-markdown');

interface CmMarkdownState {
	content : string;
	header : any;
    apiLinkResolver : (link : string) => string;
}

export interface CmMarkdownProps {
	content : JQueryPromise<string>;
    apiLinks : JQueryPromise<any>
	components : {[name : string] : (props : any) => any};
	isComponentPlaceholder ?: (e : Element) => boolean;
}

const nameAttr = "data-component";
const propAttrRegex = /data-props-([\w\d]+)/;
const defaultRenderers = ReactMarkdown.renderers;
const apiRefRegex = /^\w:/;

export class CmMarkdown extends MyComponent<CmMarkdownProps, CmMarkdownState> {
	private  _root : Element;
	private _nodes : Element[] = [];
	static defaultProps : CmMarkdownProps = {
		isComponentPlaceholder : e => {
			return e.tagName === "DIV" && e.hasAttribute(nameAttr);
		},
		content : $.Deferred(() => "").promise(),
		components : {},
        apiLinks : $.Deferred(() => ({} as any)).promise()
	};
	constructor(props : CmMarkdownProps) {
		super(props);
		this.state = { content: null, apiLinkResolver: null, header : null};
		this.downloadUrl(props);
	}

	downloadUrl(props : CmMarkdownProps) {
		props.content.then(text => {
			this.withState(s => s.content = text)
		});
		props.apiLinks.then(data => this.withState(s => s.apiLinkResolver = (s : string) => `/API/html/${data[s]}.htm`))
	}

    @At.willReceiveProps()
	componentWillReceiveProps(props : CmMarkdownProps) {
		if (this.props.content !== props.content) {
			this.downloadUrl(props);
		}
	}

	@At.didMount()
	@At.didUpdate()
	runMathjax() {
		MathJax.Hub.Queue(["Typeset", MathJax.Hub, document]);
	}

    renderLink(renderProps) {
        let link = renderProps.href;
        if (this.state.apiLinkResolver && apiRefRegex.test(link)) {
            link = this.state.apiLinkResolver(link);
        }
        if (link && !link.startsWith("http://") && !link.startsWith("/API")) {
        	return <Link to={link} title={renderProps.title}>{renderProps.children}</Link>;
		}
        return <a href={link} title={renderProps.title}>{renderProps.children}</a>;
    }



	renderHtmlBlock(renderProps) {
		let props = this.props;
		let html:string = renderProps.literal;
		let tmpContainer = document.createElement("div");
		tmpContainer.innerHTML = html;
		let e = tmpContainer.children.item(0);
		if (!props.isComponentPlaceholder(e)) return defaultRenderers.HtmlBlock(renderProps);
		let componentName = e.getAttribute(nameAttr);
		let FoundComponent = props.components[componentName];
		if (!FoundComponent) {
			throw new Error("Component not found.")
		}

		let componentProps = {};
		for (let i = 0, attrs = e.attributes, len = attrs.length; i < len; i++) {
			let attr = attrs.item(i);
			let result = propAttrRegex.exec(attr.name);
			if (result && result.length >= 2) {
				let propName = result[1];
				let propValue = attr.value;
				componentProps[propName] = propValue;
			}
		}
        let componentInstance = FoundComponent(componentProps);
		return componentInstance;
	}

	render() {
		this._root = null;
		let props = this.props;
		let defaultRenderers = ReactMarkdown.renderers;
		let renderers = {
			HtmlBlock : props => this.renderHtmlBlock(props),
            Link : props => this.renderLink(props),
			CodeBlock : props => <ReactHighlight className={props.language}>
				{props.literal}
			</ReactHighlight>
		};
		let innerHtml = "";
		if (this.state.content) {
			let e = <div ref={e => this._root = e}><ReactMarkdown source={this.state.content} renderers={renderers}/></div>;
			return e;
		}
		return <div></div>;
	}
}
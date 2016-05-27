/**
 * Created by GregRos on 20/05/2016.
 */
import {Injectable} from '@angular/core';
///<reference path="../custom-typings/showdown/index.d.ts"/>
///<reference path="../custom-typings/prismjs/index.d.ts"/>
import showdown = require('showdown');
@Injectable()
export class MarkdownRenderer {
	converter = new showdown.Converter();

	parseMarkdown(text : string) {
		return this.converter.makeHtml(text);
	}

	highlight(e : Element) {
		let elements = e.querySelectorAll('code[class*="language-"], [class*="language-"] code, code[class*="lang-"], [class*="lang-"] code');
		for (var i=0, element; element = elements[i++];) {
			Prism.highlightElement(element, false);
		}
	}

	render(markdown : string, target : Element) : void {
		const html = this.parseMarkdown(markdown);
		target.innerHTML = html;
		this.highlight(target);
	}
}

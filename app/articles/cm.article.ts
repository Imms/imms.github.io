/**
 * Created by GregRos on 16/05/2016.
 */
import { Component, Input, ViewChild, ElementRef } from '@angular/core';
import {Http, HTTP_PROVIDERS} from '@angular/http';
import {MarkdownRenderer} from '../Types';

enum PageKind {
	Html,
	Markdown,
	None
}

@Component({
	selector: 'cm-article',
	providers: [HTTP_PROVIDERS, MarkdownRenderer],
	template: `<div class="markdown-container" #markdownContainer [innerHTML]="htmlContent"></div>`,
})

export class CmArticle {
	@Input() public  src : string;
	@ViewChild('markdownContainer') markdownContainer : ElementRef;
	pageKind : PageKind;
	htmlContent : string;

	notFound = "/pages/NotFound.html";

	constructor(private http : Http, private renderer : MarkdownRenderer) {
	}

	determinePageKind() {
		if (!this.src) {
			this.pageKind = PageKind.None;
		}
		else if (this.src.includes(".html")) {
			this.pageKind = PageKind.Html;
		} else if ([".markdown", ".md"].some(x => this.src.includes(x))) {
			this.pageKind = PageKind.Markdown;
		}
	}

	ngOnChanges(record) {
		if (record.src && this.markdownContainer) {
			this.determinePageKind();
			if (this.pageKind == PageKind.None) {
				this.markdownContainer.nativeElement.innerHTML = `The entry wasn't found.`;
				return;
			}
			this.http.get(this.src).subscribe(response => {
				switch (this.pageKind) {
					case PageKind.Html:
						this.markdownContainer.nativeElement.innerHTML = response.text();
						break; 
					case PageKind.Markdown:
						var markdown = response.text();
						this.renderer.render(markdown, this.markdownContainer.nativeElement);
						break;
				}
			}, err => {
				this.markdownContainer.nativeElement.innerHTML =
					`The page wasn't found.`;
			})
		}
	}
}


/**
 * Created by GregRos on 19/05/2016.
 */
import {Component, Input, Inject, forwardRef} from '@angular/core';
import {ROUTER_DIRECTIVES} from '@angular/router';
import {Http} from '@angular/http'
import {ArticleService, ArticleTreeEntry, TreeEntryKind} from './svc.articles';

@Component({
	selector : "article-tree-entry",
	directives :[forwardRef(() => CmNavGroup), ROUTER_DIRECTIVES],

	template : `
<a [routerLink]="articleSource" *ngIf="article.source">
	<div class="nav-heading nav-heading--depth-{{depth}}">{{article.text}}</div>
</a>
<div *ngIf="!article.source" class="nav-heading nav-heading--depth-{{depth}}">{{article.text}}</div>
<article-tree-list [articles]="article.children" [depth]="depth+1"></article-tree-list>`,
})
export class CmNavRow {
	@Input() depth : Number;
	@Input() article : ArticleTreeEntry;

	get articleSource() {
		return this.article.type === "Link" ? this.article.source : this.article.id ? ["/articles", this.article.id] : "";
	}
}

@Component({
	selector : "article-tree-list",
	directives:[CmNavRow],
	template :`
<ul>
	<li *ngFor="let article of articles;" class="nav-container nav-container--depth-{{depth}}">
		<article-tree-entry [depth]="depth" [article]="article"></article-tree-entry>
	</li>
</ul>
	`
})
export class CmNavGroup {
	@Input() articles : Array<ArticleTreeEntry>;
	@Input() depth : Number;
}

@Component({
	selector : "cm-nav",
	directives : [CmNavGroup],
	viewBindings: [ArticleService],
	template: `
<div class="central-nav-column">
	<article-tree-list [depth]="0" [articles]="articles"></article-tree-list>
</div>`
})
export class CmNav {
	articles : Array<ArticleTreeEntry>;

	constructor(private svcArticles : ArticleService) {
		svcArticles.root.then(article => {
			if (!this.articles) {
				this.articles = article.children;
			}
		});
	}
}

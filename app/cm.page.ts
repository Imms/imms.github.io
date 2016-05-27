/**
 * Created by GregRos on 20/05/2016.
 */
import {Routes, ROUTER_DIRECTIVES, Router, ROUTER_PROVIDERS} from '@angular/router';
import { Component, Input, ViewChild, ElementRef } from '@angular/core';
import {OnActivate, RouteSegment} from '@angular/router';
import {CmFooter} from './cm.footer';
import {CmArticle} from './articles/cm.article';
import {CmTitle} from './cm.title';
import {CmNav} from './cm.nav';
import {CmForkme} from './cm.forkme';
import {SvcImms} from './svc.imms';
import {ArticleService, Articles} from "./svc.articles";

@Routes([
	{path: '/jojo', component: CmFooter},
])
@Component({
	selector:'cm-page',
	directives: [CmFooter, CmArticle, CmTitle, CmNav, CmForkme, ROUTER_DIRECTIVES],
	providers: [SvcImms, ArticleService, ROUTER_PROVIDERS],
	viewBindings: [ArticleService],
	templateUrl:'app/cm.page.html'
})
export class CmPage implements OnActivate {
	@Input() articleId : string;
	article : string;
	constructor(private articles : ArticleService) {
		
	}

	ngOnChanges(record) {
		if (record.articleId) {
			this.setPageById();
		}
	}

	setPageById() {
		this.articles.root.then(o => {
			var sdfsdf = 4;
			var myArticle = Articles.byId(o, this.articleId);
			var t = myArticle.type;
			switch (t) {
				case "Content":
					this.article = myArticle.source;
					break;
				case "Link":
					document.location.replace(myArticle.source);
					break;
			}
		});
	}

	routerOnActivate(curr : RouteSegment) {
		this.articleId = curr.getParam('id');
		this.setPageById();
	}
}


/**
 * Created by GregRos on 15/05/2016.
 */
import { Component } from '@angular/core';
import {Routes, ROUTER_DIRECTIVES, Router, ROUTER_PROVIDERS} from '@angular/router';
import { CmForkme } from './cm.forkme';
import { CmArticle } from './articles/cm.article.ts';
import {CmNav} from './cm.nav';
import {CmPage} from './cm.page'
@Component({
    selector: 'my-app',
	directives:[CmPage, ROUTER_DIRECTIVES],
	providers: [ROUTER_PROVIDERS],
	template: `<router-outlet></router-outlet>`
})
@Routes([
	{path: '/articles/...', component: CmPage},
])
export class CmApp {
	private _home = ["/articles", "Home"];
	constructor(private router : Router) {

	}
	ngOnInit() {
		this.router.navigate(this._home);
	}
}


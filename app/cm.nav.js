"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
/**
 * Created by GregRos on 19/05/2016.
 */
const core_1 = require('@angular/core');
const router_1 = require('@angular/router');
const svc_articles_1 = require('./svc.articles');
let CmNavRow = class CmNavRow {
    get articleSource() {
        return this.article.type === "Link" ? this.article.source : this.article.id ? ["/articles", this.article.id] : "";
    }
};
__decorate([
    core_1.Input(), 
    __metadata('design:type', Number)
], CmNavRow.prototype, "depth", void 0);
__decorate([
    core_1.Input(), 
    __metadata('design:type', svc_articles_1.ArticleTreeEntry)
], CmNavRow.prototype, "article", void 0);
CmNavRow = __decorate([
    core_1.Component({
        selector: "article-tree-entry",
        directives: [core_1.forwardRef(() => CmNavGroup), router_1.ROUTER_DIRECTIVES],
        template: `
<a [routerLink]="articleSource" *ngIf="article.source">
	<div class="nav-heading nav-heading--depth-{{depth}}">{{article.text}}</div>
</a>
<div *ngIf="!article.source" class="nav-heading nav-heading--depth-{{depth}}">{{article.text}}</div>
<article-tree-list [articles]="article.children" [depth]="depth+1"></article-tree-list>`,
    }), 
    __metadata('design:paramtypes', [])
], CmNavRow);
exports.CmNavRow = CmNavRow;
let CmNavGroup = class CmNavGroup {
};
__decorate([
    core_1.Input(), 
    __metadata('design:type', Array)
], CmNavGroup.prototype, "articles", void 0);
__decorate([
    core_1.Input(), 
    __metadata('design:type', Number)
], CmNavGroup.prototype, "depth", void 0);
CmNavGroup = __decorate([
    core_1.Component({
        selector: "article-tree-list",
        directives: [CmNavRow],
        template: `
<ul>
	<li *ngFor="let article of articles;" class="nav-container nav-container--depth-{{depth}}">
		<article-tree-entry [depth]="depth" [article]="article"></article-tree-entry>
	</li>
</ul>
	`
    }), 
    __metadata('design:paramtypes', [])
], CmNavGroup);
exports.CmNavGroup = CmNavGroup;
let CmNav = class CmNav {
    constructor(svcArticles) {
        this.svcArticles = svcArticles;
        svcArticles.root.then(article => {
            if (!this.articles) {
                this.articles = article.children;
            }
        });
    }
};
CmNav = __decorate([
    core_1.Component({
        selector: "cm-nav",
        directives: [CmNavGroup],
        viewBindings: [svc_articles_1.ArticleService],
        template: `
<div class="central-nav-column">
	<article-tree-list [depth]="0" [articles]="articles"></article-tree-list>
</div>`
    }), 
    __metadata('design:paramtypes', [svc_articles_1.ArticleService])
], CmNav);
exports.CmNav = CmNav;
//# sourceMappingURL=cm.nav.js.map
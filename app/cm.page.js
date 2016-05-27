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
 * Created by GregRos on 20/05/2016.
 */
const router_1 = require('@angular/router');
const core_1 = require('@angular/core');
const cm_footer_1 = require('./cm.footer');
const cm_article_1 = require('./articles/cm.article');
const cm_title_1 = require('./cm.title');
const cm_nav_1 = require('./cm.nav');
const cm_forkme_1 = require('./cm.forkme');
const svc_imms_1 = require('./svc.imms');
const svc_articles_1 = require("./svc.articles");
let CmPage = class CmPage {
    constructor(articles) {
        this.articles = articles;
    }
    ngOnChanges(record) {
        if (record.articleId) {
            this.setPageById();
        }
    }
    setPageById() {
        this.articles.root.then(o => {
            var sdfsdf = 4;
            var myArticle = svc_articles_1.Articles.byId(o, this.articleId);
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
    routerOnActivate(curr) {
        this.articleId = curr.getParam('id');
        this.setPageById();
    }
};
__decorate([
    core_1.Input(), 
    __metadata('design:type', String)
], CmPage.prototype, "articleId", void 0);
CmPage = __decorate([
    router_1.Routes([
        { path: '/jojo', component: cm_footer_1.CmFooter },
    ]),
    core_1.Component({
        selector: 'cm-page',
        directives: [cm_footer_1.CmFooter, cm_article_1.CmArticle, cm_title_1.CmTitle, cm_nav_1.CmNav, cm_forkme_1.CmForkme, router_1.ROUTER_DIRECTIVES],
        providers: [svc_imms_1.SvcImms, svc_articles_1.ArticleService, router_1.ROUTER_PROVIDERS],
        viewBindings: [svc_articles_1.ArticleService],
        templateUrl: 'app/cm.page.html'
    }), 
    __metadata('design:paramtypes', [svc_articles_1.ArticleService])
], CmPage);
exports.CmPage = CmPage;
//# sourceMappingURL=cm.page.js.map
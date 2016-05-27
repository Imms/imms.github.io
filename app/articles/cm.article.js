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
 * Created by GregRos on 16/05/2016.
 */
const core_1 = require('@angular/core');
const http_1 = require('@angular/http');
const Types_1 = require('../Types');
var PageKind;
(function (PageKind) {
    PageKind[PageKind["Html"] = 0] = "Html";
    PageKind[PageKind["Markdown"] = 1] = "Markdown";
    PageKind[PageKind["None"] = 2] = "None";
})(PageKind || (PageKind = {}));
let CmArticle = class CmArticle {
    constructor(http, renderer) {
        this.http = http;
        this.renderer = renderer;
        this.notFound = "/pages/NotFound.html";
    }
    determinePageKind() {
        if (!this.src) {
            this.pageKind = PageKind.None;
        }
        else if (this.src.includes(".html")) {
            this.pageKind = PageKind.Html;
        }
        else if ([".markdown", ".md"].some(x => this.src.includes(x))) {
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
            });
        }
    }
};
__decorate([
    core_1.Input(), 
    __metadata('design:type', String)
], CmArticle.prototype, "src", void 0);
__decorate([
    core_1.ViewChild('markdownContainer'), 
    __metadata('design:type', core_1.ElementRef)
], CmArticle.prototype, "markdownContainer", void 0);
CmArticle = __decorate([
    core_1.Component({
        selector: 'cm-article',
        providers: [http_1.HTTP_PROVIDERS, Types_1.MarkdownRenderer],
        template: `<div class="markdown-container" #markdownContainer [innerHTML]="htmlContent"></div>`,
    }), 
    __metadata('design:paramtypes', [http_1.Http, Types_1.MarkdownRenderer])
], CmArticle);
exports.CmArticle = CmArticle;
//# sourceMappingURL=cm.article.js.map
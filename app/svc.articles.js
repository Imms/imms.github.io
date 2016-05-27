/**
 * Created by GregRos on 22/05/2016.
 */
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
const core_1 = require('@angular/core');
const http_1 = require('@angular/http');
require('rxjs/Rx');
(function (TreeEntryKind) {
    TreeEntryKind[TreeEntryKind["Link"] = 0] = "Link";
    TreeEntryKind[TreeEntryKind["Content"] = 1] = "Content";
})(exports.TreeEntryKind || (exports.TreeEntryKind = {}));
var TreeEntryKind = exports.TreeEntryKind;
class Articles {
    static *flatten(parent) {
        yield parent;
        if (!parent.children)
            return;
        for (let entry of parent.children) {
            yield* Articles.flatten(entry);
        }
    }
    static byId(parent, id) {
        var arr = Array.from(Articles.flatten(parent));
        var item = arr.find(entry => entry.id === id);
        return item;
    }
}
exports.Articles = Articles;
class ArticleTreeEntry {
}
exports.ArticleTreeEntry = ArticleTreeEntry;
let ArticleService = class ArticleService {
    constructor(http) {
        this.http = http;
        this.src = "/data/contentIndex.yml";
        this.root = this.http
            .get(this.src)
            .map(x => YAML.parse(x.text()))
            .toPromise();
    }
};
ArticleService = __decorate([
    core_1.Injectable(), 
    __metadata('design:paramtypes', [http_1.Http])
], ArticleService);
exports.ArticleService = ArticleService;
//# sourceMappingURL=svc.articles.js.map
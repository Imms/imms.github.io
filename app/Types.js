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
const core_1 = require('@angular/core');
///<reference path="../custom-typings/showdown/index.d.ts"/>
///<reference path="../custom-typings/prismjs/index.d.ts"/>
const showdown = require('showdown');
let MarkdownRenderer = class MarkdownRenderer {
    constructor() {
        this.converter = new showdown.Converter();
    }
    parseMarkdown(text) {
        return this.converter.makeHtml(text);
    }
    highlight(e) {
        let elements = e.querySelectorAll('code[class*="language-"], [class*="language-"] code, code[class*="lang-"], [class*="lang-"] code');
        for (var i = 0, element; element = elements[i++];) {
            Prism.highlightElement(element, false);
        }
    }
    render(markdown, target) {
        const html = this.parseMarkdown(markdown);
        target.innerHTML = html;
        this.highlight(target);
    }
};
MarkdownRenderer = __decorate([
    core_1.Injectable(), 
    __metadata('design:paramtypes', [])
], MarkdownRenderer);
exports.MarkdownRenderer = MarkdownRenderer;
//# sourceMappingURL=Types.js.map
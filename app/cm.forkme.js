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
 * Created by GregRos on 15/05/2016.
 */
const core_1 = require('@angular/core');
const svc_imms_1 = require("./svc.imms");
let CmForkme = class CmForkme {
    constructor(service) {
        this.service = service;
    }
};
CmForkme = __decorate([
    core_1.Component({
        selector: "cm-forkme",
        providers: [svc_imms_1.SvcImms],
        template: `
<a href="{{ service.links.library.sources }}">
<img class="imms-github-forkme"
     src="https://camo.githubusercontent.com/e7bbb0521b397edbd5fe43e7f760759336b5e05f/68747470733a2f2f73332e616d617a6f6e6177732e636f6d2f6769746875622f726962626f6e732f666f726b6d655f72696768745f677265656e5f3030373230302e706e67" alt="Fork me on GitHub" data-canonical-src="https://s3.amazonaws.com/github/ribbons/forkme_right_green_007200.png"/>
</a>`
    }), 
    __metadata('design:paramtypes', [svc_imms_1.SvcImms])
], CmForkme);
exports.CmForkme = CmForkme;
//# sourceMappingURL=cm.forkme.js.map
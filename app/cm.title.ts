/**
 * Created by GregRos on 20/05/2016.
 */

import {Component} from '@angular/core';
import {SvcImms} from "./svc.imms";
import {ROUTER_DIRECTIVES} from '@angular/router';

@Component({
	selector: "cm-title",
	templateUrl:'/app/cm.title.html',
	directives: [ROUTER_DIRECTIVES]
})
export class CmTitle {
	constructor(private imms : SvcImms) {
		
	}
}
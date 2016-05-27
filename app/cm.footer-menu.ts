/**
 * Created by GregRos on 20/05/2016.
 */

import {Component} from '@angular/core';
import {SvcImms} from "./svc.imms";

@Component({
	selector: 'cm-footer-menu',
	templateUrl: '/app/cm.footer-menu.html'
})
export class CmFooterMenu {
	get links() {
		return this.imms.links;
	}
	constructor(private imms : SvcImms) {

	}
}
/**
 * Created by GregRos on 20/05/2016.
 */

import {Component} from '@angular/core';
import {SvcImms} from "./svc.imms";
import {CmFooterMenu} from './cm.footer-menu';
@Component({
	selector: 'cm-footer',
	directives: [CmFooterMenu],
	templateUrl: '/app/cm.footer.html'
})
export class CmFooter {
	get links() {
		return this.imms.links;
	}
	constructor(private imms : SvcImms) {

	}
}
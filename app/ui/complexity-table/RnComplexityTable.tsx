import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {CmComplexityTable} from './CmComplexityTable';
import {ComplexityRoot} from "./types";
import {assert} from 'chai';

/**
 * Created by GregRos on 17/06/2016.
 */

class RnComplexityTable {
	private _complexities : ComplexityRoot;

	constructor(private urlData : string) {

	}

	async render() {
		this._complexities = await $.get(this.urlData).then(x => YAML.parse(x) as ComplexityRoot);
		$(".react-complexity-table").each((i,e) => {
			let tableName = e.getAttribute("data-table");
			let myTable = this._complexities.tables.find(t => t.table == tableName);
			assert.isObject(myTable);
			assert.isObject(this._complexities);
			ReactDOM.render(<CmComplexityTable complexities={this._complexities} table={myTable}/>, e);
		});
		if (typeof MathJax != "undefined") {
			MathJax.Hub.Typeset(document, null);
		}
	}
}

new RnComplexityTable("/data/complexity.yaml").render();
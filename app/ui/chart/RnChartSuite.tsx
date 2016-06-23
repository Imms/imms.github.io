import {CmChartSuite} from "./CmChartSuite";
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {TestSuite, TestSuites, TestSuiteCollection} from "./types";
/**
 * Created by GregRos on 17/06/2016.
 */

class RnArticleNav {
	private _suites : TestSuiteCollection;
	private _data : any[];

	constructor(private urlSuite : string, private urlData : string) {

	}
	
	async render() {
		let pSuite = $.get(this.urlSuite).then(text => YAML.parse(text) as TestSuiteCollection);
		let pData = $.get(this.urlData).then(data => data as any[]);
		this._suites = await pSuite;
		this._data = await pData;
		$(".react-chart-suite").each((i,e) => {
			let suiteName = e.getAttribute("data-suite");
			let dimensions = e.getBoundingClientRect();
			let populatedSuite = TestSuites.toSuite(this._data, this._suites[suiteName]);
			ReactDOM.render(<CmChartSuite suite={populatedSuite} rendering={{height: 300, width: 600}} />, e);
		})
	}
}

let n = "027";
new RnArticleNav("/data/testSuites.yaml", `/data/Benchmarks/${n}.log.json`).render();
/**
 * Created by GregRos on 27/05/2016.
 */

/**
 * Created by GregRos on 29/07/2016.
 */
import _ = require('lodash');

export interface TestResult {
	target:string;
	result:number;
	footnote?:string;
}

export interface Test {
	test:string;
	title ?: string;
	results ?:TestResult[];
	long?:string;
}

export interface TestGroup {
	group:string;
	title ?:string;
	tests:Test[];
	long?:string;
}

export interface TestTarget {
	target:string;
	text ?:string;
	color ?:string;
}

export interface TestSuite {
	targets:TestTarget[];
	groups:TestGroup[];
	long ?:string;
	suite:string;
	footer ?: string;
}

export interface TestSuiteCollection {
	[name : string] : TestSuite;
}
interface _TimeEntry {
	Case:string;
	Fields:number[];
}

interface _TestEntry {
	Test:string;
	Target:string;
	Time:_TimeEntry
}
export module Charts {
	export function open(data:any[], suite:TestSuite):TestSuite
	{
		const arr = data as _TestEntry[];

		const newSuite:TestSuite = _.cloneDeep(suite);
		newSuite.groups = [];
		for (let group of suite.groups) {
			const newGroup = _.cloneDeep(group);
			newGroup.tests = []
			for (let test of group.tests) {
				const resultsOfTest = arr.filter(x => x.Test === test.test).map(x => {
					const result:TestResult = {
						result: x.Time.Fields[0],
						footnote: "sdf",
						target: x.Target
					};
					return result;
				});
				const newTest:Test = _.cloneDeep(test);
				newTest.results = resultsOfTest;
				newGroup.tests.push(newTest);
			}
			newSuite.groups.push(newGroup);
		}
		return newSuite;
	}
}
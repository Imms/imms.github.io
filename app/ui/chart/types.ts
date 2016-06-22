/**
 * Created by GregRos on 27/05/2016.
 */

import { clone} from '../../helpers';

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

export class TestSuites {
	static byName(arr:{name:string}[], name:string) {
		return arr.find(x => x.name == name);
	}

	static toSuite(data:any[], suite:TestSuite):TestSuite {
		const arr = data as _TestEntry[];

		const newSuite:TestSuite = clone(suite);
		newSuite.groups = [];
		for (let group of suite.groups) {
			const newGroup = clone(group);
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
				const newTest:Test = clone(test);
				newTest.results = resultsOfTest;
				newGroup.tests.push(newTest);
			}
			newSuite.groups.push(newGroup);
		}
		return newSuite;
	}
}
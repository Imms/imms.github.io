/**
 * Created by GregRos on 27/05/2016.
 */

import {_Map, Requests, _Arr} from './helpers';



export interface TestResult {
	target : string;
	result : number;
	footnote? : string;
}

export interface Test {
	test : string;
	results ? : TestResult[];
	long? : string;
}

export interface TestGroup {
	group : string;
	title ?: string;
	tests : Test[];
	long? : string;
}

export interface TestTarget {
	target : string;
	text ?: string;
	color ?: string;
}

export interface TestSuite  {
	targets : TestTarget[];
	groups : TestGroup[];
	long ?: string;
	suite : string;
}

interface _TimeEntry {
	Case : string;
	Fields : number[];
}

interface _TestEntry {
	Test : string;
	Target : string;
	Time : _TimeEntry
}



export class TestSuites {

	static byName(arr : {name : string}[], name : string) {
		return arr.find(x => x.name == name);
	}

	static loadSuite(url : string, suite : TestSuite) : Promise<TestSuite>  {
		return Requests.requestJSON(url).then(data => {
			const arr = <_TestEntry[]>data;
			const newSuite : TestSuite = {
				suite : suite.suite,
				targets : suite.targets,
				groups : []
			};
			for (let group of suite.groups) {
				const newGroup : TestGroup = {
					group : group.group,
					tests : []
				};
				for (let test of group.tests) {
					const resultsOfTest = arr.filter(x => x.Test === test.test).map(x => {
						const result:TestResult = {
							result: x.Time.Fields[0],
							footnote : "sdf",
							target : x.Target
						};
						return result;
					});
					const newTest : Test = {
						results : resultsOfTest,
						test : test.test
					};
					newGroup.tests.push(newTest);
				}
				newSuite.groups.push(newGroup);
			}
			return newSuite;
		});
	}

	static loadSuite1() {
		let promisedSuite = Requests.request("/data/testSuites.yaml").then(YAML.parse).then(x => x.sequentials);
		return promisedSuite.then(suite => {
			return TestSuites.loadSuite("/data/exampleBenchmarkData.json", suite);
		});
		
	}
}
/**
 * Created by GregRos on 27/05/2016.
 */

import {_Map, Requests, _Arr} from './helpers';



export interface TestResult {
	name : string;
	result : number;
	footnote? : string;
}

export interface Test {
	name : string;
	results ? : TestResult[];
	text? : string;
}

export interface TestGroup {
	name : string;
	tests : Test[];
	description? : string;
}

export interface TestTarget {
	name : string;
	text ?: string;
	color ?: string;
}

export interface TestSuite  {
	targets : TestTarget[];
	groups : TestGroup[];
	name : string
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
				name : suite.name,
				targets : suite.targets,
				groups : []
			};
			for (let group of suite.groups) {
				const newGroup : TestGroup = {
					name : group.name,
					tests : []
				};
				for (let test of group.tests) {
					const resultsOfTest = arr.filter(x => x.Test === test.name).map(x => {
						const result:TestResult = {
							result: x.Time.Fields[0],
							footnote : "sdf",
							name : x.Target
						};
						return result;
					});
					const newTest : Test = {
						results : resultsOfTest,
						name : test.name
					};
					newGroup.tests.push(newTest);
				}
				newSuite.groups.push(newGroup);
			}
			return newSuite;
		});
	}

	static loadSuite1() {
		return TestSuites.loadSuite("/data/exampleBenchmarkData.json", {
			targets : [
				{name : 'System.ImmutableList'},
				{name : 'ImmList'},
				{name : 'ImmVector'}
			],
			name: "sequence",
			groups: [{
				name: "AddRemoveSingle",
				tests: [
					{name: "AddLast"},
					{name: "AddFirst"},
					{name: "RemoveLast"},
					{name: "RemoveFirst"}
				]}, {
				name : "AddRemoveMany",
				tests : [
					{name : "AddLastRange"},
					{name : "AddFirstRange"},
					{name : "Skip"},
					{name : "Take"}
				]}, {
				name : "Indexing",
				tests : [
					{name : "Lookup" },
					{name : "Update"},
					{name : "Insert"},
					{name : "InsertRange"},
					{name : "Remove"}
				]}
			]
		});
	}
}
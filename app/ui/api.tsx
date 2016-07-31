import {ArticleTreeEntry} from "./navbar/CmArticleNav";
import YAML = require('yamljs');
import $ = require('jquery');
import {Charts} from './charts/types';
import {ComplexityRoot} from "./complexity-table/CmComplexityTable";
import {TestSuite, TestSuiteCollection} from "./charts/types";
export module Api {
	const srcArticles = "/data/articles.yaml";
	const srcComplexity = "/data/complexity.yaml";
	const srcTestSuites = "/data/testSuites.yaml";
	const srcApiRefs = "/API/index.json";
	const ix = "027";
	const srcTestData = `/data/Benchmarks/${ix}.log.json`;
	let _articles : JQueryPromise<ArticleTreeEntry[]>;
	let _complexity : JQueryPromise<ComplexityRoot>;
	let _testSuites : JQueryPromise<TestSuiteCollection>;
	let _apiRefs : JQueryPromise<any>;
	let _testData : JQueryPromise<any[]>;

	export function articles() : JQueryPromise<ArticleTreeEntry[]> {
		return _articles || (_articles = $.get(srcArticles)
			.then(text => YAML.parse(text) as ArticleTreeEntry[]));
	}
	
	export function complexity() : JQueryPromise<ComplexityRoot> {
		return _complexity || (_complexity = $.get(srcComplexity)
			.then(text => YAML.parse(text) as ComplexityRoot));
	}

	export function apiRefs() : JQueryPromise<any> {
		return _apiRefs || (_apiRefs = $.get(srcApiRefs));
	}

	export function testSuite(suite : string) : JQueryPromise<TestSuite> {
		_testSuites || (_testSuites = $.get(srcTestSuites)
				.then(text => YAML.parse(text) as TestSuiteCollection));
		_testData || (_testData = $.get(srcTestData).then(x => x as any[]));

		return $.when(_testData as any, _testSuites as any).then((data, suites) => Charts.open(data, suites[suite]));
	}
}
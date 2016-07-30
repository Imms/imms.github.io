import {ArticleTreeEntry} from "./navbar/CmArticleNav";
import YAML = require('yamljs');
import $ = require('jquery');
import {ComplexityRoot} from "./complexity-table/CmComplexityTable";
import {TestSuite, TestSuiteCollection} from "./charts/types";
export module Api {
	const srcArticles = "/data/articles.yaml";
	const srcComplexity = "/data/complexity.yaml";
	const srcTestSuites = "/data/testSuites.yaml";
	export function articles() : JQueryPromise<ArticleTreeEntry[]> {
		return $.get(srcArticles)
			.then(text => YAML.parse(text) as ArticleTreeEntry[])
	}
	
	export function complexity() : JQueryPromise<ComplexityRoot> {
		return $.get(srcComplexity)
			.then(text => YAML.parse(text) as ComplexityRoot);
	}
	
	export function testSuites() : JQueryPromise<TestSuiteCollection> {
		return $.get(srcTestSuites)
			.then(text => YAML.parse(text) as TestSuiteCollection);
	}
}
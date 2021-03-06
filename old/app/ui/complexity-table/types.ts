/**
 * Created by GregRos on 17/06/2016.
 */

export interface Op {
	name : string;
	description ?: string;
	title ?: string;
}

export interface OpImplementation {
	operation: Op;
	simple : string;
	advanced ?: string;
}

export interface Collection {
	collection : string;
	implementation : string;
	rowclass : string;
	operations : OpImplementation[];
}

export interface Footnote {
	name : string;
	math : string;
	text : string;
}

export interface ComplexityRoot {
	operations : Op[];
	collections: Collection[];
	tables : TableDef[];
	footnotes : Footnote[];
	
}

export interface TableDef {
	table : string;
	collections : Collection[];
	operations : Op[];
	footnotes: Footnote[];
}
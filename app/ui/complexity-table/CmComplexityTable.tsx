import * as React from 'react';
import * as ReactDOM from 'react-dom';

import { At} from '../../react-ext/decorators';
import {MyComponent} from "../../MyComponent";
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

interface CmComplexityTableProps {
	complexities:Promise<ComplexityRoot>;
	table : string;
}

interface CmComplexityTableState {
	table : TableDef;
}

export class CmComplexityTable extends MyComponent<CmComplexityTableProps, CmComplexityTableState> {

	constructor(props : CmComplexityTableProps) {
		super(props);
		this.state = {table : null};
	}

	private loadComplex(props : CmComplexityTableProps) {
		if (props.complexities && props.table) {
			props.complexities.then(root => {
				this.withState(s => s.table = root.tables.find(tbl => tbl.table == props.table));
			})
		}
	}

	@At.willReceiveProps()
	private componentWillReceiveProps(props : CmComplexityTableProps) {
		this.loadComplex(props);
	}
	@At.willMount()
	private componentWillMount() {
		this.loadComplex(this.props);
	}

	render() {
		let myTable = this.state.table;
		if (!myTable) {
			return null;
		}
		let collections:Collection[] = myTable.collections;
		let operations:Op[] = myTable.operations;
		let cls = "complexity-table__heading";
		let headingItems = operations.map(op => <th key={op.name} className={cls + "-math"}>{op.title || op.name}</th>);

		let headings = <thead>
		<tr>
			<th className={cls + "-info"}>Collection</th>
			<th className={cls + "-info"}>Implementation</th>
			{headingItems}
		</tr>
		</thead>;

		let lines =
			collections.map(col => {
				let ops = operations.map(op => {
					let tryOp = col.operations.find(myOp => myOp.operation.name == op.name);
					let mathString = tryOp ? tryOp.simple : "";
					mathString = mathString ? `$${mathString}$` : "—";
					return <td key={op.name} className="complexity-table__math">{mathString}</td>;
				});
				return <tr className={col.rowclass}>
					<td className="complexity-table__info">{col.collection}</td>
					<td className="complexity-table__info">{col.implementation}</td>
					{ops}
				</tr>;
			});

		let body = <tbody>
		{lines}
		</tbody>;

		let footnotes =
			myTable.footnotes;

		let footnoteItems =
			//Note that the "$" appear INSIDE the { ... }. Otherwise, react and MathJax don't play well.
			footnotes.map(note => <li key={note.name} className="complexity-table__footnote">{"$" + note.math + "$"} - {note.text}</li>);

		let table = <div className="complexity-table">
			<table className="complexity-table__table">
				{headings}
				{body}
			</table>
			<ul className="complexity-table__footer">
				{footnoteItems}
			</ul>
		</div>;


		return table;
	}
}





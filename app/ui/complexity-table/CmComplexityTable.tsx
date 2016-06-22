import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {ComplexityRoot, TableDef, Collection, Op} from "./types";
import '../../helpers';


class CmComplexityTableProps {
	complexities:ComplexityRoot;
	table:TableDef;
}

export class CmComplexityTable extends React.Component<CmComplexityTableProps, {}> {

	render() {
		let complexities = this.props.complexities;
		let myTable = this.props.table;
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





import {TestSuite, TestGroup, TestTarget} from '../chartEntry';
import * as React from 'react';
import {_Arr, _Map, Num} from '../helpers';
import {CmChart, ChartRenderingOptions} from './cm-chart';



class ChartGroupProps {
	targets : TestTarget[];
	group : TestGroup;
	rendering : ChartRenderingOptions;
}

export class CmChartGroup extends React.Component<ChartGroupProps, void> {

	constructor(props : ChartGroupProps){
		super(props);
	}

	get chartData() {
		return this.toSeries();
	}

	toSeries(){
		let group = this.props.group;
		let targets = this.props.targets;
		let testNames = group.tests.map(x => x.name);
		let targetNames = targets.map(x => x.name);
		let dataSets =
			targets.map((target : TestTarget, i : number) => {
				let results = group.tests.map(test => test.results.find(r => r.name === target.name)).map(x => x ? Num.sigFigs(x.result, 3) : null);
				results = _Arr.sparse(results);
				let color =  this.props.rendering.palette[i];
				let dataSet : any  = {
					data : results,
					label: target.name,
					backgroundColor : color,
					hoverBackgroundColor : color,
					borderColor : "black",
					hoverBorderColor : "black",
					borderWidth: 0,
					hoverBorderWidth: 1
				};
				return dataSet;
			});
		let data : LinearChartData = {
			datasets : dataSets,
			labels : testNames
		};
		return data;
}

	render() {
		return <div className="cm-chart-group">
			<div className="cm-chart-group__header">{this.props.group.description}</div>
				<CmChart rendering={this.props.rendering} data={this.chartData}/>
				<div className="cm-chart-group__footer">
					(Lower is better)
				</div>
			</div>
	}


}
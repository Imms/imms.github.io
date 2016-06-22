import {TestSuite, TestGroup, TestTarget} from './types';
import * as React from 'react';
import {Num} from '../../helpers';
import {CmChart, ChartRendering} from './CmChart';



class ChartGroupProps {
	targets : TestTarget[];
	group : TestGroup;
	rendering : ChartRendering;
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
		let testNames = group.tests.map(x => x.title || x.test);
		let targetNames = targets.map(x => x.target);
		let dataSets =
			targets.map((target : TestTarget, i : number) => {
				let results = group.tests.map(test => test.results.find(r => r.target === target.target)).map(x => x ? Num.sigFigs(x.result, 3) : null);
				let color =  target.color;
				let dataSet : any  = {
					data : results,
					label: target.target,
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
			<div className="cm-chart-group__header">{this.props.group.long}</div>
				<CmChart rendering={this.props.rendering} data={this.chartData}/>
			</div>
	}


}

import {TestSuite, TestGroup} from '../chartEntry';
import * as React from 'react';
import { _Arr, _Map } from '../helpers';
import {SyntheticEvent} from 'react';
declare function require(x);

var Chart = require('chart');

class ChartInit {
	suite : TestSuite;
	options : BarChartOptions;
}

class ChartState {
	chartData : string;
}


export class CmChart extends React.Component<ChartInit,  ChartState> {

	private _chartSets : Map<string, LinearChartData>;
	private _chartCanvas : HTMLCanvasElement;
	private _chart : any;
	constructor(props : ChartInit){
		super(props);
		// set initial state
		this.state = {chartData : this.chartSets.keys().next().value};
	}


	get chartSets() {
		if (!this._chartSets) {
			this._chartSets = _Map.ofIterable(CmChart.testGroupToSeries(this.props.suite), x => x.title, x => x.chartData);
		}
		return this._chartSets;
	}

	static * testGroupToSeries(suite : TestSuite){
		for (let group of suite.groups) {
			let testNames = group.tests.map(x => x.name);
			let targetNames = suite.targets.map(x => x.name);
			let dataSets =
				suite.targets.map(target => {
					let results = group.tests.map(test => test.results.find(r => r.name === target.name)).map(x => x ? x.result : 0);
					let dataSet  =  {
						data : results,
						label: target.name,
					} as ChartDataSet;
					return dataSet;
				});
			let data : LinearChartData = {
				datasets : dataSets,
				labels : testNames
			};
			yield  {
				title : group.name,
				chartData : data
			};
		}
	}

	onSwitchPage(name : string) {
		this.setState(x => {
			x.chartData = name;
			return x;
		});
	}

	renderChart() {
		this._chart && this._chart.destroy();
		this._chart = new Chart(this._chartCanvas.getContext("2d"), {
			type: 'bar',
			data : this._chartSets.get(this.state.chartData)
		});
	}

	componentDidMount() {
		this.renderChart();
	}

	componentDidUpdate() {
		this.renderChart();
	}

	render() {
		let tabs = [];
		let isFirst = true;
		for (let group of this.props.suite.groups) {
			let className = "cm-chart-tabs__tab";
			tabs.push(
				<li role="presentation" className={className} data-group-name={group.name} onClick={e =>this.onSwitchPage(group.name)}>{group.name}</li>
			);
		}

		let tabList = <ul className="tab-list">
			{tabs}
			</ul>;

		let componentBody = <div className="cm-chart">
				<div className="cm-chart__header">{this.props.suite.name}</div>
			<div className="cm-chart__tab-strip">{tabList}</div>
			<div className="chart-box">
				<canvas height="100" width="600" ref={c => this._chartCanvas = c}/>
			</div>
			</div>;
		
		return componentBody;
	}
}
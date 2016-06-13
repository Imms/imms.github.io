
import {TestSuite, TestGroup} from '../chartEntry';
import * as React from 'react';
import { _Arr, _Map } from '../helpers';
import {CmChart, ChartRenderingOptions} from './cm-chart';
import {CmChartGroup} from './cm-chart-group';
declare function require(x);


class ChartInit {
	suite : TestSuite;
	rendering : ChartRenderingOptions;
}

class ChartState {
	active : string;
}

export class CmChartSuite extends React.Component<ChartInit,  ChartState> {

	constructor(props : ChartInit){
		super(props);
		// set initial state
		this.state = {active : this.props.suite.groups[0].name};
	}

	get currentGroup() {
		return this.props.suite.groups.find(x => x.name == this.state.active);
	}

	onSwitchPage(name : string) {
		if (this.state.active == name) {
			return;
		}
		this.setState(x => {
			x.active = name;
			return x;
		});
	}

	render() {
		let tabs = [];

		for (let group of this.props.suite.groups) {
			let className = "cm-chart-tabs__tab";
			if (group.name == this.state.active) {
				className = className + ` ${className}--active`;
			}
			tabs.push(
				<li role="presentation" className={className}><a onClick={e =>this.onSwitchPage(group.name)}>{group.name}</a></li>
			);
		}

		let tabList = <ul className="tab-list">
			{tabs}
			</ul>;

		let chartBox = <CmChartGroup rendering={this.props.rendering} targets={this.props.suite.targets} group={this.currentGroup}/>;
		let body = <div className="cm-chart">
			{tabList}
			{chartBox}


			</div>;

		return body;
	}
}
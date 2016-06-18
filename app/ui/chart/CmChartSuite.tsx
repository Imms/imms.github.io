import {TestSuite, TestGroup} from './types';
import * as React from 'react';
import {CmChart, ChartRendering} from './CmChart';
import {CmChartGroup} from './CmChartGroup';
declare function require(x);


class ChartSuiteProps {
	suite:TestSuite;
	rendering:ChartRendering;
}

class ChartState {
	active:string;
}

export class CmChartSuite extends React.Component<ChartSuiteProps,  ChartState> {

	constructor(props:ChartSuiteProps) {
		super(props);
		// set initial state
		this.state = {active: this.props.suite.groups[0].group};
	}

	get currentGroup() {
		return this.props.suite.groups.find(x => x.group == this.state.active);
	}

	onSwitchPage(name:string) {
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
			if (group.group == this.state.active) {
				className = className + ` ${className}--active`;
			}
			tabs.push(
				<li role="presentation" key={group.group} className={className}><a
					onClick={e =>this.onSwitchPage(group.group)}>{group.title || group.group}</a></li>
			);
		}

		let tabList = <ul className="tab-list">
			{tabs}
		</ul>;

		let chartBox = <CmChartGroup rendering={this.props.rendering} targets={this.props.suite.targets}
									 group={this.currentGroup}/>;
		let body = <div className="cm-chart">

				{tabList}
			<div className="cm-chart-inner">
				{chartBox}
				<div className="cm-chart__footer">
					{this.props.suite.footer}
				</div>
			</div>
		</div>;

		return body;
	}
}
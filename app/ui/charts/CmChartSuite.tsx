import {TestSuite, TestGroup} from './types';
import * as React from 'react';
import {CmChart, ChartRendering} from './CmChart';
import {CmChartGroup} from './CmChartGroup';
import {MyComponent} from "../../MyComponent";
import {At} from '../../react-ext/decorators';

interface CmChartSuiteProps {
	suite:Promise<TestSuite>;
	rendering:ChartRendering;
}

interface CmChartSuiteState {
	active:string;
	suite : TestSuite;
}

export class CmChartSuite extends MyComponent<CmChartSuiteProps,  CmChartSuiteState> {

	constructor(props:CmChartSuiteProps) {
		super(props);
		// set initial state
		this.state = { active: "", suite: null};
	}

	get currentGroup() {
		return this.state.suite.groups.find(x => x.group == this.state.active);
	}

	@At.willReceiveProps()
	private willReceiveProps(props : CmChartSuiteProps) {
        props.suite && props.suite.then(suite => this.withState(s => s.suite = suite));
	}

	onSwitchPage(name:string) {
		if (this.state.active == name) {
			return;
		}
		this.withState(s => s.active = name);
	}

	render() {
		let tabs = [];
        let suite = this.state.suite;
		if (!suite) {
			return null;
		}
		for (let group of this.state.suite.groups) {
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

		let chartBox = <CmChartGroup rendering={this.props.rendering} targets={suite.targets}
									 group={this.currentGroup}/>;
		let body = <div className="cm-chart">

				{tabList}
			<div className="cm-chart-inner">
				{chartBox}
				<div className="cm-chart__footer">
					{this.state.suite.footer}
				</div>
			</div>
		</div>;

		return body;
	}
}
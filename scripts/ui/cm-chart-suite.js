"use strict";
const React = require('react');
const cm_chart_group_1 = require('./cm-chart-group');
class ChartInit {
}
class ChartState {
}
class CmChartSuite extends React.Component {
    constructor(props) {
        super(props);
        // set initial state
        this.state = { active: this.props.suite.groups[0].group };
    }
    get currentGroup() {
        return this.props.suite.groups.find(x => x.group == this.state.active);
    }
    onSwitchPage(name) {
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
            tabs.push(React.createElement("li", {role: "presentation", className: className}, React.createElement("a", {onClick: e => this.onSwitchPage(group.group)}, group.title || group.group)));
        }
        let tabList = React.createElement("ul", {className: "tab-list"}, tabs);
        let chartBox = React.createElement(cm_chart_group_1.CmChartGroup, {rendering: this.props.rendering, targets: this.props.suite.targets, group: this.currentGroup});
        let body = React.createElement("div", {className: "cm-chart"}, tabList, chartBox);
        return body;
    }
}
exports.CmChartSuite = CmChartSuite;
//# sourceMappingURL=cm-chart-suite.js.map
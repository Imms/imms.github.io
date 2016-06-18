"use strict";
const React = require('react');
const CmChartGroup_1 = require('./CmChartGroup');
class ChartSuiteProps {
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
            tabs.push(React.createElement("li", {role: "presentation", key: group.group, className: className}, React.createElement("a", {onClick: e => this.onSwitchPage(group.group)}, group.title || group.group)));
        }
        let tabList = React.createElement("ul", {className: "tab-list"}, tabs);
        let chartBox = React.createElement(CmChartGroup_1.CmChartGroup, {rendering: this.props.rendering, targets: this.props.suite.targets, group: this.currentGroup});
        let body = React.createElement("div", {className: "cm-chart"}, tabList, React.createElement("div", {className: "cm-chart-inner"}, chartBox, React.createElement("div", {className: "cm-chart__footer"}, this.props.suite.footer)));
        return body;
    }
}
exports.CmChartSuite = CmChartSuite;
//# sourceMappingURL=CmChartSuite.js.map
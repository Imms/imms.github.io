"use strict";
const React = require('react');
const helpers_1 = require('../helpers');
var Chart = require('chart');
class ChartInit {
}
class ChartState {
}
class CmChart extends React.Component {
    constructor(props) {
        super(props);
        // set initial state
        this.state = { chartData: this.chartSets.keys().next().value };
    }
    get chartSets() {
        if (!this._chartSets) {
            this._chartSets = helpers_1._Map.ofIterable(CmChart.testGroupToSeries(this.props.suite), x => x.title, x => x.chartData);
        }
        return this._chartSets;
    }
    static *testGroupToSeries(suite) {
        for (let group of suite.groups) {
            let testNames = group.tests.map(x => x.name);
            let targetNames = suite.targets.map(x => x.name);
            let dataSets = suite.targets.map(target => {
                let results = group.tests.map(test => test.results.find(r => r.name === target.name)).map(x => x ? x.result : 0);
                let dataSet = {
                    data: results,
                    label: target.name,
                };
                return dataSet;
            });
            let data = {
                datasets: dataSets,
                labels: testNames
            };
            yield {
                title: group.name,
                chartData: data
            };
        }
    }
    onSwitchPage(name) {
        this.setState(x => {
            x.chartData = name;
            return x;
        });
    }
    renderChart() {
        this._chart && this._chart.destroy();
        this._chart = new Chart(this._chartCanvas.getContext("2d"), {
            type: 'bar',
            data: this._chartSets.get(this.state.chartData)
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
            tabs.push(React.createElement("li", {role: "presentation", className: className, "data-group-name": group.name, onClick: e => this.onSwitchPage(group.name)}, group.name));
        }
        let tabList = React.createElement("ul", {className: "tab-list"}, tabs);
        let componentBody = React.createElement("div", {className: "cm-chart"}, React.createElement("div", {className: "cm-chart__header"}, this.props.suite.name), React.createElement("div", {className: "cm-chart__tab-strip"}, tabList), React.createElement("div", {className: "chart-box"}, React.createElement("canvas", {height: "100", width: "600", ref: c => this._chartCanvas = c})));
        return componentBody;
    }
}
exports.CmChart = CmChart;
//# sourceMappingURL=chart-suite.js.map
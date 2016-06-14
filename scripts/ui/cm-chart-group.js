"use strict";
const React = require('react');
const helpers_1 = require('../helpers');
const cm_chart_1 = require('./cm-chart');
class ChartGroupProps {
}
class CmChartGroup extends React.Component {
    constructor(props) {
        super(props);
    }
    get chartData() {
        return this.toSeries();
    }
    toSeries() {
        let group = this.props.group;
        let targets = this.props.targets;
        let testNames = group.tests.map(x => x.test);
        let targetNames = targets.map(x => x.target);
        let dataSets = targets.map((target, i) => {
            let results = group.tests.map(test => test.results.find(r => r.target === target.target)).map(x => x ? helpers_1.Num.sigFigs(x.result, 3) : null);
            results = helpers_1._Arr.sparse(results);
            let color = target.color;
            let dataSet = {
                data: results,
                label: target.target,
                backgroundColor: color,
                hoverBackgroundColor: color,
                borderColor: "black",
                hoverBorderColor: "black",
                borderWidth: 0,
                hoverBorderWidth: 1
            };
            return dataSet;
        });
        let data = {
            datasets: dataSets,
            labels: testNames
        };
        return data;
    }
    render() {
        return React.createElement("div", {className: "cm-chart-group"}, React.createElement("div", {className: "cm-chart-group__header"}, this.props.group.long), React.createElement(cm_chart_1.CmChart, {rendering: this.props.rendering, data: this.chartData}), React.createElement("div", {className: "cm-chart-group__footer"}, "(Lower is better)"));
    }
}
exports.CmChartGroup = CmChartGroup;
//# sourceMappingURL=cm-chart-group.js.map
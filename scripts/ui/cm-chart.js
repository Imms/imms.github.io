"use strict";
const React = require('react');
var Chart = require('chart');
class ChartRenderingOptions {
}
exports.ChartRenderingOptions = ChartRenderingOptions;
class ChartInit {
}
class CmChart extends React.Component {
    componentDidMount() {
        this.renderChart();
    }
    componentDidUpdate() {
        this.renderChart();
    }
    renderChart() {
        this._chart && this._chart.destroy();
        this._chart = new Chart(this._chartCanvas.getContext("2d"), {
            type: 'bar',
            data: this.props.data,
            options: {
                hover: {
                    mode: "label"
                },
                tooltips: {
                    mode: "label"
                },
                scales: {
                    xAxes: [{
                            scaleLabel: {
                                labelString: "Test",
                                display: true
                            }
                        }],
                    yAxes: [{
                            scaleLabel: {
                                labelString: "Time (ms)",
                                display: true
                            },
                            ticks: {
                                min: 0
                            }
                        }]
                }
            }
        });
    }
    render() {
        let componentBody = React.createElement("div", {className: "chart-box"}, React.createElement("canvas", {height: this.props.rendering.height, width: this.props.rendering.width, ref: c => this._chartCanvas = c}));
        return componentBody;
    }
}
exports.CmChart = CmChart;
//# sourceMappingURL=cm-chart.js.map
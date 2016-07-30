"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var React = require('react');
var Chart = require('chart');
var ChartRendering = (function () {
    function ChartRendering() {
    }
    return ChartRendering;
}());
exports.ChartRendering = ChartRendering;
var CmChartProps = (function () {
    function CmChartProps() {
    }
    return CmChartProps;
}());
var CmChart = (function (_super) {
    __extends(CmChart, _super);
    function CmChart() {
        _super.apply(this, arguments);
    }
    CmChart.prototype.componentDidMount = function () {
        this.renderChart();
    };
    CmChart.prototype.componentDidUpdate = function () {
        this.renderChart();
    };
    CmChart.prototype.renderChart = function () {
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
    };
    CmChart.prototype.render = function () {
        var _this = this;
        var componentBody = React.createElement("div", {className: "chart-box"}, React.createElement("canvas", {height: this.props.rendering.height, width: this.props.rendering.width, ref: function (c) { return _this._chartCanvas = c; }}));
        return componentBody;
    };
    return CmChart;
}(React.Component));
exports.CmChart = CmChart;
//# sourceMappingURL=CmChart.js.map
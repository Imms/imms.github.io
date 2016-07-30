"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var React = require('react');
var decorators_1 = require('../../react-ext/decorators');
var Chart = require('chart');
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
        if (!this.props.data) {
            this._chart = null;
            return;
        }
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
    __decorate([
        decorators_1.At.didMount()
    ], CmChart.prototype, "componentDidMount", null);
    __decorate([
        decorators_1.At.didUpdate()
    ], CmChart.prototype, "componentDidUpdate", null);
    return CmChart;
}(React.Component));
exports.CmChart = CmChart;
//# sourceMappingURL=CmChart.js.map
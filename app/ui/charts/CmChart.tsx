import {TestSuite} from "./types";
import * as React from 'react';
import {At} from '../../react-ext/decorators';
var Chart = require('chart');

export interface ChartRendering {
	width : number;
	height : number;
}

interface CmChartProps {
	rendering : ChartRendering;
	data : LinearChartData;
}

export class CmChart extends React.Component<CmChartProps, {}> {
	private _chart : any;
	private _chartCanvas : HTMLCanvasElement;

	@At.didMount()
	componentDidMount() {
		this.renderChart();
	}
	@At.didUpdate()
	componentDidUpdate() {
		this.renderChart();
	}

	renderChart() {
		this._chart && this._chart.destroy();
		if (!this.props.data) {
			this._chart = null;
			return;
		}
		this._chart = new Chart(this._chartCanvas.getContext("2d"), {
			type: 'bar',
			data : this.props.data,
			options : {
				hover : {
					mode : "label"
				},
				tooltips: {
					mode : "label"
				},
				scales : {
					xAxes : [{
						scaleLabel : {
							labelString : "Test",
							display : true
						}

					}],
					yAxes : [{
						scaleLabel : {
							labelString : "Time (ms)",
							display : true
						},
						ticks : {
							min : 0
						}
					}]
				}
			}
		});
	}

	render() {
		let componentBody = <div className="chart-box">
				<canvas height={this.props.rendering.height} width={this.props.rendering.width} ref={c => this._chartCanvas = c}/>
			</div>;

		return componentBody;
	}
}
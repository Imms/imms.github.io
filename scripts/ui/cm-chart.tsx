import {TestSuite} from "../chartEntry";
import * as React from 'react';
declare function require(x);

var Chart = require('chart');

export class ChartRenderingOptions {
	options : BarChartOptions;
	width : number;
	height : number;
	palette : string[];
}

class ChartInit {
	rendering : ChartRenderingOptions;
	data : LinearChartData;
}

export class CmChart extends React.Component<ChartInit, void> {
	private _chart : any;
	private _chartCanvas : HTMLCanvasElement;

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
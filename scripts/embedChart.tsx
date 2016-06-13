import {CmChartSuite} from './ui/cm-chart-suite';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {TestSuites} from "./chartEntry";


TestSuites.loadSuite1().then(suite => {
	var element = document.getElementById("blah");
	let options = {
		hover : {
			mode : "label"
		}
	} as ChartOptions;
	let palette = ["rgb(243, 139, 139)", "#5b67ff", "#2935d0"];
	element && ReactDOM.render(<CmChartSuite suite={suite} rendering={{height: 300, width: 600, options: options, palette : palette}}/>, element);
});






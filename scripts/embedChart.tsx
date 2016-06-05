import {CmChart} from './ui/chart-suite';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {TestSuites} from "./chartEntry";


TestSuites.loadSuite1().then(suite => {
	var element = document.getElementById("blah");
	element && ReactDOM.render(<CmChart suite={suite} options={{}}/>, element);
});






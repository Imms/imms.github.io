"use strict";
const chart_suite_1 = require('./ui/chart-suite');
const React = require('react');
const ReactDOM = require('react-dom');
const chartEntry_1 = require("./chartEntry");
chartEntry_1.TestSuites.loadSuite1().then(suite => {
    var element = document.getElementById("blah");
    element && ReactDOM.render(React.createElement(chart_suite_1.CmChart, {suite: suite, options: {}}), element);
});
//# sourceMappingURL=embedChart.js.map
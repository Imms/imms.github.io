"use strict";
const cm_chart_suite_1 = require('./ui/cm-chart-suite');
const React = require('react');
const ReactDOM = require('react-dom');
const chartEntry_1 = require("./chartEntry");
chartEntry_1.TestSuites.loadSuite1().then(suite => {
    var element = document.getElementById("blah");
    let options = {
        hover: {
            mode: "label"
        }
    };
    let palette = ["rgb(243, 139, 139)", "#5b67ff", "#2935d0"];
    element && ReactDOM.render(React.createElement(cm_chart_suite_1.CmChartSuite, {suite: suite, rendering: { height: 300, width: 600, options: options, palette: palette }}), element);
});
//# sourceMappingURL=embedChart.js.map
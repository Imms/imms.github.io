import React = require('react');
import ReactDOM = require('react-dom');
import 'es6-shim';
class PgRoot extends React.Component<{}, {}> {
	render() {
		return <div>d</div>;
	}
}

ReactDOM.render(<PgRoot/>, document.getElementById("react-root"));

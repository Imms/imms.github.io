import React = require('react');
import _ = require('lodash');
export class MyComponent<P, S> extends React.Component<P, S> {
	withState(act : (stateCopy : S) => void) {
		this.setState(s => {
			let cloned = _.cloneDeep(s);
			act(s);
			return cloned;
		});
	}
}
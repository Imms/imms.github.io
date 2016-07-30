
export module At {
    /**
     @example
     function componentWillReceiveProps(nextProps : Props) : void

     @description Invoked when a component is receiving new props. This method is not called for the initial render.

     Use this as an opportunity to react to a prop transition before render() is called by updating the state using this.setState(). The old props can be accessed via this.props. Calling this.setState() within this function will not trigger an additional render.
     */
    export function willReceiveProps() {
        return function (target : any, property : string) {
            target.componentWillReceiveProps = target[property];
        };
    }

    /**
     @example
     function componentDidMount() : void

     @description Invoked once, only on the client (not on the server), immediately after the initial rendering occurs. At this point in the lifecycle, you can access any refs to your children (e.g., to access the underlying DOM representation). The componentDidMount() method of child components is invoked before that of parent components.
 
     If you want to integrate with other JavaScript frameworks, set timers using setTimeout or setInterval, or send AJAX requests, perform those operations in this method.
     */
    export function didMount() {
        return function (target : any, property : string) {
            target.componentDidMount = target[property];
        };
    }

    /**
     @example
     function componentWillMount() : void

     @description Invoked once, both on the client and server, immediately before the initial rendering occurs. If you call setState within this method, render() will see the updated state and will be executed only once despite the state change.
     */
    export function willMount() {
        return function (target : any, property : string) {
            target.componentWillMount = target[property];
        };
    }
    /**
     @example
     function shouldComponentUpdate(nextProps : Props, nextState : State) : boolean
     @description Invoked before rendering when new props or state are being received. This method is not called for the initial render or when forceUpdate is used.
      
     Use this as an opportunity to return false when you're certain that the transition to the new props and state will not require a component update.
      
     If shouldComponentUpdate returns false, then render() will be completely skipped until the next state change. In addition, componentWillUpdate and componentDidUpdate will not be called.
      
     By default, shouldComponentUpdate always returns true to prevent subtle bugs when state is mutated in place, but if you are careful to always treat state as immutable and to read only from props and state in render() then you can override shouldComponentUpdate with an implementation that compares the old props and state to their replacements.
      
     If performance is a bottleneck, especially with dozens or hundreds of components, use shouldComponentUpdate to speed up your app.
     */
    export function shouldUpdate() {
        return function (target : any, property : string) {
            target.shouldComponentUpdate = target[property];
        };
    }
    /**
     @example
     function componentWillUpdate(nextProps : Props, nextState : State) : void

     @description Invoked immediately before rendering when new props or state are being received. This method is not called for the initial render.
 
     Use this as an opportunity to perform preparation before an update occurs.
      
     You cannot use this.setState() in this method. If you need to update state in response to a prop change, use componentWillReceiveProps instead.
     */
    export function willUpdate() {
        return function (target : any, property : string) {
            target.componentWillUpdate = target[property];
        };
    }
    /**
     @example
     function componentDidUpdate(prevProps : Props, prevState : State) : void

     @description Invoked immediately after the component's updates are flushed to the DOM. This method is not called for the initial render.
 
     Use this as an opportunity to operate on the DOM when the component has been updated.
     */
    export function didUpdate() {
        return function (target : any, property : string) {
            target.componentDidUpdate = target[property];
        };
    }
    /**
     @example
     function componentWillUnmount () : void

     @description Invoked immediately before a component is unmounted from the DOM.
 
     Perform any necessary cleanup in this method, such as invalidating timers or cleaning up any DOM elements that were created in componentDidMount.
     */
    export function willUnmount() {
        return function (target : any, property : string) {
            target.componentWillUnmount  = target[property];
        };
    }
}
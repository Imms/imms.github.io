"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var React = require('react');
var _ = require('lodash');
var MyComponent = (function (_super) {
    __extends(MyComponent, _super);
    function MyComponent() {
        _super.apply(this, arguments);
    }
    MyComponent.prototype.withState = function (act) {
        this.setState(function (s) {
            var cloned = _.cloneDeep(s);
            act(s);
            return cloned;
        });
    };
    return MyComponent;
}(React.Component));
exports.MyComponent = MyComponent;
//# sourceMappingURL=MyComponent.js.map
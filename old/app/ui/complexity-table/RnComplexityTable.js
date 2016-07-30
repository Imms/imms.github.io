"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator.throw(value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments)).next());
    });
};
var React = require('react');
var ReactDOM = require('react-dom');
var CmComplexityTable_1 = require('./CmComplexityTable');
var chai_1 = require('chai');
/**
 * Created by GregRos on 17/06/2016.
 */
var RnComplexityTable = (function () {
    function RnComplexityTable(urlData) {
        this.urlData = urlData;
    }
    RnComplexityTable.prototype.render = function () {
        return __awaiter(this, void 0, void 0, function* () {
            var _this = this;
            this._complexities = yield $.get(this.urlData).then(function (x) { return YAML.parse(x); });
            $(".react-complexity-table").each(function (i, e) {
                var tableName = e.getAttribute("data-table");
                var myTable = _this._complexities.tables.find(function (t) { return t.table == tableName; });
                chai_1.assert.isObject(myTable);
                chai_1.assert.isObject(_this._complexities);
                ReactDOM.render(React.createElement(CmComplexityTable_1.CmComplexityTable, {complexities: _this._complexities, table: myTable}), e);
            });
            if (typeof MathJax != "undefined") {
                MathJax.Hub.Typeset(document, null);
            }
        });
    };
    return RnComplexityTable;
}());
new RnComplexityTable("/data/complexity.yaml").render();
//# sourceMappingURL=RnComplexityTable.js.map
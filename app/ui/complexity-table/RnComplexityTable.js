"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator.throw(value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments)).next());
    });
};
const React = require('react');
const ReactDOM = require('react-dom');
const CmComplexityTable_1 = require('./CmComplexityTable');
const chai_1 = require('chai');
/**
 * Created by GregRos on 17/06/2016.
 */
class RnComplexityTable {
    constructor(urlData) {
        this.urlData = urlData;
    }
    render() {
        return __awaiter(this, void 0, void 0, function* () {
            this._complexities = yield $.get(this.urlData).then(x => YAML.parse(x));
            $(".react-complexity-table").each((i, e) => {
                let tableName = e.getAttribute("data-table");
                let myTable = this._complexities.tables.find(t => t.table == tableName);
                chai_1.assert.isObject(myTable);
                chai_1.assert.isObject(this._complexities);
                ReactDOM.render(React.createElement(CmComplexityTable_1.CmComplexityTable, {complexities: this._complexities, table: myTable}), e);
            });
            MathJax.Hub.Typeset(document, null);
        });
    }
}
new RnComplexityTable("/data/complexity.yaml").render();
//# sourceMappingURL=RnComplexityTable.js.map
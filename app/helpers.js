/**
 * Created by GregRos on 28/05/2016.
 */
"use strict";
class Num {
    static sigFigs(n, sig) {
        var mult = Math.pow(10, sig - Math.floor(Math.log(n) / Math.LN10) - 1);
        return Math.round(n * mult) / mult;
    }
}
exports.Num = Num;
function clone(o) {
    return JSON.parse(JSON.stringify(o));
}
exports.clone = clone;
//# sourceMappingURL=helpers.js.map
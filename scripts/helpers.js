/**
 * Created by GregRos on 28/05/2016.
 */
"use strict";
class Requests {
    static request(url) {
        return new Promise((accept, reject) => {
            $.get(url, data => {
                accept(data);
            }).fail(() => {
                reject();
            });
        });
    }
    static requestJSON(url) {
        return new Promise((accept, reject) => {
            $.getJSON(url, data => {
                accept(data);
            }).fail(() => {
                reject();
            });
        });
    }
}
exports.Requests = Requests;
class _Map {
    static ofObject(o) {
        let map = new Map();
        for (let prop in o) {
            map.set(prop, o[prop]);
        }
        return map;
    }
    static ofIterable(iterable, _key, _val) {
        let map = new Map();
        for (let item of iterable) {
            map.set(_key(item), _val(item));
        }
        return map;
    }
}
exports._Map = _Map;
class _Arr {
    static mapFlatten(arr, f) {
        var apply = Function.prototype.apply;
        var flatten = apply.bind(Array.prototype.concat, []);
        return flatten(arr.map(f));
    }
}
exports._Arr = _Arr;
class _Obj {
    static ofArray(arr) {
        let obj = {};
        for (let [k, v] of arr) {
            obj[k] = v;
        }
        return obj;
    }
}
//# sourceMappingURL=helpers.js.map
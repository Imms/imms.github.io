/**
 * Created by GregRos on 28/05/2016.
 */

export class Num {
	static sigFigs(n, sig) {
		var mult = Math.pow(10,
			sig - Math.floor(Math.log(n) / Math.LN10) - 1);
		return Math.round(n * mult) / mult;
	}
}

export class Requests {
	static request(url : string) {
		return new Promise((accept, reject) => {
			$.get(url, data => {
				accept(data);
			}).fail(() => {
				reject();
			});
		});
	}

	static requestJSON(url : string) {
		return new Promise((accept, reject) => {
			$.getJSON(url, data => {
				accept(data);
			}).fail(() => {
				reject();
			});
		});
	}
}

export class _Map {
	static ofObject(o : any) {
		let map = new Map();
		for (let prop in o) {
			map.set(prop, o[prop]);
		}
		return map;
	}

	static ofIterable<T, K, V>(iterable : Iterable<T>, _key : (x : T) => K, _val : (x : T) => V) {
		let map = new Map<K, V>();
		for (let item of iterable) {
			map.set(_key(item), _val(item));
		}
		return map;
	}
}

export class _Arr {
	static mapFlatten<S, T>(arr : T[], f : (x : T) => Iterable<S>) : Array<S> {
		var apply = Function.prototype.apply;
		var flatten = apply.bind(Array.prototype.concat, []);
		return flatten(arr.map(f));
	}

	static sparse<T>(arr : T[]) {
		let newArray = [];
		for (var i = 0; i < arr.length; i++) {
			let cur = arr[i];
			if (cur != undefined && cur != null) {
				newArray[i] = cur;
			}
		}
		return newArray;
	}
}

class _Obj {
	static ofArray(arr : [any, any][]) {
		let obj = {};
		for (let [k, v] of arr) {
			obj[k] = v;
		}
		return obj;
	}
}
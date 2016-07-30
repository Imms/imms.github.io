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

interface Array<T> {
	includes(e : T) : boolean;
}


export function clone<T>(o : T) : T {
	return JSON.parse(JSON.stringify(o)) as T;
}


/**
 * Created by GregRos on 22/05/2016.
 */

import {Injectable, OnInit} from '@angular/core';
import {Http} from '@angular/http';
import {Observable} from "rxjs/Observable";
import {Serializer} from './serialization';
import 'rxjs/Rx';
export enum TreeEntryKind {
	Link,
	Content
}

export class Articles {
	static* flatten(parent : ArticleTreeEntry) : IterableIterator<ArticleTreeEntry> {
		yield parent;
		if (!parent.children) return;
		for (let entry of parent.children) {
			yield* Articles.flatten(entry);
		}
	}

	static byId(parent : ArticleTreeEntry, id : string) {
		var arr = Array.from(Articles.flatten(parent));
		var item = arr.find(entry => entry.id === id);
		return item;
	}
}

export class ArticleTreeEntry {
	public text : string;
	public source : string;
	public children : Array<ArticleTreeEntry>;
	public id : string;
	public type : "Link" | "Content";
}




@Injectable()
export class ArticleService {
	
	root : Promise<ArticleTreeEntry>;
	
	src = "/data/contentIndex.yml";
	constructor(private http : Http) {
		this.root = this.http
			.get(this.src)
			.map(x => YAML.parse(x.text()))
			.toPromise()
		;
	}

}
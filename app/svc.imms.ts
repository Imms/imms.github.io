/**
 * Created by GregRos on 15/05/2016.
 */
import { Injectable } from '@angular/core';

@Injectable()
export class SvcImms {
    links = {
        library : {
            sources : "https://github.com/Imms/Imms"
			,nuget: "https://www.nuget.org/packages/Imms/"
			,siteSources: "https://github.com/Imms/imms.github.io"
			,binaries: "https://github.com/Imms/Imms"
        }
		,bootstrap : "http://getbootstrap.com/"
		,sass: "http://sass-lang.com/"
		,typescript: "https://www.typescriptlang.org/"
		,webstorm: "https://www.jetbrains.com/webstorm/specials/webstorm/webstorm.html"
		,gregrosProfile: "https://github.com/GregRos"
		,angular: "https://angular.io"
    }

	version = "version: 0.6.0"
}
"use strict";
/// <reference path="../typings/browser.d.ts" />
const platform_browser_dynamic_1 = require('@angular/platform-browser-dynamic');
const cm_app_1 = require('./cm.app');
const http_1 = require('@angular/http');
const router_1 = require('@angular/router');
platform_browser_dynamic_1.bootstrap(cm_app_1.CmApp, [http_1.HTTP_PROVIDERS, router_1.ROUTER_PROVIDERS, router_1.ROUTER_DIRECTIVES]);
//# sourceMappingURL=main.js.map
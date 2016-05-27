/// <reference path="../typings/browser.d.ts" />
import { bootstrap }    from '@angular/platform-browser-dynamic';
import { SvcImms} from './svc.imms';
import { Http } from '@angular/http';
import { CmApp } from './cm.app';
import {HTTP_PROVIDERS} from '@angular/http';
import {ROUTER_DIRECTIVES, ROUTER_PROVIDERS} from '@angular/router';
import {MarkdownRenderer} from './Types';


bootstrap(CmApp, [HTTP_PROVIDERS, ROUTER_PROVIDERS, ROUTER_DIRECTIVES]);
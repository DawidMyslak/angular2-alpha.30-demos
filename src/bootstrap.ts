/// <reference path="../typings/tsd.d.ts" />

import {bootstrap} from 'angular2/angular2';
import {routerInjectables} from 'angular2/router';
import {httpInjectables} from 'angular2/http'; // not in use yet
import {AppComponent} from 'components/app/app';

// start app
bootstrap(AppComponent, [routerInjectables, httpInjectables]);
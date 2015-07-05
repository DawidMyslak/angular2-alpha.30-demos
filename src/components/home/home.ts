/// <reference path="../../../typings/tsd.d.ts" />

import {Component, View} from 'angular2/angular2';
import {Tabs, Tab} from '../../components/others/tabs';
import {Zippy} from '../../components/others/zippy';

@Component({
  selector: 'home'
})
@View({
  templateUrl: 'components/home/home.html',
  directives: [Tabs, Tab, Zippy]
})
export class HomeComponent {
  constructor() {
    console.log('constructor: HomeComponent');
  }
}
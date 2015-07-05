/// <reference path="../../../typings/tsd.d.ts" />

import {Component, View} from 'angular2/angular2';
import {Tabs, Tab} from '../../components/others/tabs';
import {Zippy} from '../../components/others/zippy';

@Component({
  selector: 'others'
})
@View({
  templateUrl: 'components/others/others.html',
  styleUrls: ['components/others/others.css'],
  directives: [Tabs, Tab, Zippy]
})
export class OthersComponent {
  constructor() {
    console.log('constructor: OthersComponent');
  }
}

/// <reference path="../../../typings/tsd.d.ts" />

import {Component, View} from 'angular2/angular2';

@Component({
  selector: 'zippy',
  properties: ['title']
})
@View({
  template: `
  <div class="panel panel-default">
    <div class="panel-heading" role="button" (click)="toggle()">
      <h3 class="panel-title">{{title}} {{ isVisible ? '&blacktriangledown;' : '&blacktriangleright;' }}</h3>
    </div>
    <div class="panel-body" [hidden]="!isVisible">
      <content></content>
    </div>
  </div>
  `
})
export class Zippy {
  isVisible: boolean;

  constructor() {
    console.log('constructor: Zippy');
    this.isVisible = false;
  }

  toggle() {
    this.isVisible = !this.isVisible;
  }
}
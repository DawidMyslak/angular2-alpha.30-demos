/// <reference path="../../../typings/tsd.d.ts" />

import {Component, View, Parent, NgFor, CSSClass} from 'angular2/angular2';

@Component({
  selector: 'tabs'
})
@View({
  template: `
    <div class="panel panel-default panel-tabs">
      <div class="panel-heading">
        <ul class="nav nav-tabs">
          <li *ng-for="#tab of tabs" [class.active]="tab.isActive"><a role="button" (click)="selectTab(tab)">{{tab.title}}</a></li>
        </ul>
      </div>
      <div class="panel-body">
        <content></content>
      </div>
    </div>
  `,
  directives: [NgFor, CSSClass]
})
export class Tabs {
  tabs: Array<Tab>;

  constructor() {
    console.log('constructor: Tabs');
    this.tabs = [];
  }

  selectTab(tab: Tab) {
    this.tabs.forEach((tab) => {
      tab.unselect();
    });
    tab.select();
  }

  addTab(tab: Tab) {
    if (this.tabs.length === 0) {
      tab.select();
    }
    this.tabs.push(tab);
  }
}

@Component({
  selector: 'tab',
  properties: ['title']
})
@View({
  template: `
    <div [hidden]="!isActive">
      <content></content>
    </div>
  `
})
export class Tab {
  isActive: boolean;

  constructor(@Parent() tabs: Tabs) {
    console.log('constructor: Tab');
    this.unselect();
    tabs.addTab(this);
  }

  select() {
    this.isActive = true;
  }

  unselect() {
    this.isActive = false;
  }
}
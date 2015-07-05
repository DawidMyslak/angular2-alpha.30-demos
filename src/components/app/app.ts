/// <reference path="../../../typings/tsd.d.ts" />

import {Component, View} from 'angular2/angular2';
import {RouteConfig, Router, RouterOutlet, RouterLink} from 'angular2/router';
import {HomeComponent} from '../../components/home/home';
import {TodoComponent} from '../../components/todo/todo';
import {OthersComponent} from '../../components/others/others';

@Component({
  selector: 'app'
})
@View({
  templateUrl: 'components/app/app.html',
  styleUrls: ['components/app/app.css'],
  directives: [RouterOutlet, RouterLink]
})
@RouteConfig([
  { path: '/', redirectTo: '/home' },
  { path: '/home', as: 'home', component: HomeComponent },
  { path: '/todo', as: 'todo', component: TodoComponent },
  { path: '/others', as: 'others', component: OthersComponent }
])
export class AppComponent {
  router: Router;

  constructor(router: Router) {
    console.log('constructor: AppComponent');
    this.router = router;
  }
}
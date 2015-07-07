/// <reference path="../../typings/tsd.d.ts" />

import {Http} from 'angular2/http';
import {Inject} from 'angular2/di';
import {ObservableWrapper} from 'angular2/src/facade/async';

export class WeatherService {
  http: Http;

  constructor(@Inject(Http) http) {
    this.http = http;
  }

  getForecast(city: string, callback: Function) {
    ObservableWrapper.subscribe(this.http.get('http://api.openweathermap.org/data/2.5/weather?units=metric&q=' + city), res => callback(res.json()));
  }
}
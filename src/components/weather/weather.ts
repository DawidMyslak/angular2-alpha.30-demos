/// <reference path="../../../typings/tsd.d.ts" />

import {Component, View, NgFor} from 'angular2/angular2';
import {WeatherService} from '../../services/weather';

@Component({
  selector: 'weather',
  hostInjector: [WeatherService]
})
@View({
  templateUrl: 'components/weather/weather.html',
  directives: [NgFor]
})
export class WeatherComponent {
  weatherService: WeatherService;
  weatherForecasts: Array<WeatherForecast>;

  constructor(weatherService: WeatherService) {
    console.log('constructor: WeatherComponent');
    this.weatherService = weatherService;

    this.weatherForecasts = new Array<WeatherForecast>();
    this.weatherForecasts.push(new WeatherForecast('London'));
    this.weatherForecasts.push(new WeatherForecast('Madrid'));
    this.weatherForecasts.push(new WeatherForecast('Cork'));
    this.weatherForecasts.push(new WeatherForecast('New York'));
    this.weatherForecasts.push(new WeatherForecast('Tokio'));
    
    this.weatherForecasts.forEach(weatherForecast => {
      this.weatherService.getForecast(weatherForecast.city, res => weatherForecast.temperature = res.main.temp);
    });
  }
}

class WeatherForecast {
  city: string;
  temperature: number;

  constructor(city: string) {
    console.log('constructor: WeatherForecast');
    this.city = city;
    this.temperature = 0;
  }
}
import { Component, OnInit } from '@angular/core';
import { WeatherApi } from '../../services/weatherapi.service';
import { UserLocation } from '../../services/location.service';
import { LocationData } from '../../models/LocationData.model';

@Component({
    selector: 'forecast-weather',
    templateUrl: './forecast.component.html',
    styleUrls: ['./forecast.component.scss']
})

export class ForecastWeatherComponent {
    title = 'Weather Forecast';
    test: LocationData = {
        city: 'Detroit',
        state: 'mi',
        country: 'usa'
    }
    results: object = {}

    constructor(private weather: WeatherApi, private location: UserLocation) {}

    ngOnInit() {
        this.location.getPosition().then(pos => {
            console.log(`Positon: ${pos.lng} ${pos.lat}`);
        });

        this.showWeather(this.test);

        
    }

    showWeather = (location: LocationData) => {
        this.weather.getForecast(location).subscribe((data: object) => {
            this.results = data;
            console.log(this.results);
        })
    }
}
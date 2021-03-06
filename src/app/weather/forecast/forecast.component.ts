import { Component, OnInit } from '@angular/core';
import { WeatherApi } from '../../services/weatherapi.service';
import { UserLocation } from '../../services/location.service';
import { Coordinates } from '../../models/Coordinates.model';
import * as moment from 'moment';

@Component({
    selector: 'forecast-weather',
    templateUrl: './forecast.component.html',
    styleUrls: ['./forecast.component.scss'],
    providers: [
        WeatherApi,
        UserLocation
    ]
})

export class ForecastWeatherComponent implements OnInit {
    title = 'Weather Forecast';
    results: object = {};
    userCoords: Coordinates = {
        lat: 43,
        lon: -75
    };
    city: string = '';
    country: string = '';
    forecasts: any[] = [];
    singleForecast: any[]; 
    iconUrl: string = 'http://openweathermap.org/img/wn';
    error = false;
    errorMessage: string;

    constructor(
        private weather: WeatherApi,
        public location: UserLocation
    ) { }

    ngOnInit() {
        // Getting user location on init and grabbing weather data. Defaults to NYC if no coordinates found or user opts out
        this.location.getPosition().then(pos => {
            this.userCoords = {
                lat: pos.lat,
                lon: pos.lng
            };
            this.showWeatherByCoordinates(this.userCoords);
        }, err => {
            this.showWeatherByCoordinates(this.userCoords);
            this.error = true;
            this.errorMessage = 'Cannot find your current location';
            console.log(err);
        });  
    }

    // Calling weather api by coordinate first
    showWeatherByCoordinates = (coordinates: Coordinates) => {
        this.weather.getForecastByCoordinates(coordinates).subscribe((data: object) => {
            this.results = data;
            this.createForecast(this.results);
        });
    }

    // Extracting useful data
    createForecast = (results: any) => {
        let result: string,
            forecast: any[] = [];

        // Getting easy ones
        for (result in results) {
            if (result === 'city') {
                this.city = results[result].name;
                this.country = results[result].country;
            }

            // Getting each of the forecasts and adding a date prop to each without the time for grouping
            if (result === 'list') {

                for (let i = 0; i < results[result].length; i++) {

                    let date = moment(results[result][i].dt_txt).format("MMM Do YYYY");
                    let time = moment(results[result][i].dt_txt).format("h:mm a");

                    // getting icon into props
                    let icon = this.urlFill(results[result][i].weather);
                    
                    results[result][i].date = date;
                    results[result][i].time = time;
                    results[result][i].iconUrl = icon;
                    //pushing to forecast array
                    forecast.push(results[result][i]);
                }
            }
        }

        //pushing to forecasts array
        this.forecasts = forecast;
        
        // mapping date to its own new array to use for sorting in the template
        this.singleForecast = Array.from(new Set(this.forecasts.map(({date}) => date)));
    } 

    // filling the icon url
    urlFill = (weather: any[]) => {
        let icon: string;
        for (var i = 0; i < weather.length; i++) {
            icon = weather[i].icon;
        }
    return `${this.iconUrl}/${icon}.png`
    }
}
import { Component, OnInit } from '@angular/core';
import { WeatherApi } from '../../services/weatherapi.service';
import { UserLocation } from '../../services/location.service';
import { LocationData } from '../../models/LocationData.model';
import { Coordinates } from '../../models/Coordinates.model';
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
        });  
    }

    // Calling weather api by coordinate first
    showWeatherByCoordinates = (coordinates: Coordinates) => {
        this.weather.getForecastByCoordinates(coordinates).subscribe((data: object) => {
            this.results = data;
            this.createForecast(this.results);
        });
    }

    // If user opts out of letting the browser know their location, then it defaults to NYC and they can search locations. Alternatively, if user wants to see other locations.
    showWeather = (location: LocationData) => {
        this.weather.getForecast(location).subscribe((data: object) => {
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
                    //adding isolated date and time props
                    let timeString = new Date(results[result][i].dt_txt);
                    let timeOptions: {} = {
                        hour: '2-digit',
                        minute: '2-digit',
                        hour12: true
                    }
                    let dateOptions: {} = {
                        weekday: 'short',
                        month: 'short',
                        day: 'numeric'
                    }
                    let date = timeString.toLocaleDateString('en-US', dateOptions);
                    let time = timeString.toLocaleTimeString('en-US', timeOptions);

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
        console.log(this.forecasts);
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
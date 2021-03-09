import { Component, OnInit } from '@angular/core';
import { WeatherApi } from '../../services/weatherapi.service';
import { UserLocation } from '../../services/location.service';
import { Coordinates } from '../../models/Coordinates.model';
import * as moment from 'moment';

@Component({
    selector: 'current-weather',
    templateUrl: './current.component.html',
    styleUrls: ['./current.component.scss'],
    providers: [
        WeatherApi,
        UserLocation
    ]
})

export class CurrentWeatherComponent implements OnInit {
    title = 'Current Weather'
    results: object = {};
    userCoords: Coordinates = {
        lat: 43,
        lon: -75
    };
    city: string = '';
    country: string = '';
    date: string = '';
    iconUrl: string = 'http://openweathermap.org/img/wn';
    current: any[] = [];
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
        this.weather.getCurrentByCoordinates(coordinates).subscribe((data: object) => {
            this.results = data;
            this.createCurrent(this.results);
        });
    }

    // format the data
    createCurrent = (results: any) => {
        let icon = this.urlFill(results.weather);
        let time = moment().format("h:mm a");
        let date = moment().format("MMM Do YY");

        results.icon = icon;
        results.date = date;
        results.time = time;

        this.city = results.name;
        this.country = results.sys.country;
        this.date = date;

        this.current.push(results);
    }

    // filling the icon url
    urlFill = (weather: any[]) => {
        let icon: string;
        for (var i = 0; i < weather.length; i++) {
            icon = weather[i].icon;
        }
    return `${this.iconUrl}/${icon}@2x.png`
    }
}
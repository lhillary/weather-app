import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { LocationData } from '../models/LocationData.model';
import { Coordinates } from '../models/Coordinates.model';
import { ENV } from '../core/env.config';

@Injectable({
    providedIn: 'root'
})

export class WeatherApi {
    // URLs & Key
    private readonly currentUrl = 'https://api.openweathermap.org/data/2.5/weather';
    private readonly forecastUrl = 'https://api.openweathermap.org/data/2.5/forecast';

    // Setting up httpclient
    constructor(private http: HttpClient) { }

    // Getting the current weather by user input
    public getCurrent(location: LocationData) {
        return this.http.get(`${this.currentUrl}?q=${location.city},${location.state},${location.country}&units=imperial&appid=${ENV.BASE_API}`)
        .pipe(catchError(this.handleError));
    }

    // Getting the current weather by geolocation
    public getCurrentByCoordinates(coordinates: Coordinates) {
        return this.http.get(`${this.currentUrl}?lat=${coordinates.lat}&lon=${coordinates.lon}&units=imperial&appid=${ENV.BASE_API}`)
        .pipe(catchError(this.handleError));
    }

    // Getting the five day forecast by user input
    public getForecast(location: LocationData) {
        return this.http.get(`${this.forecastUrl}?q=${location.city},${location.state},${location.country}&units=imperial&appid=${ENV.BASE_API}`)
        .pipe(catchError(this.handleError));
    }

    // Getting the five day forecast by geolocation
    public getForecastByCoordinates(coordinates: Coordinates) {
        return this.http.get(`${this.forecastUrl}?lat=${coordinates.lat}&lon=${coordinates.lon}&units=imperial&appid=${ENV.BASE_API}`)
        .pipe(catchError(this.handleError));
    }

    // Handling errors
    private handleError(error: HttpErrorResponse) {
        if (error.error instanceof ErrorEvent) {
            console.error('An error occurred:', error.error.message);
          } else {
            console.error(
              `Error code: ${error.status}, ` + `Error Body: ${error.error}`);
          }
          return throwError('Failed. Please try again later.');
    }
}
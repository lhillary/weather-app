import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { LocationData } from '../models/LocationData.model';

@Injectable({
    providedIn: 'root'
})

export class WeatherApi {
    // URLs & Key
    private readonly currentUrl = 'https://api.openweathermap.org/data/2.5/weather';
    private readonly forecastUrl = 'https://api.openweathermap.org/data/2.5/forecast';
    private readonly apiKey = 'adc853cd1d9a6e65d875af9c95a657a4';

    // Setting up httpclient
    constructor(private http: HttpClient) { }

    // Getting the current weather
    public getCurrent(location: LocationData) {
        return this.http.get(`${this.currentUrl}?q=${location.city},${location.state},${location.country}&appid=${this.apiKey}`)
        .pipe(catchError(this.handleError));
    }

    // Getting the five day forecast
    public getForecast(location: LocationData) {
        return this.http.get(`${this.forecastUrl}?q=${location.city},${location.state},${location.country}&appid=${this.apiKey}`)
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
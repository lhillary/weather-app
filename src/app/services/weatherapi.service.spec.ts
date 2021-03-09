import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { TestBed } from '@angular/core/testing';
import { HttpClient, HttpResponse } from '@angular/common/http';

import { Coordinates } from '../models/Coordinates.model';
import { ENV } from '../core/env.config';
import { WeatherApi } from './weatherapi.service';

describe('Weather Data', () => {
    let httpClient: HttpClient;
    let httpTestingController: HttpTestingController;
    let weatherService: WeatherApi;
  
    beforeEach(() => {
    TestBed.configureTestingModule({
        imports: [ HttpClientTestingModule ],
        providers: [
          WeatherApi
        ]
    });
  
        httpClient = TestBed.inject(HttpClient);
        httpTestingController = TestBed.inject(HttpTestingController);
        weatherService = TestBed.inject(WeatherApi);
    });

    afterEach(() => {
        httpTestingController.verify();
    });

    // begin testing
    it ('should call weather api using coordinates', () => {
        const test: Coordinates = {
                lat: 42,
                lon: -75
            };

        // Making sure length of data is good
        weatherService.getCurrentByCoordinates(test).subscribe(data => {
            expect(typeof(data)).toBe('object');
        });

        // Making sure it's actually a GET request
        const req = httpTestingController.expectOne({method: 'GET', url: `https://api.openweathermap.org/data/2.5/weather?lat=${test.lat}&lon=${test.lon}&units=imperial&appid=${ENV.BASE_API}`});
        expect(req.request.method).toEqual('GET');
        req.flush({});
    });
});
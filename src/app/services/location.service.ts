import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})

// service uses HTML5 geolocation to get the user's current coordinates
export class UserLocation {
    public getPosition(): Promise<any> {
        return new Promise((resolve, reject) => {
            navigator.geolocation.getCurrentPosition(resp => {
            resolve({lng: resp.coords.longitude, lat: resp.coords.latitude});
        },
        err => {
            reject(err);
        });
    });

  }
}


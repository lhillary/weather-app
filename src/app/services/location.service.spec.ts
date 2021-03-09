import { TestBed } from '@angular/core/testing';

import { UserLocation } from './location.service';
import { take } from "rxjs/operators";

describe('Weather Data', () => {
    let locationService: UserLocation;
  
    beforeEach(() => {
    TestBed.configureTestingModule({
        providers: [
          UserLocation
        ]
    });
  
        locationService = TestBed.inject(UserLocation);
    });

    // begin testing
    it("should get current user coordinates", (done: DoneFn) => {
        let position: any;
        locationService.getPosition().then(value => {
          position = value;
          expect(position.lat).not.toBeUndefined();
          expect(position.lng).not.toBeUndefined();
          expect(position.lat).not.toBeNaN();
          expect(position.lng).not.toBeNaN();
          expect(position.lat).not.toBeNull();
          expect(position.lng).not.toBeNull();
          done();
        });
      });
});
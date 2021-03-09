import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { CurrentWeatherComponent } from './current.component';
import { WeatherApi } from '../../services/weatherapi.service';

describe('FooterComponent', () => {
  let component: CurrentWeatherComponent;
  let fixture: ComponentFixture<CurrentWeatherComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ],
      declarations: [ CurrentWeatherComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CurrentWeatherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // testing city and country title
  it('should correctly render city', () => {
    component.city = 'Detroit'; 
    component.country = 'US'
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('.wa-current-title h3').textContent).toBe('Detroit, US');
  });

  // testing date title
  it('should correctly render date', () => {
    component.date = 'Mon, Mar 16'; 
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement; 
    expect(compiled.querySelector('.wa-current-title h1').textContent).toBe('Mon, Mar 16');
  });

});

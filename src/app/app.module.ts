import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CurrentWeatherComponent } from './weather/current/current.component';
import { ForecastWeatherComponent } from './weather/forecast/forecast.component';

import { WeatherApi } from './services/weatherapi.service';
import { UserLocation } from './services/location.service';
import { HeaderComponent } from './shared/header/header.component';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

// main app routes
const appRoutes: Routes = [
  {path: '', component: CurrentWeatherComponent},
  {path: 'forecast', component: ForecastWeatherComponent}
]

@NgModule({
  declarations: [
    AppComponent,
    CurrentWeatherComponent,
    ForecastWeatherComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot(appRoutes),
    FontAwesomeModule,
    BrowserAnimationsModule
  ],
  providers: [WeatherApi, UserLocation],
  bootstrap: [AppComponent]
})
export class AppModule { }

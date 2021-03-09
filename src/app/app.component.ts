import { Component, AfterViewInit, Renderer2 } from '@angular/core';

import {
  Router,
  Event as RouterEvent,
  NavigationStart,
  NavigationEnd,
  NavigationCancel,
  NavigationError
} from '@angular/router'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements AfterViewInit {
  title = 'Weather App';

  constructor(private renderer: Renderer2) {}

  ngAfterViewInit() {
    let loader = this.renderer.selectRootElement('.wa-loading');
    this.renderer.setStyle(loader, 'display', 'none');
  }
}



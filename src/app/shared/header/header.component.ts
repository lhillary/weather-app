// added some stuff for listening to window size, adding animations, and using font awesome icons
import { Component, HostListener } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { trigger, state, style, transition, animate } from '@angular/animations';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'header-component',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  // added animation for the mobile menu, added a parameter
  animations: [
    trigger('toggleMenu', [
      state('1', style({
        transform: '{{translateAmountOpen}}'
      }), {params: {translateAmountOpen: 'translateX(300px)'}}),
      state('0', style({
        transform: '{{translateAmount}}'
      }), {params: {translateAmount: 'translateX(-300px)'}}),
      transition('1 => 0', animate('400ms ease-in-out')),
      transition('0 => 1', animate('400ms ease-in-out'))
    ]),
  ]
})

export class HeaderComponent {
  title: 'Header';
  faBars = faBars;
  faTimes = faTimes;
  isOpen = 0;
  screenWidth: number;

  // getting hostListener so that I can keep track of window size, since there's unfortunately no way to use media queries in the animation
  @HostListener('window:resize', ['$event'])
  onResize = () => {
    this.screenWidth = window.innerWidth;
  }

  constructor() {
    this.onResize();
  }

  // figuring out what the translateX paramter value should be based on screen size, so that menu looks right on desktop
  getAnimationTransformValue = (): string => {
    return this.screenWidth <= 600 ? 'translateX(-300px)' : 'translateX(0px)';
  }

  getOpenAnimationTransformValue = (): string => {
    return this.screenWidth <= 600 ? 'translateX(300px)' : 'translateX(0px)';
  }

  // click toggle menu 
  toggleMenu = () => {
    if (this.isOpen === 1) {
      this.isOpen = 0;
    } else {
      this.isOpen = 1;
    }
  }

}

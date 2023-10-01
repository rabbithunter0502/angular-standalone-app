import './polyfills';

import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { LOCALE_ID } from '@angular/core';
import { AppRouteProviders } from './app/app.route';
import { HttpProviders } from './app/http.providers';

// boostrapping a standalone root application

bootstrapApplication(AppComponent, {
  providers: [
    { provide: LOCALE_ID, useValue: 'en-US' },
    ...AppRouteProviders,
    // lets add http
    ...HttpProviders,
  ],
});

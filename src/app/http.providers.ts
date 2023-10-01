// let's create a module for HTTP Client then replace it with the new provideHttpClient

import {
  HTTP_INTERCEPTORS,
  provideHttpClient,
  withInterceptorsFromDi,
  withInterceptors,
} from '@angular/common/http';
import { GarageInterceptor } from './core/http';
import { GarageInterceptorFn } from './core/http.fn';
import { LocalInterceptor } from './core/local';
import { LocalInterceptorFn } from './core/local.fn';

// Method A:
// export const HttpProviders = [
//   // the old way
//   // importProvidersFrom(HttpClientModule),
//   // the new way
//   provideHttpClient(
//     // do this, to keep using your class-based interceptors.
//     withInterceptorsFromDi()
//   ),

//   {
//     provide: HTTP_INTERCEPTORS,
//     useClass: GarageInterceptor,
//     multi: true,
//   },
//   {
//     provide: HTTP_INTERCEPTORS,
//     useClass: LocalInterceptor,
//     multi: true,
//   },
// ];

// the better way (more future proof) is to use interceptor functions
// Method B
export const HttpProviders = [
  provideHttpClient(
    // do this, to keep using your class-based interceptors.
    withInterceptors([GarageInterceptorFn, LocalInterceptorFn])
  ),
];

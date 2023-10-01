// example local http interceptor
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
} from '@angular/common/http';

@Injectable()
export class LocalInterceptor implements HttpInterceptor {
  constructor() {}
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (req.url.indexOf('localdata') < 0) {
      return next.handle(req);
    }
    // do something with url, then handle
    let url = req.url;
    console.log('url from local interceptor', url);

    const adjustedReq = req.clone({ url: url });
    return next.handle(adjustedReq);
  }
}

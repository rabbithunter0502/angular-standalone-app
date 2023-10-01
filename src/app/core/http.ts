// example http interceptor
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpHeaders,
} from '@angular/common/http';

@Injectable()
export class GarageInterceptor implements HttpInterceptor {
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (req.url.indexOf('localdata') > -1) {
      // pass through
      return next.handle(req);
    }
    // do something with url, like prefix with api
    const url = 'https://saphire.sekrab.com/api' + req.url;
    console.log('url from garage interceptor', url);

    const adjustedReq = req.clone({
      url: url,
      setHeaders: this.getHeaders(req.headers),
    });

    return next.handle(adjustedReq);
  }

  private getHeaders(reqheaders: HttpHeaders): any {
    //  authorization here, do something with theader
    let headers: any = {};

    return headers;
  }
}

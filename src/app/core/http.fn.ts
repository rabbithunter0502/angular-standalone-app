import {
  HttpHandlerFn,
  HttpHeaders,
  HttpInterceptorFn,
  HttpRequest,
} from '@angular/common/http';

const getHeaders = (reqheaders: HttpHeaders): any => {
  //  authorization here
  let headers: any = {};

  return headers;
};

export const GarageInterceptorFn: HttpInterceptorFn = (
  req: HttpRequest<any>,
  next: HttpHandlerFn
) => {
  // do you inject a client service? it goes like this
  // const loaderService = inject(LoaderService);

  if (req.url.indexOf('localdata') > -1) {
    // pass through
    return next(req);
  }
  // do something with url, like prefix with api
  const url = 'https://saphire.sekrab.com/api' + req.url;
  console.log('url from garage interceptor', url);

  const adjustedReq = req.clone({
    url: url,
    setHeaders: getHeaders(req.headers),
  });

  return next(adjustedReq);
};

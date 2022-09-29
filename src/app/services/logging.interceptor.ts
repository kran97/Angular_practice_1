import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpEventType
} from '@angular/common/http';
import { Observable, tap } from 'rxjs';

@Injectable()
export class LoggingInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // console.log("Outgoing request");
    // console.log(request);
    return next.handle(request).pipe(
      tap(event => {
        if (event.type === HttpEventType.Response) {
          // console.log("Incoming response");
          // console.log(event);
        }
      }
    ));
  }
}

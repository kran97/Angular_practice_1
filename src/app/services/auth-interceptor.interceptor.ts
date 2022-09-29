import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpEventType,
  HttpParams
} from '@angular/common/http';
import { exhaustMap, Observable, take, tap } from 'rxjs';
import { AuthenticationService } from './authentication.service';

@Injectable()
export class AuthInterceptorInterceptor implements HttpInterceptor {

  constructor(private authServ: AuthenticationService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return this.authServ.userSubject.pipe(
      take(1),
      exhaustMap(user => {
        if (!user) {
          return next.handle(request); 
        }
        const modifiedRequest = request.clone({
          params: new HttpParams().set('auth', user?.token!)
        });
        return next.handle(modifiedRequest);
      })
    );
      // const modifiedRequest = request.clone({
      //   headers: request.headers.append('auth', 'xyz-value')
      // });
    // .pipe(tap(event => {
    //   console.log("Event --> ", event);
    //   if (event.type === HttpEventType.Response) {
    //     console.log("Response arrived, body data: ", event.body);
    //   }
    // }));
  }
}

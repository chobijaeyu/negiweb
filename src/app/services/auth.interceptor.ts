import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
  HTTP_INTERCEPTORS
} from '@angular/common/http';
import { Observable, throwError, from, of } from 'rxjs';
import { Router } from '@angular/router';
import { catchError, switchMap, take } from 'rxjs/operators';
import { AngularFireAuth } from '@angular/fire/auth';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private afa: AngularFireAuth) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return this.afa.user.pipe(
      take(1),
      switchMap(u => {
        console.log("take interceptor from user token.")
        if (u) {
          return from(u.getIdToken())
        }
        return of("")
      })).pipe(
        switchMap(t => {
          if (request.headers.get("skip")) {
            request = request.clone({
              headers: request.headers.delete('skip')
            });
            return next.handle(request);
          }
          const tokenizedReq = request.clone({
            setHeaders: {
              "Authorization": `Bearer ${t}`
            }
          })
          return next.handle(tokenizedReq)
        })
      )
  }
}

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(private router: Router) { }
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    return next.handle(request).pipe(
      catchError(
        (response: any) => {
          if (response instanceof HttpErrorResponse && response.status === 401) {
            localStorage.removeItem('token');
            this.router.navigateByUrl('/auth');
          }
          return throwError(response);
        }
      ));
  }
}

export const httpInterceptorProviders = [
  {
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true
  },
  {
    provide: HTTP_INTERCEPTORS,
    useClass: ErrorInterceptor,
    multi: true
  }
]

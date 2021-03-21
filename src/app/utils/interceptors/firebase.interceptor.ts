import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AngularFireAuth } from '@angular/fire/auth';
import { switchMap } from 'rxjs/operators';

@Injectable()
export class FirebaseInterceptor implements HttpInterceptor {

  constructor(private readonly fireAuth: AngularFireAuth) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if(!request.url.includes(environment.apiBaseUrl)){
      return next.handle(request);
    }

    return this.fireAuth.idToken.pipe(
      switchMap((token: string) => {
        return next.handle(request.clone({
          setHeaders: {
            Authorization: `Bearer ${token}`,
          }
        }));
      })
    );


  }
}

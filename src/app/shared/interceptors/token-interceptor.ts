import {Injectable} from '@angular/core';
import {HttpRequest, HttpHandler, HttpEvent, HttpInterceptor} from '@angular/common/http';
import {Observable} from 'rxjs';
import {SessionService} from '../services/session.service';


@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(private sessionService: SessionService) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const session = this.sessionService.getCurrentSession();
    if (session && session.token) {
      request = request.clone({
        setHeaders: {
          Authorization: session.token
        }
      });
    }

    return next.handle(request);
  }
}

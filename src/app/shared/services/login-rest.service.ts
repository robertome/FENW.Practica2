import {Injectable} from '@angular/core';
import {Observable, throwError} from 'rxjs';
import {HttpClient, HttpParams} from '@angular/common/http';
import {AppConfig} from '../app-config';
import {catchError, map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LoginRestService {

  constructor(private http: HttpClient) {
  }

  login(username: string, password: string): Observable<string> {
    const queryParams = new HttpParams().set('username', username).set('password', password);

    return this.http.get(AppConfig.getInstance().urlLogin, {observe: 'response', params: queryParams})
      .pipe(
        map(response => {
          console.dir(response);

          let token = response.headers.get('Authorization');
          return token;
        }),
        catchError(error => {
          console.dir(error);

          //Error por conexion
          if (error.status == 0) {
            return throwError(error.message || 'Unknown Error');
          }

          //Error del servidor
          return throwError(error.error || 'Unknown Server Error');
        })
      );
  }
}

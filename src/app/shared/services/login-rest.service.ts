import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient, HttpParams} from '@angular/common/http';
import {AppConfig} from '../app-config';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LoginRestService {

  constructor(private http: HttpClient) {
  }

  login(username: string, password: string): Observable<any> {
    const queryParams = new HttpParams().set('username', username).set('password', password);

    return this.http.get<any>(AppConfig.getInstance().urlLogin, {observe: 'response', params: queryParams})
      .pipe(
        map(response => {
          console.dir(response);

          let token = response.headers.get('Authorization');
          if (!token) {
            console.log("Fallo inesperado: se esperaba token de session");
          }

          return token;
        })
      );
  }
}

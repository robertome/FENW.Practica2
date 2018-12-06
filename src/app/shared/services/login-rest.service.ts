import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient, HttpParams} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LoginRestService {
  loginRestUrl = 'http://fenw.etsisi.upm.es:5555/users/login';
  authorizationHeader = 'Authorization';

  constructor(private http: HttpClient) {
  }

  login(username: string, password: string): Observable<any> {
    const queryParams = new HttpParams().set('username', username).set('password', password);
    return this.http.get<any>(this.loginRestUrl, {observe: 'response', params: queryParams});

    /*
    const url = `${this.loginRestUrl}?username=${username}&password=${password}`;
    return this.http.get<any>(url, {observe: 'response'});
    */

  }
}

import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, of, throwError} from 'rxjs';
import {catchError, map} from 'rxjs/operators';
import {AppMessageService} from './app-message.service';
import {User} from '../models/user';
import {AppConfig} from '../app-config';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient, private appMessageService: AppMessageService) {
  }

  checkUsernameAvailable(username: string): Observable<boolean> {
    return this.http.get<any>(`${AppConfig.getInstance().urlUsers}/${username}`)
      .pipe(
        map(response => {
          return false;
        }),
        catchError(error => {
          if (error.status != 404) {
            this.logErrorResponse(error);

            this.appMessageService.error(error.error);
          }

          return of(true);
        })
      );
  }

  createUser(user: User): Observable<any> {
    return this.http.post(AppConfig.getInstance().urlUsers, user)
      .pipe(
        map(response => {
          return true;
        }),
        catchError(error => {
          this.logErrorResponse(error);
          return error;
        })
      );
  }

  private logErrorResponse(error: any) {
    console.log('Error inesperado obtenido del servicio de usuarios');
    console.dir(error);
  }
}

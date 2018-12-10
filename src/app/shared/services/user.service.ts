import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
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

            this.appMessageService.error(error.message);
          }

          return of(true);
        })
      );
  }

  createUser(user: User): Observable<boolean> {
    console.log('Conectando para alta de usuario...');

    return this.http.post(AppConfig.getInstance().urlUsers, user)
      .pipe(
        map(response => {
          return true;
        }),
        catchError(
          error => {
            this.logErrorResponse(error);

            //Error por conexion
            if (error.status == 0) {
              return throwError(error.message || 'Unknown Error');
            }

            //Error del servidor
            return throwError(error.error || 'Unknown Server Error');
          }
        )
      );
  }

  private logErrorResponse(error: HttpErrorResponse) {
    console.log('Error inesperado obtenido del servicio de usuarios');
    console.dir(error);
  }

}

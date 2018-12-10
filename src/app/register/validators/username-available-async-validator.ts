import {AbstractControl, AsyncValidator, ValidationErrors} from '@angular/forms';
import {Observable} from 'rxjs';
import {UserService} from '../../shared/services/user.service';
import {AppMessageService} from '../../shared/services/app-message.service';
import {catchError, map} from 'rxjs/operators';

export class UsernameAvailableAsyncValidator implements AsyncValidator {

  constructor(private userService: UserService) {
  }

  validate(control: AbstractControl): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> {
    console.log('Validando username disponible...');

    return this.userService.checkUsernameAvailable(control.value).pipe(map(available => available ? null : {duplicated: true}));
  }
}

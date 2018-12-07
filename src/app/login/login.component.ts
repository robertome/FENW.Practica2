import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {User} from '../shared/models/user';
import {LoginRestService} from '../shared/services/login-rest.service';
import {SessionService} from '../shared/services/session.service';
import {Subject} from 'rxjs';
import {Session} from '../shared/models/session';
import {AppMessageService} from '../shared/services/app-message.service';
import {UsernameAvailableAsyncValidator} from '../register/validators/username-available-async-validator';
import {MatchValidator} from '../register/validators/match-validator';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  private loginForm: FormGroup;

  constructor(private loginService: LoginRestService, private sessionService: SessionService, private appMessageService: AppMessageService, private formBuilder: FormBuilder) {
  }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
        username: ['', Validators.required],
        password: ['', Validators.required],
      }, {
        updateOn: 'submit'
      }
    );
  }

  onSubmit() {
    if (this.loginForm.invalid) {
      return;
    }

    const username = this.username.value;
    const password = this.password.value;
    this.loginService.login(username, password).subscribe(
      token => {
        this.sessionService.setCurrentSession(new Session(token, username));
      },
      error => {
        console.dir(error);
        this.appMessageService.error(error.error);
        this.loginForm.reset({});
      });
  }

  get username() {
    return this.loginForm.get('username');
  }

  get password() {
    return this.loginForm.get('password');
  }

}

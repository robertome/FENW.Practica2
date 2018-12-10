import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {LoginRestService} from '../shared/services/login-rest.service';
import {SessionService} from '../shared/services/session.service';
import {Session} from '../shared/models/session';
import {AppMessageService} from '../shared/services/app-message.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  private loginForm: FormGroup;

  constructor(
    private loginService: LoginRestService,
    private sessionService: SessionService,
    private appMessageService: AppMessageService,
    private formBuilder: FormBuilder) {
  }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
        username: ['', Validators.required],
        password: ['', Validators.required],
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
        if (!token) {
          this.appMessageService.error('Fallo inesperado: se esperaba token de session');
        } else {
          this.sessionService.setCurrentSession(new Session(token, username));
        }
      },
      error => {
        this.appMessageService.error(error);
        this.loginForm.reset({});
      }
    );
  }

  get username() {
    return this.loginForm.get('username');
  }

  get password() {
    return this.loginForm.get('password');
  }

}

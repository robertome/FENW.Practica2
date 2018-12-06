import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {User} from '../shared/models/user';
import {LoginRestService} from '../shared/services/login-rest.service';
import {SessionService} from '../shared/services/session.service';
import {Subject} from 'rxjs';
import {Session} from '../shared/models/session';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  private loginService: LoginRestService;
  private sessionService: SessionService;
  private model: User;

  constructor(loginService: LoginRestService, sessionService: SessionService) {
    this.loginService = loginService;
    this.sessionService = sessionService;
  }

  ngOnInit() {
    this.model = new User('', '');
  }

  onSubmit() {
    this.loginService.login(this.model.username, this.model.password).subscribe(
      response => {
        console.dir(response);
        let token = response.headers.get("Authorization");
        this.sessionService.setCurrentSession(new Session(token, new User(this.model.username, this.model.password)));
      },
      error => {
        console.dir(error);
      });
  }

}

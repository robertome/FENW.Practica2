import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {UserService} from '../shared/services/user.service';
import {AppMessageService} from '../shared/services/app-message.service';
import {MatchValidator} from './validators/match-validator';
import {UsernameAvailableAsyncValidator} from './validators/username-available-async-validator';
import {User} from '../shared/models/user';
import {AppConfig} from '../shared/app-config';


@Component({
  selector: 'app-registry',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  submitted = false;

  datePickerConfig = AppConfig.getInstance().datePickerConfig;
  maxDate: Date;

  constructor(private formBuilder: FormBuilder, private userService: UserService, private appMessageService: AppMessageService) {
  }

  ngOnInit() {
    this.maxDate = new Date();
    this.registerForm = this.formBuilder.group({
        username: ['', {
          updateOn: 'blur',
          validators: [Validators.required, Validators.minLength(4)],
          asyncValidators: [new UsernameAvailableAsyncValidator(this.userService)]
        }],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(4)]],
        confirmPassword: ['', Validators.required],
        birthDate: ['']
      }, {
        updateOn: 'submit',
        validators: [new MatchValidator('password', 'confirmPassword')]
      }
    );
  }

  onSubmit() {
    this.submitted = true;
    if (this.registerForm.invalid) {
      return;
    }


    let user = User.of(this.username.value, this.password.value, this.email.value, this.birthDate.value);
    console.dir(user);

    this.userService.createUser(user).subscribe(
      response => {
        this.appMessageService.success(`Usuario '${user.username}' registrado correctamente`);
        this.submitted = false;
        this.registerForm.reset({});
      }, error => {
        this.appMessageService.error(`Fallo al registrar usuario: ${error}`);
      });
  }

  get username() {
    return this.registerForm.get('username');
  }

  get email() {
    return this.registerForm.get('email');
  }

  get password() {
    return this.registerForm.get('password');
  }

  get confirmPassword() {
    return this.registerForm.get('confirmPassword');
  }

  get birthDate() {
    return this.registerForm.get('birthDate');
  }

}

import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule} from '@angular/forms';
import {ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';

import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { defineLocale } from 'ngx-bootstrap/chronos';
import { esLocale } from 'ngx-bootstrap/locale';
defineLocale('es', esLocale);

import {AppComponent} from './app.component';
import {LoginComponent} from './login/login.component';
import {AppMessageComponent} from './app-message/app-message.component';

import {LoginRestService} from './shared/services/login-rest.service';
import {SessionService} from './shared/services/session.service';
import {AppMessageService} from './shared/services/app-message.service';
import {RegisterComponent} from './register/register.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    AppMessageComponent,
    RegisterComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BsDatepickerModule.forRoot()
  ],
  providers: [
    LoginRestService,
    SessionService,
    AppMessageService
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule {
}

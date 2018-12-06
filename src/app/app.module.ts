import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule} from '@angular/forms';
import {ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';

import {AppComponent} from './app.component';
import {LoginComponent} from './login/login.component';
import {AppMessageComponent} from './app-message/app-message.component';

import {LoginRestService} from './shared/services/login-rest.service';
import {SessionService} from './shared/services/session.service';
import {AppMessageService} from './shared/services/app-message.service';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    AppMessageComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
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

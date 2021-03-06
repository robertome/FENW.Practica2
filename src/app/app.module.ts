import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';

import {BsDatepickerModule} from 'ngx-bootstrap/datepicker';
import {defineLocale} from 'ngx-bootstrap/chronos';
import {esLocale} from 'ngx-bootstrap/locale';

import {AppComponent} from './app.component';
import {LoginComponent} from './login/login.component';
import {AppMessageComponent} from './app-message/app-message.component';
import {RegisterComponent} from './register/register.component';
import {ReservationComponent} from './reservation/reservation.component';
import {TokenInterceptor} from './shared/interceptors/token-interceptor';
import {ServicesComponent} from './services/services.component';
import {FacilitiesComponent} from './facilities/facilities.component';

import {LoginRestService} from './shared/services/login-rest.service';
import {SessionService} from './shared/services/session.service';
import {AppMessageService} from './shared/services/app-message.service';


defineLocale('es', esLocale);

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    AppMessageComponent,
    RegisterComponent,
    ReservationComponent,
    ServicesComponent,
    FacilitiesComponent
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
    AppMessageService,
    {provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true}
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule {
}

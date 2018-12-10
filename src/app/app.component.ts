import {Component, OnDestroy, OnInit} from '@angular/core';
import {SessionService} from './shared/services/session.service';
import {Session} from './shared/models/session';
import {Subscription} from 'rxjs';
import {AppMessageService} from './shared/services/app-message.service';
import {BsLocaleService} from 'ngx-bootstrap';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  private subscription: Subscription;
  private session: Session;

  constructor(private sessionService: SessionService,
              private appMessageService: AppMessageService,
              private localeService: BsLocaleService) {
    // conf locale datePickers
    this.localeService.use('es');
  }

  ngOnInit() {
    this.subscription = this.sessionService.subscribe(session => this.session = session);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  logout() {
    this.appMessageService.success(`¡Hasta la próxima ${this.username()}!`);
    this.sessionService.destroyCurrentSession();
    this.session = null;
  }

  username(): string {
    return this.session == null ? '' : this.session.username;
  }

}

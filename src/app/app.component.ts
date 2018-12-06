import {Component, OnInit} from '@angular/core';
import {SessionService} from './shared/services/session.service';
import {Session} from './shared/models/session';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  private subscription: Subscription;
  private session: Session;

  constructor(
    private sessionService: SessionService
  ) {
  }

  ngOnInit() {
    this.subscription = this.sessionService.subscribe(session => this.session = session);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  logout() {
    this.sessionService.destroyCurrentSession();
    this.session = null;
  }

  username(): string {
    return this.session == null ? '' : this.session.username();
  }

}

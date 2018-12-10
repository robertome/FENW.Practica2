import {Component, OnDestroy, OnInit} from '@angular/core';
import {AppMessage} from '../shared/models/app-message';
import {AppMessageService} from '../shared/services/app-message.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-message',
  templateUrl: './app-message.component.html',
  styleUrls: ['./app-message.component.css']
})
export class AppMessageComponent implements OnInit, OnDestroy {

  private subscription: Subscription;
  message: AppMessage;
  showMessage: boolean = false;

  constructor(private appMessageService: AppMessageService) {
  }

  ngOnInit() {
    this.subscription = this.appMessageService.subscribe(
      message => {
        this.message = message;
        this.showMessage = true;
      });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  close() {
    this.showMessage = false;
  }

}

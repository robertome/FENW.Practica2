import {Injectable} from '@angular/core';
import {AppMessage} from '../models/app-message';
import {Subject, Subscription} from 'rxjs';
import {AppMessageType} from '../models/app-message-type.enum';


@Injectable({
  providedIn: 'root'
})
export class AppMessageService {
  private subject = new Subject<AppMessage>();

  constructor() {
  }

  success(message: string) {
    this.subject.next(new AppMessage(AppMessageType.Success, message));
  }

  error(message: string) {
    this.subject.next(new AppMessage(AppMessageType.Error, message));
  }

  info(message: string) {
    this.subject.next(new AppMessage(AppMessageType.Info, message));
  }

  warning(message: string) {
    this.subject.next(new AppMessage(AppMessageType.Warning, message));
  }

  subscribe(next?: (value: AppMessage) => void, error?: (error: any) => void, complete?: () => void): Subscription {
    return this.subject.asObservable().subscribe(next, error, complete);
  }

}

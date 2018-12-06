import {Injectable} from '@angular/core';
import {Session} from '../models/session';
import {Subject} from 'rxjs';
import {Subscription} from 'rxjs/src/internal/Subscription';
import {AppMessage} from '../models/app-message';
import {PartialObserver} from 'rxjs/src/internal/types';

@Injectable({
  providedIn: 'root'
})
export class SessionService {
  private sessionKey = 'SESSION_KEY';

  private storageService;
  private currentSession: Session = null;
  private currentSessionSubject: Subject<Session> = new Subject();

  constructor() {
    this.storageService = sessionStorage;
    this.currentSession = this.loadSession();
  }

  setCurrentSession(session: Session): void {
    this.currentSession = session;

    console.log('Almacenada session ' + JSON.stringify(session));
    this.storageService.setItem(this.sessionKey, JSON.stringify(session));

    console.log('Notificando inicio de session a suscriptores...');
    this.currentSessionSubject.next(session);
  }

  private loadSession(): Session {
    var sessionStr = this.storageService.getItem(this.sessionKey);
    return (sessionStr) ? <Session> JSON.parse(sessionStr) : null;
  }

  getCurrentSession(): Session {
    return this.currentSession;
  }

  destroyCurrentSession() {
    this.storageService.removeItem(this.sessionKey);
    this.currentSession = null;
    this.currentSessionSubject.next(this.currentSession);
  }

  subscribe(next?: (value: AppMessage) => void, error?: (error: any) => void, complete?: () => void): Subscription {
    return this.currentSessionSubject.asObservable().subscribe(next, error, complete);
  }

  subscribe(observer?: PartialObserver<Session>): Subscription {
    return this.currentSessionSubject.asObservable().subscribe(observer);
  }

}

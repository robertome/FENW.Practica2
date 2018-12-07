import {Injectable} from '@angular/core';
import {Session} from '../models/session';
import {PartialObserver, Subject, Subscription} from 'rxjs';

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
    console.log("Session finalizada");

    this.storageService.removeItem(this.sessionKey);
    this.currentSession = null;
    this.currentSessionSubject.next(null);
  }

  subscribe(next?: (value: Session) => void, error?: (error: any) => void, complete?: () => void): Subscription {
    return this.currentSessionSubject.asObservable().subscribe(next, error, complete);
  }

}

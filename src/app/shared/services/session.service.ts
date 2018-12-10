import {Injectable} from '@angular/core';
import {Session} from '../models/session';
import {Subject, Subscription} from 'rxjs';
import {AppConfig} from '../app-config';
import {AppMessageService} from './app-message.service';

@Injectable({
  providedIn: 'root'
})
export class SessionService {
  private sessionKey = 'SESSION_KEY';

  private storageService;
  private currentSession: Session = null;
  private currentSessionSubject: Subject<Session> = new Subject();
  private pid: number;

  constructor(private appMessageService: AppMessageService) {
    this.storageService = sessionStorage;
  }

  setCurrentSession(session: Session): void {
    this.currentSession = session;

    console.log('Almacenada session ' + JSON.stringify(session));
    this.storageService.setItem(this.sessionKey, JSON.stringify(session));

    console.log('Notificando inicio de session a suscriptores...');
    this.currentSessionSubject.next(session);

    if (this.pid != null) {
      clearTimeout(this.pid);
    }
    this.pid = setTimeout(() => {
        this.appMessageService.info('La sesión ha expirado');
        this.destroyCurrentSession();
      },
      AppConfig.getInstance().sessionTimeout);
  }

  private loadSession(): Session {
    var sessionStr = this.storageService.getItem(this.sessionKey);
    return (sessionStr) ? <Session> JSON.parse(sessionStr) : null;
  }

  getCurrentSession(): Session {
    return this.currentSession;
  }

  destroyCurrentSession() {
    console.log('Session finalizada');

    this.storageService.removeItem(this.sessionKey);
    this.currentSession = null;
    this.currentSessionSubject.next(null);
    if (this.pid != null) {
      clearTimeout(this.pid);
      this.pid = null;
    }
  }

  subscribe(next?: (value: Session) => void, error?: (error: any) => void, complete?: () => void): Subscription {
    return this.currentSessionSubject.asObservable().subscribe(next, error, complete);
  }

}

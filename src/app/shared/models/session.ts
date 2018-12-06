import {User} from './user';

export class Session {
  private token: string;
  private user: User;

  constructor(token: string, user: User) {
    this.token = token;
    this.user = user;
  }

  username(): string {
    return this.user.username;
  }
}

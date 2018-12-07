export class User {
  username: string;
  password: string;
  email: string;
  birthDate: number;

  constructor() {
  }

  static of(username: string, password?: string, email?: string, birthDate?: Date): User {
    return {
      username: username,
      password: password,
      email: email,
      birthDate: birthDate != null? birthDate.getTime() : null
    };
  }

}

export class User {
  username: string;
  password: string;
  email: string;
  birthDate: number;

  constructor() {
  }

  static of(username: string, password?: string, email?: string, birthDate?: Date | string): User {
    let dateAsNumber: number;
    if (birthDate != null) {
      dateAsNumber = typeof birthDate === 'string' ? null : birthDate.getTime();
    }

    return {
      username: username,
      password: password,
      email: email,
      birthDate: dateAsNumber,
    };
  }

}

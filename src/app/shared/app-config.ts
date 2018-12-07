export class AppConfig {
  private static instance: AppConfig;

  private _urlRestApi = 'http://fenw.etsisi.upm.es:5555';
  private _urlUsers = `${this._urlRestApi}/users`;
  private _urlLogin = `${this._urlUsers}/login`;
  private _urlReservations = `${this._urlRestApi}/reservations`;

  private constructor() {
  }

  static getInstance() {
    if (!AppConfig.instance) {
      AppConfig.instance = new AppConfig();
    }
    return AppConfig.instance;
  }

  get urlRestApi(): string {
    return this._urlRestApi;
  }

  get urlUsers(): string {
    return this._urlUsers;
  }

  get urlLogin(): string {
    return this._urlLogin;
  }

  get urlReservations(): string {
    return this._urlReservations;
  }

}

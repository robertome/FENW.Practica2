import {BsDatepickerConfig} from 'ngx-bootstrap';

export class AppConfig {
  private static instance: AppConfig;

  private _urlRestApi = 'http://fenw.etsisi.upm.es:5555';
  private _urlUsers = `${this._urlRestApi}/users`;
  private _urlLogin = `${this._urlUsers}/login`;
  private _urlReservations = `${this._urlRestApi}/reservations`;

  private _datePickerConfig: Partial<BsDatepickerConfig> = Object.assign({}, {
    containerClass: 'theme-dark-blue',
    showWeekNumbers: false,
    dateInputFormat: 'DD/MM/YYYY'
  });

  private _courtsNumber : number = 4;
  private _startReservationHour: number = 10;
  private _lastReservationHour: number = 21;
  private _availableReservationMonths = 2;

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

  get datePickerConfig(): Partial<BsDatepickerConfig> {
    return this._datePickerConfig;
  }

  get courtsNumber(): number {
    return this._courtsNumber;
  }

  get startReservationHour(): number {
    return this._startReservationHour;
  }

  get lastReservationHour(): number {
    return this._lastReservationHour;
  }

  get availableReservationMonths(): number {
    return this._availableReservationMonths;
  }

}

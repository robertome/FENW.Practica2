import {Injectable} from '@angular/core';
import {Reservation} from '../models/reservation';
import {Observable, of, throwError} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {AppConfig} from '../app-config';
import {catchError, map} from 'rxjs/operators';
import {DateUtils} from '../utils/date-utils';

@Injectable({
  providedIn: 'root'
})
export class ReservationService {

  constructor(private http: HttpClient) {
  }

  createReservation(reservation: Reservation): Observable<boolean> {
    return this.http.post(AppConfig.getInstance().urlReservations,
      {'courtid': reservation.courtId, 'rsvdatetime': reservation.rsvdateTime})
      .pipe(
        map(response => true),
        catchError(error => {
            const errorMsg = error.status == 0 ? (error.message || 'Unknown Error') : (error.error || 'Unknown Server Error');
            return throwError(errorMsg);
          }
        )
      );
  }

  findReservations(date: Date): Observable<Reservation[]> {
    if (!date) {
      return throwError('Necesita seleccionar una fecha para utilizar el serviico');
    }

    return this.http.get<Reservation[]>(`${AppConfig.getInstance().urlReservations}/${date.getTime()}`)
      .pipe(
        map(reservations =>
          reservations.sort(
            (reservation1, reservation2) => {
              if (reservation1.courtId < reservation2.courtId) {
                return -1;
              } else if (reservation1.courtId > reservation2.courtId) {
                return 1;
              }
              return reservation1.rsvtime.localeCompare(reservation2.rsvtime);
            })
        ),
        catchError(error => {
            const errorMsg = error.status == 0 ? (error.message || 'Unknown Error') : (error.error || 'Unknown Server Error');
            return throwError(errorMsg);
          }
        )
      );
  }

  findReservationsMap(date: Date): Observable<Map<number, Reservation[]>> {
    return this.findReservations(date)
      .pipe(
        map(
          reservations => {
            const map: Map<number, Reservation[]> = this.initMap(AppConfig.getInstance().courtsNumber);
            reservations.forEach(reservation => map.get(reservation.courtId).push(reservation));

            console.log(`Reservations for date: ${date}`);
            console.dir(map);

            return map;
          }),
        catchError(error => {
          return throwError(error);
        })
      );
  }

  private initMap(courtsNumber: number): Map<number, Reservation[]> {
    const map: Map<number, Reservation[]> = new Map();
    for (let i = 1; i < courtsNumber + 1; i++) {
      map.set(i, []);
    }

    return map;
  }

  findAvailableReservationsMap(date: Date): Observable<Map<number, Reservation[]>> {
    return this.findReservationsMap(date)
      .pipe(
        map(reservationsMap => this.buildAvailableReservationsMap(date, reservationsMap)),
        catchError(error => throwError(error))
      );
  }

  private buildAvailableReservationsMap(date: Date, reservationsMap: Map<number, Reservation[]>): Map<number, Reservation[]> {
    const availableReservationsMap: Map<number, Reservation[]> = new Map();
    reservationsMap.forEach(
      (reservations, courtId) => availableReservationsMap.set(courtId, this.buildAvailableReservationsForCourt(date, courtId, reservations))
    );

    console.log('Available Reservations');
    console.dir(availableReservationsMap);

    return availableReservationsMap;
  }

  private buildAvailableReservationsForCourt(date: Date, courtId: number, reservations: Reservation[]): Reservation[] {
    let lastReservationHour = AppConfig.getInstance().lastReservationHour;
    let startReservationHour = AppConfig.getInstance().startReservationHour;
    if (DateUtils.isDateToday(date) && date.getHours() > startReservationHour) {
      startReservationHour = date.getHours();
    }

    let availableReservations = [];
    for (let hour = startReservationHour; hour <= lastReservationHour; hour++) {
      const time = `${hour}:00`;
      if (!reservations.find(reservation => reservation.rsvtime == time)) {
        availableReservations.push(Reservation.of(courtId, this.buildAvailableDateFrom(date, hour)));
      }
    }

    return availableReservations;
  }

  private buildAvailableDateFrom(date: Date, hour: number) {
    const availableDate = new Date(date.getTime());
    availableDate.setHours(hour);
    availableDate.setMinutes(0);
    availableDate.setSeconds(0);
    availableDate.setMilliseconds(0);

    return availableDate;
  }

}

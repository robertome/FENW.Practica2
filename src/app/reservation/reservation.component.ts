import {Component, OnInit, ViewChild} from '@angular/core';
import {ReservationService} from '../shared/services/reservation.service';
import {Reservation} from '../shared/models/reservation';
import {AppMessageService} from '../shared/services/app-message.service';
import {AppConfig} from '../shared/app-config';
import {DateUtils} from '../shared/utils/date-utils';

@Component({
  selector: 'app-reservation',
  templateUrl: './reservation.component.html',
  styleUrls: ['./reservation.component.css']
})
export class ReservationComponent implements OnInit {

  @ViewChild('reservationForm') reservationForm;

  reservationDate: Date;
  reservationSelected: Reservation;
  availableReservationsMap: Map<number, Reservation[]>;

  datePickerConfig = AppConfig.getInstance().datePickerConfig;
  minDate: Date;
  maxDate: Date;

  showAvailableReservationsLoading: boolean;

  constructor(private reservationService: ReservationService, private appMessageService: AppMessageService) {
  }

  ngOnInit() {
    this.showAvailableReservationsLoading = false;
    this.reservationSelected = null;
    this.maxDate = DateUtils.currentDatePlusMonths(AppConfig.getInstance().availableReservationMonths);

    this.minDate = this.buildMinDate();
    this.reservationDate = this.minDate;
  }

  onReservationDateValueChange(date: Date) {
    if (date == null) {
      return;
    }

    this.showAvailableReservationsLoading = true;
    this.reservationSelected = null;
    this.availableReservationsMap = null;

    this.reservationService.findAvailableReservationsMap(date).subscribe(
      availableReservationsMap => this.availableReservationsMap = availableReservationsMap,
      error => this.appMessageService.error(`Fallo al obtener lista de reservas: ${error}`),
      () => this.showAvailableReservationsLoading = false
    );
  }

  onClickReservation(reservation: Reservation) {
    this.reservationSelected = reservation;
  }

  onSubmit() {
    const lastReservationDate = new Date(this.reservationDate);
    this.reservationService.createReservation(this.reservationSelected).subscribe(
      ok => this.appMessageService.success(
        `Reserva realizada para la pista ${this.reservationSelected.courtId} el día ${this.reservationSelected.crsvday} ${this.reservationSelected.rsvtime}`),
      error => this.appMessageService.error(`Fallo al crear reserva: ${error}`),
      () => {
        this.showAvailableReservationsLoading = false;
        this.reservationSelected = null;
        this.reservationForm.reset();
        this.reservationDate = lastReservationDate;
      }
    );
  }

  isReservationSelected(): boolean {
    return this.reservationSelected != null;
  }

  private buildMinDate(): Date {
    const currentDate = new Date();
    const lastReservationHour = AppConfig.getInstance().lastReservationHour;
    console.log('currentHour:' + currentDate.getHours());
    console.log('currentdate.getDate():' + currentDate.getDate());
    console.log('currentDate + 1 day: ' + DateUtils.nextDay());
    console.log(`${new Date().getTime()} == ${Date.now()}`);
    return currentDate.getHours() < lastReservationHour ? currentDate : DateUtils.nextDay();
  }
}

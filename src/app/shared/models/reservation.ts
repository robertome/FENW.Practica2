export class Reservation {

  constructor(public rsvId: number,
              public courtId: number,
              public rsvdateTime: number,
              public crsvday: string,
              public rsvtime: string) {
  }

  static of(courtId: number, date: Date) {
    const strTime = `${date.getHours()}:00`;
    const strDay = `${date.getDay()}/${date.getMonth()}/${date.getFullYear()}`;

    return new Reservation(null, courtId, date.getTime(), strDay, strTime);
  }

}

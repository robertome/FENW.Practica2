export class DateUtils {

  public static isDateToday(date: Date): boolean {
    const currentDate = new Date();
    return currentDate.getFullYear() == date.getFullYear()
      && currentDate.getMonth() == date.getMonth()
      && currentDate.getDay() == date.getDay();
  }


  static currentDatePlusMonths(months: number): Date {
    return new Date(Date.now() + (months * 30 * 24 * 60 * 60 * 1000));
  }

  static currentDatePlusDays(days: number) {
    return new Date(Date.now() + (days * 24 * 60 * 60 * 1000));
  }

  static nextDay() {
    let nextDay = DateUtils.currentDatePlusDays(1);
    console.log('nextDay=' + nextDay);
    nextDay.setHours(0);
    nextDay.setMinutes(0);
    nextDay.setSeconds(0);
    nextDay.setMinutes(0);
    console.log('nextDay=' + nextDay);

    return nextDay;
  }
}

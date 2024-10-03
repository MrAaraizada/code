export class LocaleCalendars {
  static getLocaleCalendar(locale: string) { return new Intl.DateTimeFormat(locale); }
}

export class TimezoneSupport {
  static getTimezone() { return Intl.DateTimeFormat().resolvedOptions().timeZone; }
}

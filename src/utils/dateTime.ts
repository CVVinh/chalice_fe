import moment from "moment";
import momentTimeZone from "moment-timezone";

export default {
  getCurrentDate() {
    return new Date().toISOString().slice(0, 10);
  },
  toDate(dateStr: string) {
    return dateStr ?? new Date(dateStr);
  },

  toMonth(dateStr: string) {
    return dateStr ?? moment(new Date(dateStr)).format("YYYY/MM");
  },
  //convert date data form string
  formatDate(input: string) {
    return input ? new Date(input).toISOString().slice(0, 10) : null;
  },
  formatDateTime(input: string) {
    return input
      ? new Date(input).toISOString().replace(/T/, " ").replace(/\..+/, "")
      : null;
  },
  convertToCurrentTimeZone(dateStr: string, dateFormat: string) {
    const tz = momentTimeZone.tz.guess();
    return moment.tz(dateStr, dateFormat, tz).utc().format(dateFormat);
  },
  //convert date data form string
  formatDateBackSlash(input: string) {
    return input ? moment(new Date(input)).format("YYYY/MM/DD") : null;
  },
  formatDateWithValue(date: any) {
    return moment(new Date(date)).format("YYYY/MM/DD");
  },
  formatDateTimeBackSlash(input: string) {
    return input ? moment(new Date(input)).format("YYYY/MM/DD HH:mm") : null;
  },
  formatDateTimeWithValue(date: any) {
    return moment(new Date(date)).format("YYYY/MM/DD HH:mm");
  },
  getMaxDateInMonth(date: Date) {
    const getAllDayInMonth = moment(
      moment(date).format("YYYY/MM/DD"),
      "YYYY-MM"
    ).daysInMonth();
    return moment(date).format(`YYYY/MM/${getAllDayInMonth}`);
  },
  calculatorDay(date1: any, date2: any) {
    var result = new Date(date2).valueOf() - new Date(date1).valueOf();
    var timeDiff = Math.abs(result);
    var daysDiff = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));

    return daysDiff;
  },
  calculatorTime(date1: any, date2: any) {
    const duration = moment.duration(moment(date2).diff(moment(date1)));
    const hours = duration.hours();
    const minutes = duration.minutes();
    const seconds = duration.seconds();

    return { hours: hours, minutes: minutes, seconds: seconds };
  },
  calculatorTimePrint(date1: any, date2: any) {
    var getTime = this.calculatorTime(date1, date2);

    return `${getTime.hours} giờ, ${getTime.minutes} phút, ${getTime.seconds} giây`;
  },
  calculatorDayTime(date1: any, date2: any) {
    var duration = new Date(date2).getTime() - new Date(date1).getTime();
    duration = Math.abs(duration);
    var days = Math.floor(duration / (1000 * 60 * 60 * 24));
    var hours = Math.floor(
      (duration % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    var minutes = Math.floor((duration % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((duration % (1000 * 60)) / 1000);

    return { days: days, hours: hours, minutes: minutes, seconds: seconds };
  },
  calculatorDayTimePrint(date1: any, date2: any) {
    var getDayTime = this.calculatorDayTime(date1, date2);
    return `${getDayTime.days} ngày: ${getDayTime.hours} giờ: ${getDayTime.minutes} phút: ${getDayTime.seconds} giây`;
  },
  calculatorDayTimeByNumber(date1: any, date2: any) {
    var getDayTime = this.calculatorDayTime(date1, date2);
    var sumTime =
      Number(getDayTime.days) * 24 +
      (Number(getDayTime.hours) + Number(getDayTime.minutes > 0 ? 1 : 0));
    return sumTime;
  },
};

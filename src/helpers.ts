import moment from "moment";

export const checkIsSameMonthAndYear = ({ month, year }, date: moment.Moment) =>
  date.year() === year && date.month() === month;

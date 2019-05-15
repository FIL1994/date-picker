import React, { useContext } from "react";
import moment from "moment";
import { Context } from ".";

const DAYS_IN_CALENDAR = 42;

interface Props {}

export const Days: React.SFC<Props> = props => {
  const { viewDate } = useContext(Context);

  const year = viewDate.year();
  const month = viewDate.month();

  let prevMonth = viewDate.clone().subtract(1, "month");
  const days = prevMonth.daysInMonth();

  // change to first day of last week in previous month
  prevMonth.date(days).startOf("week");
  const daysToAdd = days + 1 - prevMonth.date();

  const firstDay = prevMonth.date();
  const today = moment().date();
  let dayCells: { children: number; className: string }[] = Array.from(
    {
      length: daysToAdd
    },
    (_v, i) => ({ children: i + firstDay, className: "old" })
  ).concat(
    Array.from(
      {
        length: viewDate.daysInMonth()
      },
      (_v, i) => ({
        children: i + 1,
        className: i + 1 === today ? "today" : ""
      })
    )
  );

  dayCells = dayCells.concat(
    Array.from(
      {
        length: DAYS_IN_CALENDAR - dayCells.length
      },
      (_v, i) => ({ children: i + 1, className: "new" })
    )
  );

  return (
    <>
      {dayCells.map((cellProps, index) => (
        <div
          key={`${viewDate.format("YYYY-MM")}-${index}`}
          {...cellProps}
          className={`day ${cellProps.className}`}
          onClick={() => {
            const { children: day, className } = cellProps;
            let dateMonth = month;
            let dateYear = year;

            if (className.indexOf("old") !== -1) {
              if (month === 0) {
                dateYear--;
                dateMonth = 11;
              } else {
                dateMonth--;
              }
            } else if (className.indexOf("new") !== -1) {
              if (month === 11) {
                dateYear++;
                dateMonth = 0;
              } else {
                dateMonth++;
              }
            }

            const date = moment({
              day,
              year: dateYear,
              month: dateMonth
            });
            console.log(date.format("YYYY-MM-DD"));
          }}
        />
      ))}
    </>
  );
};

export default Days;

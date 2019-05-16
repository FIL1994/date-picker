import React, { useContext } from "react";
import moment from "moment";
import { Context } from ".";
import { checkIsSameMonthAndYear } from "./helpers";

const DAYS_IN_CALENDAR = 42;

export const Days: React.FunctionComponent<{}> = () => {
  const context = useContext(Context);
  const { viewDate, dateSelected } = context;

  const year = viewDate.year();
  const month = viewDate.month();

  let prevMonth = viewDate.clone().subtract(1, "month");
  const days = prevMonth.daysInMonth();

  // change to first day of last week in previous month
  prevMonth.date(days).startOf("week");
  const daysInPrevMonth = days + 1 - prevMonth.date();

  const firstDay = prevMonth.date();
  const isSameMonthAndYearAsSelected = checkIsSameMonthAndYear(
    { month, year },
    dateSelected
  );

  let dayCells: { children: number; className: string }[] =
    // add days from previous month
    Array.from(
      {
        length: daysInPrevMonth
      },
      (_v, i) => ({ children: i + firstDay, className: "old" })
    ).concat(
      // add days from this month
      Array.from(
        {
          length: viewDate.daysInMonth()
        },
        (_v, i) => ({
          children: i + 1,
          className:
            isSameMonthAndYearAsSelected && i + 1 === dateSelected.date()
              ? "date-selected"
              : ""
        })
      )
    );

  // add days from next month
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

            context.onChange(
              moment({
                day,
                year: dateYear,
                month: dateMonth
              })
            );
          }}
        />
      ))}
    </>
  );
};

export default Days;

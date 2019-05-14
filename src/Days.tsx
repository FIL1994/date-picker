import React, { useContext } from "react";
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
      (_v, i) => ({ children: i + 1, className: "" })
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
        />
      ))}
    </>
  );
};

export default Days;

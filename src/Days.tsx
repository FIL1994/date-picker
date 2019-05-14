import React, { useContext } from "react";
import moment from "moment";
import { Context } from ".";

interface Props {
  viewDate: moment.Moment;
}

export const Days: React.SFC<Props> = props => {
  const { viewDate } = useContext(Context);

  const t = performance.now();

  const year = props.viewDate.year();
  const month = props.viewDate.month();

  let prevMonth = props.viewDate.clone().subtract(1, "month");
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
        length: props.viewDate.daysInMonth()
      },
      (_v, i) => ({ children: i + 1, className: "" })
    )
  );

  dayCells = dayCells.concat(
    Array.from(
      {
        length: 7 - (dayCells.length % 7)
      },
      (_v, i) => ({ children: i + 1, className: "new" })
    )
  );

  console.log("time", performance.now() - t);

  return (
    <div className="days">
      {dayCells.map((cellProps, index) => (
        <div
          key={`${props.viewDate.format("YYYY-MM")}-${index}`}
          {...cellProps}
        />
      ))}
    </div>
  );
};

export default Days;

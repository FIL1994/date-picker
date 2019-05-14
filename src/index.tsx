import * as React from "react";
import moment from "moment";
import "./calendar.less";
import Days from "./Days";

interface Props {
  text?: string;
}

window.moment = moment;

export const DateSelector: React.SFC<Props> = props => {
  const date = moment();

  return (
    <div className="calendar">
      <time className="title" dateTime={date.format("YYYY-MM")}>
        {date.format("MMMM YYYY")}
      </time>
      <Days viewDate={date} />
    </div>
  );
};

export default DateSelector;

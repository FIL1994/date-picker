import * as React from "react";
import "./calendar.less";

interface Props {
  text?: string;
}

export const DateSelector: React.SFC<Props> = props => {
  return (
    <div className="calendar">
      <div className="title">Date Selector</div>
    </div>
  );
};

export default DateSelector;

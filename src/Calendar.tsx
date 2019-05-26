import React, { useContext, useMemo } from "react";
import * as ReactDOM from "react-dom";
import moment from "moment";
import { Context } from ".";
import Days from "./Days";

const Calendar = () => {
  const context = useContext(Context);
  const { viewDate, setViewDate } = context;
  const weekdays = useMemo(() => moment.weekdaysMin(), []);

  function onNext() {
    setViewDate(
      viewDate
        .clone()
        .startOf("month")
        .add(1, "month")
    );
  }

  function onBack() {
    setViewDate(
      viewDate
        .clone()
        .startOf("month")
        .subtract(1, "month")
    );
  }

  return ReactDOM.createPortal(
    <div className="date-picker-calendar">
      <div className="header">
        <span className="back" onClick={onBack}>{`<`}</span>
        <time className="title" dateTime={viewDate.format("YYYY-MM")}>
          {viewDate.format("MMMM YYYY")}
        </time>
        <span className="next" onClick={onNext}>{`>`}</span>
      </div>
      <div className="days">
        {weekdays.map(weekday => (
          <div className="weekday" key={weekday}>
            {weekday}
          </div>
        ))}
        <Days />
      </div>
    </div>,
    document.querySelector("body")
  );
};

export default Calendar;

import React, { useState, useMemo } from "react";
import moment from "moment";
import "./calendar.less";
import Days from "./Days";

export const Context = React.createContext({ viewDate: moment() });

window.moment = moment;

interface Props {
  selectedDate?: moment.Moment;
}

type DateSelectorContext = {
  viewDate: moment.Moment;
  selectedDate?: moment.Moment;
};

export const DateSelector: React.SFC<Props> = props => {
  const [viewDate, setViewDate] = useState(() => moment());
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

  return (
    <Context.Provider value={{ viewDate, setViewDate }}>
      <div className="calendar">
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
      </div>
    </Context.Provider>
  );
};

export default DateSelector;

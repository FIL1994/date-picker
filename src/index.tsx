import React, { useState, useMemo } from "react";
import moment from "moment";
import "./calendar.less";
import Days from "./Days";

window.moment = moment;

type DateSelectorContext = {
  viewDate: moment.Moment;
  dateSelected?: moment.Moment;
  setViewDate?: React.Dispatch<React.SetStateAction<moment.Moment>>;
  onChange?: (date: moment.Moment) => void;
};

export const Context: React.Context<DateSelectorContext> = React.createContext({
  viewDate: moment()
});

interface Props {
  date: moment.Moment;
  onChange: (date: moment.Moment) => void;
}

export const DateSelector: React.FunctionComponent<Props> = props => {
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
    <Context.Provider
      value={{
        viewDate,
        setViewDate,
        dateSelected: props.date,
        onChange: props.onChange
      }}
    >
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

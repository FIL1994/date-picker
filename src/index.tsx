import React, { useContext, useState } from "react";
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

  return (
    <Context.Provider value={{ viewDate, setViewDate }}>
      <div className="calendar">
        <div className="header">
          <span className="back">{`<`}</span>
          <time className="title" dateTime={viewDate.format("YYYY-MM")}>
            {viewDate.format("MMMM YYYY")}
          </time>
          <span className="next">{`>`}</span>
        </div>
        <Days viewDate={viewDate} />
      </div>
    </Context.Provider>
  );
};

export default DateSelector;

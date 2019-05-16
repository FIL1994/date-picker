import React, { useState } from "react";
import moment from "moment";
import Calendar from "./Calendar";
import "./calendar.less";

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

  return (
    <Context.Provider
      value={{
        viewDate,
        setViewDate,
        dateSelected: props.date,
        onChange: props.onChange
      }}
    >
      <Calendar />
    </Context.Provider>
  );
};

export default DateSelector;

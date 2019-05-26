import React, { useState } from "react";
import moment from "moment";
import Calendar from "./Calendar";
import Input from "./Input";
import Overlay from "./Overlay";
import "./calendar.less";

interface DateSelectorContext {
  viewDate: moment.Moment;
  dateSelected?: moment.Moment;
  setViewDate?: React.Dispatch<React.SetStateAction<moment.Moment>>;
  onChange?: (date: moment.Moment) => void;
}

export const Context: React.Context<DateSelectorContext> = React.createContext({
  viewDate: moment()
});

interface Props {
  date: moment.Moment;
  onChange: (date: moment.Moment) => void;
}

const DateSelector: React.FunctionComponent<Props> = props => {
  const [viewDate, setViewDate] = useState(() => moment());
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Context.Provider
      value={{
        viewDate,
        setViewDate,
        dateSelected: props.date,
        onChange: props.onChange
      }}
    >
      <span className="date-picker">
        <Input onFocus={() => setIsOpen(true)} />
        {isOpen && (
          <>
            <Calendar />
            <Overlay onFocus={() => setIsOpen(false)} />
          </>
        )}
      </span>
    </Context.Provider>
  );
};

export default DateSelector;

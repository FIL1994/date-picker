import React, { useState, useContext } from "react";
import { useId } from "@reach/auto-id";
import { Context } from ".";
import "./input.less";

const ranges = {
  YEAR: [0, 4],
  MONTH: [4, 6],
  DAY: [6, 8]
};

function format(value: Readonly<string>): string {
  let filteredValue = value.replace(/[^0-9]/g, "");
  let year = filteredValue.slice(...ranges.YEAR) || "YYYY";
  let month = filteredValue.slice(...ranges.MONTH) || "MM";
  let day = filteredValue.slice(...ranges.DAY) || "DD";

  return `${year}-${month}-${day}`;
}

const Input = () => {
  const context = useContext(Context);
  const [date, setDate] = useState(context.dateSelected.format("YYYY-MM-DD"));
  const id = useId();
  const labelId = `date-picker-${id}`;

  return (
    <>
      <label htmlFor={labelId}>Date Selector</label>
      <input
        id={labelId}
        type="text"
        value={format(date)}
        onChange={({ target }) => {
          const value = target.value.replace(/[^0-9]/g, "");
          setDate(value);

          const { selectionStart, selectionEnd } = target;

          setTimeout(() =>
            target.setSelectionRange(selectionStart, selectionEnd)
          );
        }}
      />
    </>
  );
};

export default Input;

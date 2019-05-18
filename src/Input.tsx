import React, { useState, useContext } from "react";
import { useId } from "@reach/auto-id";
import { Context } from ".";
import "./input.less";

function format(value: Readonly<string>): string {
  let filteredValue = value.replace(/[^0-9]/g, "");
  let year = filteredValue.slice(0, 4);
  let month = filteredValue.slice(4, 6);
  let day = filteredValue.slice(6, 8);

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
        onChange={e => {
          const value = e.target.value.replace(/[^0-9]/g, "");
          console.log(value);
          setDate(value);
        }}
      />
    </>
  );
};

export default Input;

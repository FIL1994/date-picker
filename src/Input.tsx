import React, { useState, useContext, useRef, Ref, useEffect } from "react";
import { useId } from "@reach/auto-id";
import { Context } from ".";
import "./input.less";

interface Ranges {
  YEAR: Readonly<[number, number]>;
  MONTH: Readonly<[number, number]>;
  DAY: Readonly<[number, number]>;
}

interface DateObject {
  year: Readonly<string>;
  month: Readonly<string>;
  day: Readonly<string>;
}

const DATE_FORMAT = "YYYYMMDD";

const RangesFiltered: Ranges = {
  YEAR: [0, 4],
  MONTH: [4, 6],
  DAY: [6, 8]
};

const Ranges: Ranges = {
  YEAR: [0, 4],
  MONTH: [5, 7],
  DAY: [8, 10]
};

function splitDate(date: Readonly<string>) {
  let filteredValue = date.replace(/[^0-9]/g, "");
  let year = filteredValue.slice(...RangesFiltered.YEAR) || "YYYY";
  let month = filteredValue.slice(...RangesFiltered.MONTH) || "MM";
  let day = filteredValue.slice(...RangesFiltered.DAY) || "DD";

  return {
    year,
    month,
    day
  };
}

function formatDate({ year, month, day }: DateObject): Readonly<string> {
  return `${year.padStart(4, "0")}-${month.padStart(2, "0")}-${day.padStart(
    2,
    "0"
  )}`;
}

function getRangeFromSelection(selectionStart: number, selectionEnd: number) {
  const range = Object.entries(Ranges).find(([, [start, end]]) => {
    const isInRange = value => value >= start && value <= end;

    return isInRange(selectionStart) && isInRange(selectionEnd);
  });

  return range ? range[0] : undefined;
}

function incrementGranularity(
  granularity: string,
  min: number,
  max: number
): string {
  let newGranularity = Number(granularity);
  if (isNaN(newGranularity)) return granularity;

  if (newGranularity === max) {
    newGranularity = min;
  } else {
    newGranularity = Math.min(newGranularity + 1, max);
  }

  return newGranularity.toString();
}

function decrementGranularity(
  granularity: string,
  min: number,
  max: number
): string {
  let newGranularity = Number(granularity);
  if (isNaN(newGranularity)) return granularity;

  if (newGranularity === min) {
    newGranularity = max;
  } else {
    newGranularity = Math.max(newGranularity - 1, min);
  }

  return newGranularity.toString();
}

const Input = () => {
  const ref: Ref<null | HTMLInputElement> = useRef();
  const context = useContext(Context);
  const [date, setDate] = useState(context.dateSelected.format(DATE_FORMAT));
  const id = useId();
  const labelId = `date-picker-${id}`;

  useEffect(() => {
    setDate(context.dateSelected.format(DATE_FORMAT));
  }, [context.dateSelected]);

  return (
    <>
      <label htmlFor={labelId}>Date Selector</label>
      <input
        ref={ref}
        id={labelId}
        type="text"
        value={formatDate(splitDate(date))}
        onChange={({ target }) => {
          const value = target.value.replace(/[^0-9]/g, "");
          setDate(value);

          const { selectionStart, selectionEnd } = target;

          setTimeout(() =>
            target.setSelectionRange(selectionStart, selectionEnd)
          );
        }}
        onKeyDown={event => {
          // event.shiftKey
          const { target }: any = event;
          const { selectionStart, selectionEnd } = target;

          const setRange = (range: Readonly<[number, number]>) => {
            if (ref.current) {
              setTimeout(() => {
                ref.current.setSelectionRange(...range);
              });
            }
          };

          function handleKey(setGranularity: Function) {
            const range = getRangeFromSelection(selectionStart, selectionEnd);
            if (!range) return;

            const dateObject = splitDate(date);

            switch (range) {
              case "YEAR": {
                dateObject.year = setGranularity(dateObject.year, 0, 9999);
                setDate(formatDate(dateObject));
                setRange(Ranges.YEAR);
                break;
              }
              case "MONTH": {
                dateObject.month = setGranularity(dateObject.month, 1, 12);
                setDate(formatDate(dateObject));
                setRange(Ranges.MONTH);
                break;
              }
              case "DAY": {
                dateObject.day = setGranularity(dateObject.day, 1, 31);
                setDate(formatDate(dateObject));
                setRange(Ranges.DAY);
                break;
              }
            }
          }

          switch (event.key) {
            case "ArrowUp": {
              handleKey(incrementGranularity);
              break;
            }
            case "ArrowDown": {
              handleKey(decrementGranularity);
              break;
            }
            case "Tab": {
            }
            default: {
            }
          }
        }}
      />
    </>
  );
};

export default Input;

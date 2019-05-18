import React, { useState, useContext, useRef, Ref } from "react";
import { useId } from "@reach/auto-id";
import { Context } from ".";
import "./input.less";

interface Ranges {
  YEAR: [number, number];
  MONTH: [number, number];
  DAY: [number, number];
}

interface DateObject {
  year: Readonly<string>;
  month: Readonly<string>;
  day: Readonly<string>;
}

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

function incrementGranularity(granularity: string, max: number): string {
  let newGranularity = Number(granularity);
  if (isNaN(newGranularity)) return granularity;

  newGranularity = Math.min(newGranularity + 1, max);
  return newGranularity.toString();
}

const Input = () => {
  const ref: Ref<null | HTMLInputElement> = useRef();
  const context = useContext(Context);
  const [date, setDate] = useState(context.dateSelected.format("YYYYMMDD"));
  const id = useId();
  const labelId = `date-picker-${id}`;

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

          switch (event.key) {
            case "ArrowUp": {
              const range = getRangeFromSelection(selectionStart, selectionEnd);
              if (!range) return;

              const dateObject = splitDate(date);

              switch (range) {
                case "YEAR": {
                  dateObject.year = incrementGranularity(dateObject.year, 9999);
                  setDate(formatDate(dateObject));

                  if (ref.current) {
                    setTimeout(() => {
                      ref.current.setSelectionRange(...Ranges.YEAR);
                    });
                  }
                  break;
                }
                case "MONTH": {
                  dateObject.month = incrementGranularity(dateObject.month, 12);
                  setDate(formatDate(dateObject));

                  if (ref.current) {
                    setTimeout(() => {
                      ref.current.setSelectionRange(...Ranges.MONTH);
                    });
                  }
                  break;
                }
                case "DAY": {
                  dateObject.day = incrementGranularity(dateObject.day, 31);
                  setDate(formatDate(dateObject));

                  if (ref.current) {
                    setTimeout(() => {
                      ref.current.setSelectionRange(...Ranges.DAY);
                    });
                  }
                  break;
                }
              }
            }
            case "ArrowDown": {
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

import React, { useState } from "react";
import moment from "moment";

import { storiesOf } from "@storybook/react";
import Calendar from "../src/index.tsx";
import { withInfo } from "@storybook/addon-info";

window.moment = moment;

storiesOf("Calendar", module)
  .addDecorator(withInfo)
  .add("default", () => {
    const CalendarExample = () => {
      const [date, setDate] = useState(moment());

      return (
        <Calendar
          date={date}
          onChange={date => {
            setDate(date);
            console.log(date.format("YYYY-MM-DD"), date);
          }}
        />
      );
    };

    return <CalendarExample />;
  });

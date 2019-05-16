import React from "react";
import moment from "moment";

import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import Calendar from "../src/index.tsx";
import { withInfo } from "@storybook/addon-info";

storiesOf("Calendar", module)
  .addDecorator(withInfo)
  .add("default", () => {
    const date = moment();

    return (
      <Calendar
        date={date}
        onChange={date => console.log(date.format("YYYY-MM-DD"), date)}
      />
    );
  });

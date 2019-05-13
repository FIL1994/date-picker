import React from "react";

import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import Calendar from "../src/index.tsx";
import { withInfo } from "@storybook/addon-info";

storiesOf("Calendar", module)
  .addDecorator(withInfo)
  .add("default", () => <Calendar />);

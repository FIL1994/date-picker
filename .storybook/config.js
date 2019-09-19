import { configure, addDecorator, addParameters } from "@storybook/react";
import { withA11y } from "@storybook/addon-a11y";
import { create } from "@storybook/theming";

addDecorator(withA11y);

addParameters({
  options: {
    theme: create({
      base: "light",
      brandTitle: "date-picker",
      brandUrl: "https://github.com/FIL1994/date-picker"
    })
  }
});

// automatically import all files ending in *.stories.js
configure(require.context("../stories", true, /\.stories\.js$/), module);

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
const req = require.context("../stories", true, /\.stories\.(js|tsx)$/);
function loadStories() {
  req.keys().forEach(filename => req(filename));
}

configure(loadStories, module);

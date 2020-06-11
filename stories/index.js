import React from "react";
import { storiesOf } from "@storybook/react";

import { CircleLoader } from "../src/widgets";

storiesOf("CircleLoader", module).add("Red to Yellow", () => (
  <CircleLoader primaryColor={"#ff0000"} secondaryColor={"yellow"} />
));

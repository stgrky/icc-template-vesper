import { defineCliConfig } from "sanity/cli";

import { dataset, projectId } from "./src/sanity/env";

export default defineCliConfig({
  api: {
    projectId,
    dataset,
  },
  studioHost: "icc-grove-demo",
  deployment: { autoUpdates: true, appId: "gsuv947sdzrhlbnn3c6n7opa" },
});

import { defineCliConfig } from "sanity/cli";

import { dataset, projectId } from "./src/sanity/env";

export default defineCliConfig({
  api: {
    projectId,
    dataset,
  },
  // RUNBOOK gate 1b. This arrived from the Grove scaffold reading
  // "icc-grove-demo" with Grove's appId beside it: a deploy from here would
  // have published Vesper's Studio over Grove's live URL, pointed at a
  // different project, while Grove's users carried on visiting it.
  //
  // `appId` is deliberately absent. On the first `sanity deploy` the CLI
  // refuses and prints a NEW appId for this Studio app — paste that one here.
  // Pasting the old one back is the mistake the gate exists to catch.
  studioHost: "icc-vesper-demo",
  // Issued by the CLI on Vesper's first deploy, 2026-10-10. This is the
  // NEW id, not the one inherited from Grove.
  deployment: { autoUpdates: true, appId: "rf65iad8s2rzgb4xf03idktf" },
});

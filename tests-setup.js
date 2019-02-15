import * as path from "path";

export default async function() {
  // Allow edits to the config object in tests.
  process.env.ALLOW_CONFIG_MUTATIONS = "y";
}

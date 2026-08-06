import { defineCliConfig } from "sanity/cli";

// Hardcoded (not read from .env.local) because the Sanity CLI runs outside
// Next.js's env-loading, so NEXT_PUBLIC_* vars aren't guaranteed to be set.
export default defineCliConfig({
  api: {
    projectId: "tvnf2gzc",
    dataset: "production",
  },
  deployment: {
    appId: "i1zkex9mmwpp0d7rqza8ixrf",
  },
});

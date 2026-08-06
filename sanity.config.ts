import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import { schema } from "./sanity/schemaTypes";
import { deskStructure } from "./sanity/deskStructure";

// Hardcoded, not imported from ./sanity/env -- that module throws at import
// time if process.env.NEXT_PUBLIC_* is missing (fine under Next.js's webpack,
// which inlines those vars), and since ESM executes a whole module on import
// regardless of which named export you use, even importing just apiVersion
// from it would still trigger that throw here. This config is built by the
// Sanity CLI's own Vite-based bundler (`sanity deploy`), which doesn't do
// that inlining, so these must stay fully independent literals.
// Must match sanity.cli.ts and sanity/env.ts.
const projectId = "tvnf2gzc";
const dataset = "production";
const apiVersion = "2026-08-01";

export default defineConfig({
  projectId,
  dataset,
  schema,
  plugins: [
    structureTool({ structure: deskStructure }),
    visionTool({ defaultApiVersion: apiVersion }),
  ],
});

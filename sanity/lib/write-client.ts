import "server-only";
import { createClient, type SanityClient } from "next-sanity";
import { apiVersion, dataset, projectId } from "../env";

// Lazily created (not a top-level const) so that Next's build-time page-data
// collection -- which evaluates route modules without calling their handlers
// -- doesn't fail just because SANITY_API_TOKEN isn't set at build time. It's
// a runtime-only secret: only actually needed when a request hits a route
// that calls getWriteClient().
let client: SanityClient | undefined;

export function getWriteClient(): SanityClient {
  if (client) return client;

  const token = process.env.SANITY_API_TOKEN;
  if (!token) {
    throw new Error("Missing environment variable: SANITY_API_TOKEN");
  }

  client = createClient({ projectId, dataset, apiVersion, useCdn: false, token });
  return client;
}

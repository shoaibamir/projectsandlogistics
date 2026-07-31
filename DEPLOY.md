# Deploying to Cloudflare Workers

This app deploys via the [OpenNext Cloudflare adapter](https://opennext.js.org/cloudflare), which builds the Next.js app and ships it as a Cloudflare Worker.

## Prerequisites

- A Cloudflare account, logged in locally via `npx wrangler login` (check current status with `npx wrangler whoami`)
- `.env.local` present locally with valid Supabase values (see below) — never committed, already covered by `.gitignore`

## Environment variables

The app currently reads two Supabase values, both in [lib/supabaseClient.ts](lib/supabaseClient.ts):

- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`

**These are not set anywhere in `wrangler.jsonc`, and they should not be.** They're also intentionally *not* configured via `wrangler secret put`. Here's why, since it's a common point of confusion:

`NEXT_PUBLIC_*` variables are inlined by Next.js directly into the built JavaScript **at build time** — both the client bundle and any server code that references them. By the time a Cloudflare Worker is running, the values are already baked into the shipped code as literal strings. Workers "secrets" and "vars" (`wrangler secret put`, or the `vars` block in `wrangler.jsonc`) only become available *after* the build, at request time, inside `env` — they cannot retroactively change a value that Next.js already inlined during `next build`. Setting these two as Workers secrets would do nothing.

What that means in practice:

- **Deploying from your own machine** (`npm run deploy`): as long as `.env.local` has the right values, `next build` picks them up automatically — nothing else to configure. This is the setup already in place.
- **If you later switch to Cloudflare's Git-connected build pipeline** (Workers Builds, where Cloudflare clones the repo and runs the build itself instead of you running it locally): add both variables under that project's **Settings → Build → Variables and Secrets** in the Cloudflare dashboard, so they exist when Cloudflare runs the build step. They can be plain build variables, not secrets — the Supabase anon key is designed to be public (access is enforced by Postgres Row Level Security policies, not by keeping the key secret).

No service-role or other server-only secret is used by the app right now. If one is added later for server-only code (something that only runs inside the Worker, never shipped to the browser), set it with:

```bash
npx wrangler secret put SUPABASE_SERVICE_ROLE_KEY
```

That mechanism works correctly for a *non*-`NEXT_PUBLIC_` variable, because those aren't inlined at build time — they're read dynamically at runtime, which is exactly what `wrangler secret put` provides.

## First deploy checklist

1. `npx wrangler login` (skip if `npx wrangler whoami` already shows the right account)
2. Confirm `.env.local` has valid `NEXT_PUBLIC_SUPABASE_URL` / `NEXT_PUBLIC_SUPABASE_ANON_KEY`
3. `npm run preview` — builds and runs the app locally against the real Workers runtime via Wrangler. Do this before every first deploy (and after any dependency upgrade) to catch Node.js API incompatibilities early.
4. `npm run deploy` — builds and deploys to Cloudflare Workers

## Scripts reference

- `npm run preview` → `opennextjs-cloudflare build && opennextjs-cloudflare preview` — local Workers-runtime check, no deploy
- `npm run deploy` → `opennextjs-cloudflare build && opennextjs-cloudflare deploy` — builds and ships to Cloudflare

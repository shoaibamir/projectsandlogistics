import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import type { Database } from "@/lib/database.types";

/**
 * Per-request Supabase client for Server Components, Server Actions, and
 * Route Handlers. Reads/writes the session via Next.js cookies, so RLS
 * policies keyed off auth.uid() resolve to the actual signed-in user.
 *
 * Calling `cookies().set(...)` from a Server Component (not a Server
 * Action/Route Handler) throws — that's expected and safe to ignore here,
 * since middleware is what actually persists the refreshed session.
 */
export async function createClient() {
  const cookieStore = await cookies();

  return createServerClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            for (const { name, value, options } of cookiesToSet) {
              cookieStore.set(name, value, options);
            }
          } catch {
            // Called from a Server Component render — middleware handles
            // the actual session refresh, so this can be safely ignored.
          }
        },
      },
    },
  );
}

import { createClient, SupabaseClient } from "@supabase/supabase-js";

let client: SupabaseClient | null = null;

// Lazily created so this never runs during Gatsby's server-side build step -
// only call this from browser-only code (inside useEffect, event handlers).
export const getSupabase = (): SupabaseClient => {
  if (!client) {
    const url = process.env.GATSBY_SUPABASE_URL ?? "";
    const anonKey = process.env.GATSBY_SUPABASE_ANON_KEY ?? "";
    client = createClient(url, anonKey);
  }
  return client;
};

import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import { getSupabase } from "./supabaseClient";

// Same shape as the old localStorage-backed usePersistentState hook
// ([state, setState, hydrated]), but reads/writes a row in Supabase's
// `dashboard_data` table (scoped to the signed-in user by RLS) instead of
// the browser's local storage. Callers only ever run inside AuthGate, so a
// signed-in user is guaranteed to exist by the time this mounts.
export function usePersistentState<T>(
  key: string,
  initial: T
): [T, Dispatch<SetStateAction<T>>, boolean] {
  const [state, setState] = useState<T>(initial);
  const [hydrated, setHydrated] = useState(false);
  const userIdRef = useRef<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    const load = async () => {
      const supabase = getSupabase();
      const {
        data: { user }
      } = await supabase.auth.getUser();
      if (cancelled || !user) return;
      userIdRef.current = user.id;

      const { data, error } = await supabase
        .from("dashboard_data")
        .select("value")
        .eq("user_id", user.id)
        .eq("key", key)
        .maybeSingle();

      if (cancelled) return;
      if (!error && data) {
        setState(data.value as T);
      }
      setHydrated(true);
    };

    load();
    return () => {
      cancelled = true;
    };
    // Only reload if the storage key itself changes.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key]);

  useEffect(() => {
    if (!hydrated || !userIdRef.current) return;
    const supabase = getSupabase();
    const userId = userIdRef.current;

    // Debounce so fast typing (e.g. notes) doesn't fire a write per keystroke.
    const timeout = setTimeout(() => {
      supabase
        .from("dashboard_data")
        .upsert(
          { user_id: userId, key, value: state, updated_at: new Date().toISOString() },
          { onConflict: "user_id,key" }
        )
        .then(({ error }) => {
          if (error) console.error("Dashboard save failed:", error.message);
        });
    }, 400);

    return () => clearTimeout(timeout);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key, state, hydrated]);

  return [state, setState, hydrated];
}

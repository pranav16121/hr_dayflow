import { createClient } from "@supabase/supabase-js";

// Canonical project Supabase URL
const DEFAULT_SUPABASE_URL = "https://gzcrmlanuswkzlczesec.supabase.co";
// Safe fallback key to prevent module initialization crash when env is unpopulated
const DEFAULT_SUPABASE_ANON_KEY = "placeholder-anon-key";

const supabaseUrl =
  (import.meta.env.VITE_SUPABASE_URL as string | undefined) ||
  DEFAULT_SUPABASE_URL;

const supabaseAnonKey =
  (import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY as string | undefined) ||
  (import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined) ||
  DEFAULT_SUPABASE_ANON_KEY;

if (
  !import.meta.env.VITE_SUPABASE_URL ||
  (!import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY &&
    !import.meta.env.VITE_SUPABASE_ANON_KEY)
) {
  console.warn(
    "[Dayflow Supabase] Missing VITE_SUPABASE_URL or VITE_SUPABASE_PUBLISHABLE_KEY in environment variables. Please configure your .env file."
  );
}

/**
 * Supabase client instance for Dayflow HRMS backend integration.
 * Connects using environment variables with graceful fallback to prevent runtime crashes.
 */
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string | undefined;
const supabaseAnonKey = (import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY ||
  import.meta.env.VITE_SUPABASE_ANON_KEY) as string | undefined;

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn(
    "Supabase URL or Publishable/Anon Key is missing in environment variables. Please check your .env configuration."
  );
}

/**
 * Supabase client instance for Dayflow HRMS backend integration.
 * Supports both VITE_SUPABASE_PUBLISHABLE_KEY and VITE_SUPABASE_ANON_KEY.
 */
export const supabase = createClient(
  supabaseUrl || "",
  supabaseAnonKey || ""
);

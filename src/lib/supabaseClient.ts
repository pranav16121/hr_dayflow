import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string | undefined;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined;

/**
 * Placeholder Supabase client for PP's backend integration.
 * Service files currently use mock data and do not import this yet.
 * Once real tables/RLS are ready, services can swap their mock
 * implementations for calls through this client without changing
 * any function signatures consumed by the UI.
 */
export const supabase =
  supabaseUrl && supabaseAnonKey ? createClient(supabaseUrl, supabaseAnonKey) : null;

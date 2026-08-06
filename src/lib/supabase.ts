import { createClient } from "@supabase/supabase-js";
import { STORE_CONFIG } from "../config";

// Lazy-initialize the Supabase client safely using the public credentials
export const supabase = createClient(
  STORE_CONFIG.SUPABASE_URL,
  STORE_CONFIG.SUPABASE_PUBLISHABLE_KEY
);

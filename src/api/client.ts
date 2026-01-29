import { createClient } from "@supabase/supabase-js";
import type { Database } from "./database.types";


export const client = createClient<Database>(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_KEY
);

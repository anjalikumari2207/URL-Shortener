// src/db/supabase.js
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_KEY;

if (!supabaseUrl || !supabaseKey) {
  throw new Error("Supabase URL or Key not set in environment");
}

const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;          // ✅ default export
export { supabaseUrl };          // ✅ optional named export

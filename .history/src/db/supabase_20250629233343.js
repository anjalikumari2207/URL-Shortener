import { createClient } from '@supabase/supabase-js';

// ✅ Read from environment
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_KEY;

// ✅ Validate for local dev
if (!supabaseUrl || !supabaseKey) {
  throw new Error("supabaseUrl and supabaseKey are required but not provided.");
}

// ✅ Create the client
const supabase = createClient(supabaseUrl, supabaseKey);

// ✅ Export both supabase instance and supabaseUrl
export { supabase, supabaseUrl };
export default supabase;

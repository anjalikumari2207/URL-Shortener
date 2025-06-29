import { createClient } from '@supabase/supabase-js';

// Get environment variables
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_KEY;

// Validate
if (!supabaseUrl || !supabaseKey) {
  throw new Error("supabaseUrl and supabaseKey are required but not provided.");
}

// Create Supabase client
const supabase = createClient(supabaseUrl, supabaseKey);

export { supabase, supabaseUrl };
export default supabase;

import { createClient } from '@supabase/supabase-js'

// Environment variables from Vite
export const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
export const supabaseKey = import.meta.env.VITE_SUPABASE_KEY

// Create Supabase client
export const supabase = createClient(supabaseUrl, supabaseKey)

// Default export for easy use
export default supabase

import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

// Environment variable validation
if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Supabase URL or Anon Key is missing. Please check your .env file.')
}

/**
 * Reusable singleton Supabase client.
 * Configured for Storage, Database, and Authentication operations.
 */
export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Attach verification utility to window in development mode
import './verifySupabase'

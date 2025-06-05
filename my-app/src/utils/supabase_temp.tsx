import { createClient } from '@supabase/supabase-js'

/**
 * Supabase.tsx
 * 
 * Initializes and exports the Supabase client for database operations.
 * Reads configuration from environment variables.
 */

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables')
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
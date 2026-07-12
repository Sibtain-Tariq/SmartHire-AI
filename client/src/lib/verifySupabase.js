import { supabase } from './supabase'

/**
 * Temporary verification utility to confirm Supabase is configured and reachable.
 * Run this function in your browser console: `window.runSupabaseHealthCheck()`
 */
export async function runSupabaseHealthCheck() {
  console.log('🔍 Starting Supabase Health Check...')
  
  try {
    const url = import.meta.env.VITE_SUPABASE_URL
    const key = import.meta.env.VITE_SUPABASE_ANON_KEY

    // 1. Verify environment variables
    if (!url || !key) {
      console.error('❌ FAILURE: Missing Environment Variables (VITE_SUPABASE_URL or VITE_SUPABASE_ANON_KEY).')
      return false
    }
    console.log('✅ Environment variables are loaded correctly.')

    // 2. Verify client initialization
    if (!supabase) {
      console.error('❌ FAILURE: Supabase client failed to initialize.')
      return false
    }
    console.log('✅ Supabase client initialized successfully.')

    // 3. Verify backend connectivity (Using the Auth health endpoint to avoid touching Storage/DB)
    const response = await fetch(`${url}/auth/v1/health`, {
      method: 'GET',
      headers: {
        'apikey': key,
        'Authorization': `Bearer ${key}`
      }
    })

    if (response.ok) {
      const data = await response.json()
      console.log('✅ SUCCESS: Successfully reached the Supabase backend!')
      console.log('📡 Health status:', data)
      return true
    } else {
      console.error(`❌ FAILURE: Reached Supabase, but received an error status: ${response.status}`)
      return false
    }

  } catch (error) {
    console.error('❌ FAILURE: Network error or invalid URL. Could not reach Supabase backend.')
    console.error('Error details:', error.message)
    return false
  }
}

// Attach to window for easy execution from the browser console during development
if (typeof window !== 'undefined') {
  window.runSupabaseHealthCheck = runSupabaseHealthCheck
}

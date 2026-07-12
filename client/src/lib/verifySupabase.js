import { supabase } from './supabase'

/**
 * Temporary verification utility to confirm Supabase is configured correctly.
 * Run this function in your browser console: `window.runConnectionTest()`
 */
export async function runConnectionTest() {
  try {
    const url = import.meta.env.VITE_SUPABASE_URL
    const key = import.meta.env.VITE_SUPABASE_ANON_KEY

    // Verify variables load correctly
    if (!url || !key) {
      throw new Error('Environment variables VITE_SUPABASE_URL or VITE_SUPABASE_ANON_KEY are missing.')
    }

    // Verify client initialized successfully
    if (!supabase) {
      throw new Error('Supabase client failed to initialize.')
    }

    // If we reach here, the client successfully initialized with the provided keys
    console.log('✓ Supabase Client Connected')

  } catch (error) {
    console.error('✗ Supabase Initialization Failed')
    console.error('Error Details:', error.message)
  }
}

// Attach to window for easy execution from the browser console during development
if (typeof window !== 'undefined') {
  window.runConnectionTest = runConnectionTest
}

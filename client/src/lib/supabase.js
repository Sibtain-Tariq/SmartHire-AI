import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

const hasCredentials = Boolean(supabaseUrl && supabaseAnonKey)

if (!hasCredentials && import.meta.env.DEV) {
  console.warn(
    '⚠️ Supabase URL or Anon Key is missing. Authentication and Storage will be disabled. ' +
    'Please check your .env file to restore full backend functionality.'
  )
}

/**
 * Creates a safe fallback mock that mimics Supabase's API format.
 * This prevents the application from crashing on startup and defers the error 
 * to when a user actively attempts to authenticate or upload files.
 */
const createMockSupabase = () => {
  const mockErrorResponse = async () => ({
    data: null,
    error: new Error('Supabase is not configured. Missing environment variables in .env file.')
  })

  return {
    auth: {
      signInWithPassword: mockErrorResponse,
      signUp: mockErrorResponse,
      signOut: mockErrorResponse,
      resetPasswordForEmail: mockErrorResponse,
      updateUser: mockErrorResponse,
      getUser: mockErrorResponse,
      getSession: mockErrorResponse,
      refreshSession: mockErrorResponse,
      onAuthStateChange: () => ({ data: { subscription: { unsubscribe: () => {} } } })
    },
    storage: {
      from: () => ({
        upload: mockErrorResponse,
        download: mockErrorResponse,
        remove: mockErrorResponse,
        list: mockErrorResponse,
        createSignedUrl: mockErrorResponse,
        getPublicUrl: () => ({ data: { publicUrl: '' } })
      })
    },
    from: () => ({
      select: mockErrorResponse
    })
  }
}

/**
 * Reusable singleton Supabase client.
 * Configured for Storage, Database, and Authentication operations.
 * If credentials are missing, falls back to a safe mock to prevent app crashes.
 */
export const supabase = hasCredentials 
  ? createClient(supabaseUrl, supabaseAnonKey)
  : createMockSupabase()


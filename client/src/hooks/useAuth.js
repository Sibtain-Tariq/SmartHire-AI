import { useContext } from 'react'
import { AuthContext } from '../context/AuthContext'

/**
 * useAuth Hook
 * Exposes the current user, session, loading state, and auth methods.
 * Throws a helpful error if used outside of the AuthProvider.
 */
export function useAuth() {
  const context = useContext(AuthContext)
  
  if (context === undefined || context === null) {
    throw new Error('useAuth must be used within an AuthProvider. Wrap your app in <AuthProvider>.')
  }
  
  return context
}

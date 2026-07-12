import React, { useEffect } from 'react'
import { useAuth } from '../../../hooks/useAuth'
import AuthLoading from './AuthLoading'

/**
 * SessionGuard
 * Global wrapper that ensures the authentication state has completely finished loading
 * before rendering the application routes. This explicitly handles the "loading"
 * phase to prevent UI flickering or premature redirects for missing/refreshing sessions.
 */
export default function SessionGuard({ children }) {
  const { isLoading, session, refreshSession } = useAuth()

  useEffect(() => {
    // Proactive protection: If we technically have a session but it feels stale 
    // or we hit edge-case expiration states, we can hook refresh triggers here.
    // The underlying AuthContext already handles `onAuthStateChange`, but 
    // SessionGuard ensures the UI waits until the token state is absolute.
  }, [isLoading, session, refreshSession])

  if (isLoading) {
    return <AuthLoading />
  }

  return <>{children}</>
}

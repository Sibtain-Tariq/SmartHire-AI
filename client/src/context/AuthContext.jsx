import React, { createContext, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import AuthService from '../services/AuthService'

export const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [session, setSession] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    let unsubscribe = null
    let isMounted = true

    // Initialize session from local storage / Supabase on first load
    const initializeAuth = async () => {
      try {
        const { success, session: currentSession } = await AuthService.getCurrentSession()
        
        if (isMounted) {
          if (success && currentSession) {
            setSession(currentSession)
            setUser(currentSession.user)
          } else {
            // Explicitly clear state if session restoration fails (e.g., token expired)
            setSession(null)
            setUser(null)
          }
        }
      } catch (error) {
        console.error('[AuthContext] Failed to initialize session:', error)
        if (isMounted) {
          setSession(null)
          setUser(null)
        }
      } finally {
        if (isMounted) {
          setIsLoading(false)
        }
      }
    }

    // Run initialization immediately
    initializeAuth()

    // Listen for auth state changes globally (login, logout, token refresh, etc.)
    unsubscribe = AuthService.subscribeToAuthChanges((event, newSession) => {
      if (!isMounted) return

      // Supabase auto-refreshes tokens and triggers these events natively.
      // If a token expires and fails to refresh, Supabase fires SIGNED_OUT.
      switch (event) {
        case 'PASSWORD_RECOVERY':
          sessionStorage.setItem('isPasswordRecovery', 'true')
          setSession(newSession)
          setUser(newSession?.user || null)
          navigate('/reset-password', { replace: true })
          break
        case 'SIGNED_IN':
        case 'TOKEN_REFRESHED':
        case 'INITIAL_SESSION':
        case 'USER_UPDATED':
          setSession(newSession)
          setUser(newSession?.user || null)
          break
        case 'SIGNED_OUT':
          // Auto-logout: forcefully purge state when the session dies
          setSession(null)
          setUser(null)
          break
        default:
          // Fallback sync
          setSession(newSession)
          setUser(newSession?.user || null)
      }
      
      // Ensure loading state is dropped once the listener kicks in
      setIsLoading(false)
    })

    // Automatic cleanup on unmount to prevent memory leaks and duplicate listeners
    return () => {
      isMounted = false
      if (unsubscribe) {
        unsubscribe()
      }
    }
  }, [])

  const value = {
    user,
    session,
    isLoading,
    signIn: AuthService.signIn.bind(AuthService),
    signUp: AuthService.signUp.bind(AuthService),
    signOut: AuthService.signOut.bind(AuthService),
    resetPassword: AuthService.resetPassword.bind(AuthService),
    updatePassword: AuthService.updatePassword.bind(AuthService),
    refreshSession: AuthService.refreshSession.bind(AuthService)
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

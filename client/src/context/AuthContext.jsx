import React, { createContext, useState, useEffect } from 'react'
import AuthService from '../services/AuthService'

export const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [session, setSession] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    let unsubscribe = null

    // Initialize session from local storage / Supabase on first load
    const initializeAuth = async () => {
      try {
        const { success, session } = await AuthService.getCurrentSession()
        if (success && session) {
          setSession(session)
          setUser(session.user)
        }
      } catch (error) {
        console.error('[AuthContext] Failed to initialize session:', error)
      } finally {
        setIsLoading(false)
      }
    }

    initializeAuth()

    // Listen for auth state changes (login, logout, token refresh)
    unsubscribe = AuthService.subscribeToAuthChanges((event, newSession) => {
      setSession(newSession)
      setUser(newSession?.user || null)
      setIsLoading(false)
    })

    // Automatic cleanup on unmount
    return () => {
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

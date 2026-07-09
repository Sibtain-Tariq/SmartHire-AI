import React, { createContext, useContext, useState, useEffect, useMemo, useCallback } from 'react'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from '../../../lib/firebase'
import { authService } from '../services/authService'
import { Loader2 } from 'lucide-react'

// Create the authentication context
const AuthContext = createContext(null)

/**
 * Custom hook to consume the AuthContext safely.
 * Throws an error if used outside of an AuthProvider.
 */
export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

/**
 * AuthProvider component that wraps the application.
 * Responsibilities:
 * - Listens to Firebase auth state changes.
 * - Stores the current authenticated user and loading state.
 * - Provides auth-related logic connected to Firebase.
 * - Blocks rendering of children while the initial auth state is loading.
 */
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Subscribe to Firebase auth state changes
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        setUser(firebaseUser)
      } else {
        setUser(null)
      }
      setLoading(false) // Stop loading once initial state is confirmed
    })

    // Cleanup subscription on unmount
    return () => unsubscribe()
  }, [])

  const login = useCallback(async (email, password) => {
    const result = await authService.login(email, password)
    if (result.error) throw new Error(result.error)
    return result.user
  }, [])

  const register = useCallback(async (name, email, password) => {
    const result = await authService.register(name, email, password)
    if (result.error) throw new Error(result.error)
    return result.user
  }, [])

  const logout = useCallback(async () => {
    const result = await authService.logout()
    if (result.error) throw new Error(result.error)
    setUser(null)
  }, [])
  
  const resetPassword = useCallback(async (email) => {
    const result = await authService.resetPassword(email)
    if (result.error) throw new Error(result.error)
  }, [])

  const value = useMemo(() => ({
    user,
    loading,
    isAuthenticated: !!user,
    setUser,
    login,
    register,
    logout,
    resetPassword
  }), [user, loading, login, register, logout, resetPassword])

  // Show a loading screen while authentication state initializes
  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50">
        <Loader2 className="h-8 w-8 animate-spin text-sky-500" />
      </div>
    )
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

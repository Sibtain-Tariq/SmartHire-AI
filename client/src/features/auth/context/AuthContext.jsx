import React, { createContext, useContext, useState, useEffect } from 'react'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from '../../../lib/firebase'
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
 * - Provides auth-related placeholders for business logic.
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

  // Placeholders for future business logic
  const login = async (email, password) => {
    console.log('Login placeholder triggered for:', email)
  }

  const register = async (name, email, password) => {
    console.log('Register placeholder triggered for:', email)
  }

  const logout = async () => {
    console.log('Logout placeholder triggered')
  }

  const value = {
    user,
    loading,
    isAuthenticated: !!user,
    setUser,
    login,
    register,
    logout
  }

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

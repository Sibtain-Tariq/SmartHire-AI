import { 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  signOut, 
  sendPasswordResetEmail,
  updateProfile
} from 'firebase/auth'
import { auth } from '../../../lib/firebase'

/**
 * Parses Firebase error codes into user-friendly messages.
 */
const getAuthErrorMessage = (error) => {
  switch (error.code) {
    case 'auth/invalid-email':
      return 'Invalid email address format.'
    case 'auth/user-disabled':
      return 'This account has been disabled.'
    case 'auth/user-not-found':
      return 'No account found with this email.'
    case 'auth/wrong-password':
    case 'auth/invalid-credential':
      return 'Incorrect email or password.'
    case 'auth/email-already-in-use':
      return 'An account already exists with this email.'
    case 'auth/weak-password':
      return 'Password should be at least 6 characters.'
    case 'auth/network-request-failed':
      return 'Network error. Please check your connection.'
    default:
      return error.message || 'An unexpected authentication error occurred.'
  }
}

export const authService = {
  /**
   * Log in an existing user
   */
  login: async (email, password) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password)
      return { user: userCredential.user, error: null }
    } catch (error) {
      return { user: null, error: getAuthErrorMessage(error) }
    }
  },

  /**
   * Register a new user and set their display name
   */
  register: async (name, email, password) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password)
      
      // Update the profile with the user's name
      if (userCredential.user) {
        await updateProfile(userCredential.user, { displayName: name })
      }
      
      return { user: userCredential.user, error: null }
    } catch (error) {
      return { user: null, error: getAuthErrorMessage(error) }
    }
  },

  /**
   * Log out the current user
   */
  logout: async () => {
    try {
      await signOut(auth)
      return { error: null }
    } catch (error) {
      return { error: getAuthErrorMessage(error) }
    }
  },

  /**
   * Send a password reset email
   */
  resetPassword: async (email) => {
    try {
      await sendPasswordResetEmail(auth, email)
      return { error: null }
    } catch (error) {
      return { error: getAuthErrorMessage(error) }
    }
  }
}

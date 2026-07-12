import { supabase } from '../lib/supabase'

/**
 * AuthService
 * Centralizes all Supabase Authentication logic outside of React components.
 * Provides a clean API for components to interact with auth state without knowing about the SDK.
 */
class AuthService {
  /**
   * Helper to format generic errors into standardized error shapes.
   */
  _formatError(code, message, originalError = null) {
    return { success: false, error: { code, message, originalError } }
  }

  /**
   * Fetches the current active session. Useful for initial load.
   */
  async getSession() {
    try {
      const { data, error } = await supabase.auth.getSession()
      if (error) throw error
      return { success: true, session: data.session }
    } catch (error) {
      return this._formatError('SESSION_FETCH_FAILED', 'Failed to retrieve session.', error)
    }
  }

  /**
   * Signs in a user using an email and password.
   */
  async signInWithEmail(email, password) {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({ email, password })
      if (error) throw error
      return { success: true, user: data.user, session: data.session }
    } catch (error) {
      return this._formatError('SIGN_IN_FAILED', error.message || 'Failed to sign in.', error)
    }
  }

  /**
   * Registers a new user with an email and password.
   */
  async signUpWithEmail(email, password, metadata = {}) {
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: metadata,
        },
      })
      if (error) throw error
      return { success: true, user: data.user, session: data.session }
    } catch (error) {
      return this._formatError('SIGN_UP_FAILED', error.message || 'Failed to sign up.', error)
    }
  }

  /**
   * Signs out the currently authenticated user.
   */
  async signOut() {
    try {
      const { error } = await supabase.auth.signOut()
      if (error) throw error
      return { success: true }
    } catch (error) {
      return this._formatError('SIGN_OUT_FAILED', 'Failed to sign out.', error)
    }
  }

  /**
   * Triggers a password reset email.
   */
  async resetPassword(email) {
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email)
      if (error) throw error
      return { success: true }
    } catch (error) {
      return this._formatError('RESET_PASSWORD_FAILED', error.message || 'Failed to send reset email.', error)
    }
  }

  /**
   * Listens to real-time authentication state changes.
   * Returns a subscription that must be unsubscribed on component unmount.
   */
  onAuthStateChange(callback) {
    const { data } = supabase.auth.onAuthStateChange((event, session) => {
      callback(event, session)
    })
    
    // Return the unsubscribe function directly to make cleanup easy
    return () => {
      if (data && data.subscription) {
        data.subscription.unsubscribe()
      }
    }
  }
}

export default new AuthService()

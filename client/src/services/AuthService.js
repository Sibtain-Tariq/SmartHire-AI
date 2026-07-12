import { supabase } from '../lib/supabase'

/**
 * @typedef {Object} AuthError
 * @property {string} code - Internal error code (e.g., 'SIGN_IN_FAILED')
 * @property {string} message - Human-readable error message
 * @property {Error|null} originalError - The raw error thrown by Supabase
 */

/**
 * @typedef {Object} AuthResponse
 * @property {boolean} success - True if the operation succeeded
 * @property {any} [user] - The Supabase user object
 * @property {any} [session] - The Supabase session object
 * @property {AuthError} [error] - Standardized error object if success is false
 */

/**
 * AuthService
 * Centralizes all Supabase Authentication logic outside of React components.
 * Provides a clean, typed API for components to interact with auth state securely.
 */
class AuthService {
  /**
   * Helper to format generic errors into standardized AuthError shapes.
   * @param {string} code 
   * @param {string} message 
   * @param {Error} [originalError] 
   * @returns {AuthResponse}
   */
  _formatError(code, message, originalError = null) {
    return { 
      success: false, 
      error: { code, message, originalError } 
    }
  }

  /**
   * Signs in a user using an email and password.
   * @param {string} email 
   * @param {string} password 
   * @returns {Promise<AuthResponse>}
   */
  async signIn(email, password) {
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
   * @param {string} email 
   * @param {string} password 
   * @param {Object} [metadata={}] - Optional metadata like first_name, last_name
   * @returns {Promise<AuthResponse>}
   */
  async signUp(email, password, metadata = {}) {
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
   * @returns {Promise<AuthResponse>}
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
   * Triggers a password reset email for the specified address.
   * @param {string} email 
   * @returns {Promise<AuthResponse>}
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
   * Updates the user's password (requires the user to be logged in).
   * @param {string} newPassword 
   * @returns {Promise<AuthResponse>}
   */
  async updatePassword(newPassword) {
    try {
      const { data, error } = await supabase.auth.updateUser({ password: newPassword })
      if (error) throw error
      return { success: true, user: data.user }
    } catch (error) {
      return this._formatError('UPDATE_PASSWORD_FAILED', error.message || 'Failed to update password.', error)
    }
  }

  /**
   * Fetches the current authenticated user asynchronously.
   * Useful to securely check the active user against the Supabase backend.
   * @returns {Promise<AuthResponse>}
   */
  async getCurrentUser() {
    try {
      const { data: { user }, error } = await supabase.auth.getUser()
      if (error) throw error
      return { success: true, user }
    } catch (error) {
      return this._formatError('GET_USER_FAILED', 'Failed to retrieve current user.', error)
    }
  }

  /**
   * Fetches the current active session. Useful for initial load.
   * @returns {Promise<AuthResponse>}
   */
  async getCurrentSession() {
    try {
      const { data, error } = await supabase.auth.getSession()
      if (error) throw error
      return { success: true, session: data.session, user: data.session?.user || null }
    } catch (error) {
      return this._formatError('SESSION_FETCH_FAILED', 'Failed to retrieve session.', error)
    }
  }

  /**
   * Manually refreshes the authentication session token.
   * @returns {Promise<AuthResponse>}
   */
  async refreshSession() {
    try {
      const { data, error } = await supabase.auth.refreshSession()
      if (error) throw error
      return { success: true, session: data.session, user: data.user }
    } catch (error) {
      return this._formatError('SESSION_REFRESH_FAILED', 'Failed to refresh session.', error)
    }
  }

  /**
   * Subscribes to real-time authentication state changes.
   * Returns a subscription that must be unsubscribed on component unmount.
   * @param {Function} callback - Triggered with (event, session)
   * @returns {Function} Unsubscribe function
   */
  subscribeToAuthChanges(callback) {
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

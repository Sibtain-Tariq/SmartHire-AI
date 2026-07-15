import SupabaseAuthProfileProvider from './providers/SupabaseAuthProfileProvider'

/**
 * UserProfileService
 * Responsible for retrieving and normalizing the user's profile data.
 * Ensures the UI never interacts with raw data sources.
 * 
 * Uses Dependency Injection pattern to easily switch the source of truth
 * from Supabase Auth to Postgres Database in the future.
 */
class UserProfileService {
  /**
   * @param {import('./interfaces/IProfileProvider').default} provider 
   */
  constructor(provider) {
    this.provider = provider
  }

  /**
   * Normalizes a raw user object into our standardized profile schema.
   * @param {Object} rawUser 
   * @returns {Object|null}
   */
  normalizeUser(rawUser) {
    if (!rawUser) return null

    const metadata = rawUser.user_metadata || {}
    
    // Attempt to extract full name and robustly fall back
    const fullName = metadata.full_name || rawUser.email?.split('@')[0] || 'User'
    
    // Generate initials
    const initials = this._generateInitials(fullName)

    return {
      id: rawUser.id,
      fullName,
      email: rawUser.email || '',
      avatar: metadata.avatar_url || '',
      initials,
      emailVerified: !!rawUser.email_confirmed_at,
      createdAt: rawUser.created_at,
      lastSignIn: rawUser.last_sign_in_at,
      metadata: metadata
    }
  }

  _generateInitials(name) {
    if (!name) return 'U'
    const parts = name.trim().split(/\s+/)
    if (parts.length === 1) {
      return parts[0].substring(0, 2).toUpperCase()
    }
    return (parts[0].charAt(0) + parts[parts.length - 1].charAt(0)).toUpperCase()
  }

  /**
   * Fetches the current user profile asynchronously from the active provider.
   * @returns {Promise<{success: boolean, profile?: Object, error?: Object}>}
   */
  async getProfile() {
    try {
      const response = await this.provider.getProfile()
      
      if (!response.success || !response.data) {
        return { success: false, error: response.error || { message: 'No profile found' } }
      }

      const profile = this.normalizeUser(response.data)
      return { success: true, profile }
    } catch (error) {
      return { success: false, error: { message: error.message || 'Failed to fetch user profile' } }
    }
  }

  /**
   * Updates the profile using the active provider.
   * @param {string} userId 
   * @param {Object} updates 
   * @returns {Promise<{success: boolean, profile?: Object, error?: Object}>}
   */
  async updateProfile(userId, updates) {
    try {
      const response = await this.provider.updateProfile(userId, updates)
      if (!response.success) {
        return { success: false, error: response.error }
      }
      return { success: true, profile: this.normalizeUser(response.data) }
    } catch (error) {
       return { success: false, error }
    }
  }

  /**
   * Synchronously normalizes a profile from an active session object,
   * relying on the provider to extract it first.
   * @param {Object} sessionPayload
   * @returns {Object|null}
   */
  getProfileFromSession(sessionPayload) {
    if (!sessionPayload) return null
    const rawData = this.provider.extractFromSession(sessionPayload)
    return this.normalizeUser(rawData)
  }
}

// By default, instantiate with the Supabase Auth Provider.
// To migrate to DB, change this one line to `new PostgresProfileProvider()`.
export default new UserProfileService(new SupabaseAuthProfileProvider())

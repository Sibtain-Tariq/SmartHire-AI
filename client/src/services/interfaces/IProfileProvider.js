/**
 * IProfileProvider
 * Abstract interface for Profile Data Operations.
 * 
 * Enforces the contract for fetching and updating user profiles,
 * completely decoupled from the underlying data source (e.g., Auth vs DB).
 */
export default class IProfileProvider {
  /**
   * Fetches the user profile data.
   * @param {string|null} userId - The user ID to fetch, or null for the current authenticated user.
   * @returns {Promise<{success: boolean, data?: Object, error?: Object}>}
   */
  async getProfile(userId = null) {
    throw new Error('Method "getProfile" must be implemented.')
  }

  /**
   * Updates the user profile data.
   * @param {string} userId - The user ID to update.
   * @param {Object} updates - The profile fields to update.
   * @returns {Promise<{success: boolean, data?: Object, error?: Object}>}
   */
  async updateProfile(userId, updates) {
    throw new Error('Method "updateProfile" must be implemented.')
  }

  /**
   * Optional: Synchronously extracts profile data from an active session payload if available.
   * Useful for immediate rendering on login before a network fetch.
   * @param {Object} sessionPayload - The raw payload from the auth session.
   * @returns {Object|null}
   */
  extractFromSession(sessionPayload) {
    throw new Error('Method "extractFromSession" must be implemented.')
  }
}

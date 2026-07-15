import IProfileProvider from '../interfaces/IProfileProvider'
import AuthService from '../AuthService'

/**
 * SupabaseAuthProfileProvider
 * 
 * Current source of truth implementation.
 * Reads and writes profile data exclusively using Supabase Authentication `user_metadata`.
 */
export default class SupabaseAuthProfileProvider extends IProfileProvider {
  
  async getProfile(userId = null) {
    try {
      // Note: Supabase Auth doesn't let us easily fetch OTHER users' metadata from the client.
      // If userId is provided and !== current user, this will fail or require Edge Functions.
      // For now, we only fetch the current authenticated user.
      const response = await AuthService.getCurrentUser()
      
      if (!response.success || !response.user) {
        return { success: false, error: response.error }
      }

      return { success: true, data: response.user }
    } catch (error) {
      return { success: false, error }
    }
  }

  async updateProfile(userId, updates) {
    try {
      // Map domain profile updates to Supabase Auth metadata shape
      const metadataPayload = {}
      if (updates.fullName !== undefined) metadataPayload.full_name = updates.fullName
      if (updates.avatar !== undefined) metadataPayload.avatar_url = updates.avatar

      const response = await AuthService.updateUserMetadata(metadataPayload)
      return { success: response.success, data: response.user, error: response.error }
    } catch (error) {
      return { success: false, error }
    }
  }

  extractFromSession(sessionPayload) {
    // In this provider, the session payload IS the raw Supabase user object
    return sessionPayload
  }
}

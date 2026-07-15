import IProfileProvider from '../interfaces/IProfileProvider'
import DatabaseService from '../DatabaseService'

/**
 * PostgresProfileProvider (FUTURE)
 * 
 * Future source of truth implementation.
 * Reads and writes profile data exclusively from the PostgreSQL `users` table.
 * 
 * Note: Not actively used yet. Waiting for backend database migration.
 */
export default class PostgresProfileProvider extends IProfileProvider {
  
  async getProfile(userId = null) {
    try {
      // Future logic:
      // const idToFetch = userId || await getCurrentUserId()
      // const data = await DatabaseService.select('users').eq('id', idToFetch).single()
      
      throw new Error('PostgresProfileProvider.getProfile is not implemented yet.')
    } catch (error) {
      return { success: false, error }
    }
  }

  async updateProfile(userId, updates) {
    try {
      // Future logic:
      // Map domain profile updates to PostgreSQL columns
      // const dbPayload = {
      //   full_name: updates.fullName,
      //   avatar_url: updates.avatar,
      //   updated_at: new Date().toISOString()
      // }
      // const data = await DatabaseService.update('users', dbPayload).eq('id', userId)

      throw new Error('PostgresProfileProvider.updateProfile is not implemented yet.')
    } catch (error) {
      return { success: false, error }
    }
  }

  extractFromSession(sessionPayload) {
    // In the future, the session payload from Auth might only contain the ID.
    // The actual profile data would need to be fetched, or injected via a custom JWT claim
    // populated by a Supabase Postgres trigger.
    // For now, we return null to force a network fetch on load.
    return null
  }
}

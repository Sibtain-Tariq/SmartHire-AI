import { supabase } from '../lib/supabase'

/**
 * DatabaseService
 * 
 * Abstract layer for PostgreSQL database operations.
 * Isolates UI and Domain services from raw Supabase PostgREST client code.
 */
class DatabaseService {
  /**
   * Stub for future select query wrapper
   */
  select(table) {
    return supabase.from(table).select()
  }

  /**
   * Stub for future insert query wrapper
   */
  insert(table, payload) {
    return supabase.from(table).insert(payload)
  }

  /**
   * Stub for future update query wrapper
   */
  update(table, payload) {
    return supabase.from(table).update(payload)
  }

  /**
   * Stub for future delete query wrapper
   */
  delete(table) {
    return supabase.from(table).delete()
  }
}

export default new DatabaseService()

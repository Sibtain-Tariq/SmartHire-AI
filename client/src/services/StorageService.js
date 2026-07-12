import { supabase } from '../lib/supabase'

/**
 * Base StorageService for handling generic Supabase Storage operations.
 * Follows SOLID principles by abstracting the Supabase SDK from domain logic.
 */
class StorageService {
  /**
   * Upload a file to a specific bucket and path.
   * @param {string} bucket - The Supabase storage bucket name
   * @param {string} path - The path inside the bucket (e.g., 'avatars/user123/img.jpg')
   * @param {File} file - The file object to upload
   * @param {object} options - Additional upload options (cacheControl, upsert, etc.)
   * @returns {Promise<{ path: string } | null>} The file path if successful, or throws error
   */
  async uploadFile(bucket, path, file, options = { cacheControl: '3600', upsert: false }) {
    const { data, error } = await supabase.storage
      .from(bucket)
      .upload(path, file, options)

    if (error) {
      console.error(`[StorageService] Upload Error to ${bucket}/${path}:`, error.message)
      throw error
    }

    return data
  }

  /**
   * Download a file from a specific bucket and path.
   * @param {string} bucket - The Supabase storage bucket name
   * @param {string} path - The path inside the bucket
   * @returns {Promise<Blob | null>} The downloaded file Blob, or throws error
   */
  async downloadFile(bucket, path) {
    const { data, error } = await supabase.storage
      .from(bucket)
      .download(path)

    if (error) {
      console.error(`[StorageService] Download Error from ${bucket}/${path}:`, error.message)
      throw error
    }

    return data
  }

  /**
   * Delete a file from a specific bucket and path.
   * @param {string} bucket - The Supabase storage bucket name
   * @param {string} path - The path inside the bucket
   * @returns {Promise<boolean>} True if deleted successfully
   */
  async deleteFile(bucket, path) {
    const { error } = await supabase.storage
      .from(bucket)
      .remove([path])

    if (error) {
      console.error(`[StorageService] Delete Error at ${bucket}/${path}:`, error.message)
      throw error
    }

    return true
  }

  /**
   * Get a public URL for a file in a public bucket.
   * @param {string} bucket - The Supabase storage bucket name
   * @param {string} path - The path inside the bucket
   * @returns {string} The public URL string
   */
  getPublicUrl(bucket, path) {
    const { data } = supabase.storage
      .from(bucket)
      .getPublicUrl(path)

    return data.publicUrl
  }

  /**
   * Get a temporary signed URL for a file in a private bucket.
   * @param {string} bucket - The Supabase storage bucket name
   * @param {string} path - The path inside the bucket
   * @param {number} expiresIn - Expiration time in seconds (default 60 seconds)
   * @returns {Promise<string>} The signed URL string
   */
  async getSignedUrl(bucket, path, expiresIn = 60) {
    const { data, error } = await supabase.storage
      .from(bucket)
      .createSignedUrl(path, expiresIn)

    if (error) {
      console.error(`[StorageService] Signed URL Error for ${bucket}/${path}:`, error.message)
      throw error
    }

    return data.signedUrl
  }
  /**
   * List files within a specific bucket and path.
   * @param {string} bucket - The Supabase storage bucket name
   * @param {string} path - The folder path to list files from
   * @param {object} options - Options like limit, offset, sortBy
   * @returns {Promise<any[]>} The list of file objects
   */
  async listFiles(bucket, path, options = { limit: 100, offset: 0, sortBy: { column: 'name', order: 'asc' } }) {
    const { data, error } = await supabase.storage
      .from(bucket)
      .list(path, options)

    if (error) {
      console.error(`[StorageService] List Error at ${bucket}/${path}:`, error.message)
      throw error
    }

    return data
  }
}

export default new StorageService()

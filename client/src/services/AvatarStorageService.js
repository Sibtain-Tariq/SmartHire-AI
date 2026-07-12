import StorageService from './StorageService'
import { STORAGE_BUCKETS, ALLOWED_FILE_TYPES, MAX_FILE_SIZES } from '../constants/storage'
import { getAvatarPath } from '../utils/storageHelpers'

/**
 * AvatarStorageService
 * Handles uploading, deleting, and fetching user avatars.
 * Uses the centralized storage config and standardized types.
 */
class AvatarStorageService {
  /**
   * Helper to format generic errors into StorageError shapes.
   * @param {string} code 
   * @param {string} message 
   * @param {Error} [originalError] 
   * @returns {import('../types/storageTypes').StorageError}
   */
  _formatError(code, message, originalError = null) {
    return { code, message, originalError }
  }

  /**
   * Validates a file against configured avatar types and size limits.
   * @param {File} file 
   * @returns {import('../types/storageTypes').StorageError | null}
   */
  _validateFile(file) {
    if (!ALLOWED_FILE_TYPES.AVATAR.includes(file.type)) {
      return this._formatError(
        'INVALID_FILE_TYPE',
        'Only JPG, JPEG, and PNG files are allowed for avatars.'
      )
    }

    if (file.size > MAX_FILE_SIZES.AVATAR) {
      return this._formatError(
        'FILE_TOO_LARGE',
        'Avatar file size must not exceed 5MB.'
      )
    }

    return null
  }

  /**
   * Upload an avatar to the avatars bucket.
   * @param {string} userId - The user ID
   * @param {File} file - The image file
   * @returns {Promise<import('../types/storageTypes').UploadResult>} The public URL of the uploaded avatar
   */
  async uploadAvatar(userId, file) {
    try {
      const validationError = this._validateFile(file)
      if (validationError) {
        return { success: false, error: validationError }
      }

      const path = getAvatarPath(userId, file.name)
      
      await StorageService.uploadFile(STORAGE_BUCKETS.AVATARS, path, file, {
        cacheControl: '3600',
        upsert: false, // Prevent overwriting unintentionally, though timestamp makes collisions unlikely
      })

      // Avatars are public, so return the direct URL immediately
      const url = StorageService.getPublicUrl(STORAGE_BUCKETS.AVATARS, path)
      return { success: true, path, url }
    } catch (error) {
      return { 
        success: false, 
        error: this._formatError('UPLOAD_FAILED', 'Failed to upload avatar to storage.', error) 
      }
    }
  }

  /**
   * Deletes a specific user avatar.
   * @param {string} path - The exact path to the avatar
   * @returns {Promise<import('../types/storageTypes').DeleteResult>}
   */
  async deleteAvatar(path) {
    try {
      await StorageService.deleteFile(STORAGE_BUCKETS.AVATARS, path)
      return { success: true, path }
    } catch (error) {
      return {
        success: false,
        error: this._formatError('DELETE_FAILED', 'Failed to delete avatar from storage.', error)
      }
    }
  }

  /**
   * Generates a permanent public URL for the avatar.
   * @param {string} path - The exact path inside the avatars bucket
   * @returns {import('../types/storageTypes').DownloadResult}
   */
  getAvatarUrl(path) {
    try {
      // Avatars are generally public, so we don't need a signed URL
      const url = StorageService.getPublicUrl(STORAGE_BUCKETS.AVATARS, path)
      return { success: true, url }
    } catch (error) {
      return {
        success: false,
        error: this._formatError('URL_GENERATION_FAILED', 'Failed to retrieve avatar URL.', error)
      }
    }
  }
}

export default new AvatarStorageService()

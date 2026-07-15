import BaseStorageService from './BaseStorageService'
import StorageService from './StorageService'
import { STORAGE_BUCKETS, STORAGE_CATEGORIES, STORAGE_FOLDERS } from '../constants/storage'
import AuthService from './AuthService'

/**
 * AvatarStorageService
 * Handles uploading, deleting, and retrieving avatar images.
 * Uses the PUBLIC bucket since avatars need to be publicly accessible via URL.
 */
class AvatarStorageService extends BaseStorageService {
  constructor() {
    super(
      STORAGE_BUCKETS.PUBLIC,
      STORAGE_CATEGORIES.AVATARS,
      'AVATAR',
      // Generate path: users/{userId}/avatars/{filename}
      (userId, filename) => {
        // Sanitize filename to prevent issues and ensure uniqueness
        const fileExtension = filename.split('.').pop()
        const uniqueFileName = `avatar_${Date.now()}.${fileExtension}`
        return `${STORAGE_FOLDERS.USERS}/${userId}/${STORAGE_CATEGORIES.AVATARS}/${uniqueFileName}`
      }
    )
  }

  /**
   * Overrides the BaseStorageService getPublicUrl because avatars are in a public bucket,
   * so we don't need a temporary signed URL. We just need the permanent public URL.
   * @param {string} path 
   * @returns {Promise<{success: boolean, url?: string, error?: Object}>}
   */
  async getPublicUrl(path) {
    try {
      // Don't technically need auth to view public url, but good practice to ensure valid path
      if (!path) return { success: false, error: this._formatError('INVALID_PATH', 'Path is required to generate URL') }
      
      const url = StorageService.getPublicUrl(this.bucket, path)
      return { success: true, url }
    } catch (error) {
      return { success: false, error: this._formatError('URL_GENERATION_FAILED', `Failed to retrieve URL for avatar.`, error) }
    }
  }

  /**
   * Uploads an avatar and automatically deletes any old avatars in the same folder
   * to prevent storage bloat. Then updates the Supabase auth metadata.
   * @param {File} file 
   * @returns {Promise<{success: boolean, url?: string, error?: Object}>}
   */
  async uploadAndUpdateProfile(file) {
    try {
      const userId = await this._requireAuth()
      
      // 1. Upload new avatar
      const uploadResult = await this.upload(file)
      if (!uploadResult.success) return uploadResult

      // 2. Get the public URL for the new avatar
      const urlResult = await this.getPublicUrl(uploadResult.path)
      if (!urlResult.success) return urlResult

      // 3. Update the user metadata in Auth
      const updateResult = await AuthService.updateUserMetadata({ avatar_url: urlResult.url })
      if (!updateResult.success) return updateResult

      // 4. (Optional Cleanup) Delete old avatars to save space
      try {
        const folderPath = `${STORAGE_FOLDERS.USERS}/${userId}/${this.categoryFolder}`
        const filesResult = await StorageService.listFiles(this.bucket, folderPath)
        
        if (filesResult && Array.isArray(filesResult)) {
          // Get the filename of the one we just uploaded
          const newFileName = uploadResult.path.split('/').pop()
          
          for (const f of filesResult) {
            if (f.name !== newFileName && f.name !== '.emptyFolderPlaceholder') {
              const oldPath = `${folderPath}/${f.name}`
              await StorageService.deleteFile(this.bucket, oldPath)
            }
          }
        }
      } catch (cleanupError) {
        console.warn('[AvatarStorageService] Failed to clean up old avatars:', cleanupError)
        // Non-fatal, continue returning success for the main operation
      }

      return { success: true, url: urlResult.url }
    } catch (error) {
      return { success: false, error: this._formatError('AVATAR_UPDATE_FAILED', error.message, error) }
    }
  }
}

export default new AvatarStorageService()

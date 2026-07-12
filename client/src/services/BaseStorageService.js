import StorageService from './StorageService'
import { validateStorageFile } from '../utils/storageValidation'
import { STORAGE_FOLDERS } from '../constants/storage'

/**
 * BaseStorageService
 * Abstract class that provides standard CRUD operations for storage domains.
 * Follows DRY and SOLID principles to eliminate duplicate service logic.
 */
export default class BaseStorageService {
  /**
   * @param {string} bucketName - The configured bucket constant
   * @param {string} categoryName - The configured category constant ('RESUME', 'AVATAR', etc.)
   * @param {Function} pathGenerator - Helper function to generate specific paths
   */
  constructor(bucketName, categoryName, pathGenerator) {
    this.bucket = bucketName
    this.category = categoryName
    this.generatePath = pathGenerator
  }

  _formatError(code, message, originalError = null) {
    return { code, message, originalError }
  }

  /**
   * Uploads a file.
   * @param {string} userId
   * @param {File} file 
   * @returns {Promise<import('../types/storageTypes').UploadResult>}
   */
  async upload(userId, file) {
    try {
      const validation = validateStorageFile(file, this.category)
      if (!validation.isValid) {
        return { success: false, error: this._formatError(validation.code, validation.error) }
      }

      const path = this.generatePath(userId, file.name)
      await StorageService.uploadFile(this.bucket, path, file, { cacheControl: '3600', upsert: false })
      
      return { success: true, path }
    } catch (error) {
      return { success: false, error: this._formatError('UPLOAD_FAILED', `Failed to upload ${this.category.toLowerCase()}.`, error) }
    }
  }

  /**
   * Downloads a file as a raw Blob.
   * @param {string} path 
   * @returns {Promise<import('../types/storageTypes').DownloadResult>}
   */
  async download(path) {
    try {
      const data = await StorageService.downloadFile(this.bucket, path)
      return { success: true, data }
    } catch (error) {
      return { success: false, error: this._formatError('DOWNLOAD_FAILED', `Failed to download ${this.category.toLowerCase()}.`, error) }
    }
  }

  /**
   * Deletes a file.
   * @param {string} path 
   * @returns {Promise<import('../types/storageTypes').DeleteResult>}
   */
  async delete(path) {
    try {
      await StorageService.deleteFile(this.bucket, path)
      return { success: true, path }
    } catch (error) {
      return { success: false, error: this._formatError('DELETE_FAILED', `Failed to delete ${this.category.toLowerCase()}.`, error) }
    }
  }

  /**
   * Lists all files for a user.
   * @param {string} userId 
   * @returns {Promise<{ success: boolean, files?: any[], error?: import('../types/storageTypes').StorageError }>}
   */
  async list(userId) {
    try {
      const folderPath = `${STORAGE_FOLDERS.USERS}/${userId}/${this.bucket}`
      const files = await StorageService.listFiles(this.bucket, folderPath)
      const cleanFiles = files.filter(f => f.name !== '.emptyFolderPlaceholder')
      return { success: true, files: cleanFiles }
    } catch (error) {
      return { success: false, error: this._formatError('LIST_FAILED', `Failed to list ${this.category.toLowerCase()}s.`, error) }
    }
  }

  /**
   * Retrieves a URL to access the file. 
   * (Subclasses can override this if they need public vs signed URLs).
   * @param {string} path 
   * @returns {Promise<import('../types/storageTypes').DownloadResult>}
   */
  async getPublicUrl(path) {
    try {
      // By default, generates a temporary signed URL to protect data.
      const url = await StorageService.getSignedUrl(this.bucket, path, 60)
      return { success: true, url }
    } catch (error) {
      return { success: false, error: this._formatError('URL_GENERATION_FAILED', `Failed to retrieve URL for ${this.category.toLowerCase()}.`, error) }
    }
  }
}

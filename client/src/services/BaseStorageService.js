import StorageService from './StorageService'
import { validateStorageFile } from '../utils/storageValidation'
import { STORAGE_FOLDERS } from '../constants/storage'
import AuthService from './AuthService'

/**
 * BaseStorageService
 * Abstract class that provides standard CRUD operations for storage domains.
 * Follows DRY and SOLID principles to eliminate duplicate service logic.
 */
export default class BaseStorageService {
  /**
   * @param {string} bucketName - The configured real Supabase bucket (e.g. 'private-user-data')
   * @param {string} categoryFolder - The folder category inside the bucket (e.g. 'resumes')
   * @param {string} categoryName - The constant category used for validation ('RESUME', 'AVATAR')
   * @param {Function} pathGenerator - Helper function to generate specific paths
   */
  constructor(bucketName, categoryFolder, categoryName, pathGenerator) {
    this.bucket = bucketName
    this.categoryFolder = categoryFolder
    this.category = categoryName
    this.generatePath = pathGenerator
  }

  _sanitizeErrorMessage(errorMsg) {
    if (!errorMsg || typeof errorMsg !== 'string') return 'An unexpected network error occurred. Please try again.'
    const msg = errorMsg.toLowerCase()

    // Map common raw technical errors to friendly SaaS messages
    if (msg.includes('fetch') || msg.includes('network') || msg.includes('failed to fetch')) {
      return 'Network connection lost. Please check your internet and try again.'
    }
    if (msg.includes('row-level security') || msg.includes('permission denied') || msg.includes('unauthorized') || msg.includes('jwt')) {
      return 'Your session has expired or you lack permission. Please log in again.'
    }
    if (msg.includes('storage') && msg.includes('not found')) {
      return 'The storage bucket is currently unavailable. Please contact support.'
    }
    if (msg.includes('error code') || msg.includes('violates') || msg.includes('syntax') || msg.includes('failed to parse')) {
      return 'A secure connection error occurred. Please try again later.'
    }
    
    // Fallback block for massive raw Postgres/Supabase stack traces
    if (errorMsg.length > 150) return 'An unexpected connection error occurred during the upload process.'
    
    return errorMsg
  }

  _formatError(code, message, originalError = null) {
    const safeMessage = this._sanitizeErrorMessage(message || originalError?.message)
    return { code, message: safeMessage, originalError }
  }

  /**
   * Helper to ensure the user is authenticated
   */
  async _requireAuth() {
    const { success, user } = await AuthService.getCurrentUser()
    if (!success || !user) {
      throw new Error('User is not authenticated. Cannot perform storage operations.')
    }
    return user.id
  }

  /**
   * Uploads a file.
   * @param {File} file 
   * @returns {Promise<import('../types/storageTypes').UploadResult>}
   */
  async upload(file) {
    try {
      const { success, user } = await AuthService.getCurrentUser()
      if (!success || !user) {
        throw new Error('User is not authenticated. Cannot perform storage operations.')
      }
      const userId = user.id

      const validation = validateStorageFile(file, this.category)
      if (!validation.isValid) {
        return { success: false, error: this._formatError(validation.code, validation.error) }
      }

      const path = this.generatePath(userId, file.name)

      console.log('[RUNTIME DEBUG: STEP 2 & 7] Before calling upload():', {
        authenticatedUser: user,
        userId: userId,
        bucketName: this.bucket,
        generatedStoragePath: path,
        supabaseUrl: import.meta.env.VITE_SUPABASE_URL,
        supabaseAnonKeyExists: !!import.meta.env.VITE_SUPABASE_ANON_KEY
      })
      
      const uploadResponse = await StorageService.uploadFile(this.bucket, path, file, { cacheControl: '3600', upsert: false })
      
      console.log('[RUNTIME DEBUG: STEP 5] Upload succeeded. Running storage.list()...')
      const folderPath = `${STORAGE_FOLDERS.USERS}/${userId}/${this.categoryFolder}`
      const listResponse = await StorageService.listFiles(this.bucket, folderPath)
      
      console.log('[RUNTIME DEBUG: STEP 5] storage.list() results for folder:', folderPath, {
        returnedFiles: listResponse,
        count: listResponse?.length || 0
      })
      
      return { success: true, path }
    } catch (error) {
      console.error('[RUNTIME DEBUG: STEP 6] Upload failed in BaseStorageService. COMPLETE ERROR:', {
        status: error.status,
        message: error.message,
        hint: error.hint,
        details: error.details,
        errorCode: error.code,
        rawError: error
      })
      return { success: false, error: this._formatError('UPLOAD_FAILED', error.message || `Failed to upload ${this.category.toLowerCase()}.`, error) }
    }
  }

  /**
   * Downloads a file as a raw Blob.
   * @param {string} path 
   * @returns {Promise<import('../types/storageTypes').DownloadResult>}
   */
  async download(path) {
    try {
      await this._requireAuth() // Enforce auth
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
      await this._requireAuth() // Enforce auth
      await StorageService.deleteFile(this.bucket, path)
      return { success: true, path }
    } catch (error) {
      return { success: false, error: this._formatError('DELETE_FAILED', `Failed to delete ${this.category.toLowerCase()}.`, error) }
    }
  }

  /**
   * Lists all files for the authenticated user.
   * @returns {Promise<{ success: boolean, files?: any[], error?: import('../types/storageTypes').StorageError }>}
   */
  async list() {
    try {
      const userId = await this._requireAuth()
      
      const folderPath = `${STORAGE_FOLDERS.USERS}/${userId}/${this.categoryFolder}`
      const files = await StorageService.listFiles(this.bucket, folderPath)
      const cleanFiles = files.filter(f => f.name !== '.emptyFolderPlaceholder')
      return { success: true, files: cleanFiles }
    } catch (error) {
      return { success: false, error: this._formatError('LIST_FAILED', error.message || `Failed to list ${this.category.toLowerCase()}s.`, error) }
    }
  }

  /**
   * Retrieves a URL to access the file. 
   * (Subclasses can override this if they need public vs signed URLs).
   * @param {string} path 
   * @returns {Promise<import('../types/storageTypes').DownloadResult>}
   */
  async getPublicUrl(path, options = {}) {
    try {
      await this._requireAuth() // Enforce auth
      // By default, generates a temporary signed URL to protect data.
      const url = await StorageService.getSignedUrl(this.bucket, path, 60, options)
      return { success: true, url }
    } catch (error) {
      return { success: false, error: this._formatError('URL_GENERATION_FAILED', `Failed to retrieve URL for ${this.category.toLowerCase()}.`, error) }
    }
  }
}

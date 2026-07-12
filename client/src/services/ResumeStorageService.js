import StorageService from './StorageService'
import { STORAGE_BUCKETS, ALLOWED_FILE_TYPES, MAX_FILE_SIZES, STORAGE_FOLDERS } from '../constants/storage'
import { getResumePath } from '../utils/storageHelpers'

/**
 * ResumeStorageService
 * Handles securely uploading, listing, downloading, and deleting user resumes.
 * Uses the centralized storage config and standardized types.
 */
class ResumeStorageService {
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
   * Validates a file against configured types and size limits.
   * @param {File} file 
   * @returns {import('../types/storageTypes').StorageError | null}
   */
  _validateFile(file) {
    if (!ALLOWED_FILE_TYPES.RESUME.includes(file.type)) {
      return this._formatError(
        'INVALID_FILE_TYPE',
        'Only PDF, DOC, and DOCX files are allowed for resumes.'
      )
    }

    if (file.size > MAX_FILE_SIZES.RESUME) {
      return this._formatError(
        'FILE_TOO_LARGE',
        'Resume file size must not exceed 10MB.'
      )
    }

    return null
  }

  /**
   * Uploads a resume for a specific user.
   * @param {string} userId - The unique user ID
   * @param {File} file - The resume file
   * @returns {Promise<import('../types/storageTypes').UploadResult>}
   */
  async uploadResume(userId, file) {
    try {
      const validationError = this._validateFile(file)
      if (validationError) {
        return { success: false, error: validationError }
      }

      const path = getResumePath(userId, file.name)
      
      await StorageService.uploadFile(STORAGE_BUCKETS.RESUMES, path, file, {
        cacheControl: '3600',
        upsert: false,
      })

      return { success: true, path }
    } catch (error) {
      return { 
        success: false, 
        error: this._formatError('UPLOAD_FAILED', 'Failed to upload resume to storage.', error) 
      }
    }
  }

  /**
   * Deletes a specific user resume.
   * @param {string} path - The exact path to the resume
   * @returns {Promise<import('../types/storageTypes').DeleteResult>}
   */
  async deleteResume(path) {
    try {
      await StorageService.deleteFile(STORAGE_BUCKETS.RESUMES, path)
      return { success: true, path }
    } catch (error) {
      return {
        success: false,
        error: this._formatError('DELETE_FAILED', 'Failed to delete resume from storage.', error)
      }
    }
  }

  /**
   * Downloads the raw blob of a specific resume.
   * @param {string} path - The exact path to the resume
   * @returns {Promise<import('../types/storageTypes').DownloadResult>}
   */
  async downloadResume(path) {
    try {
      const data = await StorageService.downloadFile(STORAGE_BUCKETS.RESUMES, path)
      return { success: true, data }
    } catch (error) {
      return {
        success: false,
        error: this._formatError('DOWNLOAD_FAILED', 'Failed to download resume file.', error)
      }
    }
  }

  /**
   * Gets a temporary signed URL to view or download a private resume securely.
   * @param {string} path - The exact path inside the resumes bucket
   * @returns {Promise<import('../types/storageTypes').DownloadResult>}
   */
  async getResumeUrl(path) {
    try {
      // URL expires in 60 seconds (1 minute) for security
      const url = await StorageService.getSignedUrl(STORAGE_BUCKETS.RESUMES, path, 60)
      return { success: true, url }
    } catch (error) {
      return {
        success: false,
        error: this._formatError('URL_GENERATION_FAILED', 'Failed to generate secure URL.', error)
      }
    }
  }

  /**
   * Lists all resumes uploaded by a specific user.
   * @param {string} userId - The unique user ID
   * @returns {Promise<{ success: boolean, files?: any[], error?: import('../types/storageTypes').StorageError }>}
   */
  async listUserResumes(userId) {
    try {
      const folderPath = `${STORAGE_FOLDERS.USERS}/${userId}/resumes`
      const files = await StorageService.listFiles(STORAGE_BUCKETS.RESUMES, folderPath)
      
      // Filter out Supabase's empty placeholder `.emptyFolderPlaceholder` if it exists
      const cleanFiles = files.filter(f => f.name !== '.emptyFolderPlaceholder')
      
      return { success: true, files: cleanFiles }
    } catch (error) {
      return {
        success: false,
        error: this._formatError('LIST_FAILED', 'Failed to list user resumes.', error)
      }
    }
  }
}

export default new ResumeStorageService()

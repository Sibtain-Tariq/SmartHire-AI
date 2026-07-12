import StorageService from './StorageService'
import { STORAGE_BUCKETS, ALLOWED_FILE_TYPES, MAX_FILE_SIZES, STORAGE_FOLDERS } from '../constants/storage'
import { getReportPath } from '../utils/storageHelpers'

/**
 * ReportStorageService
 * Handles securely uploading, listing, downloading, and deleting ATS and Interview reports.
 * Uses the centralized storage config and standardized types.
 */
class ReportStorageService {
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
   * Validates a report file against configured types and size limits.
   * @param {File} file 
   * @returns {import('../types/storageTypes').StorageError | null}
   */
  _validateFile(file) {
    if (!ALLOWED_FILE_TYPES.REPORT.includes(file.type)) {
      return this._formatError(
        'INVALID_FILE_TYPE',
        'Only PDF files are allowed for reports.'
      )
    }

    if (file.size > MAX_FILE_SIZES.REPORT) {
      return this._formatError(
        'FILE_TOO_LARGE',
        'Report file size must not exceed 20MB.'
      )
    }

    return null
  }

  /**
   * Uploads a report for a specific user.
   * @param {string} userId - The unique user ID
   * @param {File} file - The report PDF file
   * @returns {Promise<import('../types/storageTypes').UploadResult>}
   */
  async uploadReport(userId, file) {
    try {
      const validationError = this._validateFile(file)
      if (validationError) {
        return { success: false, error: validationError }
      }

      const path = getReportPath(userId, file.name)
      
      await StorageService.uploadFile(STORAGE_BUCKETS.REPORTS, path, file, {
        cacheControl: '3600',
        upsert: false,
      })

      return { success: true, path }
    } catch (error) {
      return { 
        success: false, 
        error: this._formatError('UPLOAD_FAILED', 'Failed to upload report to storage.', error) 
      }
    }
  }

  /**
   * Downloads a report directly or fetches a secure URL.
   * @param {string} path - The exact path inside the reports bucket
   * @returns {Promise<import('../types/storageTypes').DownloadResult>}
   */
  async downloadReport(path) {
    try {
      // Typically, reports might just be viewed. We return a temporary secure URL here.
      // If we needed raw Blob, we'd use StorageService.downloadFile instead.
      const url = await StorageService.getSignedUrl(STORAGE_BUCKETS.REPORTS, path, 60)
      return { success: true, url }
    } catch (error) {
      return {
        success: false,
        error: this._formatError('DOWNLOAD_FAILED', 'Failed to generate secure URL for report.', error)
      }
    }
  }

  /**
   * Deletes a specific user report.
   * @param {string} path - The exact path to the report
   * @returns {Promise<import('../types/storageTypes').DeleteResult>}
   */
  async deleteReport(path) {
    try {
      await StorageService.deleteFile(STORAGE_BUCKETS.REPORTS, path)
      return { success: true, path }
    } catch (error) {
      return {
        success: false,
        error: this._formatError('DELETE_FAILED', 'Failed to delete report from storage.', error)
      }
    }
  }

  /**
   * Lists all reports generated for a specific user.
   * @param {string} userId - The unique user ID
   * @returns {Promise<{ success: boolean, files?: any[], error?: import('../types/storageTypes').StorageError }>}
   */
  async listReports(userId) {
    try {
      const folderPath = `${STORAGE_FOLDERS.USERS}/${userId}/reports`
      const files = await StorageService.listFiles(STORAGE_BUCKETS.REPORTS, folderPath)
      
      // Filter out Supabase's empty placeholder `.emptyFolderPlaceholder` if it exists
      const cleanFiles = files.filter(f => f.name !== '.emptyFolderPlaceholder')
      
      return { success: true, files: cleanFiles }
    } catch (error) {
      return {
        success: false,
        error: this._formatError('LIST_FAILED', 'Failed to list user reports.', error)
      }
    }
  }
}

export default new ReportStorageService()

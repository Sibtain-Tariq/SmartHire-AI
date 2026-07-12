import StorageService from './StorageService'

/**
 * ResumeStorageService
 * Handles securely uploading and retrieving raw/parsed resumes from the `private-user-data` bucket.
 */
class ResumeStorageService {
  constructor() {
    this.bucket = 'private-user-data'
    this.allowedTypes = [
      'application/pdf',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    ] // pdf, docx
  }

  /**
   * Generates the storage path for a raw resume upload.
   * @param {string} userId - The unique user ID
   * @param {string} filename - Original filename
   * @returns {string} - Computed path like `resumes/{userId}/raw/resume_{timestamp}.ext`
   */
  _generateRawPath(userId, filename) {
    const ext = filename.split('.').pop()
    const timestamp = Date.now()
    return `resumes/${userId}/raw/resume_${timestamp}.${ext}`
  }

  /**
   * Upload a raw resume to the private bucket.
   * @param {string} userId - The user ID
   * @param {File} file - The resume file
   * @returns {Promise<{ path: string }>} The saved path (needs signed URL to view)
   */
  async uploadRawResume(userId, file) {
    if (!this.allowedTypes.includes(file.type)) {
      throw new Error('Invalid file type. Only PDF and DOCX are allowed.')
    }

    const path = this._generateRawPath(userId, file.name)
    
    await StorageService.uploadFile(this.bucket, path, file, {
      cacheControl: '3600',
      upsert: false,
    })

    return { path }
  }

  /**
   * Gets a temporary signed URL to view/download a private resume.
   * @param {string} path - The exact path inside the private bucket
   * @returns {Promise<string>} The signed URL
   */
  async getResumeUrl(path) {
    // URL expires in 60 seconds for security
    return await StorageService.getSignedUrl(this.bucket, path, 60)
  }

  /**
   * Deletes a specific resume.
   * @param {string} path - The exact path to the resume
   */
  async deleteResume(path) {
    return await StorageService.deleteFile(this.bucket, path)
  }
}

export default new ResumeStorageService()

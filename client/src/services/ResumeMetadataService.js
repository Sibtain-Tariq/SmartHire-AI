import { STORAGE_BUCKETS } from '../constants/storage'

class ResumeMetadataService {
  /**
   * Generates the canonical Resume Metadata object schema.
   * This structure will be used across ATS parsing, Job Matching, 
   * Interview Prep, and Reports.
   */
  createMetadata({
    userId,
    originalFilename,
    storagePath,
    fileSize,
    mimeType,
    status = 'Uploaded'
  }) {
    const timestamp = new Date().toISOString()
    const storageFilename = storagePath.split('/').pop()
    
    return {
      resumeId: crypto.randomUUID(), // Temporary client-side UUID until DB migration
      userId,
      originalFilename,
      storageFilename,
      storagePath,
      bucketName: STORAGE_BUCKETS.PRIVATE,
      fileSize,
      mimeType,
      uploadTime: timestamp,
      lastModified: timestamp,
      currentStatus: status
    }
  }

  /**
   * Helper to update the status of an existing resume object
   */
  updateStatus(resume, newStatus) {
    return {
      ...resume,
      currentStatus: newStatus,
      lastModified: new Date().toISOString()
    }
  }
}

export default new ResumeMetadataService()

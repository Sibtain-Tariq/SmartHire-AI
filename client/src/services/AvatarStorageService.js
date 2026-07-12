import BaseStorageService from './BaseStorageService'
import StorageService from './StorageService'
import { STORAGE_BUCKETS } from '../constants/storage'
import { getAvatarPath } from '../utils/storageHelpers'

class AvatarStorageService extends BaseStorageService {
  constructor() {
    super(STORAGE_BUCKETS.AVATARS, 'AVATAR', getAvatarPath)
  }

  /**
   * Overrides getPublicUrl to return a permanent public URL instead of a signed URL,
   * since Avatars are stored in a public bucket.
   * @param {string} path
   * @returns {Promise<import('../types/storageTypes').DownloadResult>}
   */
  async getPublicUrl(path) {
    try {
      const url = StorageService.getPublicUrl(this.bucket, path)
      return { success: true, url }
    } catch (error) {
      return { success: false, error: this._formatError('URL_GENERATION_FAILED', 'Failed to retrieve avatar URL.', error) }
    }
  }

  /**
   * Overrides upload to immediately return the public URL on success.
   * @param {string} userId 
   * @param {File} file 
   * @returns {Promise<import('../types/storageTypes').UploadResult>}
   */
  async upload(userId, file) {
    const result = await super.upload(userId, file)
    if (result.success && result.path) {
      const urlResult = await this.getPublicUrl(result.path)
      result.url = urlResult.url
    }
    return result
  }
}

export default new AvatarStorageService()

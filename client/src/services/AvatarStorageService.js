import StorageService from './StorageService'

/**
 * AvatarStorageService
 * Handles uploading and fetching user avatars from the `public-assets` bucket.
 */
class AvatarStorageService {
  constructor() {
    this.bucket = 'public-assets'
  }

  /**
   * Generates the storage path for an avatar.
   * @param {string} userId - The unique user ID
   * @param {string} filename - Original filename to extract extension
   * @returns {string} - Computed path like `avatars/{userId}/avatar_{timestamp}.ext`
   */
  _generatePath(userId, filename) {
    const ext = filename.split('.').pop()
    const timestamp = Date.now()
    return `avatars/${userId}/avatar_${timestamp}.${ext}`
  }

  /**
   * Upload an avatar to the public bucket.
   * @param {string} userId - The user ID
   * @param {File} file - The image file
   * @returns {Promise<string>} The public URL of the uploaded avatar
   */
  async uploadAvatar(userId, file) {
    if (!file.type.startsWith('image/')) {
      throw new Error('File must be an image.')
    }

    const path = this._generatePath(userId, file.name)
    
    // Upload the file
    await StorageService.uploadFile(this.bucket, path, file, {
      cacheControl: '3600',
      upsert: true, // Upsert is useful if overwriting exactly, but we use timestamps
    })

    // Return the public URL since avatars are public
    return StorageService.getPublicUrl(this.bucket, path)
  }

  /**
   * Deletes a user's specific avatar.
   * @param {string} path - The exact path to the avatar
   */
  async deleteAvatar(path) {
    return await StorageService.deleteFile(this.bucket, path)
  }
}

export default new AvatarStorageService()

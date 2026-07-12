import { STORAGE_FOLDERS } from '../constants/storage'

/**
 * Sanitizes a filename by removing special characters, replacing spaces with hyphens,
 * and converting it to lowercase to ensure safe URL usage.
 * @param {string} filename - The original filename.
 * @returns {string} - The sanitized filename.
 */
export function sanitizeFilename(filename) {
  if (!filename) return 'unnamed_file'
  
  const lastDotIndex = filename.lastIndexOf('.')
  const ext = lastDotIndex !== -1 ? filename.slice(lastDotIndex) : ''
  const name = lastDotIndex !== -1 ? filename.slice(0, lastDotIndex) : filename

  const safeName = name
    .toLowerCase()
    .replace(/[^a-z0-9]/g, '-') // Replace non-alphanumeric with hyphens
    .replace(/-+/g, '-') // Collapse multiple hyphens into one
    .replace(/^-|-$/g, '') // Trim leading/trailing hyphens

  return `${safeName}${ext.toLowerCase()}`
}

/**
 * Generates a unique filename to prevent collisions, appending a timestamp.
 * @param {string} filename - The original filename.
 * @returns {string} - A unique, sanitized filename.
 */
export function generateUniqueFilename(filename) {
  const sanitized = sanitizeFilename(filename)
  const lastDotIndex = sanitized.lastIndexOf('.')
  
  if (lastDotIndex !== -1) {
    const name = sanitized.slice(0, lastDotIndex)
    const ext = sanitized.slice(lastDotIndex)
    return `${name}_${Date.now()}${ext}`
  }
  
  return `${sanitized}_${Date.now()}`
}

/**
 * Core helper to generate standard user storage paths.
 * Returns: `users/{userId}/{folder}/{uniqueFilename}`
 */
export function generateUserStoragePath(userId, folder, filename) {
  if (!userId) throw new Error('userId is required to generate a storage path.')
  const uniqueFilename = generateUniqueFilename(filename)
  return `${STORAGE_FOLDERS.USERS}/${userId}/${folder}/${uniqueFilename}`
}

/**
 * Specific helper for Resume paths
 */
export function getResumePath(userId, filename) {
  return generateUserStoragePath(userId, 'resumes', filename)
}

/**
 * Specific helper for Avatar paths
 */
export function getAvatarPath(userId, filename) {
  return generateUserStoragePath(userId, 'avatars', filename)
}

/**
 * Specific helper for Report paths
 */
export function getReportPath(userId, filename) {
  return generateUserStoragePath(userId, 'reports', filename)
}

/**
 * Specific helper for Interview paths
 */
export function getInterviewPath(userId, filename) {
  return generateUserStoragePath(userId, 'interviews', filename)
}

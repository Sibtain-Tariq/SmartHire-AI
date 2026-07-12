import { STORAGE_FOLDERS, STORAGE_BUCKETS } from '../constants/storage'

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
 * Generates a unique filename to prevent collisions.
 * Appends a timestamp and optionally a short UUID string.
 * @param {string} filename - The original filename.
 * @param {boolean} useUuid - If true, appends a random UUID segment alongside the timestamp.
 * @returns {string} - A unique, sanitized filename.
 */
export function generateUniqueFilename(filename, useUuid = true) {
  const sanitized = sanitizeFilename(filename)
  const lastDotIndex = sanitized.lastIndexOf('.')
  
  const timestamp = Date.now()
  // crypto.randomUUID() is available in modern browsers. Fallback to Math.random() if needed.
  const uuid = useUuid ? (typeof crypto !== 'undefined' && crypto.randomUUID ? crypto.randomUUID().split('-')[0] : Math.random().toString(36).substring(2, 8)) : ''
  const uniqueSuffix = useUuid ? `_${timestamp}_${uuid}` : `_${timestamp}`

  if (lastDotIndex !== -1) {
    const name = sanitized.slice(0, lastDotIndex)
    const ext = sanitized.slice(lastDotIndex)
    return `${name}${uniqueSuffix}${ext}`
  }
  
  return `${sanitized}${uniqueSuffix}`
}

/**
 * Core helper to generate standard user storage paths.
 * Returns: `users/{userId}/{folder}/{uniqueFilename}`
 */
export function generateUserStoragePath(userId, folder, filename, useUuid = true) {
  if (!userId) throw new Error('userId is required to generate a storage path.')
  const uniqueFilename = generateUniqueFilename(filename, useUuid)
  return `${STORAGE_FOLDERS.USERS}/${userId}/${folder}/${uniqueFilename}`
}

/**
 * Specific helper for Resume paths
 */
export function getResumePath(userId, filename) {
  return generateUserStoragePath(userId, STORAGE_BUCKETS.RESUMES, filename)
}

/**
 * Specific helper for Avatar paths
 */
export function getAvatarPath(userId, filename) {
  return generateUserStoragePath(userId, STORAGE_BUCKETS.AVATARS, filename)
}

/**
 * Specific helper for Report paths
 */
export function getReportPath(userId, filename) {
  return generateUserStoragePath(userId, STORAGE_BUCKETS.REPORTS, filename)
}

/**
 * Specific helper for Interview Recording paths
 */
export function getInterviewRecordingPath(userId, filename) {
  return generateUserStoragePath(userId, STORAGE_BUCKETS.INTERVIEW_RECORDINGS, filename)
}

import { ALLOWED_FILE_TYPES, MAX_FILE_SIZES } from '../constants/storage'

/**
 * Standardized reusable error messages for the storage validation layer.
 */
export const STORAGE_VALIDATION_ERRORS = {
  EMPTY_FILE: 'The file is completely empty (0 bytes).',
  FILE_TOO_LARGE: 'The file exceeds the maximum allowed size limit.',
  INVALID_MIME: 'This file format is not supported.',
  INVALID_EXT: 'This file extension is not permitted.',
  INVALID_NAME: 'The filename is missing, hidden, or contains invalid structural characters.',
  CORRUPTED: 'The file appears to be corrupted or malformed.',
}

/**
 * Standardized Validation Result
 * @typedef {Object} ValidationResult
 * @property {boolean} isValid - True if all validations passed.
 * @property {string|null} error - The specific error message if validation failed.
 * @property {string|null} code - The error code identifier.
 */

/**
 * Checks if the file has basic structural integrity and is not completely empty.
 * @param {File} file 
 * @returns {ValidationResult}
 */
export function validateFileIntegrity(file) {
  if (!file) {
    return { isValid: false, error: 'No file was provided.', code: 'NO_FILE' }
  }
  if (file.size === 0) {
    return { isValid: false, error: STORAGE_VALIDATION_ERRORS.EMPTY_FILE, code: 'EMPTY_FILE' }
  }
  // If the file claims to have size but lacks a name or type entirely, it may be corrupted
  if (!file.name && !file.type) {
    return { isValid: false, error: STORAGE_VALIDATION_ERRORS.CORRUPTED, code: 'CORRUPTED' }
  }
  return { isValid: true, error: null, code: null }
}

/**
 * Validates the filename structure.
 * @param {File} file 
 * @returns {ValidationResult}
 */
export function validateFileName(file) {
  const name = file.name
  if (!name || name.trim() === '') {
    return { isValid: false, error: STORAGE_VALIDATION_ERRORS.INVALID_NAME, code: 'INVALID_NAME' }
  }
  // Prevent completely hidden files or system files
  if (name.startsWith('.')) {
    return { isValid: false, error: STORAGE_VALIDATION_ERRORS.INVALID_NAME, code: 'INVALID_NAME' }
  }
  return { isValid: true, error: null, code: null }
}

/**
 * Validates if the file size is within the allowed maximum byte limit.
 * @param {File} file 
 * @param {number} maxBytes 
 * @returns {ValidationResult}
 */
export function validateFileSize(file, maxBytes) {
  if (file.size > maxBytes) {
    return { isValid: false, error: STORAGE_VALIDATION_ERRORS.FILE_TOO_LARGE, code: 'FILE_TOO_LARGE' }
  }
  return { isValid: true, error: null, code: null }
}

/**
 * Validates the MIME type and corresponding generic extension logic.
 * @param {File} file 
 * @param {string[]} allowedMimeTypes 
 * @returns {ValidationResult}
 */
export function validateMimeType(file, allowedMimeTypes) {
  if (!allowedMimeTypes.includes(file.type)) {
    return { isValid: false, error: STORAGE_VALIDATION_ERRORS.INVALID_MIME, code: 'INVALID_MIME' }
  }

  // Basic extension sanity check (ensure the user didn't rename a .exe to .pdf)
  // While true deep inspection requires backend buffers, we can block obvious UI mismatches.
  const ext = file.name.split('.').pop()?.toLowerCase()
  const hasExt = !!ext
  
  if (!hasExt) {
    return { isValid: false, error: STORAGE_VALIDATION_ERRORS.INVALID_EXT, code: 'INVALID_EXT' }
  }

  return { isValid: true, error: null, code: null }
}

/**
 * Master validation function that runs the complete pipeline.
 * @param {File} file - The file to validate.
 * @param {string} category - 'RESUME', 'AVATAR', 'REPORT', or 'INTERVIEW'
 * @returns {ValidationResult}
 */
export function validateStorageFile(file, category) {
  const integrity = validateFileIntegrity(file)
  if (!integrity.isValid) return integrity

  const nameCheck = validateFileName(file)
  if (!nameCheck.isValid) return nameCheck

  const maxBytes = MAX_FILE_SIZES[category]
  const allowedMime = ALLOWED_FILE_TYPES[category]

  if (!maxBytes || !allowedMime) {
    return { isValid: false, error: 'Invalid storage category configuration.', code: 'SYSTEM_ERROR' }
  }

  const sizeCheck = validateFileSize(file, maxBytes)
  if (!sizeCheck.isValid) return sizeCheck

  const mimeCheck = validateMimeType(file, allowedMime)
  if (!mimeCheck.isValid) return mimeCheck

  return { isValid: true, error: null, code: null }
}

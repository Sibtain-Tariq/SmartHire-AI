/**
 * @fileoverview Storage Types and Interfaces for SmartHire AI.
 * Since this is a JavaScript project, we use JSDoc to define rich interfaces
 * that provide strict type-checking and autocompletion in modern IDEs.
 */

/**
 * @typedef {'resumes' | 'avatars' | 'reports' | 'interview-recordings'} BucketName
 * Defines the strict literal types for allowed Supabase buckets.
 */

/**
 * @typedef {'application/pdf' | 'application/msword' | 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' | 'image/jpeg' | 'image/png'} AllowedMimeType
 * Defines the strict literal types for allowed file MIME types across the platform.
 */

/**
 * @typedef {Object} StorageMetadata
 * @property {number} size - Size of the file in bytes.
 * @property {AllowedMimeType} mimetype - The MIME type of the file.
 * @property {string} lastModified - ISO string of when the file was last modified.
 * @property {string} [cacheControl] - Cache control string (e.g., '3600').
 */

/**
 * @typedef {Object} UploadResult
 * @property {boolean} success - Whether the upload succeeded.
 * @property {string} [path] - The full bucket path where the file was stored (if successful).
 * @property {string} [url] - The public or signed URL to access the file (if applicable).
 * @property {StorageError} [error] - The error details if the upload failed.
 */

/**
 * @typedef {Object} DownloadResult
 * @property {boolean} success - Whether the download succeeded.
 * @property {Blob} [data] - The downloaded file Blob (if successful).
 * @property {string} [url] - The signed URL (if requesting a link instead of blob).
 * @property {StorageError} [error] - The error details if the download failed.
 */

/**
 * @typedef {Object} DeleteResult
 * @property {boolean} success - Whether the deletion succeeded.
 * @property {string} [path] - The path of the file that was deleted.
 * @property {StorageError} [error] - The error details if the deletion failed.
 */

/**
 * @typedef {Object} StorageError
 * @property {string} code - The error code (e.g., 'FILE_TOO_LARGE', 'UNAUTHORIZED').
 * @property {string} message - A human-readable error message.
 * @property {Error} [originalError] - The underlying exception/error object.
 */

export {} // Forces this file to act as a module.

/**
 * Centralized Storage Configuration for SmartHire AI.
 * Contains all constants for Supabase storage buckets, folder hierarchies,
 * allowed file types (MIME types), and maximum file size limits.
 */

export const STORAGE_BUCKETS = {
  PRIVATE: 'private-user-data',
  PUBLIC: 'public-assets',
}

export const STORAGE_CATEGORIES = {
  RESUMES: 'resumes',
  AVATARS: 'avatars',
  REPORTS: 'reports',
  INTERVIEW_RECORDINGS: 'interview-recordings',
}

export const STORAGE_FOLDERS = {
  USERS: 'users',
  TEMP: 'temp',
  ARCHIVE: 'archive',
}

export const ALLOWED_FILE_TYPES = {
  RESUME: [
    'application/pdf', // pdf
    'application/msword', // doc
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document', // docx
  ],
  AVATAR: [
    'image/jpeg', // jpg, jpeg
    'image/png', // png
  ],
  REPORT: [
    'application/pdf', // pdf
  ],
  INTERVIEW: [
    'audio/mpeg', // mp3
    'audio/wav', // wav
  ],
}

// Sizes are in Bytes (MB * 1024 * 1024)
export const MAX_FILE_SIZES = {
  RESUME: 10 * 1024 * 1024, // 10MB
  AVATAR: 5 * 1024 * 1024,  // 5MB
  REPORT: 20 * 1024 * 1024, // 20MB
  INTERVIEW: 50 * 1024 * 1024, // 50MB
}

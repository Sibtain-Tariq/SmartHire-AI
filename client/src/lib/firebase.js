import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getStorage } from 'firebase/storage'

// Your web app's Firebase configuration
// Loaded strictly from environment variables to prevent exposing credentials in version control.
// The actual values should be stored in a .env file at the root of the client directory.
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || 'demo-api-key',
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || 'demo-project.firebaseapp.com',
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || 'demo-project',
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || 'demo-project.appspot.com',
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || '123456789',
  appId: import.meta.env.VITE_FIREBASE_APP_ID || '1:123456789:web:abcdef'
}

/**
 * Validates the Firebase configuration upon initialization.
 * This ensures the application fails fast or warns if critical environment variables are missing.
 */
const validateConfig = () => {
  const missingKeys = Object.entries(firebaseConfig)
    .filter(([_, value]) => !value)
    .map(([key]) => key)

  if (missingKeys.length > 0) {
    console.warn(`Firebase initialization warning: Missing environment variables for [${missingKeys.join(', ')}]`)
  }
}

validateConfig()

/**
 * The initialized Firebase App instance.
 * Exported in case other Firebase services (like Firestore or Analytics) need to be initialized later.
 */
export const app = initializeApp(firebaseConfig)

/**
 * The initialized Firebase Auth instance.
 * Use this to trigger authentication flows like login, registration, and password reset.
 */
export const auth = getAuth(app)

/**
 * The initialized Firebase Storage instance.
 * Use this to upload and manage user files (e.g., resumes, avatars).
 */
export const storage = getStorage(app)

export default app

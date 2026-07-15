/**
 * Calculates the strength of a password based on common security criteria.
 * @param {string} password 
 * @returns {{ score: number, label: string, color: string, width: string }}
 */
export function calculatePasswordStrength(password) {
  if (!password) return { score: 0, label: 'None', color: 'bg-slate-200', width: 'w-0' }

  let score = 0
  if (password.length >= 8) score += 1
  if (/[A-Z]/.test(password)) score += 1
  if (/[a-z]/.test(password)) score += 1
  if (/[0-9]/.test(password)) score += 1
  if (/[^A-Za-z0-9]/.test(password)) score += 1

  switch (score) {
    case 0:
    case 1:
    case 2:
      return { score, label: 'Weak', color: 'bg-red-500', width: 'w-1/4' }
    case 3:
      return { score, label: 'Fair', color: 'bg-amber-400', width: 'w-2/4' }
    case 4:
      return { score, label: 'Good', color: 'bg-emerald-400', width: 'w-3/4' }
    case 5:
      return { score, label: 'Strong', color: 'bg-emerald-600', width: 'w-full' }
    default:
      return { score: 0, label: 'None', color: 'bg-slate-200', width: 'w-0' }
  }
}

export function getPasswordRequirements(password) {
  const p = password || ''
  return [
    { label: 'Minimum 8 characters', met: p.length >= 8 },
    { label: 'One uppercase letter', met: /[A-Z]/.test(p) },
    { label: 'One lowercase letter', met: /[a-z]/.test(p) },
    { label: 'One number', met: /[0-9]/.test(p) },
    { label: 'One special character', met: /[^A-Za-z0-9]/.test(p) },
  ]
}

/**
 * Maps Supabase authentication errors to user-friendly messages.
 * Specifically checks for duplicate email errors.
 * @param {string} errorMessage 
 * @returns {string}
 */
export function getFriendlyAuthErrorMessage(errorMessage) {
  const msg = errorMessage?.toLowerCase() || ''
  
  if (msg.includes('already registered') || msg.includes('already exists')) {
    return 'An account with this email already exists. Please log in instead.'
  }
  if (msg.includes('password should be')) {
    return 'Your password is too weak. Please use at least 8 characters.'
  }
  if (msg.includes('invalid email')) {
    return 'Please enter a valid email address.'
  }
  
  return errorMessage || 'An unexpected error occurred. Please try again.'
}

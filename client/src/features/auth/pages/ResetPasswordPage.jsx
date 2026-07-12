import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Lock, Loader2, AlertCircle, CheckCircle2, ArrowLeft, Eye, EyeOff } from 'lucide-react'
import AuthLayout from '../components/AuthLayout'

export default function ResetPasswordPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [password, setPassword] = useState('')

  // Dummy password strength calculation
  const getPasswordStrength = () => {
    if (password.length === 0) return { score: 0, text: '', color: 'bg-slate-200' }
    if (password.length < 6) return { score: 1, text: 'Weak', color: 'bg-red-400 w-1/4' }
    if (password.length < 10) return { score: 2, text: 'Fair', color: 'bg-amber-400 w-2/4' }
    if (/[A-Z]/.test(password) && /[0-9]/.test(password) && password.length >= 10) {
      return { score: 4, text: 'Strong', color: 'bg-green-500 w-full' }
    }
    return { score: 3, text: 'Good', color: 'bg-sky-400 w-3/4' }
  }

  const strength = getPasswordStrength()

  const handleSubmit = (e) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')
    setSuccess(false)
    
    // Simulate network request
    setTimeout(() => {
      setIsLoading(false)
      setSuccess(true)
      // Uncomment to see error state:
      // setError('Your password reset link is invalid or has expired.')
    }, 1500)
  }

  return (
    <AuthLayout>
      <div className="w-full">
        <div className="mb-8 text-center sm:text-left">
          <h1 className="text-2xl font-semibold tracking-tight text-slate-900 dark:text-slate-50">Create new password</h1>
          <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">Your new password must be different from previous used passwords.</p>
        </div>

        {error && (
          <div className="mb-6 flex items-start gap-3 rounded-2xl border border-red-100 bg-red-50 p-4 text-sm text-red-600 dark:bg-red-900/20 dark:text-red-400 dark:border-red-900/30">
            <AlertCircle size={18} className="mt-0.5 shrink-0" />
            <p>{error}</p>
          </div>
        )}

        {success ? (
          <div className="mb-6 rounded-2xl border border-emerald-100 bg-emerald-50 p-6 text-center dark:border-emerald-900/30 dark:bg-emerald-900/20">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-emerald-100 text-emerald-600 dark:bg-emerald-900/40 dark:text-emerald-400">
              <CheckCircle2 size={24} />
            </div>
            <h3 className="mt-4 text-sm font-semibold text-slate-900 dark:text-slate-50">Password reset complete</h3>
            <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
              Your password has been reset successfully. You can now log in with your new password.
            </p>
            <Link
              to="/login"
              className="mt-6 flex w-full items-center justify-center gap-2 rounded-2xl bg-slate-900 py-3.5 text-sm font-semibold text-white outline-none transition hover:bg-slate-800 focus-visible:ring-4 focus-visible:ring-slate-900/10 dark:bg-white dark:text-slate-900 dark:hover:bg-slate-100"
            >
              Back to Login
            </Link>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1.5">
              <label htmlFor="password" className="text-sm font-medium text-slate-700 dark:text-slate-300">
                New password
              </label>
              <div className="relative">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4 text-slate-400 dark:text-slate-500">
                  <Lock size={18} />
                </div>
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Must be at least 8 characters"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full rounded-2xl border border-slate-200 bg-white py-3 pl-11 pr-12 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 hover:border-slate-300 focus:border-sky-500 focus:ring-4 focus:ring-sky-500/10 dark:border-slate-700 dark:bg-slate-900 dark:text-white dark:placeholder:text-slate-500 dark:hover:border-slate-600"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 flex items-center pr-4 text-slate-400 transition hover:text-slate-600 outline-none focus-visible:text-sky-600 dark:hover:text-slate-300"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              
              {/* Password Strength Indicator */}
              {password.length > 0 && (
                <div className="pt-2">
                  <div className="h-1.5 w-full overflow-hidden rounded-full bg-slate-100">
                    <div className={`h-full transition-all duration-300 ${strength.color}`}></div>
                  </div>
                  <p className="mt-1.5 text-right text-xs font-medium text-slate-500">
                    {strength.text}
                  </p>
                </div>
              )}
            </div>

            <div className="space-y-1.5">
              <label htmlFor="confirmPassword" className="text-sm font-medium text-slate-700 dark:text-slate-300">
                Confirm new password
              </label>
              <div className="relative">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4 text-slate-400 dark:text-slate-500">
                  <Lock size={18} />
                </div>
                <input
                  id="confirmPassword"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Repeat new password"
                  required
                  className="w-full rounded-2xl border border-slate-200 bg-white py-3 pl-11 pr-12 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 hover:border-slate-300 focus:border-sky-500 focus:ring-4 focus:ring-sky-500/10 dark:border-slate-700 dark:bg-slate-900 dark:text-white dark:placeholder:text-slate-500 dark:hover:border-slate-600"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="mt-6 flex w-full items-center justify-center gap-2 rounded-2xl bg-slate-900 py-3.5 text-sm font-semibold text-white outline-none transition hover:bg-slate-800 focus-visible:ring-4 focus-visible:ring-slate-900/10 disabled:cursor-not-allowed disabled:opacity-70 dark:bg-white dark:text-slate-900 dark:hover:bg-slate-100"
            >
              {isLoading ? <Loader2 size={18} className="animate-spin" /> : 'Reset Password'}
            </button>
            
            <div className="mt-6 flex justify-center">
              <Link to="/login" className="inline-flex items-center gap-2 text-sm font-medium text-slate-500 transition hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200">
                <ArrowLeft size={16} />
                Back to login
              </Link>
            </div>
          </form>
        )}
      </div>
    </AuthLayout>
  )
}

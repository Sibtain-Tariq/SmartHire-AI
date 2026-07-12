import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Lock, Loader2, AlertCircle, CheckCircle2, ArrowLeft, Eye, EyeOff } from 'lucide-react'
import AuthLayout from '../components/AuthLayout'
import { useAuth } from '../context/AuthContext'
import { calculatePasswordStrength, getFriendlyAuthErrorMessage } from '../../../utils/validationHelpers'

export default function ResetPasswordPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  
  const [password, setPassword] = useState('')

  const { updatePassword } = useAuth()
  const navigate = useNavigate()

  const passwordStrength = calculatePasswordStrength(password)

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    const confirmPassword = e.target.confirmPassword.value

    if (!password || !confirmPassword) {
      return setError('Please fill in all fields.')
    }
    if (password !== confirmPassword) {
      return setError('Passwords do not match.')
    }
    if (passwordStrength.score < 2) {
      return setError('Your password is too weak. Please use a stronger password.')
    }

    setIsLoading(true)
    setError('')
    setSuccess(false)
    
    try {
      const response = await updatePassword(password)
      
      if (!response.success) {
        setError(getFriendlyAuthErrorMessage(response.error?.message))
        setIsLoading(false)
        return
      }

      setSuccess(true)
      
      // Automatic login/redirect since session is active
      setTimeout(() => {
        navigate('/dashboard')
      }, 2000)
      
    } catch (err) {
      setError(getFriendlyAuthErrorMessage(err.message))
      setIsLoading(false)
    }
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
              Your password has been reset successfully. You are now being redirected to the dashboard...
            </p>
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
                  disabled={isLoading}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full rounded-2xl border border-slate-200 bg-white py-3 pl-11 pr-12 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 hover:border-slate-300 focus:border-sky-500 focus:ring-4 focus:ring-sky-500/10 disabled:opacity-60 dark:border-slate-700 dark:bg-slate-900 dark:text-white dark:placeholder:text-slate-500 dark:hover:border-slate-600"
                />
                <button
                  type="button"
                  disabled={isLoading}
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 flex items-center pr-4 text-slate-400 transition hover:text-slate-600 outline-none focus-visible:text-sky-600 disabled:opacity-60 dark:hover:text-slate-300"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              
              {/* Password Strength Indicator */}
              {password.length > 0 && (
                <div className="pt-2">
                  <div className="flex items-center justify-between text-xs mb-1.5">
                    <span className="text-slate-500 dark:text-slate-400">Password strength:</span>
                    <span className={`font-medium ${passwordStrength.color.replace('bg-', 'text-')}`}>
                      {passwordStrength.label}
                    </span>
                  </div>
                  <div className="h-1.5 w-full overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800">
                    <div className={`h-full rounded-full transition-all duration-300 ${passwordStrength.color} ${passwordStrength.width}`}></div>
                  </div>
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
                  disabled={isLoading}
                  className="w-full rounded-2xl border border-slate-200 bg-white py-3 pl-11 pr-12 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 hover:border-slate-300 focus:border-sky-500 focus:ring-4 focus:ring-sky-500/10 disabled:opacity-60 dark:border-slate-700 dark:bg-slate-900 dark:text-white dark:placeholder:text-slate-500 dark:hover:border-slate-600"
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

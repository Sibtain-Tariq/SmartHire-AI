import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Mail, Loader2, AlertCircle, CheckCircle2, ArrowLeft } from 'lucide-react'
import AuthLayout from '../components/AuthLayout'
import { useAuth } from '../../../hooks/useAuth'

export default function ForgotPasswordPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)

  const { resetPassword } = useAuth()

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    const email = e.target.email.value.trim()
    if (!email) {
      return setError('Please enter a valid email address.')
    }

    setIsLoading(true)
    setError('')
    setSuccess(false)
    
    try {
      const response = await resetPassword(email)
      
      if (!response.success) {
        setError(response.error?.message || 'Failed to send reset link.')
        setIsLoading(false)
        return
      }
      
      setSuccess(true)
    } catch (err) {
      setError(err.message || 'An unexpected error occurred.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <AuthLayout>
      <div className="w-full">
        <div className="mb-8 text-center sm:text-left">
          <Link to="/login" className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-slate-500 transition hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200">
            <ArrowLeft size={16} />
            Back to login
          </Link>
          <h1 className="text-2xl font-semibold tracking-tight text-slate-900 dark:text-slate-50">Reset your password</h1>
          <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">Enter your email address and we'll send you a link to reset your password.</p>
        </div>

        {error && (
          <div className="mb-6 flex items-start gap-3 rounded-2xl border border-red-100 bg-red-50 p-4 text-sm text-red-600 dark:bg-red-900/20 dark:text-red-400 dark:border-red-900/30">
            <AlertCircle size={18} className="mt-0.5 shrink-0" />
            <p>{error}</p>
          </div>
        )}

        {success ? (
          <div className="mb-6 rounded-2xl border border-sky-100 bg-sky-50 p-6 text-center dark:border-sky-900/30 dark:bg-sky-900/20">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-sky-100 text-sky-600 dark:bg-sky-900/40 dark:text-sky-400">
              <CheckCircle2 size={24} />
            </div>
            <h3 className="mt-4 text-sm font-semibold text-slate-900 dark:text-slate-50">Check your email</h3>
            <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
              We've sent a password reset link to your email address. Please check your inbox.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1.5">
              <label htmlFor="email" className="text-sm font-medium text-slate-700 dark:text-slate-300">
                Email address
              </label>
              <div className="relative">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4 text-slate-400 dark:text-slate-500">
                  <Mail size={18} />
                </div>
                <input
                  id="email"
                  type="email"
                  placeholder="you@company.com"
                  required
                  disabled={isLoading}
                  className="w-full rounded-2xl border border-slate-200 bg-white py-3 pl-11 pr-4 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 hover:border-slate-300 focus:border-sky-500 focus:ring-4 focus:ring-sky-500/10 disabled:opacity-60 dark:border-slate-700 dark:bg-slate-900 dark:text-white dark:placeholder:text-slate-500 dark:hover:border-slate-600"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="mt-6 flex w-full items-center justify-center gap-2 rounded-2xl bg-slate-900 py-3.5 text-sm font-semibold text-white outline-none transition hover:bg-slate-800 focus-visible:ring-4 focus-visible:ring-slate-900/10 disabled:cursor-not-allowed disabled:opacity-70 dark:bg-white dark:text-slate-900 dark:hover:bg-slate-100"
            >
              {isLoading ? <Loader2 size={18} className="animate-spin" /> : 'Send Reset Link'}
            </button>
          </form>
        )}
      </div>
    </AuthLayout>
  )
}

import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Mail, Loader2, AlertCircle, CheckCircle2, ArrowLeft } from 'lucide-react'
import AuthLayout from '../components/AuthLayout'

export default function ForgotPasswordPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)

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
      // setError('We could not find an account associated with this email.')
    }, 1500)
  }

  return (
    <AuthLayout>
      <div className="w-full">
        <div className="mb-8 text-center sm:text-left">
          <Link to="/login" className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-slate-500 transition hover:text-slate-800">
            <ArrowLeft size={16} />
            Back to login
          </Link>
          <h1 className="text-2xl font-semibold tracking-tight text-slate-900">Reset your password</h1>
          <p className="mt-2 text-sm text-slate-600">Enter your email address and we'll send you a link to reset your password.</p>
        </div>

        {error && (
          <div className="mb-6 flex items-start gap-3 rounded-2xl border border-red-100 bg-red-50 p-4 text-sm text-red-600">
            <AlertCircle size={18} className="mt-0.5 shrink-0" />
            <p>{error}</p>
          </div>
        )}

        {success ? (
          <div className="mb-6 rounded-2xl border border-sky-100 bg-sky-50 p-6 text-center">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-sky-100 text-sky-600">
              <CheckCircle2 size={24} />
            </div>
            <h3 className="mt-4 text-sm font-semibold text-slate-900">Check your email</h3>
            <p className="mt-2 text-sm text-slate-600">
              We've sent a password reset link to your email address. Please check your inbox.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1.5">
              <label htmlFor="email" className="text-sm font-medium text-slate-700">
                Email address
              </label>
              <div className="relative">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4 text-slate-400">
                  <Mail size={18} />
                </div>
                <input
                  id="email"
                  type="email"
                  placeholder="you@company.com"
                  required
                  className="w-full rounded-2xl border border-slate-200 bg-white py-3 pl-11 pr-4 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 hover:border-slate-300 focus:border-sky-500 focus:ring-4 focus:ring-sky-500/10"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="mt-6 flex w-full items-center justify-center gap-2 rounded-2xl bg-slate-900 py-3.5 text-sm font-semibold text-white outline-none transition hover:bg-slate-800 focus-visible:ring-4 focus-visible:ring-slate-900/10 disabled:cursor-not-allowed disabled:opacity-70"
            >
              {isLoading ? <Loader2 size={18} className="animate-spin" /> : 'Send Reset Link'}
            </button>
          </form>
        )}
      </div>
    </AuthLayout>
  )
}

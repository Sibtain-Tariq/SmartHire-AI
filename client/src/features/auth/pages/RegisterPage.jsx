import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { User, Mail, Lock, Loader2, AlertCircle, Eye, EyeOff } from 'lucide-react'
import AuthLayout from '../components/AuthLayout'
import { useAuth } from '../context/AuthContext'

export default function RegisterPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [showPassword, setShowPassword] = useState(false)

  const { signUp } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')
    
    try {
      // Pass full name in metadata payload
      const response = await signUp(e.target.email.value, e.target.password.value, { full_name: e.target.name.value })
      if (!response.success) {
        setError(response.error?.message || 'Failed to register.')
        setIsLoading(false)
        return
      }
      navigate('/dashboard')
    } catch (err) {
      setError(err.message || 'An unexpected error occurred.')
      setIsLoading(false)
    }
  }

  return (
    <AuthLayout>
      <div className="w-full">
        <div className="mb-8 text-center sm:text-left">
          <h1 className="text-2xl font-semibold tracking-tight text-slate-900 dark:text-slate-50">Create an account</h1>
          <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">Get started with SmartHire AI today.</p>
        </div>

        {error ? (
          <div className="mb-6 flex items-start gap-3 rounded-2xl bg-red-50 p-4 text-sm text-red-600 border border-red-100 dark:bg-red-900/20 dark:text-red-400 dark:border-red-900/30">
            <AlertCircle size={18} className="mt-0.5 shrink-0" />
            <p>{error}</p>
          </div>
        ) : null}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1.5">
            <label htmlFor="name" className="text-sm font-medium text-slate-700 dark:text-slate-300">
              Full name
            </label>
            <div className="relative">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4 text-slate-400 dark:text-slate-500">
                <User size={18} />
              </div>
              <input
                id="name"
                type="text"
                placeholder="Jane Doe"
                required
                className="w-full rounded-2xl border border-slate-200 bg-white py-3 pl-11 pr-4 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 hover:border-slate-300 focus:border-sky-500 focus:ring-4 focus:ring-sky-500/10 dark:border-slate-700 dark:bg-slate-900 dark:text-white dark:placeholder:text-slate-500 dark:hover:border-slate-600"
              />
            </div>
          </div>

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
                className="w-full rounded-2xl border border-slate-200 bg-white py-3 pl-11 pr-4 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 hover:border-slate-300 focus:border-sky-500 focus:ring-4 focus:ring-sky-500/10 dark:border-slate-700 dark:bg-slate-900 dark:text-white dark:placeholder:text-slate-500 dark:hover:border-slate-600"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label htmlFor="password" className="text-sm font-medium text-slate-700 dark:text-slate-300">
              Password
            </label>
            <div className="relative">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4 text-slate-400 dark:text-slate-500">
                <Lock size={18} />
              </div>
              <input
                id="password"
                type={showPassword ? 'text' : 'password'}
                placeholder="Create a password (min 8 chars)"
                required
                minLength={8}
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
          </div>

          <div className="py-2">
            <label className="flex items-start gap-2 cursor-pointer group">
              <input 
                type="checkbox" 
                required
                className="mt-0.5 h-4 w-4 shrink-0 rounded border-slate-300 text-sky-600 transition focus:ring-sky-500/20 dark:border-slate-700 dark:bg-slate-900 dark:checked:bg-sky-600" 
              />
              <span className="text-sm text-slate-600 select-none group-hover:text-slate-800 transition dark:text-slate-400 dark:group-hover:text-slate-200">
                I agree to the <a href="#terms" className="font-medium text-sky-600 hover:text-sky-700">Terms of Service</a> and <a href="#privacy" className="font-medium text-sky-600 hover:text-sky-700">Privacy Policy</a>.
              </span>
            </label>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="flex w-full items-center justify-center gap-2 rounded-2xl bg-slate-900 py-3.5 text-sm font-semibold text-white outline-none transition hover:bg-slate-800 focus-visible:ring-4 focus-visible:ring-slate-900/10 disabled:opacity-70 disabled:cursor-not-allowed dark:bg-white dark:text-slate-900 dark:hover:bg-slate-100"
          >
            {isLoading ? <Loader2 size={18} className="animate-spin" /> : 'Create account'}
          </button>
        </form>

        <div className="my-8 flex items-center gap-4">
          <div className="h-px flex-1 bg-slate-200 dark:bg-slate-800"></div>
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500">Or sign up with</span>
          <div className="h-px flex-1 bg-slate-200 dark:bg-slate-800"></div>
        </div>

        <button
          type="button"
          className="flex w-full items-center justify-center gap-3 rounded-2xl border border-slate-200 bg-white py-3.5 text-sm font-semibold text-slate-700 outline-none transition hover:bg-slate-50 focus-visible:ring-4 focus-visible:ring-slate-200 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300 dark:hover:bg-slate-800"
        >
          <svg className="h-5 w-5" viewBox="0 0 24 24">
            <path
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              fill="#4285F4"
            />
            <path
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              fill="#34A853"
            />
            <path
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              fill="#FBBC05"
            />
            <path
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              fill="#EA4335"
            />
          </svg>
          Google
        </button>

        <p className="mt-8 text-center text-sm text-slate-600 dark:text-slate-400">
          Already have an account?{' '}
          <Link to="/login" className="font-semibold text-sky-600 transition hover:text-sky-700">
            Log in
          </Link>
        </p>
      </div>
    </AuthLayout>
  )
}

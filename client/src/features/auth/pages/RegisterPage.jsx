import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { User, Mail, Lock, Loader2, AlertCircle, Eye, EyeOff, CheckCircle2 } from 'lucide-react'
import AuthLayout from '../components/AuthLayout'
import { useAuth } from '../../../hooks/useAuth'
import { calculatePasswordStrength, getPasswordRequirements } from '../../../utils/validationHelpers'

export default function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  
  const { signUp } = useAuth()
  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm({
    mode: 'onTouched',
    defaultValues: {
      termsAccepted: false
    }
  })

  const passwordValue = watch('password') || ''
  const passwordStrength = calculatePasswordStrength(passwordValue)
  const passwordReqs = getPasswordRequirements(passwordValue)
  const isPasswordValid = passwordStrength.score === 5

  const termsAccepted = watch('termsAccepted')

  const onSubmit = async (data) => {
    if (!isPasswordValid) return

    try {
      const response = await signUp(data.email, data.password, { full_name: data.name })
      
      if (!response.success) {
        let errorMsg = response.error?.message || 'Unable to connect. Please try again.'
        if (errorMsg.toLowerCase().includes('already registered') || errorMsg.toLowerCase().includes('already exists')) {
          errorMsg = 'An account with this email already exists.'
        }
        toast.error(errorMsg)
        return
      }
      
      toast.success('Account created successfully. Please verify your email.', { duration: 4000 })
      
      setTimeout(() => {
        navigate('/dashboard')
      }, 800)
      
    } catch (err) {
      toast.error('Unable to connect. Please try again.')
    }
  }

  return (
    <AuthLayout>
      <div className="w-full">
        <div className="mb-8 text-center sm:text-left">
          <h1 className="text-2xl font-semibold tracking-tight text-slate-900 dark:text-slate-50">Create an account</h1>
          <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">Get started with SmartHire AI today.</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
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
                disabled={isSubmitting}
                autoFocus
                {...register('name', { required: 'Full name is required' })}
                className={`w-full rounded-2xl border bg-white py-3 pl-11 pr-4 text-sm outline-none transition disabled:opacity-60 dark:bg-slate-900 dark:text-white dark:placeholder:text-slate-500 ${
                  errors.name 
                    ? 'border-red-500 ring-4 ring-red-500/10 text-red-900 dark:border-red-500/50 dark:text-red-400' 
                    : 'border-slate-200 text-slate-900 placeholder:text-slate-400 hover:border-slate-300 focus:border-sky-500 focus:ring-4 focus:ring-sky-500/10 dark:border-slate-700 dark:hover:border-slate-600'
                }`}
              />
            </div>
            {errors.name && (
              <p className="mt-1 text-xs text-red-500 flex items-center gap-1.5"><AlertCircle size={12}/>{errors.name.message}</p>
            )}
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
                disabled={isSubmitting}
                {...register('email', { 
                  required: 'Email is required',
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Invalid email address"
                  }
                })}
                className={`w-full rounded-2xl border bg-white py-3 pl-11 pr-4 text-sm outline-none transition disabled:opacity-60 dark:bg-slate-900 dark:text-white dark:placeholder:text-slate-500 ${
                  errors.email 
                    ? 'border-red-500 ring-4 ring-red-500/10 text-red-900 dark:border-red-500/50 dark:text-red-400' 
                    : 'border-slate-200 text-slate-900 placeholder:text-slate-400 hover:border-slate-300 focus:border-sky-500 focus:ring-4 focus:ring-sky-500/10 dark:border-slate-700 dark:hover:border-slate-600'
                }`}
              />
            </div>
            {errors.email && (
              <p className="mt-1 text-xs text-red-500 flex items-center gap-1.5"><AlertCircle size={12}/>{errors.email.message}</p>
            )}
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
                placeholder="Create a password"
                disabled={isSubmitting}
                {...register('password', { 
                  required: 'Password is required',
                  validate: () => passwordStrength.score === 5 || 'Password does not meet all requirements'
                })}
                className={`w-full rounded-2xl border bg-white py-3 pl-11 pr-12 text-sm outline-none transition disabled:opacity-60 dark:bg-slate-900 dark:text-white dark:placeholder:text-slate-500 ${
                  errors.password 
                    ? 'border-red-500 ring-4 ring-red-500/10 text-red-900 dark:border-red-500/50 dark:text-red-400' 
                    : 'border-slate-200 text-slate-900 placeholder:text-slate-400 hover:border-slate-300 focus:border-sky-500 focus:ring-4 focus:ring-sky-500/10 dark:border-slate-700 dark:hover:border-slate-600'
                }`}
              />
              <button
                type="button"
                disabled={isSubmitting}
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 flex items-center pr-4 text-slate-400 transition hover:text-slate-600 outline-none focus-visible:text-sky-600 disabled:opacity-60 dark:hover:text-slate-300"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
            
            {/* Live Password Requirements & Strength Indicator */}
            {passwordValue.length > 0 && (
              <div className="pt-2 space-y-3">
                {/* Strength Bar */}
                <div>
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
                
                {/* Checklist */}
                <div className="space-y-1.5 pt-1">
                  {passwordReqs.map((req, i) => (
                    <div key={i} className={`flex items-center gap-2 text-xs transition-colors duration-200 ${req.met ? 'text-emerald-600 dark:text-emerald-400' : 'text-slate-500 dark:text-slate-400'}`}>
                      <CheckCircle2 size={14} className={`transition-opacity duration-200 ${req.met ? 'opacity-100' : 'opacity-40'}`} />
                      <span>{req.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="space-y-1.5">
            <label htmlFor="confirmPassword" className="text-sm font-medium text-slate-700 dark:text-slate-300">
              Confirm Password
            </label>
            <div className="relative">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4 text-slate-400 dark:text-slate-500">
                <Lock size={18} />
              </div>
              <input
                id="confirmPassword"
                type={showConfirmPassword ? 'text' : 'password'}
                placeholder="Confirm your password"
                disabled={isSubmitting}
                {...register('confirmPassword', { 
                  required: 'Please confirm your password',
                  validate: (val) => val === passwordValue || 'Passwords do not match.'
                })}
                className={`w-full rounded-2xl border bg-white py-3 pl-11 pr-12 text-sm outline-none transition disabled:opacity-60 dark:bg-slate-900 dark:text-white dark:placeholder:text-slate-500 ${
                  errors.confirmPassword 
                    ? 'border-red-500 ring-4 ring-red-500/10 text-red-900 dark:border-red-500/50 dark:text-red-400' 
                    : 'border-slate-200 text-slate-900 placeholder:text-slate-400 hover:border-slate-300 focus:border-sky-500 focus:ring-4 focus:ring-sky-500/10 dark:border-slate-700 dark:hover:border-slate-600'
                }`}
              />
              <button
                type="button"
                disabled={isSubmitting}
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute inset-y-0 right-0 flex items-center pr-4 text-slate-400 transition hover:text-slate-600 outline-none focus-visible:text-sky-600 disabled:opacity-60 dark:hover:text-slate-300"
              >
                {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
            {errors.confirmPassword && (
              <p className="mt-1 text-xs text-red-500 flex items-center gap-1.5"><AlertCircle size={12}/>{errors.confirmPassword.message}</p>
            )}
          </div>

          <div className="py-2">
            <label htmlFor="termsAccepted" className="flex items-start gap-2 cursor-pointer group">
              <input 
                id="termsAccepted"
                type="checkbox" 
                disabled={isSubmitting}
                {...register('termsAccepted', { required: 'You must accept the Terms of Service to continue.' })}
                className="mt-0.5 h-4 w-4 shrink-0 rounded border-slate-300 text-sky-600 transition focus:ring-sky-500/20 disabled:opacity-60 dark:border-slate-700 dark:bg-slate-900 dark:checked:bg-sky-600" 
              />
              <span className="text-sm text-slate-600 select-none group-hover:text-slate-800 transition dark:text-slate-400 dark:group-hover:text-slate-200">
                I agree to the <a href="#terms" className="font-medium text-sky-600 hover:text-sky-700">Terms of Service</a> and <a href="#privacy" className="font-medium text-sky-600 hover:text-sky-700">Privacy Policy</a>.
              </span>
            </label>
            {errors.termsAccepted && (
              <p className="mt-2 text-xs text-red-500 flex items-center gap-1.5"><AlertCircle size={12}/>{errors.termsAccepted.message}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={isSubmitting || !isPasswordValid}
            className="flex w-full items-center justify-center gap-2 rounded-2xl bg-slate-900 py-3.5 text-sm font-semibold text-white outline-none transition hover:bg-slate-800 focus-visible:ring-4 focus-visible:ring-slate-900/10 disabled:opacity-70 disabled:cursor-not-allowed dark:bg-white dark:text-slate-900 dark:hover:bg-slate-100"
          >
            {isSubmitting ? (
              <>
                <Loader2 size={18} className="animate-spin" />
                Creating Account...
              </>
            ) : (
              'Create account'
            )}
          </button>
        </form>

        <div className="my-8 flex items-center gap-4">
          <div className="h-px flex-1 bg-slate-200 dark:bg-slate-800"></div>
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500">Or sign up with</span>
          <div className="h-px flex-1 bg-slate-200 dark:bg-slate-800"></div>
        </div>

        <button
          type="button"
          disabled={isSubmitting}
          className="flex w-full items-center justify-center gap-3 rounded-2xl border border-slate-200 bg-white py-3.5 text-sm font-semibold text-slate-700 outline-none transition hover:bg-slate-50 focus-visible:ring-4 focus-visible:ring-slate-200 disabled:opacity-70 disabled:cursor-not-allowed dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300 dark:hover:bg-slate-800"
        >
          <svg className="h-5 w-5" viewBox="0 0 24 24">
            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
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

import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { Lock, Loader2, AlertCircle, ArrowLeft, Eye, EyeOff, CheckCircle2 } from 'lucide-react'
import AuthLayout from '../components/AuthLayout'
import { useAuth } from '../../../hooks/useAuth'
import { calculatePasswordStrength, getPasswordRequirements } from '../../../utils/validationHelpers'

export default function ResetPasswordPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  const { updatePassword, signOut, session, isLoading: isAuthLoading } = useAuth()
  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm({
    mode: 'onTouched',
  })

  const passwordValue = watch('password') || ''
  const passwordStrength = calculatePasswordStrength(passwordValue)
  const passwordReqs = getPasswordRequirements(passwordValue)
  const isPasswordValid = passwordStrength.score === 5

  // Protect the route: Only allow access during an active recovery session
  useEffect(() => {
    if (!isAuthLoading && !isSuccess) {
      const isRecovery = sessionStorage.getItem('isPasswordRecovery') === 'true'
      if (!session || !isRecovery) {
        navigate('/login', { replace: true })
      }
    }
  }, [session, isAuthLoading, isSuccess, navigate])

  const onSubmit = async (data) => {
    if (!isPasswordValid) return

    try {
      const response = await updatePassword(data.password)
      
      if (!response.success) {
        toast.error(response.error?.message || 'Unable to connect. Please try again.')
        return
      }

      toast.success('Password updated successfully.')
      setIsSuccess(true)
      
      sessionStorage.removeItem('isPasswordRecovery')
      await signOut()
      
      setTimeout(() => {
        navigate('/login', { replace: true })
      }, 2000)
      
    } catch (err) {
      toast.error('Unable to connect. Please try again.')
    }
  }

  return (
    <AuthLayout>
      <div className="w-full">
        <div className="mb-8 text-center sm:text-left">
          <h1 className="text-2xl font-semibold tracking-tight text-slate-900 dark:text-slate-50">Create new password</h1>
          <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">Your new password must be different from previous used passwords.</p>
        </div>

        {isSuccess ? (
          <div className="mb-6 rounded-2xl border border-emerald-100 bg-emerald-50 p-6 text-center dark:border-emerald-900/30 dark:bg-emerald-900/20">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-emerald-100 text-emerald-600 dark:bg-emerald-900/40 dark:text-emerald-400">
              <CheckCircle2 size={24} />
            </div>
            <h3 className="mt-4 text-sm font-semibold text-slate-900 dark:text-slate-50">Password reset complete</h3>
            <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
              Your password has been reset successfully. You are now being redirected to the login...
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
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
                  disabled={isSubmitting}
                  autoFocus
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
                Confirm new password
              </label>
              <div className="relative">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4 text-slate-400 dark:text-slate-500">
                  <Lock size={18} />
                </div>
                <input
                  id="confirmPassword"
                  type={showConfirmPassword ? 'text' : 'password'}
                  placeholder="Repeat new password"
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

            <button
              type="submit"
              disabled={isSubmitting || !isPasswordValid}
              className="mt-6 flex w-full items-center justify-center gap-2 rounded-2xl bg-slate-900 py-3.5 text-sm font-semibold text-white outline-none transition hover:bg-slate-800 focus-visible:ring-4 focus-visible:ring-slate-900/10 disabled:cursor-not-allowed disabled:opacity-70 dark:bg-white dark:text-slate-900 dark:hover:bg-slate-100"
            >
              {isSubmitting ? (
                <>
                  <Loader2 size={18} className="animate-spin" />
                  Updating Password...
                </>
              ) : (
                'Reset Password'
              )}
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

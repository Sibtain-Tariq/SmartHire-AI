import React from 'react'
import { Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { Mail, Loader2, AlertCircle, ArrowLeft } from 'lucide-react'
import AuthLayout from '../components/AuthLayout'
import { useAuth } from '../../../hooks/useAuth'

export default function ForgotPasswordPage() {
  const { resetPassword } = useAuth()

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset
  } = useForm({
    mode: 'onTouched',
  })

  const onSubmit = async (data) => {
    try {
      const response = await resetPassword(data.email)
      
      if (!response.success) {
        toast.error(response.error?.message || 'Unable to connect. Please try again.')
        return
      }
      
      toast.success('Password reset email sent.')
      reset()
    } catch (err) {
      toast.error('Unable to connect. Please try again.')
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

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
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
                autoFocus
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

          <button
            type="submit"
            disabled={isSubmitting}
            className="mt-6 flex w-full items-center justify-center gap-2 rounded-2xl bg-slate-900 py-3.5 text-sm font-semibold text-white outline-none transition hover:bg-slate-800 focus-visible:ring-4 focus-visible:ring-slate-900/10 disabled:cursor-not-allowed disabled:opacity-70 dark:bg-white dark:text-slate-900 dark:hover:bg-slate-100"
          >
            {isSubmitting ? (
              <>
                <Loader2 size={18} className="animate-spin" />
                Sending Email...
              </>
            ) : (
              'Send Reset Link'
            )}
          </button>
        </form>
      </div>
    </AuthLayout>
  )
}

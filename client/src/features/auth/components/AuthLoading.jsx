import React from 'react'
import { Loader2 } from 'lucide-react'

/**
 * AuthLoading
 * Displays a clean, production-ready loading state while the authentication
 * token is being verified or refreshed in the background.
 */
export default function AuthLoading() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-slate-50 gap-4">
      <Loader2 className="h-10 w-10 animate-spin text-sky-500" />
      <p className="text-sm font-medium text-slate-500 animate-pulse">Verifying session...</p>
    </div>
  )
}

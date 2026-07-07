import React from 'react'
import { ArrowRight, Sparkles } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="border-t border-slate-200/80 bg-white px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto flex max-w-7xl flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-600 via-sky-500 to-cyan-400 text-white shadow-lg shadow-sky-200">
              <Sparkles size={18} />
            </div>
            <div>
              <p className="text-lg font-semibold text-slate-900">SmartHire AI</p>
              <p className="text-sm text-slate-500">Premium recruiting intelligence</p>
            </div>
          </div>
          <p className="mt-4 max-w-xl text-sm leading-7 text-slate-600">
            Designed for ambitious teams that want hiring to feel strategic, thoughtful, and beautifully efficient.
          </p>
        </div>
        <a href="#top" className="inline-flex items-center gap-2 text-sm font-semibold text-slate-700 transition hover:text-slate-900">
          Back to top
          <ArrowRight size={16} />
        </a>
      </div>
    </footer>
  )
}

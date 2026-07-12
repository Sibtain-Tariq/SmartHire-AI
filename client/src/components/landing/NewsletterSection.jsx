import React from 'react'
import { ArrowRight, Mail } from 'lucide-react'
import SectionShell from './SectionShell'

export default function NewsletterSection() {
  return (
    <SectionShell className="bg-slate-50/70">
      <div className="mx-auto max-w-4xl rounded-[2rem] border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 p-8 shadow-[0_25px_80px_-40px_rgba(15,23,42,0.45)] sm:p-10">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 px-3 py-2 text-sm font-medium text-slate-600 dark:text-slate-400">
              <Mail size={16} className="text-sky-600" />
              Stay in the loop
            </div>
            <h2 className="mt-4 text-3xl font-semibold tracking-tight text-slate-900 dark:text-slate-50">Subscribe for product updates and recruiting insights.</h2>
            <p className="mt-3 text-lg leading-8 text-slate-600 dark:text-slate-400">Get thoughtful notes on hiring strategy, AI recruiting, and the future of candidate experience.</p>
          </div>
          <form className="flex w-full flex-col gap-3 rounded-[1.4rem] border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 p-4 sm:flex-row sm:items-center lg:max-w-md">
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full rounded-full border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 px-4 py-3 text-sm text-slate-700 outline-none ring-0"
            />
            <button type="button" className="inline-flex items-center justify-center gap-2 rounded-full bg-slate-900 px-4 py-3 text-sm font-semibold text-white">
              Join
              <ArrowRight size={16} />
            </button>
          </form>
        </div>
      </div>
    </SectionShell>
  )
}

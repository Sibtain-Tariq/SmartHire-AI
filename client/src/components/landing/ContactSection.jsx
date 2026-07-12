import React from 'react'
import { ArrowRight, Mail, MapPin, Phone } from 'lucide-react'
import SectionHeading from './SectionHeading'
import SectionShell from './SectionShell'

export default function ContactSection() {
  return (
    <SectionShell id="contact" className="bg-white dark:bg-slate-950">
      <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
        <div>
          <SectionHeading
            eyebrow="Contact"
            title="Let’s build a smarter hiring experience together"
            description="Whether you are shaping your first recruiting workflow or modernizing an enterprise operating model, we would love to talk."
            align="left"
          />
          <div className="mt-8 space-y-4 text-slate-600 dark:text-slate-400">
            <div className="flex items-center gap-3 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 p-4">
              <Mail size={18} className="text-sky-600" />
              <span>hello@smarthire.ai</span>
            </div>
            <div className="flex items-center gap-3 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 p-4">
              <Phone size={18} className="text-sky-600" />
              <span>+1 (415) 555-0148</span>
            </div>
            <div className="flex items-center gap-3 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 p-4">
              <MapPin size={18} className="text-sky-600" />
              <span>San Francisco, CA · Remote-first</span>
            </div>
          </div>
        </div>

        <div className="rounded-[2rem] border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 p-8 shadow-sm">
          <form className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <input className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 px-4 py-3 text-sm text-slate-700 outline-none" placeholder="Name" />
              <input className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 px-4 py-3 text-sm text-slate-700 outline-none" placeholder="Email" />
            </div>
            <input className="w-full rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 px-4 py-3 text-sm text-slate-700 outline-none" placeholder="Company" />
            <textarea className="min-h-36 w-full rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 px-4 py-3 text-sm text-slate-700 outline-none" placeholder="Tell us about your hiring goals" />
            <button type="button" className="inline-flex items-center gap-2 rounded-full bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-700">
              Send inquiry
              <ArrowRight size={16} />
            </button>
          </form>
        </div>
      </div>
    </SectionShell>
  )
}

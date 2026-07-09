import React from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, Sparkles } from 'lucide-react'
import SectionShell from './SectionShell'

export default function CTASection() {
  return (
    <SectionShell className="bg-slate-950 py-24 text-white">
      <div className="rounded-[2.25rem] border border-white/10 bg-gradient-to-br from-slate-900 via-slate-900 to-slate-800 p-10 shadow-[0_25px_70px_-30px_rgba(15,23,42,0.8)] sm:p-14">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-3 py-2 text-sm font-medium text-slate-200">
              <Sparkles size={16} className="text-sky-400" />
              Ready to upgrade your hiring motion?
            </div>
            <h2 className="mt-6 text-3xl font-semibold tracking-tight sm:text-4xl">
              Bring clarity, speed, and confidence to every hire.
            </h2>
            <p className="mt-4 text-lg leading-8 text-slate-300">
              Let’s create a recruiting experience that feels effortless for your team and memorable for every candidate.
            </p>
          </div>
          {/* TODO: Revert to /register when authentication is re-enabled */}
          <Link to="/dashboard" className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-slate-900 transition hover:-translate-y-0.5">
            Sign up
            <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </SectionShell>
  )
}

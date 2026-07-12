import React from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, CheckCircle2, Sparkles } from 'lucide-react'
import SectionHeading from './SectionHeading'
import SectionShell from './SectionShell'

const highlights = ['Auto-summarize candidate intent', 'Detect top-fit roles in seconds', 'Share shortlists with hiring managers']

export default function ATSDemoSection() {
  return (
    <SectionShell id="ats" className="bg-white dark:bg-slate-950">
      <div className="grid items-center gap-10 lg:grid-cols-[0.95fr_1.05fr]">
        <div>
          <SectionHeading
            eyebrow="ATS Experience"
            title="Turn messy applicant data into a polished hiring view"
            description="The ATS layer is built to be elegant, fast, and deeply useful for both operators and executives."
            align="left"
          />
          <div className="mt-8 space-y-4">
            {highlights.map((item) => (
              <div key={item} className="flex items-start gap-3 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 p-4">
                <CheckCircle2 size={18} className="mt-0.5 text-emerald-500" />
                <p className="text-sm font-medium text-slate-700">{item}</p>
              </div>
            ))}
          </div>
          <a href="#contact" className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-slate-900 dark:text-slate-50">
            See the live workflow
            <ArrowRight size={16} />
          </a>
        </div>

        <motion.div
          initial={{ opacity: 0, x: 24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.35 }}
          className="rounded-[2rem] border border-slate-200 dark:border-slate-800 bg-slate-950 p-5 shadow-[0_30px_90px_-40px_rgba(15,23,42,0.6)]"
        >
          <div className="rounded-[1.4rem] border border-white/10 bg-white/10 p-4">
            <div className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/10 px-4 py-3">
              <div>
                <p className="text-sm text-slate-300">Pipeline overview</p>
                <p className="text-lg font-semibold text-white">VP of Marketing</p>
              </div>
              <div className="flex items-center gap-2 rounded-full bg-sky-500/15 px-3 py-1 text-sm font-medium text-sky-300">
                <Sparkles size={14} />
                AI ranked
              </div>
            </div>
            <div className="mt-4 space-y-3">
              {['Ava Chen', 'Jordan Kim', 'Riley Torres'].map((candidate, index) => (
                <div key={candidate} className="flex items-center justify-between rounded-2xl border border-slate-800 bg-slate-900/80 px-4 py-3">
                  <div>
                    <p className="font-medium text-white">{candidate}</p>
                    <p className="text-sm text-slate-400">{index === 0 ? '5 years growth' : index === 1 ? 'B2B strategy' : 'Demand generation'}</p>
                  </div>
                  <div className="rounded-full bg-emerald-500/15 px-3 py-1 text-sm font-medium text-emerald-400">
                    {index === 0 ? 'Top fit' : 'Strong'}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </SectionShell>
  )
}

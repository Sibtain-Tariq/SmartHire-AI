import React from 'react'
import { motion } from 'framer-motion'
import { Bot, Mic, MessageSquare } from 'lucide-react'
import SectionHeading from './SectionHeading'
import SectionShell from './SectionShell'

const moments = [
  'Ask role-specific questions in real time',
  'Capture scorecards with AI summaries',
  'Surface red flags before the next round',
]

export default function InterviewDemoSection() {
  return (
    <SectionShell id="interviews" className="bg-slate-50/70 dark:bg-slate-900/70">
      <div className="grid items-center gap-10 lg:grid-cols-[1.05fr_0.95fr]">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.35 }}
          className="rounded-[2rem] border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 p-8 shadow-[0_25px_80px_-45px_rgba(15,23,42,0.5)]"
        >
          <div className="flex items-center gap-3 text-sky-600">
            <Bot size={20} />
            <p className="text-sm font-semibold uppercase tracking-[0.3em]">Interview copilot</p>
          </div>
          <div className="mt-6 space-y-4">
            {moments.map((moment) => (
              <div key={moment} className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 p-4">
                <p className="text-sm font-medium text-slate-700">{moment}</p>
              </div>
            ))}
          </div>
        </motion.div>

        <div>
          <SectionHeading
            eyebrow="Interview Intelligence"
            title="Blend human connection with AI guidance"
            description="Let the platform handle note-taking and summaries while your team stays focused on evaluating the candidate."
            align="left"
          />
          <div className="mt-8 rounded-[2rem] border border-slate-200 dark:border-slate-800 bg-gradient-to-br from-slate-900 to-slate-800 p-7 text-white shadow-[0_30px_90px_-35px_rgba(15,23,42,0.7)]">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-400">Live conversation</p>
                <p className="mt-1 text-xl font-semibold">Candidate insight stream</p>
              </div>
              <div className="rounded-full bg-sky-500/15 p-2 text-sky-400">
                <Mic size={18} />
              </div>
            </div>
            <div className="mt-6 rounded-2xl border border-white/10 bg-white/10 p-4">
              <div className="flex gap-3">
                <div className="rounded-full bg-white/15 p-2">
                  <MessageSquare size={16} />
                </div>
                <div>
                  <p className="text-sm text-slate-300">AI summary</p>
                  <p className="mt-2 text-sm leading-7 text-slate-100">
                    Strong strategic thinking, clear ownership, and strong communication. Recommended for the final interview loop.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </SectionShell>
  )
}

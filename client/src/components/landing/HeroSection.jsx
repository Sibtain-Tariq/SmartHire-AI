import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight, Play, Sparkles, ShieldCheck, Bot } from 'lucide-react'

export default function HeroSection() {
  return (
    <section id="top" className="relative overflow-hidden bg-[radial-gradient(circle_at_top_left,_rgba(14,165,233,0.16),_transparent_40%),linear-gradient(135deg,_#f8fbff_0%,_#eef4ff_55%,_#fdfefe_100%)] px-4 py-24 sm:px-6 lg:px-8">
      <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-[1.05fr_0.95fr]">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease: 'easeOut' }}
          className="max-w-2xl"
        >
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white/80 px-3 py-2 text-sm font-medium text-slate-700 shadow-sm">
            <Sparkles size={16} className="text-sky-500" />
            AI recruiting that feels like a premium operator
          </div>
          <h1 className="text-5xl font-semibold tracking-tight text-slate-950 sm:text-6xl lg:text-7xl">
            Hire faster with <span className="bg-gradient-to-r from-indigo-600 via-sky-500 to-cyan-400 bg-clip-text text-transparent">clarity</span> and <span className="text-slate-800">confidence</span>.
          </h1>
          <p className="mt-6 text-lg leading-8 text-slate-600 sm:text-xl">
            From job descriptions to interviews, SmartHire AI transforms recruiting into a calm, data-rich workflow that helps teams move from first review to offer in days, not weeks.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link to="/register" className="inline-flex items-center justify-center gap-2 rounded-full bg-slate-900 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-slate-200 transition hover:-translate-y-0.5 hover:bg-slate-700">
              Start hiring smarter
              <ArrowRight size={16} />
            </Link>
            <a href="#ats" className="inline-flex items-center justify-center gap-2 rounded-full border border-slate-300 bg-white/80 px-6 py-3 text-sm font-semibold text-slate-700 transition hover:border-slate-400 hover:bg-white">
              <Play size={16} />
              Watch the demo
            </a>
          </div>
          <div className="mt-8 flex flex-wrap items-center gap-4 text-sm text-slate-600">
            <div className="flex items-center gap-2 rounded-full bg-white/70 px-3 py-2 shadow-sm">
              <ShieldCheck size={16} className="text-emerald-500" />
              Bias-aware screening
            </div>
            <div className="flex items-center gap-2 rounded-full bg-white/70 px-3 py-2 shadow-sm">
              <Bot size={16} className="text-sky-500" />
              AI interview copilot
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 24 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut', delay: 0.1 }}
          className="relative"
        >
          <div className="absolute inset-0 rounded-[2rem] bg-gradient-to-br from-sky-400/20 to-indigo-500/20 blur-3xl" />
          <div className="relative overflow-hidden rounded-[2rem] border border-slate-200/70 bg-white/80 p-4 shadow-[0_30px_90px_-35px_rgba(15,23,42,0.45)] backdrop-blur-xl">
            <div className="rounded-[1.5rem] border border-slate-200 bg-slate-950 p-5 text-white">
              <div className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/10 px-4 py-3">
                <div>
                  <p className="text-sm text-slate-300">Hiring pulse</p>
                  <p className="text-xl font-semibold">12 new applicants</p>
                </div>
                <div className="rounded-full bg-emerald-500/15 px-3 py-1 text-sm font-medium text-emerald-400">
                  +24% this week
                </div>
              </div>
              <div className="mt-5 grid gap-4 md:grid-cols-2">
                <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-4">
                  <p className="text-sm text-slate-400">Qualified matches</p>
                  <p className="mt-2 text-3xl font-semibold">84%</p>
                  <div className="mt-3 h-2 rounded-full bg-slate-800">
                    <div className="h-2 w-[84%] rounded-full bg-gradient-to-r from-sky-400 to-cyan-400" />
                  </div>
                </div>
                <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-4">
                  <p className="text-sm text-slate-400">Interview readiness</p>
                  <p className="mt-2 text-3xl font-semibold">6.8/10</p>
                  <div className="mt-3 h-2 rounded-full bg-slate-800">
                    <div className="h-2 w-[68%] rounded-full bg-gradient-to-r from-indigo-400 to-violet-400" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

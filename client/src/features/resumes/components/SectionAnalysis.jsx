import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown, ChevronUp, User, Zap, Briefcase, GraduationCap, FolderOpen, Award, Globe, Trophy, LayoutTemplate } from 'lucide-react'

const sectionsMock = [
  { id: '1', title: 'Professional Summary', score: 68, statusLabel: 'Needs Improvement', explanation: 'Your summary lacks keyword density and fails to highlight your total years of experience clearly. This is prime real estate for the ATS parser.', priority: 'High', impact: '+5', icon: User },
  { id: '2', title: 'Skills', score: 92, statusLabel: 'Excellent', explanation: 'Strong grouping of hard and soft skills. Relevant to the target industry standards.', priority: 'Low', impact: '+1', icon: Zap },
  { id: '3', title: 'Work Experience', score: 85, statusLabel: 'Good', explanation: 'Standard chronological layout detected, but a few bullet points lack quantified impact metrics (e.g., percentages or revenue amounts).', priority: 'Medium', impact: '+6', icon: Briefcase },
  { id: '4', title: 'Education', score: 100, statusLabel: 'Excellent', explanation: 'Perfectly formatted. Degree, institution, and dates are all easily scannable.', priority: 'Low', impact: '+0', icon: GraduationCap },
  { id: '5', title: 'Projects', score: 54, statusLabel: 'Missing measurable impact', explanation: 'Project descriptions are too brief. They lack links to live deployments or GitHub repositories, and don\'t mention the tech stack used.', priority: 'High', impact: '+8', icon: FolderOpen },
  { id: '6', title: 'Certifications', score: 0, statusLabel: 'Missing Section', explanation: 'No certifications section detected. Adding an AWS or industry-standard certification can significantly boost ATS match rates for technical roles.', priority: 'Medium', impact: '+4', icon: Award },
  { id: '7', title: 'Languages', score: 100, statusLabel: 'Excellent', explanation: 'Clearly formatted with appropriate proficiency levels indicated.', priority: 'Low', impact: '+0', icon: Globe },
  { id: '8', title: 'Achievements', score: 40, statusLabel: 'Needs Context', explanation: 'You listed awards but failed to provide context on why you won them or how many people you competed against.', priority: 'Medium', impact: '+3', icon: Trophy }
]

const getScoreConfig = (score) => {
  if (score >= 90) return { color: 'text-emerald-700', bg: 'bg-emerald-50', bar: 'bg-emerald-500', border: 'border-emerald-200' }
  if (score >= 75) return { color: 'text-sky-700', bg: 'bg-sky-50', bar: 'bg-sky-500', border: 'border-sky-200' }
  if (score >= 50) return { color: 'text-amber-700', bg: 'bg-amber-50', bar: 'bg-amber-500', border: 'border-amber-200' }
  return { color: 'text-red-700', bg: 'bg-red-50', bar: 'bg-red-500', border: 'border-red-200' }
}

const PriorityBadge = ({ priority }) => {
  const styles = {
    High: 'bg-red-50 text-red-700 border-red-100',
    Medium: 'bg-amber-50 text-amber-700 border-amber-100',
    Low: 'bg-slate-50 text-slate-700 border-slate-200'
  }
  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded border text-[10px] font-bold uppercase tracking-wider ${styles[priority] || styles.Low}`}>
      {priority} Priority
    </span>
  )
}

const SectionAnalysisCard = ({ section }) => {
  const [isExpanded, setIsExpanded] = useState(false)
  const Icon = section.icon
  const config = getScoreConfig(section.score)

  return (
    <div className="flex flex-col rounded-2xl border border-slate-200 bg-white shadow-sm transition-all hover:border-indigo-200 hover:shadow-md overflow-hidden">
      <button 
        onClick={() => setIsExpanded(!isExpanded)}
        className="flex w-full items-center justify-between p-4 text-left transition-colors hover:bg-slate-50/50 outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-inset"
      >
        <div className="flex items-center gap-4 w-full">
          <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-slate-50 text-slate-600`}>
            <Icon size={20} />
          </div>
          
          <div className="flex flex-col gap-1.5 flex-1 pr-4">
            <div className="flex items-center justify-between">
              <h4 className="font-bold text-slate-900 leading-tight">
                {section.title}
              </h4>
              <span className="text-xl font-black text-slate-900 tracking-tight">{section.score}%</span>
            </div>
            
            <div className="flex items-center gap-3">
              <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-slate-100">
                <div 
                  className={`h-full rounded-full ${config.bar} transition-all duration-1000 ease-out`}
                  style={{ width: `${section.score}%` }}
                />
              </div>
              <span className={`shrink-0 inline-flex items-center rounded px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider ${config.bg} ${config.color}`}>
                {section.statusLabel}
              </span>
            </div>
          </div>
        </div>

        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-slate-50 text-slate-400 ml-2 transition-transform">
          {isExpanded ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
        </div>
      </button>

      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
          >
            <div className="border-t border-slate-100 bg-slate-50/50 p-4 pt-4">
              <p className="text-sm leading-relaxed text-slate-600">
                {section.explanation}
              </p>
              
              <div className="mt-4 flex items-center gap-4 border-t border-slate-200/60 pt-4">
                <div className="flex flex-col gap-1">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Action Priority</span>
                  <PriorityBadge priority={section.priority} />
                </div>
                <div className="h-8 w-px bg-slate-200/60"></div>
                <div className="flex flex-col gap-1">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Est. Impact</span>
                  <span className="inline-flex items-center rounded bg-indigo-50 px-2 py-0.5 text-xs font-bold text-indigo-700 border border-indigo-100">
                    {section.impact} ATS Score
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default function SectionAnalysis() {
  return (
    <section className="flex flex-col gap-6">
      <div className="flex items-center gap-2 font-semibold text-slate-900 px-2">
        <LayoutTemplate size={20} className="text-indigo-500" />
        Section-by-Section Analysis
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        {sectionsMock.map(section => (
          <SectionAnalysisCard key={section.id} section={section} />
        ))}
      </div>
    </section>
  )
}

import React, { useState } from 'react'
import { Sparkles, ChevronDown, ChevronUp, TrendingUp, Zap, Target, BookOpen } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

const suggestionsMock = [
  {
    id: 'sug1',
    title: 'Increase the number of quantified achievements',
    description: 'Recruiters and ATS systems heavily favor bullet points that include numbers. Try to quantify your impact in your most recent role. For example, instead of "Improved system performance", write "Improved system performance by 35%, reducing latency by 200ms".',
    priority: 'High',
    impact: '+8',
    category: 'Impact',
    difficulty: 'Medium',
    icon: TrendingUp
  },
  {
    id: 'sug2',
    title: 'Add cloud technologies relevant to your target role',
    description: 'Add AWS, Docker and Kubernetes to your skills section. Your target roles frequently mention these technologies, and explicitly listing them will help bypass strict ATS keyword filters.',
    priority: 'High',
    impact: '+7',
    category: 'Skills',
    difficulty: 'Easy',
    icon: Zap
  },
  {
    id: 'sug3',
    title: 'Use stronger action verbs',
    description: 'You frequently use passive phrases like "Responsible for" or "Helped with". Replace these with strong action verbs like "Architected", "Spearheaded", or "Optimized" to convey leadership and ownership.',
    priority: 'Medium',
    impact: '+4',
    category: 'Formatting',
    difficulty: 'Easy',
    icon: Target
  },
  {
    id: 'sug4',
    title: 'Improve professional summary',
    description: 'Your summary is slightly generic. Tailor it to highlight your specific niche and years of experience to hook the recruiter immediately. Focus on your unique value proposition.',
    priority: 'Low',
    impact: '+2',
    category: 'Content',
    difficulty: 'Hard',
    icon: BookOpen
  }
]

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

const DifficultyBadge = ({ difficulty }) => {
  const styles = {
    Easy: 'text-emerald-600 bg-emerald-50',
    Medium: 'text-sky-600 bg-sky-50',
    Hard: 'text-indigo-600 bg-indigo-50'
  }
  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-semibold ${styles[difficulty] || styles.Medium}`}>
      {difficulty}
    </span>
  )
}

const SuggestionCard = ({ suggestion }) => {
  const [isExpanded, setIsExpanded] = useState(false)
  const Icon = suggestion.icon

  return (
    <div className="flex flex-col rounded-2xl border border-sky-100 bg-white shadow-sm transition-all hover:border-sky-200 hover:shadow-md overflow-hidden">
      <button 
        onClick={() => setIsExpanded(!isExpanded)}
        className="flex w-full items-start justify-between p-5 text-left transition-colors hover:bg-slate-50/50 outline-none focus-visible:ring-2 focus-visible:ring-sky-500 focus-visible:ring-inset"
      >
        <div className="flex items-start gap-4 pr-4">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-sky-50 text-sky-600">
            <Icon size={20} />
          </div>
          <div className="flex flex-col gap-1.5">
            <h4 className="font-bold text-slate-900 leading-tight">
              {suggestion.title}
            </h4>
            <div className="flex flex-wrap items-center gap-2 mt-1">
              <PriorityBadge priority={suggestion.priority} />
              <span className="inline-flex items-center rounded bg-sky-100 px-2 py-0.5 text-[10px] font-bold text-sky-800 uppercase tracking-wider">
                {suggestion.impact} ATS Score
              </span>
            </div>
          </div>
        </div>
        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-slate-50 text-slate-400 mt-1">
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
            <div className="border-t border-slate-100 bg-slate-50/50 p-5 pt-4">
              <p className="text-sm leading-relaxed text-slate-600">
                {suggestion.description}
              </p>
              
              <div className="mt-4 flex items-center gap-4 border-t border-slate-200/60 pt-4">
                <div className="flex flex-col gap-1">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Category</span>
                  <span className="text-sm font-semibold text-slate-700">{suggestion.category}</span>
                </div>
                <div className="h-8 w-px bg-slate-200/60"></div>
                <div className="flex flex-col gap-1">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Difficulty</span>
                  <DifficultyBadge difficulty={suggestion.difficulty} />
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default function AISuggestionsSection() {
  return (
    <section className="flex flex-col gap-6">
      <div className="flex items-center justify-between px-2">
        <div className="flex items-center gap-2 font-semibold text-slate-900">
          <Sparkles size={20} className="text-sky-500" />
          AI Recommendations
        </div>
        <span className="rounded-full bg-sky-50 px-2.5 py-0.5 text-xs font-bold text-sky-600 border border-sky-100">
          {suggestionsMock.length} Suggestions
        </span>
      </div>

      <div className="flex flex-col gap-4">
        {suggestionsMock.map(suggestion => (
          <SuggestionCard key={suggestion.id} suggestion={suggestion} />
        ))}
      </div>
    </section>
  )
}

import React, { useState, useMemo } from 'react'
import { CheckCircle2, XCircle, Search, ChevronDown, ChevronUp, AlertCircle, PieChart } from 'lucide-react'

const matchedKeywordsMock = [
  { text: 'Python', level: 'high', category: 'Language' },
  { text: 'React', level: 'high', category: 'Framework' },
  { text: 'SQL', level: 'high', category: 'Database' },
  { text: 'FastAPI', level: 'medium', category: 'Framework' },
  { text: 'REST APIs', level: 'high', category: 'Concept' },
  { text: 'Docker', level: 'medium', category: 'Tool' },
  { text: 'Git', level: 'high', category: 'Tool' },
  { text: 'Agile', level: 'medium', category: 'Methodology' },
]

const missingKeywordsMock = [
  { text: 'AWS', category: 'Cloud' },
  { text: 'CI/CD', category: 'Concept' },
  { text: 'Kubernetes', category: 'Tool' },
  { text: 'Leadership', category: 'Soft Skill' },
  { text: 'Testing', category: 'Practice' },
  { text: 'Communication', category: 'Soft Skill' },
  { text: 'Microservices', category: 'Architecture' },
]

export default function KeywordAnalysisSection() {
  const [searchQuery, setSearchQuery] = useState('')
  const [isExpanded, setIsExpanded] = useState(false)

  const filteredMatched = useMemo(() => {
    if (!searchQuery) return matchedKeywordsMock
    return matchedKeywordsMock.filter(k => k.text.toLowerCase().includes(searchQuery.toLowerCase()))
  }, [searchQuery])

  const filteredMissing = useMemo(() => {
    if (!searchQuery) return missingKeywordsMock
    return missingKeywordsMock.filter(k => k.text.toLowerCase().includes(searchQuery.toLowerCase()))
  }, [searchQuery])

  // If not expanded, show only top 5 of each (if no search query is active)
  const displayMatched = (isExpanded || searchQuery) ? filteredMatched : filteredMatched.slice(0, 5)
  const displayMissing = (isExpanded || searchQuery) ? filteredMissing : filteredMissing.slice(0, 5)

  const hasMore = !searchQuery && (matchedKeywordsMock.length > 5 || missingKeywordsMock.length > 5)

  // Density Stats
  const totalKeywords = matchedKeywordsMock.length + missingKeywordsMock.length
  const matchedCount = matchedKeywordsMock.length
  const missingCount = missingKeywordsMock.length
  const optimizationPercent = Math.round((matchedCount / totalKeywords) * 100)

  return (
    <section className="flex flex-col gap-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 px-2">
        <div className="flex items-center gap-2 font-semibold text-slate-900">
          <CheckCircle2 size={20} className="text-teal-500" />
          Keyword Analysis
        </div>
        <div className="relative w-full sm:max-w-xs">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
          <input
            type="text"
            placeholder="Search keywords..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded-xl border border-slate-200 bg-white py-2 pl-9 pr-4 text-sm text-slate-900 focus:border-sky-500 focus:ring-1 focus:ring-sky-500 outline-none transition-shadow"
          />
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Card 1: Matched Keywords */}
        <div className="flex flex-col rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h4 className="font-bold text-slate-900 flex items-center gap-2">
              <CheckCircle2 size={18} className="text-emerald-500" />
              Matched Keywords
            </h4>
            <span className="rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-bold text-slate-600">
              {filteredMatched.length} Found
            </span>
          </div>
          
          <div className="flex flex-col gap-2">
            {displayMatched.length > 0 ? (
              displayMatched.map(keyword => (
                <div 
                  key={keyword.text} 
                  className={`flex items-center justify-between rounded-xl border px-3 py-2 text-sm font-medium transition-colors ${
                    keyword.level === 'high' 
                      ? 'bg-emerald-50 border-emerald-100 text-emerald-700 hover:bg-emerald-100' 
                      : 'bg-sky-50 border-sky-100 text-sky-700 hover:bg-sky-100'
                  }`}
                >
                  <span>{keyword.text}</span>
                  <div className="flex items-center gap-2">
                    <span className="opacity-60 text-[10px] uppercase tracking-wider hidden sm:inline-block">
                      {keyword.level} match
                    </span>
                    <span className="rounded-full bg-white/60 px-2 py-0.5 text-[10px] uppercase tracking-wider border border-white/40">
                      {keyword.category}
                    </span>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-sm text-slate-500 italic py-2">No matching keywords found.</p>
            )}
          </div>
        </div>

        {/* Card 2: Missing Keywords */}
        <div className="flex flex-col rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h4 className="font-bold text-slate-900 flex items-center gap-2">
              <XCircle size={18} className="text-red-500" />
              Missing Keywords
            </h4>
            <span className="rounded-full bg-red-50 px-2.5 py-0.5 text-xs font-bold text-red-600">
              {filteredMissing.length} Missing
            </span>
          </div>

          <div className="flex flex-col gap-2">
            {displayMissing.length > 0 ? (
              displayMissing.map(keyword => (
                <div 
                  key={keyword.text} 
                  className="flex items-center justify-between rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm font-medium text-slate-600 hover:bg-slate-100 transition-colors"
                >
                  <span>{keyword.text}</span>
                  <span className="rounded-full bg-white px-2 py-0.5 text-[10px] uppercase tracking-wider border border-slate-200">
                    {keyword.category}
                  </span>
                </div>
              ))
            ) : (
              <p className="text-sm text-slate-500 italic py-2">No missing keywords found.</p>
            )}
          </div>
        </div>

        {/* Card 3: Keyword Density */}
        <div className="flex flex-col rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <h4 className="font-bold text-slate-900 flex items-center gap-2">
              <PieChart size={18} className="text-indigo-500" />
              Keyword Density
            </h4>
          </div>

          <div className="flex flex-col items-center justify-center mb-8">
            <div className="relative flex h-32 w-32 items-center justify-center rounded-full border-8 border-slate-50 shadow-inner">
              <svg className="absolute inset-0 h-full w-full -rotate-90 transform transition-all duration-1000 ease-out" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="46" fill="transparent" stroke="currentColor" strokeWidth="8" className="text-slate-100" />
                <circle 
                  cx="50" cy="50" r="46" 
                  fill="transparent" 
                  stroke="currentColor" 
                  strokeWidth="8" 
                  className="text-indigo-500" 
                  strokeDasharray={`${optimizationPercent * 2.89} 289`} 
                />
              </svg>
              <div className="flex flex-col items-center">
                <span className="text-3xl font-black tracking-tight text-slate-900">{optimizationPercent}%</span>
              </div>
            </div>
            <p className="mt-4 text-xs font-bold uppercase tracking-wider text-slate-400">Optimization</p>
          </div>

          <div className="flex flex-col gap-3 border-t border-slate-100 pt-5">
            <div className="flex items-center justify-between text-sm font-medium">
              <span className="text-slate-500">Total Keywords Found</span>
              <span className="text-slate-900 font-bold">{totalKeywords}</span>
            </div>
            <div className="flex items-center justify-between text-sm font-medium">
              <span className="text-emerald-600">Matched</span>
              <span className="text-emerald-700 font-bold">{matchedCount}</span>
            </div>
            <div className="flex items-center justify-between text-sm font-medium">
              <span className="text-red-500">Missing</span>
              <span className="text-red-700 font-bold">{missingCount}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Expand/Collapse Action */}
      {hasMore && (
        <div className="flex justify-center mt-2">
          <button 
            onClick={() => setIsExpanded(!isExpanded)}
            className="inline-flex items-center gap-1.5 rounded-full bg-white border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-600 shadow-sm hover:bg-slate-50 hover:text-slate-900 transition-colors"
          >
            {isExpanded ? (
              <>Show Less <ChevronUp size={16} /></>
            ) : (
              <>Show All Keywords <ChevronDown size={16} /></>
            )}
          </button>
        </div>
      )}
    </section>
  )
}

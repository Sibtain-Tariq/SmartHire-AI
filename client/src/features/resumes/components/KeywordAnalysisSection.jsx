import React, { useState, useMemo } from 'react'
import { CheckCircle2, XCircle, Search, ChevronDown, ChevronUp, AlertCircle } from 'lucide-react'

const matchedKeywordsMock = [
  { text: 'Python', level: 'high' },
  { text: 'React', level: 'high' },
  { text: 'SQL', level: 'high' },
  { text: 'FastAPI', level: 'medium' },
  { text: 'REST API', level: 'high' },
  { text: 'Docker', level: 'medium' },
  { text: 'Git', level: 'high' },
  { text: 'Agile', level: 'medium' },
]

const missingKeywordsMock = [
  { text: 'AWS' },
  { text: 'Kubernetes' },
  { text: 'CI/CD' },
  { text: 'Microservices' },
  { text: 'Leadership' },
  { text: 'Testing' },
  { text: 'GraphQL' },
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

      <div className="grid gap-6 md:grid-cols-2">
        {/* Matched Keywords Column */}
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
          
          <div className="flex flex-wrap gap-2">
            {displayMatched.length > 0 ? (
              displayMatched.map(keyword => (
                <div 
                  key={keyword.text} 
                  className={`inline-flex items-center gap-1.5 rounded-xl border px-3 py-1.5 text-sm font-medium transition-colors ${
                    keyword.level === 'high' 
                      ? 'bg-emerald-50 border-emerald-100 text-emerald-700 hover:bg-emerald-100' 
                      : 'bg-sky-50 border-sky-100 text-sky-700 hover:bg-sky-100'
                  }`}
                >
                  {keyword.text}
                  <span className="opacity-60 text-[10px] uppercase tracking-wider ml-1">
                    {keyword.level}
                  </span>
                </div>
              ))
            ) : (
              <p className="text-sm text-slate-500 italic py-2">No matching keywords found.</p>
            )}
          </div>
        </div>

        {/* Missing Keywords Column */}
        <div className="flex flex-col rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <h4 className="font-bold text-slate-900 flex items-center gap-2">
              <XCircle size={18} className="text-red-500" />
              Missing Keywords
            </h4>
            <span className="rounded-full bg-red-50 px-2.5 py-0.5 text-xs font-bold text-red-600">
              {filteredMissing.length} Missing
            </span>
          </div>
          
          <div className="mb-4 flex items-start gap-2 rounded-xl bg-amber-50 p-3 border border-amber-100">
            <AlertCircle size={16} className="text-amber-600 shrink-0 mt-0.5" />
            <p className="text-xs text-amber-800 leading-relaxed">
              Missing keywords drastically reduce your ATS ranking. Adding these naturally to your experience section will increase your match rate.
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            {displayMissing.length > 0 ? (
              displayMissing.map(keyword => (
                <div 
                  key={keyword.text} 
                  className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 bg-slate-50 px-3 py-1.5 text-sm font-medium text-slate-600 hover:bg-slate-100 transition-colors"
                >
                  {keyword.text}
                </div>
              ))
            ) : (
              <p className="text-sm text-slate-500 italic py-2">No missing keywords found.</p>
            )}
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

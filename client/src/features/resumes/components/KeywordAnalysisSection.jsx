import React, { useState, useMemo } from 'react'
import { CheckCircle2, XCircle, Search, ChevronDown, ChevronUp, Lightbulb } from 'lucide-react'

const matchedKeywordsMock = [
  { text: 'Python', level: 'High', category: 'Language', badge: 'Expert' },
  { text: 'React', level: 'High', category: 'Framework', badge: 'Advanced' },
  { text: 'SQL', level: 'High', category: 'Database', badge: 'Expert' },
  { text: 'FastAPI', level: 'Medium', category: 'Framework', badge: 'Intermediate' },
  { text: 'REST APIs', level: 'High', category: 'Concept', badge: 'Expert' },
  { text: 'Git', level: 'High', category: 'Tool', badge: 'Advanced' },
]

const missingKeywordsMock = [
  { text: 'AWS', level: 'High', category: 'Cloud', badge: 'Required' },
  { text: 'Docker', level: 'High', category: 'Tool', badge: 'Required' },
  { text: 'Kubernetes', level: 'Medium', category: 'Tool', badge: 'Preferred' },
  { text: 'CI/CD', level: 'High', category: 'Concept', badge: 'Required' },
  { text: 'Leadership', level: 'Medium', category: 'Soft Skill', badge: 'Preferred' },
  { text: 'Testing', level: 'High', category: 'Practice', badge: 'Required' },
]

const suggestedKeywordsMock = [
  { text: 'Cloud Computing', level: 'Medium', category: 'Concept', badge: 'Bonus' },
  { text: 'Microservices', level: 'High', category: 'Architecture', badge: 'Trending' },
  { text: 'Redis', level: 'Medium', category: 'Database', badge: 'Bonus' },
  { text: 'GraphQL', level: 'Medium', category: 'API', badge: 'Trending' },
  { text: 'System Design', level: 'High', category: 'Skill', badge: 'Crucial' },
  { text: 'Communication', level: 'High', category: 'Soft Skill', badge: 'Crucial' },
]

const KeywordItem = ({ keyword, colorScheme }) => {
  const baseClasses = "flex items-center justify-between rounded-xl border px-3 py-2 text-sm transition-colors"
  
  let colorClasses = ""
  if (colorScheme === 'matched') {
    colorClasses = "bg-emerald-50 border-emerald-100 text-emerald-800 hover:bg-emerald-100"
  } else if (colorScheme === 'missing') {
    colorClasses = "bg-red-50 border-red-100 text-red-800 hover:bg-red-100"
  } else {
    colorClasses = "bg-amber-50 border-amber-100 text-amber-800 hover:bg-amber-100"
  }

  return (
    <div className={`${baseClasses} ${colorClasses}`}>
      <div className="flex flex-col">
        <span className="font-bold">{keyword.text}</span>
        <span className="text-[10px] opacity-70 uppercase tracking-wider">Priority: {keyword.level}</span>
      </div>
      <div className="flex items-center gap-2">
        <span className="rounded-full bg-white/60 px-2 py-0.5 text-[10px] uppercase tracking-wider border border-white/40 shadow-sm">
          {keyword.category}
        </span>
        <span className="rounded-full bg-slate-900 text-white px-2 py-0.5 text-[10px] uppercase tracking-wider shadow-sm hidden sm:inline-block">
          {keyword.badge}
        </span>
      </div>
    </div>
  )
}

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

  const filteredSuggested = useMemo(() => {
    if (!searchQuery) return suggestedKeywordsMock
    return suggestedKeywordsMock.filter(k => k.text.toLowerCase().includes(searchQuery.toLowerCase()))
  }, [searchQuery])

  // If not expanded, show only top 4 of each (if no search query is active)
  const displayMatched = (isExpanded || searchQuery) ? filteredMatched : filteredMatched.slice(0, 4)
  const displayMissing = (isExpanded || searchQuery) ? filteredMissing : filteredMissing.slice(0, 4)
  const displaySuggested = (isExpanded || searchQuery) ? filteredSuggested : filteredSuggested.slice(0, 4)

  const hasMore = !searchQuery && (matchedKeywordsMock.length > 4 || missingKeywordsMock.length > 4 || suggestedKeywordsMock.length > 4)

  return (
    <section className="flex flex-col gap-5">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 px-2">
        <div className="flex items-center gap-2 font-semibold text-slate-900 text-lg">
          <CheckCircle2 size={24} className="text-teal-500" />
          Keyword Gap Analysis
        </div>
        <div className="relative w-full sm:max-w-xs">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
          <input
            type="text"
            placeholder="Search keywords..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded-xl border border-slate-200 bg-white py-2.5 pl-9 pr-4 text-sm text-slate-900 focus:border-teal-500 focus:ring-1 focus:ring-teal-500 outline-none transition-shadow shadow-sm"
          />
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Card 1: Matched Keywords */}
        <div className="flex flex-col rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between mb-5">
            <h4 className="font-bold text-slate-900 flex items-center gap-2">
              <CheckCircle2 size={18} className="text-emerald-500" />
              Matched Keywords
            </h4>
            <span className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-bold text-slate-600">
              {filteredMatched.length} Found
            </span>
          </div>
          
          <div className="flex flex-col gap-2.5">
            {displayMatched.length > 0 ? (
              displayMatched.map(keyword => (
                <KeywordItem key={keyword.text} keyword={keyword} colorScheme="matched" />
              ))
            ) : (
              <p className="text-sm text-slate-500 italic py-2">No matched keywords found.</p>
            )}
          </div>
        </div>

        {/* Card 2: Missing Keywords */}
        <div className="flex flex-col rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between mb-5">
            <h4 className="font-bold text-slate-900 flex items-center gap-2">
              <XCircle size={18} className="text-red-500" />
              Missing Keywords
            </h4>
            <span className="rounded-full bg-red-50 px-2.5 py-1 text-xs font-bold text-red-600">
              {filteredMissing.length} Missing
            </span>
          </div>

          <div className="flex flex-col gap-2.5">
            {displayMissing.length > 0 ? (
              displayMissing.map(keyword => (
                <KeywordItem key={keyword.text} keyword={keyword} colorScheme="missing" />
              ))
            ) : (
              <p className="text-sm text-slate-500 italic py-2">No missing keywords found.</p>
            )}
          </div>
        </div>

        {/* Card 3: Suggested Keywords */}
        <div className="flex flex-col rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between mb-5">
            <h4 className="font-bold text-slate-900 flex items-center gap-2">
              <Lightbulb size={18} className="text-amber-500" />
              Suggested Keywords
            </h4>
            <span className="rounded-full bg-amber-50 px-2.5 py-1 text-xs font-bold text-amber-600">
              {filteredSuggested.length} Ideas
            </span>
          </div>

          <div className="flex flex-col gap-2.5">
            {displaySuggested.length > 0 ? (
              displaySuggested.map(keyword => (
                <KeywordItem key={keyword.text} keyword={keyword} colorScheme="suggested" />
              ))
            ) : (
              <p className="text-sm text-slate-500 italic py-2">No suggested keywords found.</p>
            )}
          </div>
        </div>
      </div>

      {/* Expand/Collapse Action */}
      {hasMore && (
        <div className="flex justify-center mt-2">
          <button 
            onClick={() => setIsExpanded(!isExpanded)}
            className="inline-flex items-center gap-1.5 rounded-full bg-white border border-slate-200 px-5 py-2.5 text-sm font-semibold text-slate-700 shadow-sm hover:bg-slate-50 hover:text-slate-900 transition-colors"
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

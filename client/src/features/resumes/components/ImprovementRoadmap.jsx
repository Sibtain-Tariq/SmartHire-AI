import React, { useState } from 'react'
import { Map, Clock, Check, ChevronRight } from 'lucide-react'

const roadmapMock = [
  { id: '1', title: 'Improve Professional Summary', category: 'Content', priority: 'High', difficulty: 'Medium', impact: '+5', time: '10 mins' },
  { id: '2', title: 'Add measurable achievements', category: 'Experience', priority: 'Critical', difficulty: 'Hard', impact: '+15', time: '30 mins' },
  { id: '3', title: 'Add cloud technologies', category: 'Skills', priority: 'High', difficulty: 'Easy', impact: '+7', time: '5 mins' },
  { id: '4', title: 'Rewrite project descriptions', category: 'Projects', priority: 'Medium', difficulty: 'Medium', impact: '+8', time: '20 mins' },
  { id: '5', title: 'Add certifications', category: 'Content', priority: 'Medium', difficulty: 'Easy', impact: '+4', time: '5 mins' },
  { id: '6', title: 'Improve keyword coverage', category: 'Keywords', priority: 'Critical', difficulty: 'Hard', impact: '+20', time: '45 mins' },
  { id: '7', title: 'Increase ATS formatting score', category: 'Formatting', priority: 'Low', difficulty: 'Easy', impact: '+2', time: '10 mins' },
]

const PriorityBadge = ({ priority }) => {
  const styles = {
    Critical: 'bg-red-100 text-red-800 border-red-200',
    High: 'bg-orange-100 text-orange-800 border-orange-200',
    Medium: 'bg-amber-50 text-amber-700 border-amber-200',
    Low: 'bg-slate-50 text-slate-700 border-slate-200'
  }
  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded border text-[10px] font-bold uppercase tracking-wider ${styles[priority] || styles.Medium}`}>
      {priority}
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
    <span className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${styles[difficulty] || styles.Medium}`}>
      {difficulty}
    </span>
  )
}

const RoadmapItem = ({ item, isCompleted, onToggle }) => {
  return (
    <div className={`group flex flex-col sm:flex-row sm:items-center gap-4 rounded-2xl border p-4 transition-all hover:shadow-md ${
      isCompleted ? 'border-slate-200 bg-slate-50 opacity-75' : 'border-slate-200 bg-white hover:border-indigo-300'
    }`}>
      {/* Checkbox & Title */}
      <div className="flex items-center gap-3 flex-1 min-w-0">
        <button 
          onClick={onToggle}
          className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-md border transition-colors ${
            isCompleted ? 'bg-indigo-500 border-indigo-500 text-white' : 'bg-white border-slate-300 hover:border-indigo-400 text-transparent'
          }`}
        >
          <Check size={14} className={isCompleted ? 'opacity-100' : 'opacity-0'} />
        </button>
        <div className="flex flex-col min-w-0">
          <h4 className={`font-bold truncate ${isCompleted ? 'text-slate-500 line-through' : 'text-slate-900'}`}>
            {item.title}
          </h4>
          <span className="text-xs font-semibold text-slate-500">{item.category}</span>
        </div>
      </div>

      {/* Badges & Metrics */}
      <div className="flex flex-wrap items-center gap-2 sm:gap-4 pl-9 sm:pl-0">
        <div className="flex items-center gap-2">
          <PriorityBadge priority={item.priority} />
          <DifficultyBadge difficulty={item.difficulty} />
        </div>
        
        <div className="h-4 w-px bg-slate-200 hidden sm:block"></div>
        
        <div className="flex items-center gap-3">
          <span className={`inline-flex items-center rounded px-2 py-0.5 text-xs font-bold border ${
            isCompleted ? 'bg-slate-100 text-slate-500 border-slate-200' : 'bg-indigo-50 text-indigo-700 border-indigo-100'
          }`}>
            {item.impact} Score
          </span>
          <div className={`flex items-center gap-1 text-xs font-semibold ${isCompleted ? 'text-slate-400' : 'text-slate-500'}`}>
            <Clock size={14} />
            {item.time}
          </div>
        </div>
      </div>
    </div>
  )
}

export default function ImprovementRoadmap() {
  const [completedItems, setCompletedItems] = useState(new Set())

  const toggleItem = (id) => {
    const next = new Set(completedItems)
    if (next.has(id)) {
      next.delete(id)
    } else {
      next.add(id)
    }
    setCompletedItems(next)
  }

  const completedCount = completedItems.size
  const totalCount = roadmapMock.length
  const progressPercent = Math.round((completedCount / totalCount) * 100)

  return (
    <section className="flex flex-col gap-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 px-2">
        <div className="flex items-center gap-2 font-semibold text-slate-900">
          <Map size={20} className="text-indigo-500" />
          Improvement Roadmap
        </div>
        
        <div className="flex items-center gap-3">
          <div className="h-2 w-32 overflow-hidden rounded-full bg-slate-100">
            <div 
              className="h-full rounded-full bg-indigo-500 transition-all duration-500"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
          <span className="text-xs font-bold text-slate-500">
            {completedCount} / {totalCount} Tasks
          </span>
        </div>
      </div>

      <div className="flex flex-col gap-3">
        {roadmapMock.map(item => (
          <RoadmapItem 
            key={item.id} 
            item={item} 
            isCompleted={completedItems.has(item.id)}
            onToggle={() => toggleItem(item.id)}
          />
        ))}
      </div>
    </section>
  )
}

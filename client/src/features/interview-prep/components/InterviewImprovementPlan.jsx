import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ChevronUp, TrendingUp, Rocket } from 'lucide-react';

const MOCK_RECOMMENDATIONS = [
  {
    id: 1,
    title: 'Use STAR Method',
    category: 'Communication',
    priority: 'High',
    difficulty: 'Medium',
    improvement: '+15%',
    description: 'You struggled to structure your behavioral answers. Using the Situation, Task, Action, Result (STAR) framework will ensure you provide complete, compelling stories without rambling.',
  },
  {
    id: 2,
    title: 'Reduce filler words',
    category: 'Professionalism',
    priority: 'Medium',
    difficulty: 'Hard',
    improvement: '+8%',
    description: 'You used "um", "like", and "you know" frequently during the technical deep dive. Pausing silently to gather your thoughts projects much higher confidence than using verbal fillers.',
  },
  {
    id: 3,
    title: 'Increase eye contact',
    category: 'Confidence',
    priority: 'Low',
    difficulty: 'Easy',
    improvement: '+5%',
    description: 'When answering difficult questions, you tend to look away from the camera. Maintaining virtual eye contact helps build trust and projects authority.',
  },
  {
    id: 4,
    title: 'Improve technical explanations',
    category: 'Technical Skills',
    priority: 'High',
    difficulty: 'Medium',
    improvement: '+20%',
    description: 'Your understanding is solid, but explaining concepts to a non-technical stakeholder needs work. Practice using analogies to describe complex architectures.',
  },
  {
    id: 5,
    title: 'Provide measurable examples',
    category: 'Leadership',
    priority: 'Medium',
    difficulty: 'Easy',
    improvement: '+10%',
    description: 'You mentioned increasing performance, but did not state by how much. Always attach metrics (e.g., "reduced load time by 40%") to prove your exact impact.',
  }
];

export default function InterviewImprovementPlan() {
  const [expandedId, setExpandedId] = useState(MOCK_RECOMMENDATIONS[0].id);

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'High': return 'bg-red-50 text-red-700 border-red-200';
      case 'Medium': return 'bg-amber-50 text-amber-700 border-amber-200';
      case 'Low': return 'bg-slate-100 text-slate-700 border-slate-200';
      default: return 'bg-slate-50 text-slate-700';
    }
  };

  const getDifficultyColor = (diff) => {
    switch (diff) {
      case 'Easy': return 'text-emerald-600 bg-emerald-50';
      case 'Medium': return 'text-indigo-600 bg-indigo-50';
      case 'Hard': return 'text-rose-600 bg-rose-50';
      default: return 'text-slate-600 bg-slate-50';
    }
  };

  return (
    <div className="flex flex-col gap-6 w-full max-w-5xl mx-auto rounded-3xl border border-slate-200 bg-white p-6 sm:p-8 shadow-sm">
      
      {/* Header */}
      <div className="flex items-center gap-3 border-b border-slate-100 pb-4 mb-2">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
          <Rocket size={20} />
        </div>
        <div>
          <h2 className="text-xl font-bold text-slate-900">Improvement Plan</h2>
          <p className="text-sm font-medium text-slate-500">Actionable recommendations to ace your real interview.</p>
        </div>
      </div>

      <div className="flex flex-col gap-4">
        {MOCK_RECOMMENDATIONS.map((rec) => {
          const isExpanded = expandedId === rec.id;
          
          return (
            <motion.div 
              key={rec.id}
              initial={false}
              className={`flex flex-col rounded-2xl border transition-all duration-300 overflow-hidden ${
                isExpanded ? 'border-indigo-200 bg-white shadow-md' : 'border-slate-200 bg-slate-50 hover:bg-white hover:shadow-sm'
              }`}
            >
              <button 
                onClick={() => setExpandedId(isExpanded ? null : rec.id)}
                className="flex items-center justify-between p-5 text-left focus:outline-none w-full gap-4"
              >
                <div className="flex flex-col sm:flex-row sm:items-center gap-3 flex-1">
                  <h3 className="font-bold text-slate-900 text-base">{rec.title}</h3>
                  <div className="hidden sm:flex items-center gap-2">
                    <span className={`px-2.5 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider border ${getPriorityColor(rec.priority)}`}>
                      {rec.priority} Priority
                    </span>
                    <span className="px-2.5 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-slate-100 text-slate-600">
                      {rec.category}
                    </span>
                  </div>
                </div>
                
                <div className="flex items-center gap-4 shrink-0">
                  <div className="hidden sm:flex items-center gap-1.5 px-3 py-1 rounded-lg bg-emerald-50 text-emerald-700 font-bold text-xs border border-emerald-100">
                    <TrendingUp size={14} />
                    {rec.improvement}
                  </div>
                  {isExpanded ? (
                    <ChevronUp size={20} className="text-indigo-500" />
                  ) : (
                    <ChevronDown size={20} className="text-slate-400" />
                  )}
                </div>
              </button>

              <AnimatePresence>
                {isExpanded && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: 'easeInOut' }}
                  >
                    <div className="p-5 pt-0 flex flex-col gap-4">
                      
                      {/* Mobile badges (only show if hidden on sm) */}
                      <div className="flex sm:hidden flex-wrap items-center gap-2 mb-2">
                        <span className={`px-2.5 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider border ${getPriorityColor(rec.priority)}`}>
                          {rec.priority} Priority
                        </span>
                        <span className="px-2.5 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-slate-100 text-slate-600">
                          {rec.category}
                        </span>
                        <span className="flex items-center gap-1.5 px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 font-bold text-[10px] uppercase border border-emerald-100">
                          <TrendingUp size={12} />
                          {rec.improvement}
                        </span>
                      </div>

                      <div className="rounded-xl bg-slate-50 p-4 border border-slate-100">
                        <p className="text-sm font-medium leading-relaxed text-slate-700">
                          {rec.description}
                        </p>
                      </div>

                      <div className="flex flex-wrap items-center gap-4 mt-2">
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Difficulty:</span>
                          <span className={`px-2 py-1 rounded-md text-xs font-bold ${getDifficultyColor(rec.difficulty)}`}>
                            {rec.difficulty}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Impact Score:</span>
                          <span className="font-mono text-sm font-bold text-slate-700">{rec.improvement}</span>
                        </div>
                      </div>

                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>

    </div>
  );
}

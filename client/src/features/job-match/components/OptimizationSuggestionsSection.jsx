import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, TrendingUp, ChevronDown, Wrench, FileText, Code, CheckCircle2, AlertCircle, Clock } from 'lucide-react';

const suggestionsData = [
  {
    id: 1,
    priority: 'High Priority',
    improvement: '+6%',
    category: 'Skills',
    difficulty: 'Easy',
    title: 'Add AWS to your skills section',
    description: 'The job description heavily emphasizes AWS, but it is completely missing from your resume.',
    details: 'Navigate to your Skills section and explicitly list "AWS" or specific services like "EC2", "S3", or "Lambda" if you have experience with them. This is a critical keyword for passing the initial ATS screening.',
    icon: Code
  },
  {
    id: 2,
    priority: 'Medium Priority',
    improvement: '+4%',
    category: 'Projects',
    difficulty: 'Medium',
    title: 'Mention Docker usage in your latest project',
    description: 'While you have backend experience, Docker is required for deployment in this role.',
    details: 'Update the bullet points in your most recent project to describe how you containerized your application using Docker. E.g., "Containerized the backend services using Docker to ensure consistent deployment environments."',
    icon: Wrench
  },
  {
    id: 3,
    priority: 'Low Priority',
    improvement: '+2%',
    category: 'Summary',
    difficulty: 'Easy',
    title: 'Rewrite your professional summary',
    description: 'Your summary is generic and does not align closely with this specific job description.',
    details: 'Incorporate keywords like "Scalable Architecture", "Cloud-native", and "Agile methodologies" into your top summary paragraph to hook the recruiter immediately and show targeted intent.',
    icon: FileText
  }
];

const PriorityBadge = ({ priority }) => {
  if (priority === 'High Priority') {
    return (
      <div className="flex items-center gap-1 bg-red-50 text-red-700 border border-red-200 px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider">
        <AlertCircle size={12} />
        High
      </div>
    );
  }
  if (priority === 'Medium Priority') {
    return (
      <div className="flex items-center gap-1 bg-amber-50 text-amber-700 border border-amber-200 px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider">
        <Clock size={12} />
        Medium
      </div>
    );
  }
  return (
    <div className="flex items-center gap-1 bg-blue-50 text-blue-700 border border-blue-200 px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider">
      <CheckCircle2 size={12} />
      Low
    </div>
  );
};

const SuggestionCard = ({ suggestion }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const Icon = suggestion.icon;

  return (
    <motion.div 
      layout
      className="flex flex-col rounded-2xl border border-slate-200 bg-white overflow-hidden shadow-sm hover:shadow-md transition-shadow"
    >
      <div 
        className="p-5 cursor-pointer flex flex-col gap-4"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-slate-50 text-slate-600 border border-slate-200">
              <Icon size={18} />
            </div>
            <div className="flex flex-col">
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">{suggestion.category}</span>
              <h4 className="font-bold text-slate-900 leading-tight mt-0.5">{suggestion.title}</h4>
            </div>
          </div>
          
          <div className="flex flex-wrap items-center gap-2">
            <PriorityBadge priority={suggestion.priority} />
            <div className="flex items-center gap-1 bg-emerald-50 text-emerald-700 border border-emerald-200 px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider">
              <TrendingUp size={12} />
              {suggestion.improvement}
            </div>
            <div className="flex items-center gap-1 bg-slate-100 text-slate-700 border border-slate-200 px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider hidden sm:flex">
              Diff: {suggestion.difficulty}
            </div>
          </div>
        </div>

        <div className="flex items-end justify-between gap-4 pl-13 sm:pl-13">
          <p className="text-sm text-slate-600 leading-relaxed max-w-2xl">
            {suggestion.description}
          </p>
          <button className="flex items-center justify-center h-8 w-8 rounded-full bg-slate-50 text-slate-500 border border-slate-200 hover:bg-slate-100 shrink-0 transition-colors">
             <motion.div animate={{ rotate: isExpanded ? 180 : 0 }} transition={{ duration: 0.2 }}>
                <ChevronDown size={16} />
             </motion.div>
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
          >
            <div className="px-5 pb-5 pt-0 border-t border-slate-100 bg-slate-50/50 mt-2">
              <div className="pt-4 flex flex-col gap-2">
                <span className="text-xs font-bold text-indigo-600 uppercase tracking-wider">Action Plan</span>
                <p className="text-sm text-slate-700 font-medium leading-relaxed bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
                  {suggestion.details}
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default function OptimizationSuggestionsSection() {
  return (
    <section className="flex flex-col gap-6 w-full">
      <div className="flex flex-col gap-1 px-2">
        <div className="flex items-center gap-2 font-semibold text-slate-900">
          <Sparkles size={24} className="text-emerald-500" />
          <h2 className="text-xl">Resume Optimization Suggestions</h2>
        </div>
        <p className="text-sm text-slate-500 ml-8">Actionable steps to increase your match score based on the JD.</p>
      </div>

      <div className="flex flex-col gap-4">
        {suggestionsData.map(suggestion => (
          <SuggestionCard key={suggestion.id} suggestion={suggestion} />
        ))}
      </div>
    </section>
  );
}

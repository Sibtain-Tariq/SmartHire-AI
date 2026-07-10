import React from 'react';
import { motion } from 'framer-motion';
import { BarChart3, TrendingUp } from 'lucide-react';

const mockPerformanceData = [
  { label: 'Culture Fit', score: 95, color: 'bg-teal-500', bgLg: 'bg-teal-50' },
  { label: 'Technical Skills', score: 92, color: 'bg-emerald-500', bgLg: 'bg-emerald-50' },
  { label: 'Answer Quality', score: 88, color: 'bg-indigo-500', bgLg: 'bg-indigo-50' },
  { label: 'Communication', score: 85, color: 'bg-sky-500', bgLg: 'bg-sky-50' },
  { label: 'Behavior', score: 80, color: 'bg-blue-500', bgLg: 'bg-blue-50' },
  { label: 'Confidence', score: 72, color: 'bg-amber-500', bgLg: 'bg-amber-50' },
  { label: 'Leadership', score: 65, color: 'bg-orange-500', bgLg: 'bg-orange-50' },
];

export default function InterviewPerformanceDashboard() {
  return (
    <div className="flex flex-col gap-6 rounded-3xl border border-slate-200 bg-white p-6 sm:p-8 shadow-sm">
      
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-2">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
            <BarChart3 size={20} />
          </div>
          <div>
            <h2 className="text-xl font-bold text-slate-900">Performance Dashboard</h2>
            <p className="text-sm font-medium text-slate-500">Comprehensive breakdown of your core competencies.</p>
          </div>
        </div>
        <div className="hidden sm:flex items-center gap-2 rounded-lg bg-emerald-50 px-3 py-1.5 text-xs font-bold text-emerald-700 border border-emerald-100">
          <TrendingUp size={14} />
          Top 15% of Candidates
        </div>
      </div>

      {/* Chart Container */}
      <div className="flex flex-col gap-5 pt-2">
        {mockPerformanceData.map((item, index) => (
          <div key={item.label} className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
            
            {/* Label */}
            <div className="sm:w-40 shrink-0 flex justify-between sm:justify-start">
              <span className="text-sm font-bold text-slate-700">{item.label}</span>
              <span className="sm:hidden text-sm font-black text-slate-900">{item.score}%</span>
            </div>

            {/* Bar & Track */}
            <div className="flex-1 flex items-center gap-4">
              <div className={`relative h-6 flex-1 overflow-hidden rounded-r-lg rounded-l-sm ${item.bgLg}`}>
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${item.score}%` }}
                  transition={{ delay: index * 0.1, duration: 0.8, ease: "easeOut" }}
                  className={`absolute left-0 top-0 h-full rounded-r-lg rounded-l-sm ${item.color} shadow-sm`}
                />
              </div>
              <span className="hidden sm:block w-12 text-right text-sm font-black text-slate-900">
                {item.score}%
              </span>
            </div>

          </div>
        ))}
      </div>

      {/* Insight Footer */}
      <div className="mt-4 rounded-2xl bg-slate-50 p-4 border border-slate-100 flex gap-3">
        <div className="mt-0.5 h-2 w-2 shrink-0 rounded-full bg-indigo-500" />
        <p className="text-sm font-medium text-slate-600 leading-relaxed">
          <strong className="text-slate-900 font-bold">AI Insight:</strong> Your technical and cultural fit scores are exceptional. Focusing purely on leadership examples and exuding slightly more confidence will push you into the top tier of candidates for this role.
        </p>
      </div>

    </div>
  );
}

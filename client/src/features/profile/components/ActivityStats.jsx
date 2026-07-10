import React from 'react';
import { Activity, FileText, Sparkles, MessageSquare, TrendingUp, Target } from 'lucide-react';

export default function ActivityStats({ activity }) {
  const stats = [
    { label: 'Resumes Analyzed', value: activity.resumesAnalyzed, icon: FileText, color: 'text-indigo-600', bg: 'bg-indigo-50' },
    { label: 'ATS Reports', value: activity.atsReports, icon: TrendingUp, color: 'text-emerald-600', bg: 'bg-emerald-50' },
    { label: 'Job Matches', value: activity.jobMatches, icon: Sparkles, color: 'text-amber-600', bg: 'bg-amber-50' },
    { label: 'Interviews Practiced', value: activity.interviewsPracticed, icon: MessageSquare, color: 'text-sky-600', bg: 'bg-sky-50' },
    { label: 'Avg ATS Score', value: `${activity.avgAtsScore}%`, icon: Target, color: 'text-rose-600', bg: 'bg-rose-50' },
    { label: 'Avg Match Score', value: `${activity.avgMatchScore}%`, icon: Activity, color: 'text-violet-600', bg: 'bg-violet-50' },
  ];

  return (
    <div className="flex flex-col rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="mb-6 flex items-center gap-3 border-b border-slate-100 pb-4">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
          <Activity size={18} />
        </div>
        <h2 className="text-lg font-bold text-slate-900">SmartHire AI Activity</h2>
      </div>
      
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
        {stats.map((stat, i) => (
          <div key={i} className="flex flex-col gap-2 rounded-xl border border-slate-100 bg-slate-50 p-4 transition hover:border-slate-200 hover:bg-white hover:shadow-sm">
            <div className={`flex h-8 w-8 items-center justify-center rounded-lg ${stat.bg} ${stat.color}`}>
              <stat.icon size={14} />
            </div>
            <div className="mt-2 text-2xl font-black tracking-tight text-slate-900">{stat.value}</div>
            <div className="text-xs font-semibold text-slate-500">{stat.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

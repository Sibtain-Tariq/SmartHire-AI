import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FileText, Sparkles, MessageSquare, Settings, ArrowRight } from 'lucide-react';

export default function QuickActions() {
  const navigate = useNavigate();

  const actions = [
    { label: 'Resume Analyzer', path: '/resume-analyzer', icon: FileText, color: 'text-indigo-600', bg: 'bg-indigo-50 hover:bg-indigo-100 hover:border-indigo-200' },
    { label: 'Job Matching', path: '/job-matching', icon: Sparkles, color: 'text-emerald-600', bg: 'bg-emerald-50 hover:bg-emerald-100 hover:border-emerald-200' },
    { label: 'Interview Prep', path: '/interviews', icon: MessageSquare, color: 'text-sky-600', bg: 'bg-sky-50 hover:bg-sky-100 hover:border-sky-200' },
    { label: 'Account Settings', path: '/settings', icon: Settings, color: 'text-slate-600', bg: 'bg-slate-50 hover:bg-slate-100 hover:border-slate-200' },
  ];

  return (
    <div className="flex flex-col rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="mb-6 flex items-center gap-3 border-b border-slate-100 pb-4">
        <h2 className="text-lg font-bold text-slate-900">Quick Actions</h2>
      </div>
      
      <div className="grid gap-3 sm:grid-cols-2">
        {actions.map((action, i) => (
          <button
            key={i}
            onClick={() => navigate(action.path)}
            className={`group flex items-center justify-between rounded-xl border border-transparent p-4 transition-all ${action.bg}`}
          >
            <div className="flex items-center gap-3">
              <div className={`flex h-8 w-8 items-center justify-center rounded-lg bg-white shadow-sm ${action.color}`}>
                <action.icon size={14} />
              </div>
              <span className="text-sm font-bold text-slate-900">{action.label}</span>
            </div>
            <ArrowRight size={16} className={`opacity-0 transition-all group-hover:-translate-x-1 group-hover:opacity-100 ${action.color}`} />
          </button>
        ))}
      </div>
    </div>
  );
}

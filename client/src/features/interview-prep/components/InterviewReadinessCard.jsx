import React from 'react';
import { motion } from 'framer-motion';
import { Target, FileText, Briefcase, Activity, MessageSquare, ShieldCheck, Code2, Sparkles } from 'lucide-react';

const READINESS_DATA = {
  score: 89,
  summary: "You appear well prepared for this position. Your technical foundations are incredibly strong. Improving behavioral storytelling and adding more measurable project examples could significantly increase your overall interview performance.",
  metrics: [
    { label: 'Resume Quality', score: 92, icon: FileText, color: 'emerald' },
    { label: 'Job Match', score: 85, icon: Briefcase, color: 'indigo' },
    { label: 'Interview Perf.', score: 84, icon: Activity, color: 'indigo' },
    { label: 'Communication', score: 88, icon: MessageSquare, color: 'indigo' },
    { label: 'Confidence', score: 72, icon: ShieldCheck, color: 'amber' },
    { label: 'Technical Skills', score: 95, icon: Code2, color: 'emerald' },
  ]
};

export default function InterviewReadinessCard() {
  const circumference = 2 * Math.PI * 45; // r=45
  const strokeDashoffset = circumference - (READINESS_DATA.score / 100) * circumference;

  const getColorClass = (colorStr, type) => {
    switch(colorStr) {
      case 'emerald': return type === 'text' ? 'text-emerald-600' : 'bg-emerald-100';
      case 'amber': return type === 'text' ? 'text-amber-600' : 'bg-amber-100';
      case 'rose': return type === 'text' ? 'text-rose-600' : 'bg-rose-100';
      default: return type === 'text' ? 'text-indigo-600' : 'bg-indigo-100';
    }
  };

  return (
    <div className="flex flex-col gap-6 rounded-3xl border border-slate-200 bg-white p-6 sm:p-8 shadow-md relative overflow-hidden w-full max-w-5xl mx-auto">
      
      {/* Background decoration */}
      <div className="absolute -top-24 -right-24 h-64 w-64 rounded-full bg-indigo-50 blur-3xl opacity-60 pointer-events-none" />
      <div className="absolute -bottom-24 -left-24 h-64 w-64 rounded-full bg-emerald-50 blur-3xl opacity-60 pointer-events-none" />

      <div className="flex items-center justify-between mb-2 relative z-10">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-600 text-white shadow-sm">
            <Target size={24} />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-slate-900">Overall Readiness</h2>
            <p className="text-sm font-medium text-slate-500">Cross-module analysis of your profile, resume, and mock sessions.</p>
          </div>
        </div>
        <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-indigo-50 text-indigo-700 font-bold text-xs uppercase tracking-wider border border-indigo-100">
          <Sparkles size={14} /> AI Powered
        </div>
      </div>

      <div className="grid lg:grid-cols-12 gap-8 relative z-10">
        
        {/* Left Col: Gauge & Summary */}
        <div className="lg:col-span-5 flex flex-col items-center justify-center gap-6 rounded-2xl bg-slate-50/50 border border-slate-100 p-6">
          
          <div className="relative flex h-48 w-48 items-center justify-center">
            <svg className="h-full w-full -rotate-90 transform drop-shadow-sm" viewBox="0 0 100 100">
              <circle cx="50" cy="50" r="45" stroke="currentColor" strokeWidth="8" fill="none" className="text-slate-200" />
              <motion.circle 
                initial={{ strokeDashoffset: circumference }}
                animate={{ strokeDashoffset }}
                transition={{ duration: 1.5, ease: "easeOut" }}
                cx="50" cy="50" r="45" stroke="currentColor" strokeWidth="8" fill="none" 
                strokeDasharray={circumference} strokeLinecap="round"
                className="text-indigo-600" 
              />
            </svg>
            <div className="absolute flex flex-col items-center">
              <span className="text-5xl font-black text-slate-900">{READINESS_DATA.score}<span className="text-2xl text-slate-400">%</span></span>
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400 mt-1">Readiness</span>
            </div>
          </div>

          <div className="text-center">
            <h4 className="text-sm font-bold text-slate-900 mb-2">Recruiter Insight</h4>
            <p className="text-sm font-medium leading-relaxed text-slate-600 italic">
              "{READINESS_DATA.summary}"
            </p>
          </div>

        </div>

        {/* Right Col: Mini Metrics Grid */}
        <div className="lg:col-span-7 flex flex-col justify-center">
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            
            {READINESS_DATA.metrics.map((metric, idx) => {
              const Icon = metric.icon;
              return (
                <div key={idx} className="flex flex-col gap-3 rounded-2xl border border-slate-100 bg-white p-4 shadow-sm hover:border-slate-200 hover:shadow transition-all">
                  <div className="flex items-center justify-between">
                    <div className={`flex h-8 w-8 items-center justify-center rounded-lg ${getColorClass(metric.color, 'bg')} ${getColorClass(metric.color, 'text')}`}>
                      <Icon size={16} />
                    </div>
                    <span className={`text-lg font-black ${getColorClass(metric.color, 'text')}`}>
                      {metric.score}%
                    </span>
                  </div>
                  
                  <div className="flex flex-col gap-1.5 mt-2">
                    <span className="text-xs font-bold text-slate-700">{metric.label}</span>
                    <div className="h-1.5 w-full overflow-hidden rounded-full bg-slate-100">
                      <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: `${metric.score}%` }}
                        transition={{ duration: 1, delay: idx * 0.1 }}
                        className={`h-full rounded-full ${metric.color === 'emerald' ? 'bg-emerald-500' : metric.color === 'amber' ? 'bg-amber-500' : 'bg-indigo-500'}`}
                      />
                    </div>
                  </div>
                </div>
              );
            })}

          </div>
        </div>

      </div>

    </div>
  );
}

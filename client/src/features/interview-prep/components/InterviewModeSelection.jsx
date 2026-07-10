import React from 'react';
import { Sparkles, ShieldAlert, CheckCircle2, Circle } from 'lucide-react';

const INTERVIEW_MODES = [
  {
    id: 'practice',
    title: 'Practice Mode',
    icon: Sparkles,
    description: 'Practice interview questions without pressure.',
    color: 'emerald',
    features: [
      'Unlimited retries',
      'Hints available',
      'Pause anytime',
      'View answers after each question',
      'Friendly AI feedback'
    ]
  },
  {
    id: 'test',
    title: 'Test Mode',
    icon: ShieldAlert,
    description: 'Simulate a real, timed interview environment.',
    color: 'rose',
    features: [
      'Countdown timer',
      'No hints provided',
      'One answer per question',
      'Final report only',
      'Professional interview environment'
    ]
  }
];

export default function InterviewModeSelection({ selectedMode, onChange }) {
  
  const getColorClasses = (color, isSelected) => {
    if (color === 'emerald') {
      return isSelected 
        ? 'border-emerald-500 bg-emerald-50 shadow-sm ring-1 ring-emerald-500' 
        : 'border-slate-200 bg-white hover:border-emerald-300 hover:bg-emerald-50/50';
    }
    // Rose
    return isSelected 
      ? 'border-rose-500 bg-rose-50 shadow-sm ring-1 ring-rose-500' 
      : 'border-slate-200 bg-white hover:border-rose-300 hover:bg-rose-50/50';
  };

  const getIconColors = (color, isSelected) => {
    if (color === 'emerald') {
      return isSelected ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-100 text-slate-500 group-hover:bg-emerald-100 group-hover:text-emerald-600';
    }
    return isSelected ? 'bg-rose-100 text-rose-700' : 'bg-slate-100 text-slate-500 group-hover:bg-rose-100 group-hover:text-rose-600';
  };

  return (
    <div className="flex flex-col gap-8 rounded-3xl border border-slate-200 bg-white p-6 sm:p-8 shadow-sm">
      
      {/* Header */}
      <div className="flex items-center gap-3 border-b border-slate-100 pb-4 mb-2">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
          <Sparkles size={20} />
        </div>
        <div>
          <h2 className="text-xl font-bold text-slate-900">Select Interview Mode</h2>
          <p className="text-sm font-medium text-slate-500">Choose how you want to practice today.</p>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {INTERVIEW_MODES.map((mode) => {
          const isSelected = selectedMode === mode.id;
          const Icon = mode.icon;
          
          return (
            <button
              key={mode.id}
              onClick={() => onChange(mode.id)}
              className={`group relative flex flex-col text-left rounded-2xl border-2 p-6 transition-all duration-200 focus:outline-none ${getColorClasses(mode.color, isSelected)}`}
            >
              
              {/* Radio selection indicator */}
              <div className="absolute top-6 right-6">
                {isSelected ? (
                  <CheckCircle2 size={24} className={`text-${mode.color}-600`} />
                ) : (
                  <Circle size={24} className="text-slate-300 group-hover:text-slate-400" />
                )}
              </div>

              {/* Mode Icon & Title */}
              <div className="flex items-start gap-4 mb-4">
                <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl transition-colors ${getIconColors(mode.color, isSelected)}`}>
                  <Icon size={24} />
                </div>
                <div className="flex flex-col gap-1 pr-8">
                  <h3 className="text-lg font-bold text-slate-900">{mode.title}</h3>
                  <p className="text-sm font-medium text-slate-600">{mode.description}</p>
                </div>
              </div>

              {/* Features List */}
              <div className="mt-4 flex flex-col gap-2 pt-4 border-t border-slate-200/60">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">Features</span>
                <ul className="flex flex-col gap-2.5">
                  {mode.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-2.5 text-sm font-semibold text-slate-700">
                      <div className={`mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full ${isSelected ? `bg-${mode.color}-500` : 'bg-slate-300 group-hover:bg-slate-400'}`} />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>

            </button>
          );
        })}
      </div>
      
    </div>
  );
}

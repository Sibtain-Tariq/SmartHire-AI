import React from 'react';
import { Lightbulb } from 'lucide-react';

export default function AIFeedbackCard({ title, score, icon: Icon, explanation, suggestions }) {
  
  const getScoreColor = (val) => {
    if (val >= 90) return 'text-emerald-600 bg-emerald-500';
    if (val >= 75) return 'text-indigo-600 bg-indigo-500';
    if (val >= 60) return 'text-amber-600 bg-amber-500';
    return 'text-red-600 bg-red-500';
  };

  const getBgColor = (val) => {
    if (val >= 90) return 'bg-emerald-50 text-emerald-600';
    if (val >= 75) return 'bg-indigo-50 text-indigo-600';
    if (val >= 60) return 'bg-amber-50 text-amber-600';
    return 'bg-red-50 text-red-600';
  };

  const scoreColors = getScoreColor(score);
  const bgColors = getBgColor(score);
  const textColor = scoreColors.split(' ')[0];
  const barColor = scoreColors.split(' ')[1];

  return (
    <div className="flex flex-col gap-4 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm hover:shadow-md transition-shadow">
      
      {/* Header */}
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${bgColors}`}>
            <Icon size={20} />
          </div>
          <h3 className="font-bold text-slate-900">{title}</h3>
        </div>
        <span className={`text-2xl font-black ${textColor}`}>
          {score}/100
        </span>
      </div>

      {/* Progress Bar */}
      <div className="h-2 w-full overflow-hidden rounded-full bg-slate-100">
        <div 
          className={`h-full rounded-full ${barColor} transition-all duration-1000 ease-out`}
          style={{ width: `${score}%` }}
        />
      </div>

      {/* Explanation */}
      <p className="text-sm font-medium leading-relaxed text-slate-600 mt-2">
        {explanation}
      </p>

      {/* Suggestions */}
      {suggestions && suggestions.length > 0 && (
        <div className="mt-2 flex flex-col gap-2 rounded-2xl bg-slate-50 p-4 border border-slate-100">
          <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">
            <Lightbulb size={14} className="text-amber-500" />
            Suggestions to Improve
          </div>
          <ul className="flex flex-col gap-2">
            {suggestions.map((suggestion, idx) => (
              <li key={idx} className="flex items-start gap-2 text-sm font-medium text-slate-700">
                <div className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-indigo-400" />
                {suggestion}
              </li>
            ))}
          </ul>
        </div>
      )}

    </div>
  );
}

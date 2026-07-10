import React from 'react';

export default function SettingRow({ 
  icon: Icon, 
  title, 
  description, 
  badgeText, 
  badgeColor, 
  action, 
  isDestructive 
}) {
  return (
    <div className={`flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-2xl border bg-white transition-all ${
      isDestructive ? 'border-rose-100 hover:border-rose-200 hover:shadow-sm' : 'border-slate-200 hover:border-indigo-100 hover:shadow-sm'
    }`}>
      <div className="flex items-start gap-4">
        <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${
          isDestructive ? 'bg-rose-50 text-rose-500' : 'bg-slate-50 text-slate-500'
        }`}>
          {Icon && <Icon size={18} />}
        </div>
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-2">
            <h4 className="text-sm font-bold text-slate-900">{title}</h4>
            {badgeText && (
              <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${badgeColor || 'bg-slate-100 text-slate-600'}`}>
                {badgeText}
              </span>
            )}
          </div>
          <p className="text-xs font-medium text-slate-500 max-w-md">{description}</p>
        </div>
      </div>
      
      <div className="flex items-center gap-4 shrink-0 sm:ml-auto w-full sm:w-auto mt-2 sm:mt-0">
        {action && (
          <div className="w-full sm:w-auto flex justify-end">
            {action}
          </div>
        )}
      </div>
    </div>
  );
}

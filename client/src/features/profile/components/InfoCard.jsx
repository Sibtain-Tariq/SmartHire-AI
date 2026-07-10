import React from 'react';

export default function InfoCard({ title, icon: Icon, children }) {
  return (
    <div className="flex flex-col rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="mb-6 flex items-center gap-3 border-b border-slate-100 pb-4">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-slate-50 text-slate-500">
          <Icon size={18} />
        </div>
        <h2 className="text-lg font-bold text-slate-900">{title}</h2>
      </div>
      <div className="flex flex-col gap-5">
        {children}
      </div>
    </div>
  );
}

export function InfoRow({ label, value, icon: RowIcon }) {
  return (
    <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex items-center gap-2 text-sm font-medium text-slate-500">
        {RowIcon && <RowIcon size={14} className="text-slate-400" />}
        {label}
      </div>
      <div className="text-sm font-semibold text-slate-900 sm:text-right">
        {value}
      </div>
    </div>
  );
}

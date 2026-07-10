import React from 'react';
import { Edit3 } from 'lucide-react';

export default function ProfileHeader({ user }) {
  return (
    <div className="relative flex flex-col items-center gap-6 rounded-3xl border border-slate-200 bg-white p-8 shadow-sm text-center md:flex-row md:text-left md:p-10">
      <div className="flex h-28 w-28 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-indigo-500 to-sky-400 text-4xl font-bold text-white shadow-lg ring-4 ring-white">
        {user.initials}
      </div>
      
      <div className="flex flex-1 flex-col gap-2">
        <h1 className="text-2xl font-bold text-slate-900">{user.name}</h1>
        <p className="text-sm font-semibold text-indigo-600">{user.role}</p>
        <p className="mt-2 max-w-2xl text-sm font-medium leading-relaxed text-slate-500">
          {user.bio}
        </p>
      </div>

      <div className="mt-4 md:mt-0 shrink-0">
        <button 
          className="flex items-center gap-2 rounded-xl bg-slate-900 px-5 py-2.5 text-sm font-bold text-white shadow-sm transition hover:bg-slate-800 focus-visible:ring-2 focus-visible:ring-indigo-500"
          title="UI Only - Mock Mode"
        >
          <Edit3 size={16} /> Edit Profile
        </button>
      </div>
    </div>
  );
}

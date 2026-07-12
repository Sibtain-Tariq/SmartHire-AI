import React from 'react';
import { motion } from 'framer-motion';
import { ShieldAlert, KeyRound, Smartphone, Monitor, Clock, LogOut, CheckCircle2, AlertCircle, History } from 'lucide-react';

const MOCK_SESSIONS = [
  { id: 1, device: 'MacBook Pro', browser: 'Chrome', location: 'San Francisco, CA', time: 'Active now', isCurrent: true, icon: Monitor },
  { id: 2, device: 'iPhone 13', browser: 'Safari', location: 'San Francisco, CA', time: '2 hours ago', isCurrent: false, icon: Smartphone }
];

export default function SecuritySettings() {
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <div className="flex flex-col gap-8 h-full">
      
      {/* Header */}
      <div>
        <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
          Security & Authentication
        </h2>
        <p className="text-sm font-medium text-slate-500 mt-1">Manage your password, 2FA, and monitor active sessions.</p>
      </div>

      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="flex flex-col gap-8"
      >
        
        {/* Section 1: Core Security */}
        <div className="flex flex-col gap-4">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 pl-1">Sign In Methods</h3>
          
          <div className="grid gap-4">
            
            {/* Password */}
            <motion.div variants={itemVariants} className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-2xl border border-slate-200 bg-white hover:border-indigo-100 hover:shadow-sm transition-all">
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-slate-50 text-slate-500">
                  <KeyRound size={20} />
                </div>
                <div className="flex flex-col gap-1">
                  <h4 className="text-sm font-bold text-slate-900">Password</h4>
                  <p className="text-xs font-medium text-slate-500">Last changed 3 months ago.</p>
                </div>
              </div>
              <button 
                disabled
                className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-white border border-slate-200 text-xs font-bold text-slate-400 shadow-sm cursor-not-allowed opacity-70"
                title="Authentication provider required to change password."
              >
                Change Password
              </button>
            </motion.div>

            {/* 2FA */}
            <motion.div variants={itemVariants} className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-2xl border border-rose-100 bg-rose-50/30 hover:border-rose-200 transition-all relative overflow-hidden">
              <div className="flex items-start gap-4 relative z-10">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-rose-100 text-rose-600">
                  <ShieldAlert size={20} />
                </div>
                <div className="flex flex-col gap-1">
                  <div className="flex items-center gap-2">
                    <h4 className="text-sm font-bold text-slate-900">Two-Factor Authentication</h4>
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-rose-100 text-rose-700 flex items-center gap-1">
                      <AlertCircle size={10} /> Disabled
                    </span>
                  </div>
                  <p className="text-xs font-medium text-slate-600 max-w-sm">Add an extra layer of security to your account by requiring more than just your password to sign in.</p>
                </div>
              </div>
              <button 
                disabled
                className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-indigo-600 text-white text-xs font-bold shadow-sm cursor-not-allowed opacity-50 relative z-10"
              >
                Enable 2FA (Coming Soon)
              </button>
            </motion.div>

          </div>
        </div>

        <div className="border-t border-slate-100" />

        {/* Section 2: Active Sessions & Devices */}
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between pl-1">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">Active Sessions & Devices</h3>
            <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-md border border-emerald-100 flex items-center gap-1.5">
              <CheckCircle2 size={12} /> 2 Trusted Devices
            </span>
          </div>

          <div className="flex flex-col rounded-2xl border border-slate-200 bg-white overflow-hidden">
            {MOCK_SESSIONS.map((session, index) => {
              const Icon = session.icon;
              return (
                <motion.div 
                  key={session.id} 
                  variants={itemVariants}
                  className={`flex items-center justify-between gap-4 p-5 ${index !== MOCK_SESSIONS.length - 1 ? 'border-b border-slate-100' : ''}`}
                >
                  <div className="flex items-center gap-4">
                    <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${session.isCurrent ? 'bg-indigo-50 text-indigo-600' : 'bg-slate-50 text-slate-500'}`}>
                      <Icon size={18} />
                    </div>
                    <div className="flex flex-col">
                      <div className="flex items-center gap-2">
                        <h4 className="text-sm font-bold text-slate-900">{session.device} <span className="text-slate-400 font-medium text-xs">• {session.browser}</span></h4>
                        {session.isCurrent && (
                          <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-indigo-100 text-indigo-700">
                            Current
                          </span>
                        )}
                      </div>
                      <p className="text-xs font-medium text-slate-500">{session.location} • {session.time}</p>
                    </div>
                  </div>
                  
                  {!session.isCurrent && (
                    <button className="text-xs font-bold text-rose-600 hover:text-rose-700 transition-colors px-3 py-1.5 rounded-lg border border-transparent hover:bg-rose-50 hover:border-rose-100">
                      Revoke
                    </button>
                  )}
                </motion.div>
              );
            })}
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-4 mt-2">
            <button 
              disabled
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-white border border-slate-200 text-xs font-bold text-slate-400 shadow-sm cursor-not-allowed transition-all"
            >
              <History size={14} /> View Login History (Soon)
            </button>
            <button 
              disabled
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-rose-50 border border-rose-100 text-xs font-bold text-rose-400 shadow-sm cursor-not-allowed transition-all"
            >
              <LogOut size={14} /> Sign Out All Devices (Soon)
            </button>
          </div>

        </div>

      </motion.div>
    </div>
  );
}

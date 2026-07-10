import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, MailCheck, Calendar, Crown, Globe, Clock, FileText, Save, CheckCircle2 } from 'lucide-react';

const MOCK_ACCOUNT_DATA = {
  status: 'Active',
  emailVerified: true,
  memberSince: 'March 15, 2024',
  currentPlan: 'Pro',
  language: 'English (US)',
  timeZone: 'Pacific Time (PT) - UTC-8',
  resumeLanguage: 'English',
  autoSave: true
};

export default function AccountSettings() {
  const [preferences, setPreferences] = useState({
    language: MOCK_ACCOUNT_DATA.language,
    timeZone: MOCK_ACCOUNT_DATA.timeZone,
    resumeLanguage: MOCK_ACCOUNT_DATA.resumeLanguage,
    autoSave: MOCK_ACCOUNT_DATA.autoSave
  });

  const handlePreferenceChange = (e) => {
    const { name, value, type, checked } = e.target;
    setPreferences(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const SettingCard = ({ icon: Icon, title, description, value, badgeColor, action }) => (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-2xl border border-slate-200 bg-white hover:border-indigo-100 hover:shadow-sm transition-all">
      <div className="flex items-start gap-4">
        <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-slate-50 text-slate-500`}>
          <Icon size={18} />
        </div>
        <div className="flex flex-col gap-1">
          <h4 className="text-sm font-bold text-slate-900">{title}</h4>
          <p className="text-xs font-medium text-slate-500">{description}</p>
        </div>
      </div>
      
      <div className="flex items-center gap-4 shrink-0 sm:ml-auto">
        {value && !action && (
          <span className={`px-3 py-1 rounded-lg text-xs font-bold ${badgeColor || 'bg-slate-100 text-slate-700'}`}>
            {value}
          </span>
        )}
        {action && (
          <div className="w-full sm:w-auto">
            {action}
          </div>
        )}
      </div>
    </div>
  );

  return (
    <div className="flex flex-col gap-8 h-full">
      
      {/* Header */}
      <div>
        <h2 className="text-xl font-bold text-slate-900">Account Settings</h2>
        <p className="text-sm font-medium text-slate-500 mt-1">Manage your account status, active plan, and localization preferences.</p>
      </div>

      <div className="flex flex-col gap-6">
        
        {/* Section 1: Core Account Details */}
        <div className="flex flex-col gap-3">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 pl-1">Account Details</h3>
          
          <div className="grid gap-3">
            <SettingCard 
              icon={ShieldCheck} 
              title="Account Status" 
              description="Your account is currently fully active." 
              value={MOCK_ACCOUNT_DATA.status}
              badgeColor="bg-emerald-50 text-emerald-700 border border-emerald-200"
            />
            
            <SettingCard 
              icon={MailCheck} 
              title="Email Verification" 
              description="Your email address has been successfully verified." 
              value={MOCK_ACCOUNT_DATA.emailVerified ? 'Verified' : 'Unverified'}
              badgeColor={MOCK_ACCOUNT_DATA.emailVerified ? "bg-emerald-50 text-emerald-700 border border-emerald-200" : "bg-rose-50 text-rose-700"}
            />

            <SettingCard 
              icon={Calendar} 
              title="Member Since" 
              description="The date you joined SmartHire AI." 
              value={MOCK_ACCOUNT_DATA.memberSince}
            />

            <SettingCard 
              icon={Crown} 
              title="Current Plan" 
              description="You are currently on the premium tier." 
              value={MOCK_ACCOUNT_DATA.currentPlan}
              badgeColor="bg-indigo-50 text-indigo-700 border border-indigo-200"
              action={
                <button className="text-xs font-bold text-indigo-600 hover:text-indigo-700 transition-colors bg-indigo-50 px-3 py-1.5 rounded-lg border border-indigo-100 hover:bg-indigo-100">
                  Upgrade Plan
                </button>
              }
            />
          </div>
        </div>

        <div className="border-t border-slate-100 my-2" />

        {/* Section 2: Preferences */}
        <div className="flex flex-col gap-3">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 pl-1">Localization & Preferences</h3>
          
          <div className="grid gap-3">
            
            <SettingCard 
              icon={Globe} 
              title="Interface Language" 
              description="Choose the language for the SmartHire UI." 
              action={
                <select 
                  name="language"
                  value={preferences.language}
                  onChange={handlePreferenceChange}
                  className="w-full sm:w-48 appearance-none rounded-xl border border-slate-200 bg-slate-50 p-2 text-sm font-semibold text-slate-700 focus:border-indigo-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                >
                  <option value="English (US)">English (US)</option>
                  <option value="English (UK)">English (UK)</option>
                  <option value="Spanish">Spanish</option>
                  <option value="French">French</option>
                </select>
              }
            />

            <SettingCard 
              icon={Clock} 
              title="Time Zone" 
              description="Used for mock interview scheduling and timestamps." 
              action={
                <select 
                  name="timeZone"
                  value={preferences.timeZone}
                  onChange={handlePreferenceChange}
                  className="w-full sm:w-48 appearance-none rounded-xl border border-slate-200 bg-slate-50 p-2 text-sm font-semibold text-slate-700 focus:border-indigo-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                >
                  <option value="Pacific Time (PT) - UTC-8">Pacific Time (PT)</option>
                  <option value="Eastern Time (ET) - UTC-5">Eastern Time (ET)</option>
                  <option value="Coordinated Universal Time (UTC)">UTC</option>
                  <option value="Central European Time (CET)">CET</option>
                </select>
              }
            />

            <SettingCard 
              icon={FileText} 
              title="Preferred Resume Language" 
              description="Default language for AI resume analysis." 
              action={
                <select 
                  name="resumeLanguage"
                  value={preferences.resumeLanguage}
                  onChange={handlePreferenceChange}
                  className="w-full sm:w-48 appearance-none rounded-xl border border-slate-200 bg-slate-50 p-2 text-sm font-semibold text-slate-700 focus:border-indigo-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                >
                  <option value="English">English</option>
                  <option value="Auto-Detect">Auto-Detect</option>
                  <option value="Spanish">Spanish</option>
                </select>
              }
            />

            <SettingCard 
              icon={Save} 
              title="Auto Save Preference" 
              description="Automatically save changes across modules." 
              action={
                <label className="relative inline-flex cursor-pointer items-center">
                  <input 
                    type="checkbox" 
                    name="autoSave"
                    checked={preferences.autoSave}
                    onChange={handlePreferenceChange}
                    className="peer sr-only" 
                  />
                  <div className="h-6 w-11 rounded-full bg-slate-200 after:absolute after:left-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-slate-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-indigo-600 peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-indigo-500/20"></div>
                </label>
              }
            />

          </div>
        </div>

      </div>
    </div>
  );
}

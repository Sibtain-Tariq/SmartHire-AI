import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, MailCheck, Calendar, Crown, Globe, Clock, FileText, Save, CheckCircle2 } from 'lucide-react';
import Toggle from '../../../components/ui/Toggle';
import SettingRow from './ui/SettingRow';
import { useAuth } from '../../../hooks/useAuth';
import UserProfileService from '../../../services/UserProfileService';

const MOCK_PREFERENCES = {
  status: 'Active',
  currentPlan: 'Pro',
  language: 'English (US)',
  timeZone: 'Pacific Time (PT) - UTC-8',
  resumeLanguage: 'English',
  autoSave: true
};

export default function AccountSettings() {
  const { session } = useAuth();
  const profile = UserProfileService.getProfileFromSession(session?.user);

  const [preferences, setPreferences] = useState({
    language: MOCK_PREFERENCES.language,
    timeZone: MOCK_PREFERENCES.timeZone,
    resumeLanguage: MOCK_PREFERENCES.resumeLanguage,
    autoSave: MOCK_PREFERENCES.autoSave
  });

  const memberSinceFormatted = profile?.createdAt 
    ? new Intl.DateTimeFormat('en-US', { month: 'long', day: 'numeric', year: 'numeric' }).format(new Date(profile.createdAt))
    : 'Unknown';

  const handlePreferenceChange = (e) => {
    const { name, value, type, checked } = e.target;
    setPreferences(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleToggleAutoSave = () => {
    setPreferences(prev => ({ ...prev, autoSave: !prev.autoSave }));
  };

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
            <SettingRow 
              icon={ShieldCheck} 
              title="Account Status" 
              description="Your account is currently fully active." 
              badgeText={MOCK_PREFERENCES.status}
              badgeColor="bg-emerald-50 text-emerald-700 border border-emerald-200"
            />
            
            <SettingRow 
              icon={MailCheck} 
              title="Email Verification" 
              description={profile?.emailVerified ? "Your email address has been successfully verified." : "Please verify your email address to unlock all features."} 
              badgeText={profile?.emailVerified ? 'Verified' : 'Unverified'}
              badgeColor={profile?.emailVerified ? "bg-emerald-50 text-emerald-700 border border-emerald-200" : "bg-rose-50 text-rose-700 border-rose-200"}
            />

            <SettingRow 
              icon={Calendar} 
              title="Member Since" 
              description="The date you joined SmartHire AI." 
              badgeText={memberSinceFormatted}
            />

            <SettingRow 
              icon={Crown} 
              title="Current Plan" 
              description="You are currently on the premium tier." 
              badgeText={MOCK_ACCOUNT_DATA.currentPlan}
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
            
            <SettingRow 
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

            <SettingRow 
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

            <SettingRow 
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

            <SettingRow 
              icon={Save} 
              title="Auto Save Preference" 
              description="Automatically save changes across modules." 
              action={<Toggle checked={preferences.autoSave} onChange={handleToggleAutoSave} />}
            />

          </div>
        </div>

      </div>
    </div>
  );
}

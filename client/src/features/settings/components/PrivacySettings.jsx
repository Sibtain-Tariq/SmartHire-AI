import React, { useState } from 'react';
import { Shield, Eye, BarChart2, BrainCircuit, Activity, Cookie, Download, Trash2, AlertTriangle } from 'lucide-react';
import Toggle from '../../../components/ui/Toggle';
import SettingRow from './ui/SettingRow';

const MOCK_PRIVACY_DATA = {
  profileVisibility: true,
  shareAnalytics: false,
  aiSuggestions: true,
  anonymousUsage: true
};

export default function PrivacySettings() {
  const [prefs, setPrefs] = useState(MOCK_PRIVACY_DATA);

  const handleToggle = (key) => setPrefs(p => ({ ...p, [key]: !p[key] }));

  const ToggleAction = ({ toggleKey }) => {
    const isChecked = prefs[toggleKey];
    return <Toggle checked={isChecked} onChange={() => handleToggle(toggleKey)} />;
  };

  const ActionButton = ({ actionText, actionIcon: ActionIcon, isDestructive }) => (
    <button 
      disabled
      className={`flex items-center justify-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all disabled:opacity-50 disabled:cursor-not-allowed ${
        isDestructive 
          ? 'bg-rose-50 border border-rose-100 text-rose-600 hover:bg-rose-100'
          : 'bg-white border border-slate-200 text-slate-700 shadow-sm hover:bg-slate-50'
      }`}
    >
      {ActionIcon && <ActionIcon size={14} />} {actionText}
    </button>
  );

  return (
    <div className="flex flex-col gap-8 h-full">
      
      {/* Header */}
      <div>
        <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
          Privacy & Data
        </h2>
        <p className="text-sm font-medium text-slate-500 mt-1">Manage your data sharing preferences and account privacy.</p>
      </div>

      <div className="flex flex-col gap-8">
        
        {/* Section 1: Visibility & Sharing */}
        <div className="flex flex-col gap-3">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 pl-1">Data & Visibility</h3>
          
          <div className="grid gap-3">
            <SettingRow 
              icon={Eye}
              title="Profile Visibility"
              description="Allow recruiters and other users to view your public profile."
              badgeText={prefs.profileVisibility ? 'Enabled' : 'Disabled'}
              badgeColor={prefs.profileVisibility ? 'bg-emerald-50 text-emerald-600' : 'bg-slate-100 text-slate-500'}
              action={<ToggleAction toggleKey="profileVisibility" />}
            />
            <SettingRow 
              icon={BarChart2}
              title="Share Analytics"
              description="Allow SmartHire to use your mock interview data to improve scoring algorithms."
              badgeText={prefs.shareAnalytics ? 'Enabled' : 'Disabled'}
              badgeColor={prefs.shareAnalytics ? 'bg-emerald-50 text-emerald-600' : 'bg-slate-100 text-slate-500'}
              action={<ToggleAction toggleKey="shareAnalytics" />}
            />
            <SettingRow 
              icon={BrainCircuit}
              title="Personalized AI Suggestions"
              description="Receive tailored job recommendations based on your resume and interview performance."
              badgeText={prefs.aiSuggestions ? 'Enabled' : 'Disabled'}
              badgeColor={prefs.aiSuggestions ? 'bg-emerald-50 text-emerald-600' : 'bg-slate-100 text-slate-500'}
              action={<ToggleAction toggleKey="aiSuggestions" />}
            />
            <SettingRow 
              icon={Activity}
              title="Anonymous Usage Data"
              description="Share anonymous usage statistics to help us improve the platform."
              badgeText={prefs.anonymousUsage ? 'Enabled' : 'Disabled'}
              badgeColor={prefs.anonymousUsage ? 'bg-emerald-50 text-emerald-600' : 'bg-slate-100 text-slate-500'}
              action={<ToggleAction toggleKey="anonymousUsage" />}
            />
          </div>
        </div>

        <div className="border-t border-slate-100" />

        {/* Section 2: Data Management */}
        <div className="flex flex-col gap-3">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 pl-1 flex items-center gap-2">
            <Shield size={14} /> Data Management
          </h3>
          
          <div className="grid gap-3">
            <SettingRow 
              icon={Cookie}
              title="Cookie Preferences"
              description="Manage the cookies stored on your device."
              action={<ActionButton actionText="Manage Cookies" />}
            />
            <SettingRow 
              icon={Download}
              title="Download My Data"
              description="Export an archive of all your resumes, interview transcripts, and account data."
              action={<ActionButton actionText="Request Data Archive" actionIcon={Download} />}
            />
          </div>
        </div>

        <div className="border-t border-slate-100" />

        {/* Section 3: Danger Zone */}
        <div className="flex flex-col gap-3">
          <h3 className="text-xs font-bold uppercase tracking-wider text-rose-500 pl-1 flex items-center gap-2">
            <AlertTriangle size={14} /> Danger Zone
          </h3>
          
          <div className="grid gap-3">
            <SettingRow 
              icon={Trash2}
              title="Delete My Data"
              description="Permanently delete your account and all associated data. This action cannot be undone."
              isDestructive={true}
              action={<ActionButton actionText="Delete Account" actionIcon={Trash2} isDestructive={true} />}
            />
          </div>
        </div>

      </div>
    </div>
  );
}

import React, { useState } from 'react';
import { Shield, Eye, BarChart2, BrainCircuit, Activity, Cookie, Download, Trash2, AlertTriangle } from 'lucide-react';

const MOCK_PRIVACY_DATA = {
  profileVisibility: true,
  shareAnalytics: false,
  aiSuggestions: true,
  anonymousUsage: true
};

export default function PrivacySettings() {
  const [prefs, setPrefs] = useState(MOCK_PRIVACY_DATA);

  const handleToggle = (key) => setPrefs(p => ({ ...p, [key]: !p[key] }));

  const Toggle = ({ checked, onChange, disabled }) => (
    <label className={`relative inline-flex items-center ${disabled ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'}`}>
      <input type="checkbox" className="peer sr-only" checked={checked} onChange={onChange} disabled={disabled} />
      <div className="h-6 w-11 rounded-full bg-slate-200 after:absolute after:left-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-slate-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-indigo-600 peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-indigo-500/20"></div>
    </label>
  );

  const SettingRow = ({ icon: Icon, title, description, toggleKey, actionText, actionIcon: ActionIcon, isDestructive }) => {
    const hasToggle = toggleKey !== undefined;
    const isChecked = hasToggle ? prefs[toggleKey] : false;

    return (
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-2xl border border-slate-200 bg-white hover:border-indigo-100 hover:shadow-sm transition-all">
        <div className="flex items-start gap-4">
          <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${isDestructive ? 'bg-rose-50 text-rose-500' : 'bg-slate-50 text-slate-500'}`}>
            <Icon size={18} />
          </div>
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-2">
              <h4 className="text-sm font-bold text-slate-900">{title}</h4>
              {hasToggle && (
                <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${isChecked ? 'bg-emerald-50 text-emerald-600' : 'bg-slate-100 text-slate-500'}`}>
                  {isChecked ? 'Enabled' : 'Disabled'}
                </span>
              )}
            </div>
            <p className="text-xs font-medium text-slate-500 max-w-md">{description}</p>
          </div>
        </div>
        
        <div className="flex items-center gap-4 shrink-0 mt-2 sm:mt-0">
          {hasToggle && (
            <Toggle checked={isChecked} onChange={() => handleToggle(toggleKey)} />
          )}
          {actionText && (
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
          )}
        </div>
      </div>
    );
  };

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
              toggleKey="profileVisibility"
            />
            <SettingRow 
              icon={BarChart2}
              title="Share Analytics"
              description="Allow SmartHire to use your mock interview data to improve scoring algorithms."
              toggleKey="shareAnalytics"
            />
            <SettingRow 
              icon={BrainCircuit}
              title="Personalized AI Suggestions"
              description="Receive tailored job recommendations based on your resume and interview performance."
              toggleKey="aiSuggestions"
            />
            <SettingRow 
              icon={Activity}
              title="Anonymous Usage Data"
              description="Share anonymous usage statistics to help us improve the platform."
              toggleKey="anonymousUsage"
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
              actionText="Manage Cookies"
            />
            <SettingRow 
              icon={Download}
              title="Download My Data"
              description="Export an archive of all your resumes, interview transcripts, and account data."
              actionText="Request Data Archive"
              actionIcon={Download}
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
              actionText="Delete Account"
              actionIcon={Trash2}
              isDestructive={true}
            />
          </div>
        </div>

      </div>
    </div>
  );
}

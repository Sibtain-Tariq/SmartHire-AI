import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Bell, Palette, CreditCard, Lock } from 'lucide-react';

const SETTINGS_TABS = [
  { id: 'account', label: 'Account', icon: CreditCard },
  { id: 'security', label: 'Security', icon: Shield },
  { id: 'privacy', label: 'Privacy', icon: Lock },
  { id: 'notifications', label: 'Notifications', icon: Bell },
  { id: 'appearance', label: 'Appearance', icon: Palette }
];

export default function SettingsNavigation({ activeTab, onChange }) {
  return (
    <nav className="flex flex-row md:flex-col gap-2 overflow-x-auto md:overflow-visible pb-2 md:pb-0 scrollbar-hide">
      {SETTINGS_TABS.map((tab) => {
        const isActive = activeTab === tab.id;
        const Icon = tab.icon;
        
        return (
          <button
            key={tab.id}
            onClick={() => onChange(tab.id)}
            className={`relative flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-colors whitespace-nowrap outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 ${
              isActive 
                ? 'text-indigo-700 bg-indigo-50/50' 
                : 'text-slate-500 hover:text-slate-800 hover:bg-slate-50'
            }`}
          >
            {/* Active Indicator Background */}
            {isActive && (
              <motion.div
                layoutId="activeTabIndicator"
                className="absolute inset-0 rounded-xl bg-indigo-50 border border-indigo-100"
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                style={{ zIndex: -1 }}
              />
            )}
            
            <Icon size={18} className={isActive ? 'text-indigo-600' : 'text-slate-400'} />
            <span className="relative z-10">{tab.label}</span>
            
          </button>
        );
      })}
    </nav>
  );
}

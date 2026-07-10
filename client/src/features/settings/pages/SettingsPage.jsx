import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Settings, User, Shield, Bell, Palette } from 'lucide-react';
import DashboardLayout from '../../../components/dashboard/DashboardLayout';
import DashboardContainer from '../../../components/dashboard/DashboardContainer';
import SettingsNavigation from '../components/SettingsNavigation';
import AccountSettings from '../components/AccountSettings';
import SecuritySettings from '../components/SecuritySettings';
import PrivacySettings from '../components/PrivacySettings';
import AppearanceSettings from '../components/AppearanceSettings';

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState('account');

  // Placeholders for content components to be implemented later
  const renderContent = () => {
    switch (activeTab) {
      case 'account':
        return <AccountSettings />;
      case 'security':
        return <SecuritySettings />;
      case 'privacy':
        return <PrivacySettings />;
      case 'notifications':
        return <div className="p-8 text-center text-slate-500">Notification Settings Placeholder</div>;
      case 'appearance':
        return <AppearanceSettings />;
      default:
        return null;
    }
  };

  return (
    <DashboardLayout>
      <DashboardContainer>
        
        <div className="flex flex-col gap-8 pb-12 w-full max-w-6xl mx-auto">
          
          {/* Page Header */}
          <div className="flex flex-col gap-2">
            <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Settings</h1>
            <p className="text-base font-medium text-slate-500">
              Manage your SmartHire AI account preferences and application settings.
            </p>
          </div>

          <div className="flex flex-col md:flex-row gap-8 items-start">
            
            {/* Left Sidebar Navigation */}
            <div className="w-full md:w-64 shrink-0 sticky top-8">
              <SettingsNavigation activeTab={activeTab} onChange={setActiveTab} />
            </div>

            {/* Right Content Area */}
            <div className="flex-1 w-full min-h-[600px] rounded-3xl border border-slate-200 bg-white p-6 shadow-sm overflow-hidden relative">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  transition={{ duration: 0.2, ease: "easeOut" }}
                  className="h-full w-full"
                >
                  {renderContent()}
                </motion.div>
              </AnimatePresence>
            </div>

          </div>
          
        </div>
        
      </DashboardContainer>
    </DashboardLayout>
  );
}

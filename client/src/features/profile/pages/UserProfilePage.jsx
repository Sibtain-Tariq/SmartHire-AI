import React, { useState } from 'react'
import { motion } from 'framer-motion'
import {
  ShieldCheck, Copy, Calendar, Clock, HardDrive, Key,
  UserMinus, Camera, CheckCircle2, ChevronRight,
  FileText, Video, Smartphone, Laptop, AlertTriangle, Image as ImageIcon, FileBarChart
} from 'lucide-react'
import toast from 'react-hot-toast'
import DashboardLayout from '../../../components/dashboard/DashboardLayout'
import DashboardContainer from '../../../components/dashboard/DashboardContainer'
import { useAuth } from '../../../hooks/useAuth'
import UserProfileService from '../../../services/UserProfileService'
import EditProfileModal from '../components/EditProfileModal'

export default function UserProfilePage() {
  const { session, isLoading } = useAuth()
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  
  // Real-time parsed profile
  const profile = UserProfileService.getProfileFromSession(session?.user)

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text)
    toast.success('User ID copied to clipboard!')
  }

  if (isLoading) {
    return (
      <DashboardLayout breadcrumbItems={[{ label: 'Profile' }]}>
        <DashboardContainer className="gap-8 max-w-5xl">
          {/* Skeleton Header */}
          <div className="relative overflow-hidden rounded-3xl bg-white shadow-sm ring-1 ring-slate-900/5 dark:bg-slate-900 dark:ring-slate-100/5">
            <div className="h-32 w-full animate-pulse bg-slate-200 dark:bg-slate-800 sm:h-40"></div>
            <div className="relative px-6 pb-8 pt-4 sm:px-8">
              <div className="flex flex-col sm:flex-row sm:items-end gap-5">
                <div className="relative -mt-16 h-24 w-24 shrink-0 sm:-mt-20 sm:h-32 sm:w-32 animate-pulse rounded-full border-4 border-white bg-slate-200 dark:border-slate-900 dark:bg-slate-800"></div>
                <div className="mt-4 pb-2 sm:mt-0 space-y-2">
                  <div className="h-8 w-48 animate-pulse rounded bg-slate-200 dark:bg-slate-800"></div>
                  <div className="h-4 w-32 animate-pulse rounded bg-slate-200 dark:bg-slate-800"></div>
                </div>
              </div>
            </div>
          </div>
          {/* Skeleton Grid Content */}
          <div className="grid gap-8 lg:grid-cols-2">
            <div className="space-y-8">
              <div className="h-64 animate-pulse rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-900/5 dark:bg-slate-900 dark:ring-slate-100/5"></div>
              <div className="h-64 animate-pulse rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-900/5 dark:bg-slate-900 dark:ring-slate-100/5"></div>
            </div>
            <div className="space-y-8">
              <div className="h-96 animate-pulse rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-900/5 dark:bg-slate-900 dark:ring-slate-100/5"></div>
            </div>
          </div>
        </DashboardContainer>
      </DashboardLayout>
    )
  }

  if (!profile) {
    return (
      <DashboardLayout breadcrumbItems={[{ label: 'Profile' }]}>
        <DashboardContainer className="gap-8 max-w-5xl flex items-center justify-center min-h-[60vh]">
          <div className="text-center space-y-4">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-slate-100 dark:bg-slate-800">
              <UserMinus size={32} className="text-slate-400" />
            </div>
            <h2 className="text-xl font-semibold text-slate-900 dark:text-white">Profile Unavailable</h2>
            <p className="text-slate-500 max-w-md mx-auto">We could not load your profile data. Please try logging in again.</p>
          </div>
        </DashboardContainer>
      </DashboardLayout>
    )
  }

  return (
    <DashboardLayout breadcrumbItems={[{ label: 'Profile' }]}>
      <DashboardContainer className="gap-8 max-w-5xl">
        
        {/* ======================== Profile Header ======================== */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="relative overflow-hidden rounded-3xl bg-white shadow-sm ring-1 ring-slate-900/5 dark:bg-slate-900 dark:ring-slate-100/5"
        >
          {/* Gradient Banner */}
          <div className="h-32 w-full bg-gradient-to-r from-sky-500 to-indigo-600 dark:from-sky-600 dark:to-indigo-800 sm:h-40"></div>
          
          <div className="relative px-6 pb-8 pt-4 sm:px-8">
            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between">
              
              <div className="flex flex-col sm:flex-row sm:items-end gap-5">
                {/* Avatar */}
                <div className="relative -mt-16 h-24 w-24 shrink-0 sm:-mt-20 sm:h-32 sm:w-32">
                  <div className="group relative h-full w-full overflow-hidden rounded-full border-4 border-white bg-slate-100 shadow-md dark:border-slate-900 dark:bg-slate-800">
                    {profile.avatar ? (
                      <img src={profile.avatar} alt={profile.fullName} className="h-full w-full object-cover" />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center text-4xl font-bold text-sky-700 dark:text-sky-400 bg-sky-100 dark:bg-sky-900/50">
                        {profile.initials}
                      </div>
                    )}
                    
                    {/* Hover Overlay */}
                    <button 
                      onClick={() => setIsEditModalOpen(true)}
                      className="absolute inset-0 flex flex-col items-center justify-center gap-1 bg-slate-900/60 opacity-0 transition-opacity group-hover:opacity-100 text-white"
                    >
                      <Camera size={24} />
                      <span className="text-[10px] font-medium uppercase tracking-wider">Change</span>
                    </button>
                  </div>
                </div>

                <div className="mt-4 pb-2 sm:mt-0">
                  <h1 className="text-2xl font-bold text-slate-900 dark:text-white sm:text-3xl">{profile.fullName}</h1>
                  <div className="mt-1 flex items-center gap-2">
                    <span className="text-sm font-medium text-slate-500 dark:text-slate-400">{profile.email}</span>
                    {profile.emailVerified && (
                      <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-semibold tracking-wide text-emerald-700 ring-1 ring-inset ring-emerald-600/20 dark:bg-emerald-500/10 dark:text-emerald-400 dark:ring-emerald-500/20">
                        <CheckCircle2 size={12} />
                        VERIFIED
                      </span>
                    )}
                  </div>
                </div>
              </div>

              <div className="mt-6 flex flex-wrap items-center gap-3 sm:mt-0 pb-2">
                <button 
                  onClick={() => setIsEditModalOpen(true)}
                  className="inline-flex items-center gap-2 rounded-2xl bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-800 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-slate-900/10 dark:bg-white dark:text-slate-900 dark:hover:bg-slate-100"
                >
                  Edit Profile
                </button>
              </div>

            </div>
          </div>
        </motion.div>

        {/* Main Grid Content */}
        <div className="grid gap-8 lg:grid-cols-2 mt-8">
          
          {/* Left Column */}
          <div className="space-y-8">
            
            {/* ======================== Account Information Card ======================== */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
              className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-900/5 dark:bg-slate-900 dark:ring-slate-100/5"
            >
              <h3 className="text-base font-semibold text-slate-900 dark:text-white mb-6">Account Information</h3>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
                  <div className="flex items-center gap-3 text-sm text-slate-500 dark:text-slate-400">
                    <Calendar size={16} />
                    <span>Member since</span>
                  </div>
                  <span className="text-sm font-medium text-slate-900 dark:text-slate-200">
                    {new Date(profile.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                  </span>
                </div>

                <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
                  <div className="flex items-center gap-3 text-sm text-slate-500 dark:text-slate-400">
                    <Clock size={16} />
                    <span>Last login</span>
                  </div>
                  <span className="text-sm font-medium text-slate-900 dark:text-slate-200">
                    {new Date(profile.lastSignIn).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                  </span>
                </div>

                <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
                  <div className="flex items-center gap-3 text-sm text-slate-500 dark:text-slate-400">
                    <ShieldCheck size={16} />
                    <span>Auth Provider</span>
                  </div>
                  <span className="capitalize text-sm font-medium text-slate-900 dark:text-slate-200">
                    {session?.user?.app_metadata?.provider || 'Email'}
                  </span>
                </div>

                <div className="flex items-center justify-between pt-1">
                  <div className="flex items-center gap-3 text-sm text-slate-500 dark:text-slate-400">
                    <span>User ID</span>
                  </div>
                  <button 
                    onClick={() => copyToClipboard(profile.id)}
                    className="flex items-center gap-1.5 rounded-lg bg-slate-50 px-2 py-1.5 text-xs font-mono font-medium text-slate-600 transition hover:bg-slate-100 hover:text-slate-900 dark:bg-slate-800 dark:text-slate-400 dark:hover:bg-slate-700 dark:hover:text-slate-200"
                  >
                    {profile.id.substring(0, 12)}...
                    <Copy size={12} />
                  </button>
                </div>
              </div>
            </motion.div>

            {/* ======================== Security Card ======================== */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.2 }}
              className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-900/5 dark:bg-slate-900 dark:ring-slate-100/5"
            >
              <h3 className="text-base font-semibold text-slate-900 dark:text-white mb-5">Security</h3>
              <div className="space-y-3">
                <button 
                  onClick={() => toast('Password reset functionality coming soon.', { icon: '🚧' })}
                  className="flex w-full items-center justify-between rounded-xl border border-slate-200 px-4 py-3 text-sm font-medium text-slate-700 transition hover:bg-slate-50 dark:border-slate-800 dark:text-slate-300 dark:hover:bg-slate-800/50"
                >
                  <span className="flex items-center gap-3"><Key size={16} className="text-sky-500" /> Change Password</span>
                  <ChevronRight size={16} className="text-slate-400" />
                </button>
                
                <button 
                  onClick={() => toast('Session management coming soon.', { icon: '🚧' })}
                  className="flex w-full items-center justify-between rounded-xl border border-slate-200 px-4 py-3 text-sm font-medium text-slate-700 transition hover:bg-slate-50 dark:border-slate-800 dark:text-slate-300 dark:hover:bg-slate-800/50"
                >
                  <span className="flex items-center gap-3"><Laptop size={16} className="text-indigo-500" /> Manage Sessions</span>
                  <ChevronRight size={16} className="text-slate-400" />
                </button>

                <div className="flex w-full items-center justify-between rounded-xl border border-slate-200 bg-slate-50/50 px-4 py-3 text-sm font-medium text-slate-500 dark:border-slate-800 dark:bg-slate-900/30 dark:text-slate-400">
                  <span className="flex items-center gap-3"><Smartphone size={16} /> Two-Factor Auth</span>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">Coming Soon</span>
                </div>
              </div>
            </motion.div>

            {/* ======================== Danger Zone ======================== */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.3 }}
              className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-red-900/5 dark:bg-slate-900 dark:ring-red-100/5"
            >
              <div className="flex items-center gap-2 mb-2 text-red-600 dark:text-red-400">
                <AlertTriangle size={18} />
                <h3 className="text-base font-semibold">Danger Zone</h3>
              </div>
              <p className="text-sm text-slate-500 dark:text-slate-400 mb-5">
                Permanently delete your account and all associated data. This action cannot be undone.
              </p>
              
              <button 
                onClick={() => {
                  if (window.confirm('Are you absolutely sure you want to delete your account? All your resumes, reports, and data will be permanently erased.')) {
                    toast.error('Account deletion is disabled in this environment.')
                  }
                }}
                className="flex w-full items-center justify-center gap-2 rounded-xl border border-red-200 bg-red-50 px-4 py-2.5 text-sm font-semibold text-red-700 transition hover:bg-red-100 hover:border-red-300 focus-visible:ring-4 focus-visible:ring-red-500/10 dark:border-red-900/30 dark:bg-red-900/10 dark:text-red-400 dark:hover:bg-red-900/20 dark:hover:border-red-800/50"
              >
                <UserMinus size={16} /> Delete Account
              </button>
            </motion.div>

          </div>

          {/* Right Column */}
          <div className="space-y-8">
            
            {/* ======================== Storage Card ======================== */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.15 }}
              className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-900/5 dark:bg-slate-900 dark:ring-slate-100/5"
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-base font-semibold text-slate-900 dark:text-white">Storage Overview</h3>
                <span className="inline-flex items-center rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-medium text-slate-600 dark:bg-slate-800 dark:text-slate-300">
                  <HardDrive size={12} className="mr-1" />
                  0 MB / 100 MB
                </span>
              </div>

              {/* Usage Progress */}
              <div className="mb-8">
                <div className="h-2 w-full overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800">
                  <div className="h-full rounded-full bg-sky-500 transition-all duration-1000 ease-out dark:bg-sky-400" style={{ width: '0%' }}></div>
                </div>
                <div className="mt-2 flex justify-between text-xs text-slate-500 dark:text-slate-400">
                  <span>Used space</span>
                  <span>0%</span>
                </div>
              </div>

              <div className="grid gap-4">
                
                {/* Placeholder: Resume Storage */}
                <div className="flex items-center gap-4 rounded-2xl border border-slate-100 bg-slate-50/50 p-4 dark:border-slate-800/80 dark:bg-slate-900/30">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-100 text-blue-600 dark:bg-blue-900/50 dark:text-blue-400">
                    <FileText size={18} />
                  </div>
                  <div className="min-w-0 flex-1">
                    <h4 className="text-sm font-semibold text-slate-900 dark:text-slate-200">Resume Storage</h4>
                    <p className="truncate text-xs text-slate-500 dark:text-slate-400">Connect to Supabase Storage later.</p>
                  </div>
                  <span className="text-xs font-medium text-slate-400">--</span>
                </div>

                {/* Placeholder: Reports Storage */}
                <div className="flex items-center gap-4 rounded-2xl border border-slate-100 bg-slate-50/50 p-4 dark:border-slate-800/80 dark:bg-slate-900/30">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-100 text-emerald-600 dark:bg-emerald-900/50 dark:text-emerald-400">
                    <FileBarChart size={18} />
                  </div>
                  <div className="min-w-0 flex-1">
                    <h4 className="text-sm font-semibold text-slate-900 dark:text-slate-200">Reports Storage</h4>
                    <p className="truncate text-xs text-slate-500 dark:text-slate-400">ATS analysis and feedback reports.</p>
                  </div>
                  <span className="text-xs font-medium text-slate-400">--</span>
                </div>

                {/* Placeholder: Avatar Storage */}
                <div className="flex items-center gap-4 rounded-2xl border border-slate-100 bg-slate-50/50 p-4 dark:border-slate-800/80 dark:bg-slate-900/30">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-purple-100 text-purple-600 dark:bg-purple-900/50 dark:text-purple-400">
                    <ImageIcon size={18} />
                  </div>
                  <div className="min-w-0 flex-1">
                    <h4 className="text-sm font-semibold text-slate-900 dark:text-slate-200">Avatar Storage</h4>
                    <p className="truncate text-xs text-slate-500 dark:text-slate-400">Profile pictures and assets.</p>
                  </div>
                  <span className="text-xs font-medium text-slate-400">--</span>
                </div>

                {/* Placeholder: Interview Recordings */}
                <div className="flex items-center gap-4 rounded-2xl border border-slate-100 bg-slate-50/50 p-4 dark:border-slate-800/80 dark:bg-slate-900/30">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-amber-100 text-amber-600 dark:bg-amber-900/50 dark:text-amber-400">
                    <Video size={18} />
                  </div>
                  <div className="min-w-0 flex-1">
                    <h4 className="text-sm font-semibold text-slate-900 dark:text-slate-200">Interview Recordings</h4>
                    <p className="truncate text-xs text-slate-500 dark:text-slate-400">Audio/video practice sessions.</p>
                  </div>
                  <span className="text-xs font-medium text-slate-400">--</span>
                </div>

              </div>
            </motion.div>

          </div>
          
        </div>
      </DashboardContainer>

      {/* Modals */}
      <EditProfileModal 
        isOpen={isEditModalOpen} 
        onClose={() => setIsEditModalOpen(false)} 
        profile={profile} 
      />

    </DashboardLayout>
  )
}


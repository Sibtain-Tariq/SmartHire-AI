import {
  FileSearch,
  HelpCircle,
  LayoutDashboard,
  LogOut,
  MessageSquare,
  ScrollText,
  Settings,
  Sparkles,
} from 'lucide-react'

export const dashboardNavigation = [
  { label: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
  { label: 'Resume Analyzer', path: '/resume-analyzer', icon: ScrollText },
  { label: 'Job Matching', path: '/job-matching', icon: Sparkles },
  { label: 'Interview Prep', path: '/interviews', icon: MessageSquare },
  { label: 'Settings', path: '/settings', icon: Settings },
  { label: 'Help Center', path: '/help', icon: HelpCircle },
]

export const dashboardFooterNavigation = [
  { label: 'Logout', path: '#logout', icon: LogOut, isDummy: true },
]

export const mockNotifications = [
  'Dashboard foundation ready',
  'Reusable navigation shell created',
  'Preview mode is active',
]

export const productVersion = 'v0.1.0'

import {
  FileSearch,
  HelpCircle,
  LayoutDashboard,
  LogOut,
  MessageSquare,
  ScrollText,
  Settings,
  Sparkles,
  User,
} from 'lucide-react'

export const dashboardNavigation = [
  { label: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
  { label: 'Resume', path: '/resume', icon: ScrollText },
  { label: 'ATS Reports', path: '/ats', icon: FileSearch },
  { label: 'Job Matching', path: '/job-matching', icon: Sparkles },
  { label: 'Interview Prep', path: '/interviews', icon: MessageSquare },
  { label: 'Profile', path: '/profile', icon: User },
  { label: 'Settings', path: '/settings', icon: Settings },
  { label: 'Help Center', path: '/help', icon: HelpCircle },
]

export const dashboardFooterNavigation = [
  { label: 'Logout', path: '#logout', icon: LogOut, isDummy: true },
]

export const mockUser = {
  name: 'Alex Morgan',
  email: 'alex@smarthire.ai',
  initials: 'AM',
}

export const mockNotifications = [
  'Dashboard foundation ready',
  'Reusable navigation shell created',
  'Preview mode is active',
]

export const productVersion = 'v0.1.0'

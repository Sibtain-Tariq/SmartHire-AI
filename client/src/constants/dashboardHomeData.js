import {
  Activity,
  BarChart3,
  BrainCircuit,
  Briefcase,
  Calendar,
  CheckCircle2,
  Clock,
  FileSearch,
  FileText,
  MessageSquare,
  Sparkles,
  Target,
  TrendingUp,
  Trophy,
  UploadCloud,
  User,
  Zap,
} from 'lucide-react'

export const dashboardUser = {
  name: 'Alex Morgan',
  quote: 'Small improvements compound into stronger interviews, sharper resumes, and better opportunities.',
}

export const overviewStats = [
  {
    label: 'ATS Score',
    value: '86%',
    description: 'Current resume readiness',
    trend: '+8% this month',
    icon: BarChart3,
    tone: 'sky',
    path: '/resume',
  },
  {
    label: 'Total Resumes',
    value: '4',
    description: 'Saved resume versions',
    trend: '+1 new version',
    icon: FileText,
    tone: 'indigo',
    path: '/resume',
  },
  {
    label: 'Interviews Completed',
    value: '12',
    description: 'Practice sessions finished',
    trend: '+3 this week',
    icon: MessageSquare,
    tone: 'emerald',
    path: '/interviews',
  },
  {
    label: 'Job Matches',
    value: '28',
    description: 'Relevant roles discovered',
    trend: '+6 strong matches',
    icon: Briefcase,
    tone: 'amber',
    path: '/job-matching',
  },
]

export const quickActions = [
  {
    title: 'Upload Resume',
    description: 'Add a new resume version for future analysis.',
    icon: UploadCloud,
    path: '/resume?action=upload',
  },
  {
    title: 'Analyze Resume',
    description: 'Preview readiness, keywords, and formatting signals.',
    icon: FileSearch,
    path: '/resume',
  },
  {
    title: 'Compare with Job Description',
    description: 'Check alignment against a target role.',
    icon: Target,
    path: '/job-matching',
  },
  {
    title: 'Start Mock Interview',
    description: 'Practice role-specific questions with guided feedback.',
    icon: BrainCircuit,
    path: '/interviews',
  },
  {
    title: 'Update Profile',
    description: 'Keep your professional details fresh.',
    icon: User,
    path: '/profile',
  },
]

export const resumeSummary = {
  title: 'Senior Frontend Engineer Resume',
  uploadDate: 'Jul 2, 2026',
  lastUpdated: 'Jul 7, 2026',
  strength: 'Strong',
  completion: 82,
  status: 'Optimized',
}

export const atsSummary = {
  overallScore: 86,
  metrics: [
    { label: 'Keyword Match', value: 78 },
    { label: 'Formatting Score', value: 92 },
    { label: 'Skill Match', value: 84 },
  ],
  missingKeywords: ['CI/CD', 'accessibility testing', 'design systems', 'performance budgets'],
}

export const interviewProgress = {
  attempted: 12,
  averageScore: 7.8,
  bestScore: 9.1,
  nextPractice: 'Behavioral leadership round',
  completion: 68,
}

export const activityTimeline = [
  {
    title: 'Resume Uploaded',
    time: 'Today, 9:42 AM',
    status: 'Complete',
    icon: UploadCloud,
  },
  {
    title: 'ATS Report Generated',
    time: 'Yesterday, 4:18 PM',
    status: 'Reviewed',
    icon: FileSearch,
  },
  {
    title: 'Interview Completed',
    time: 'Jul 6, 2026',
    status: 'Scored',
    icon: MessageSquare,
  },
  {
    title: 'Profile Updated',
    time: 'Jul 5, 2026',
    status: 'Saved',
    icon: User,
  },
  {
    title: 'Job Description Compared',
    time: 'Jul 4, 2026',
    status: 'Matched',
    icon: Target,
  },
]

export const recommendations = [
  {
    title: 'Improve Python skills',
    description: 'Add evidence of scripting, automation, or backend collaboration where relevant.',
    priority: 'High',
    icon: Zap,
  },
  {
    title: 'Add leadership experience',
    description: 'Highlight mentoring, project ownership, and cross-functional decision making.',
    priority: 'Medium',
    icon: Trophy,
  },
  {
    title: 'Practice HR interview',
    description: 'Prepare concise stories for motivation, conflict, ownership, and growth.',
    priority: 'Medium',
    icon: MessageSquare,
  },
  {
    title: 'Optimize resume keywords',
    description: 'Align role-specific terms with the job descriptions you are targeting.',
    priority: 'High',
    icon: Sparkles,
  },
  {
    title: 'Improve formatting',
    description: 'Keep section hierarchy, dates, and bullet rhythm consistent throughout.',
    priority: 'Low',
    icon: CheckCircle2,
  },
]

export const upcomingFeatures = [
  { title: 'AI Resume Builder', icon: Sparkles },
  { title: 'Cover Letter Generator', icon: FileText },
  { title: 'LinkedIn Analysis', icon: TrendingUp },
  { title: 'Voice Interview', icon: Activity },
  { title: 'Resume Templates', icon: Calendar },
]

export const currentFocus = {
  icon: Clock,
  label: 'Next best action',
  value: 'Refresh keywords before your next application.',
}

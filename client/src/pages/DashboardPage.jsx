import React from 'react'
import { motion } from 'framer-motion'
import DashboardContainer from '../components/dashboard/DashboardContainer'
import DashboardLayout from '../components/dashboard/DashboardLayout'
import ActivityTimeline from '../components/dashboard/home/ActivityTimeline'
import ATSOverviewCard from '../components/dashboard/home/ATSOverviewCard'
import ComingSoonSection from '../components/dashboard/home/ComingSoonSection'
import DashboardHero from '../components/dashboard/home/DashboardHero'
import InterviewProgressCard from '../components/dashboard/home/InterviewProgressCard'
import QuickActionCard from '../components/dashboard/home/QuickActionCard'
import RecentReportsTable from '../components/dashboard/home/RecentReportsTable'
import RecommendationCard from '../components/dashboard/home/RecommendationCard'
import ResumeSummaryCard from '../components/dashboard/home/ResumeSummaryCard'
import SectionHeader from '../components/dashboard/home/SectionHeader'
import StatCard from '../components/dashboard/home/StatCard'
import {
  overviewStats,
  quickActions,
  recommendations,
} from '../constants/dashboardHomeData'

export default function DashboardPage() {
  return (
    <DashboardLayout breadcrumbItems={[{ label: 'Dashboard' }]}>
      <DashboardContainer className="gap-8">
        <DashboardHero />

        <motion.section
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.32, delay: 0.06 }}
          aria-labelledby="overview-statistics"
        >
          <SectionHeader
            id="overview-statistics"
            eyebrow="Overview"
            title="Preparation statistics"
            description="A quick snapshot of resume readiness, practice activity, and matching momentum."
          />
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {overviewStats.map((stat, index) => (
              <StatCard key={stat.label} stat={stat} index={index} />
            ))}
          </div>
        </motion.section>

        <section aria-labelledby="quick-actions">
          <SectionHeader
            id="quick-actions"
            eyebrow="Actions"
            title="Quick actions"
            description="Common preparation paths are ready for future workflows. These controls are UI placeholders."
          />
          <div className="flex gap-4 overflow-x-auto pb-2 md:grid md:grid-cols-2 md:overflow-visible xl:grid-cols-3">
            {quickActions.map((action, index) => (
              <QuickActionCard key={action.title} action={action} index={index} />
            ))}
          </div>
        </section>

        <section className="grid gap-6 xl:grid-cols-[0.95fr_1.05fr]" aria-label="Resume and ATS summaries">
          <ResumeSummaryCard />
          <ATSOverviewCard />
        </section>

        <section className="grid gap-6 xl:grid-cols-[1.05fr_0.95fr]" aria-label="Interview progress and activity">
          <InterviewProgressCard />
          <section aria-labelledby="recent-activity">
            <SectionHeader id="recent-activity" eyebrow="Activity" title="Recent activity" />
            <ActivityTimeline />
          </section>
        </section>

        <section aria-labelledby="recommended-next-steps">
          <SectionHeader
            id="recommended-next-steps"
            eyebrow="AI Suggestions"
            title="Recommended next steps"
            description="Mock recommendations that preview how future AI insights can guide preparation."
          />
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {recommendations.map((recommendation) => (
              <RecommendationCard key={recommendation.title} recommendation={recommendation} />
            ))}
          </div>
        </section>

        <section aria-labelledby="recent-reports">
          <SectionHeader
            id="recent-reports"
            eyebrow="Reports"
            title="Recent reports"
            description="A lightweight report table designed for future ATS and interview outputs."
          />
          <RecentReportsTable />
        </section>

        <section aria-labelledby="coming-soon">
          <SectionHeader
            id="coming-soon"
            eyebrow="Coming Soon"
            title="Upcoming features"
            description="Disabled feature previews for future SmartHire AI capabilities."
          />
          <ComingSoonSection />
        </section>
      </DashboardContainer>
    </DashboardLayout>
  )
}

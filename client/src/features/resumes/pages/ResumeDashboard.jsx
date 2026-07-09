import React from 'react'
import DashboardLayout from '../../../components/dashboard/DashboardLayout'
import DashboardContainer from '../../../components/dashboard/DashboardContainer'

export default function ResumeDashboard() {
  return (
    <DashboardLayout breadcrumbItems={[{ label: 'Resumes' }]}>
      <DashboardContainer>
        <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
          <h1 className="text-2xl font-bold text-slate-900">Resume Dashboard</h1>
          <p className="mt-2 text-slate-600">This is the mock Resume Dashboard.</p>
        </div>
      </DashboardContainer>
    </DashboardLayout>
  )
}

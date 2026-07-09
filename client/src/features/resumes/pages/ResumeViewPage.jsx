import React from 'react'
import { useParams } from 'react-router-dom'
import DashboardLayout from '../../../components/dashboard/DashboardLayout'
import DashboardContainer from '../../../components/dashboard/DashboardContainer'

export default function ResumeViewPage() {
  const { id } = useParams()
  return (
    <DashboardLayout breadcrumbItems={[{ label: 'Resumes', path: '/resumes' }, { label: `Details (${id})` }]}>
      <DashboardContainer>
        <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
          <h1 className="text-2xl font-bold text-slate-900">Resume Details</h1>
          <p className="mt-2 text-slate-600">Viewing details for resume ID: {id}</p>
        </div>
      </DashboardContainer>
    </DashboardLayout>
  )
}

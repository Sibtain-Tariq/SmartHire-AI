import React from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, Compass, FileText, Users } from 'lucide-react'
import SectionHeading from './SectionHeading'
import SectionShell from './SectionShell'

const steps = [
  {
    icon: FileText,
    title: 'Craft the role',
    description: 'Generate polished job descriptions and aligned scorecards from a simple brief.',
  },
  {
    icon: Compass,
    title: 'Screen fast',
    description: 'Use AI to evaluate fit, communication, and role readiness in minutes.',
  },
  {
    icon: Users,
    title: 'Close confidently',
    description: 'Turn interview notes into actionable next steps and offer-ready recommendations.',
  },
]

export default function WorkflowSection() {
  return (
    <SectionShell id="workflow" className="bg-white">
      <SectionHeading
        eyebrow="Workflow"
        title="A calm, high-trust process from attraction to offer"
        description="Each step is designed to reduce friction and make hiring feeling intentional instead of reactive."
      />
      <div className="mt-12 grid gap-6 lg:grid-cols-3">
        {steps.map((step, index) => {
          const Icon = step.icon
          return (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.35, delay: index * 0.08 }}
              className="rounded-[1.75rem] border border-slate-200 bg-slate-50 p-8 shadow-sm"
            >
              <div className="flex items-center justify-between">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-600/10 via-sky-500/10 to-cyan-400/15 text-sky-600">
                  <Icon size={22} />
                </div>
                <span className="text-sm font-semibold text-slate-400">0{index + 1}</span>
              </div>
              <h3 className="mt-6 text-xl font-semibold text-slate-900">{step.title}</h3>
              <p className="mt-3 text-base leading-7 text-slate-600">{step.description}</p>
              <div className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-slate-700">
                Continue
                <ArrowRight size={16} />
              </div>
            </motion.div>
          )
        })}
      </div>
    </SectionShell>
  )
}

import React from 'react'
import { motion } from 'framer-motion'
import { ShieldCheck, Sparkles, Zap } from 'lucide-react'
import SectionHeading from './SectionHeading'
import SectionShell from './SectionShell'

const reasons = [
  {
    icon: ShieldCheck,
    title: 'Trust by design',
    description: 'Transparent AI outputs, auditable guidance, and a thoughtful experience that feels safe for modern teams.',
  },
  {
    icon: Zap,
    title: 'Clear momentum',
    description: 'Reduce back-and-forth and get everyone aligned with one shared candidate narrative.',
  },
  {
    icon: Sparkles,
    title: 'Elevated craft',
    description: 'A premium interface that makes collaboration feel polished, quick, and deeply productive.',
  },
]

export default function WhyChooseSection() {
  return (
    <SectionShell id="why-choose" className="bg-slate-50/80">
      <SectionHeading
        eyebrow="Why SmartHire"
        title="Built for operators who care about quality, speed, and trust"
        description="The experience is crafted to feel calm, modern, and high-leverage from the very first interaction."
      />
      <div className="mt-12 grid gap-6 lg:grid-cols-3">
        {reasons.map((reason, index) => {
          const Icon = reason.icon
          return (
            <motion.div
              key={reason.title}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.35, delay: index * 0.08 }}
              className="rounded-[1.75rem] border border-slate-200 bg-white p-8 shadow-sm"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-600/10 via-sky-500/10 to-cyan-400/15 text-sky-600">
                <Icon size={22} />
              </div>
              <h3 className="mt-6 text-xl font-semibold text-slate-900">{reason.title}</h3>
              <p className="mt-3 text-base leading-7 text-slate-600">{reason.description}</p>
            </motion.div>
          )
        })}
      </div>
    </SectionShell>
  )
}

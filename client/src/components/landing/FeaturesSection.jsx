import React from 'react'
import { motion } from 'framer-motion'
import { BrainCircuit, FileSearch, MessageCircle, Sparkles } from 'lucide-react'
import SectionHeading from './SectionHeading'
import SectionShell from './SectionShell'

const features = [
  {
    icon: BrainCircuit,
    title: 'AI-first screening',
    description: 'Match candidates against structured competencies and your tone of voice in seconds.',
  },
  {
    icon: FileSearch,
    title: 'Dynamic job intelligence',
    description: 'Generate polished job specs and role summaries from existing docs and hiring history.',
  },
  {
    icon: MessageCircle,
    title: 'Interview copilots',
    description: 'Turn structured scorecards into richer conversations and more confident decisions.',
  },
]

export default function FeaturesSection() {
  return (
    <SectionShell id="features" className="bg-slate-50/70">
      <SectionHeading
        eyebrow="Features"
        title="Everything your team needs to move from intake to offer"
        description="The product is designed to feel effortless for recruiters, hiring managers, and founders alike."
      />
      <div className="mt-12 grid gap-6 lg:grid-cols-3">
        {features.map((feature, index) => {
          const Icon = feature.icon
          return (
            <motion.article
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.35, delay: index * 0.08 }}
              className="rounded-[1.75rem] border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 p-8 shadow-[0_25px_70px_-40px_rgba(15,23,42,0.45)]"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-600/10 via-sky-500/10 to-cyan-400/15 text-sky-600">
                <Icon size={22} />
              </div>
              <h3 className="mt-6 text-xl font-semibold text-slate-900 dark:text-slate-50">{feature.title}</h3>
              <p className="mt-3 text-base leading-7 text-slate-600 dark:text-slate-400">{feature.description}</p>
              <div className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-slate-800 dark:text-slate-200">
                <Sparkles size={16} className="text-sky-500" />
                Built for premium teams
              </div>
            </motion.article>
          )
        })}
      </div>
    </SectionShell>
  )
}

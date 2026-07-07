import React from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, Check } from 'lucide-react'
import SectionHeading from './SectionHeading'
import SectionShell from './SectionShell'

const options = [
  {
    name: 'Starter',
    price: 'Custom',
    description: 'For lean teams launching their first AI-assisted hiring motion.',
    features: ['AI screening assistant', 'Core ATS workflows', 'Email support'],
    featured: false,
  },
  {
    name: 'Growth',
    price: 'Contact us',
    description: 'For scaling teams that want deeper collaboration and automation.',
    features: ['Unlimited interview copilots', 'Advanced analytics', 'Priority onboarding'],
    featured: true,
  },
]

export default function PricingSection() {
  return (
    <SectionShell id="pricing" className="bg-slate-50/80">
      <SectionHeading
        eyebrow="Pricing"
        title="Flexible plans for modern hiring teams"
        description="Whether you are building your first pipeline or refining an enterprise process, SmartHire AI fits the way you work."
      />
      <div className="mt-12 grid gap-6 lg:grid-cols-2">
        {options.map((option, index) => (
          <motion.div
            key={option.name}
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.35, delay: index * 0.08 }}
            className={`rounded-[2rem] border p-8 shadow-sm ${option.featured ? 'border-sky-200 bg-white' : 'border-slate-200 bg-white/90'}`}
          >
            {option.featured ? (
              <div className="mb-4 inline-flex rounded-full bg-sky-100 px-3 py-1 text-sm font-semibold text-sky-700">
                Most popular
              </div>
            ) : null}
            <h3 className="text-2xl font-semibold text-slate-900">{option.name}</h3>
            <p className="mt-3 text-base leading-7 text-slate-600">{option.description}</p>
            <p className="mt-8 text-4xl font-semibold tracking-tight text-slate-900">{option.price}</p>
            <ul className="mt-8 space-y-3">
              {option.features.map((feature) => (
                <li key={feature} className="flex items-center gap-3 text-sm font-medium text-slate-700">
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
                    <Check size={14} />
                  </span>
                  {feature}
                </li>
              ))}
            </ul>
            <a href="#contact" className="mt-8 inline-flex items-center gap-2 rounded-full bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-700">
              Request access
              <ArrowRight size={16} />
            </a>
          </motion.div>
        ))}
      </div>
    </SectionShell>
  )
}

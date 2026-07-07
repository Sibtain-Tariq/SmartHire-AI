import React from 'react'
import { motion } from 'framer-motion'
import { Star } from 'lucide-react'
import SectionHeading from './SectionHeading'
import SectionShell from './SectionShell'

const testimonials = [
  {
    quote: 'SmartHire feels like a modern operating system for recruiting. We cut the admin burden and closed roles faster.',
    name: 'Nadia Alvarez',
    role: 'Head of Talent, Northstar Labs',
  },
  {
    quote: 'The interface is beautiful, but what really stood out was how clearly it made decisions easier for every stakeholder.',
    name: 'Marcus Chen',
    role: 'VP People, Helio Ventures',
  },
]

export default function TestimonialsSection() {
  return (
    <SectionShell className="bg-white">
      <SectionHeading
        eyebrow="Testimonials"
        title="Premium product, measurable impact"
        description="Teams use SmartHire AI not just because it looks polished, but because it helps them move faster with more confidence."
      />
      <div className="mt-12 grid gap-6 lg:grid-cols-2">
        {testimonials.map((item, index) => (
          <motion.blockquote
            key={item.name}
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.35, delay: index * 0.08 }}
            className="rounded-[1.75rem] border border-slate-200 bg-slate-50 p-8 shadow-sm"
          >
            <div className="flex gap-1 text-amber-400">
              {Array.from({ length: 5 }).map((_, index) => (
                <Star key={index} size={16} fill="currentColor" />
              ))}
            </div>
            <p className="mt-6 text-lg leading-8 text-slate-700">“{item.quote}”</p>
            <footer className="mt-6">
              <p className="font-semibold text-slate-900">{item.name}</p>
              <p className="text-sm text-slate-500">{item.role}</p>
            </footer>
          </motion.blockquote>
        ))}
      </div>
    </SectionShell>
  )
}

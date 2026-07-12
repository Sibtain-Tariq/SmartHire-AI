import React from 'react'
import { motion } from 'framer-motion'

const logos = ['Notion', 'Linear', 'Vercel', 'Stripe', 'Framer', 'Perplexity']

export default function PartnersSection() {
  return (
    <section className="border-b border-slate-200/80 bg-white/70 px-4 py-8 sm:px-6 lg:px-8 dark:border-slate-800/80 dark:bg-slate-950/70">
      <div className="mx-auto flex max-w-7xl flex-col items-center gap-6 lg:flex-row lg:justify-between">
        <p className="text-sm font-semibold uppercase tracking-[0.32em] text-slate-500">Trusted by modern teams</p>
        <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4">
          {logos.map((logo, index) => (
            <motion.div
              key={logo}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              className="rounded-full border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 px-4 py-2 text-sm font-semibold text-slate-700 shadow-sm"
            >
              {logo}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

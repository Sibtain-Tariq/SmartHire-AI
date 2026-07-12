import React, { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import SectionHeading from './SectionHeading'
import SectionShell from './SectionShell'

const faqs = [
  {
    question: 'How does SmartHire AI help recruiters?',
    answer: 'It reduces busywork by drafting roles, ranking candidates, and summarizing interviews so teams can focus on the highest-fidelity decisions.',
  },
  {
    question: 'Can it work with existing ATS tools?',
    answer: 'Yes. The experience is designed to fit into modern recruiting workflows and connect with popular systems through flexible integrations.',
  },
  {
    question: 'Is the platform suitable for scaling teams?',
    answer: 'Absolutely. From lean startups to global teams, the workflow can be tailored to suit your hiring velocity, governance, and collaboration model.',
  },
]

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState(0)

  return (
    <SectionShell id="faq" className="bg-white dark:bg-slate-950">
      <SectionHeading
        eyebrow="FAQ"
        title="Questions teams usually ask before they switch"
        description="A concise overview of how the platform is set up for reliability, clarity, and high-trust collaboration."
      />
      <div className="mx-auto mt-12 max-w-3xl space-y-4">
        {faqs.map((faq, index) => {
          const isOpen = openIndex === index
          return (
            <div key={faq.question} className="rounded-[1.4rem] border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 px-6 py-4 shadow-sm">
              <button
                type="button"
                className="flex w-full items-center justify-between gap-4 text-left"
                onClick={() => setOpenIndex(isOpen ? -1 : index)}
              >
                <span className="text-base font-semibold text-slate-900 dark:text-slate-50">{faq.question}</span>
                <ChevronDown size={18} className={`transition ${isOpen ? 'rotate-180' : ''}`} />
              </button>
              {isOpen ? <p className="mt-4 text-sm leading-7 text-slate-600 dark:text-slate-400">{faq.answer}</p> : null}
            </div>
          )
        })}
      </div>
    </SectionShell>
  )
}

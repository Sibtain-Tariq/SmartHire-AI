import React from 'react'

export default function SectionShell({ id, className = '', children }) {
  return (
    <section id={id} className={`px-4 py-20 sm:px-6 lg:px-8 ${className}`}>
      <div className="mx-auto max-w-7xl">{children}</div>
    </section>
  )
}

import React from 'react'

export default function SectionHeading({ eyebrow, title, description, align = 'center' }) {
  return (
    <div className={`max-w-3xl ${align === 'left' ? 'text-left' : 'mx-auto text-center'}`}>
      {eyebrow ? (
        <div className="mb-4 inline-flex items-center rounded-full border border-sky-200 bg-sky-50 px-3 py-1 text-sm font-medium text-sky-700">
          {eyebrow}
        </div>
      ) : null}
      <h2 className="text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
        {title}
      </h2>
      {description ? (
        <p className="mt-4 text-lg leading-8 text-slate-600">{description}</p>
      ) : null}
    </div>
  )
}

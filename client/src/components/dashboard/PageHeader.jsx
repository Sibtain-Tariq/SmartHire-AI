import React from 'react'

export default function PageHeader({ title, subtitle, description, action }) {
  return (
    <header className="flex flex-col gap-5 border-b border-slate-200 pb-6 md:flex-row md:items-end md:justify-between">
      <div className="max-w-3xl">
        {subtitle ? (
          <p className="text-sm font-semibold uppercase tracking-[0.22em] text-sky-600">{subtitle}</p>
        ) : null}
        <h1 className="mt-2 text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl">
          {title}
        </h1>
        {description ? <p className="mt-3 text-base leading-7 text-slate-600">{description}</p> : null}
      </div>
      {action ? <div className="shrink-0">{action}</div> : null}
    </header>
  )
}

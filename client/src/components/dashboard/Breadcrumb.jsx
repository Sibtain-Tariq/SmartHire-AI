import React from 'react'
import { ChevronRight } from 'lucide-react'

export default function Breadcrumb({ items = [{ label: 'Dashboard' }] }) {
  return (
    <nav aria-label="Breadcrumb">
      <ol className="flex flex-wrap items-center gap-1 text-sm text-slate-500">
        {items.map((item, index) => {
          const isLast = index === items.length - 1
          return (
            <li key={`${item.label}-${index}`} className="flex items-center gap-1">
              <span className={isLast ? 'font-medium text-slate-900' : 'hover:text-slate-700'}>
                {item.label}
              </span>
              {!isLast ? <ChevronRight size={14} aria-hidden="true" /> : null}
            </li>
          )
        })}
      </ol>
    </nav>
  )
}

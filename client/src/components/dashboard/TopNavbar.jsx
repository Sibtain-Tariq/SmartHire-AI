import React from 'react'
import { Menu, MessageSquare } from 'lucide-react'
import Breadcrumb from './Breadcrumb'
import NotificationButton from './NotificationButton'
import SearchBar from './SearchBar'
import ThemeToggle from './ThemeToggle'
import UserDropdown from './UserDropdown'

export default function TopNavbar({ title = 'Dashboard', breadcrumbItems, onMenuClick, onSidebarToggle }) {
  return (
    <header className="sticky top-0 z-40 border-b border-slate-200/80 bg-white/80 shadow-sm shadow-slate-200/50 backdrop-blur-xl">
      <div className="flex h-16 items-center gap-3 px-4 sm:px-6 lg:px-8">
        <button
          type="button"
          onClick={onMenuClick}
          aria-label="Open navigation"
          className="flex h-10 w-10 items-center justify-center rounded-2xl border border-slate-200 bg-white text-slate-600 shadow-sm outline-none transition hover:text-slate-950 focus-visible:ring-2 focus-visible:ring-sky-400 lg:hidden"
        >
          <Menu size={18} />
        </button>

        <button
          type="button"
          onClick={onSidebarToggle}
          aria-label="Toggle sidebar"
          className="hidden h-10 w-10 items-center justify-center rounded-2xl border border-slate-200 bg-white text-slate-600 shadow-sm outline-none transition hover:text-slate-950 focus-visible:ring-2 focus-visible:ring-sky-400 md:flex lg:hidden"
        >
          <Menu size={18} />
        </button>

        <div className="min-w-0 flex-1">
          <Breadcrumb items={breadcrumbItems} />
          <p className="mt-0.5 truncate text-sm font-semibold text-slate-950">{title}</p>
        </div>

        <div className="hidden flex-1 justify-center xl:flex">
          <SearchBar />
        </div>

        <div className="ml-auto flex items-center gap-2">
          <button
            type="button"
            aria-label="Messages"
            className="hidden h-10 w-10 items-center justify-center rounded-2xl border border-slate-200 bg-white/80 text-slate-600 shadow-sm outline-none transition hover:-translate-y-0.5 hover:text-slate-950 focus-visible:ring-2 focus-visible:ring-sky-400 sm:flex"
          >
            <MessageSquare size={17} aria-hidden="true" />
          </button>
          <NotificationButton />
          <div className="hidden md:block">
            <ThemeToggle />
          </div>
          <UserDropdown />
        </div>
      </div>

      <div className="border-t border-slate-100 px-4 py-3 md:hidden">
        <SearchBar className="block w-full" />
      </div>
    </header>
  )
}

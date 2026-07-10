import React from 'react'
import { Menu } from 'lucide-react'
import Breadcrumb from './Breadcrumb'
import NotificationButton from './NotificationButton'
import SearchBar from './SearchBar'
import ThemeToggle from './ThemeToggle'
import UserDropdown from './UserDropdown'

export default function TopNavbar({ breadcrumbItems, onMenuClick }) {
  return (
    <header className="sticky top-0 z-40 border-b border-slate-200/80 bg-white/80 shadow-sm shadow-slate-200/50 backdrop-blur-xl dark:bg-slate-900/80 dark:border-slate-800/80 dark:shadow-slate-900/50">
      <div className="flex h-16 items-center gap-3 px-4 sm:px-6 lg:px-8">
        <button
          type="button"
          onClick={onMenuClick}
          aria-label="Open navigation"
          className="flex h-10 w-10 items-center justify-center rounded-2xl border border-slate-200 bg-white text-slate-600 shadow-sm outline-none transition hover:text-slate-950 focus-visible:ring-2 focus-visible:ring-sky-400 lg:hidden dark:bg-slate-800 dark:border-slate-700 dark:text-slate-300 dark:hover:text-white"
        >
          <Menu size={18} />
        </button>

        <div className="min-w-0 flex-1">
          <Breadcrumb items={breadcrumbItems} />
        </div>

        <div className="hidden flex-1 justify-center md:flex">
          <SearchBar className="w-full max-w-xs lg:max-w-sm" />
        </div>

        <div className="ml-auto flex items-center gap-2">
          <NotificationButton />
          <div className="hidden md:block">
            <ThemeToggle />
          </div>
          <UserDropdown />
        </div>
      </div>

      <div className="border-t border-slate-100 px-4 py-3 md:hidden dark:border-slate-800">
        <SearchBar className="block w-full" />
      </div>
    </header>
  )
}

'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import ThemeToggle from './ThemeToggle'

export default function SidebarNav() {
  const pathname = usePathname()
  
  const navItems = [
    { name: 'Home', href: '/' },
    { name: 'Library', href: '/library' },
    { name: 'Lists', href: '/lists' },
  ]

  return (
    <aside className="w-64 bg-background-secondary p-6 border-r border-primary/20">
      {/* App Logo */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-primary">Movie Tracker</h1>
        <p className="text-text-secondary text-sm">Your funky movie collection</p>
      </div>

      {/* Navigation Links */}
      <nav className="space-y-2">
        {navItems.map((item) => {
          const isActive = pathname === item.href
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`
                block px-4 py-3 rounded-2xl transition-all duration-200
                ${isActive 
                  ? 'bg-primary/20 text-primary border-l-4 border-primary' 
                  : 'hover:bg-card-background/50 text-text-secondary hover:text-text'
                }
              `}
            >
              {item.name}
            </Link>
          )
        })}
      </nav>

      {/* Theme Toggle */}
      <div className="mt-8 pt-6 border-t border-primary/20">
        <ThemeToggle />
      </div>

      {/* Mobile Toggle (hidden on desktop) */}
      <button className="md:hidden fixed top-4 right-4 z-50 p-2 bg-primary text-white rounded-full">
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>
    </aside>
  )
}
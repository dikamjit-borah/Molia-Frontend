'use client'

import { useState, useEffect } from 'react'
import { themes } from '@/theme/theme'

export default function ThemeToggle() {
  const [currentTheme, setCurrentTheme] = useState('FunkyFlix')
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    // Load theme from localStorage
    const savedTheme = localStorage.getItem('theme-storage')
    if (savedTheme) {
      try {
        const parsed = JSON.parse(savedTheme)
        if (parsed.state && parsed.state.currentTheme) {
          setCurrentTheme(parsed.state.currentTheme)
        }
      } catch (error) {
        console.error('Failed to parse theme from localStorage:', error)
      }
    }
  }, [])

  const handleThemeChange = (themeName: string) => {
    setCurrentTheme(themeName)
    setIsOpen(false)
    
    // Update localStorage
    const themeStorage = {
      state: { currentTheme: themeName },
      version: 0
    }
    localStorage.setItem('theme-storage', JSON.stringify(themeStorage))
    
    // Apply theme colors to CSS variables
    const theme = themes[themeName]
    if (theme) {
      Object.entries(theme.colors).forEach(([key, value]) => {
        document.documentElement.style.setProperty(
          `--color-${key}`,
          value
        )
      })
    }
  }

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-4 py-3 bg-card-background rounded-2xl flex items-center justify-between hover:bg-primary/10 transition-colors"
      >
        <span className="text-text">Theme: {currentTheme}</span>
        <svg 
          className={`w-5 h-5 text-text-secondary transition-transform ${isOpen ? 'rotate-180' : ''}`}
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute bottom-full left-0 right-0 mb-2 bg-card-background rounded-2xl shadow-lg border border-primary/20 overflow-hidden z-10">
          {Object.keys(themes).map((themeName) => (
            <button
              key={themeName}
              onClick={() => handleThemeChange(themeName)}
              className={`
                w-full px-4 py-3 text-left transition-colors
                ${currentTheme === themeName 
                  ? 'bg-primary/20 text-primary' 
                  : 'hover:bg-background-secondary text-text-secondary hover:text-text'
                }
              `}
            >
              {themeName}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
'use client'

import { useEffect } from 'react'
import { themes } from '@/theme/theme'

interface ThemeProviderProps {
  children: React.ReactNode
}

export default function ThemeProvider({ children }: ThemeProviderProps) {
  useEffect(() => {
    // Apply theme from localStorage or default to FunkyFlix
    const savedTheme = localStorage.getItem('theme-storage')
    let themeName = 'FunkyFlix'
    
    if (savedTheme) {
      try {
        const parsed = JSON.parse(savedTheme)
        if (parsed.state && parsed.state.currentTheme) {
          themeName = parsed.state.currentTheme
        }
      } catch (error) {
        console.error('Failed to parse theme from localStorage:', error)
      }
    }
    
    // Apply theme colors to CSS variables
    const theme = themes[themeName] || themes.FunkyFlix
    if (theme) {
      Object.entries(theme.colors).forEach(([key, value]) => {
        document.documentElement.style.setProperty(
          `--color-${key}`,
          value
        )
      })
    }
  }, [])

  return <>{children}</>
}
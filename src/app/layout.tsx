import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import '@/theme/globals.css'
import ThemeProvider from '@/components/ThemeProvider'
import SidebarNav from '@/components/SidebarNav'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Movie Tracker',
  description: 'A funky Netflix-inspired movie tracking app',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-background text-text min-h-screen`}>
        <ThemeProvider>
          <div className="flex min-h-screen">
            {/* Sidebar Navigation */}
            <SidebarNav />
            
            {/* Main Content */}
            <main className="flex-1 p-6">
              {children}
            </main>
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}
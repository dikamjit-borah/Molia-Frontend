'use client'

import { useState, useMemo } from 'react'
import MovieGrid from '@/components/MovieGrid'
import { mockMovies } from '@/data/mockMovies'

export default function Home() {
  const [searchQuery, setSearchQuery] = useState('')

  // Simple search function
  const filteredMovies = useMemo(() => {
    if (!searchQuery.trim()) {
      return mockMovies
    }
    
    const query = searchQuery.toLowerCase()
    return mockMovies.filter(movie => 
      movie.title.toLowerCase().includes(query)
    )
  }, [searchQuery])

  return (
    <div className="max-w-7xl mx-auto">
      {/* Hero Header with Funky Gradient */}
      <div className="mb-10">
        <div className="gradient-funky rounded-2xl p-8 mb-6">
          <h1 className="text-5xl font-bold text-white mb-4">
            Movie Tracker
          </h1>
          <p className="text-xl text-white/90">
            Your funky Netflix-inspired dashboard for tracking and organizing movies
          </p>
        </div>

        {/* Search Bar */}
        <div className="relative max-w-2xl mx-auto">
          <div className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search movies by title..."
              className="w-full px-6 py-4 bg-card-background rounded-2xl border-2 border-primary/30 focus:border-primary focus:outline-none text-text placeholder:text-text-secondary/60 text-lg"
            />
            <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
              <svg className="w-6 h-6 text-text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>
          
          {/* Search Results Count */}
          {searchQuery && (
            <div className="mt-4 text-center">
              <p className="text-text-secondary">
                Found {filteredMovies.length} movie{filteredMovies.length !== 1 ? 's' : ''} matching "{searchQuery}"
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Movie Grid */}
      <div className="mt-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-3xl font-bold text-text">
            {searchQuery ? 'Search Results' : 'All Movies'}
          </h2>
          <div className="text-text-secondary">
            {mockMovies.length} movies total
          </div>
        </div>
        
        <MovieGrid 
          movies={filteredMovies} 
          emptyMessage={searchQuery ? `No movies found matching "${searchQuery}"` : 'No movies available'}
        />
      </div>
    </div>
  )
}
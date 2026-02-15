'use client'

import { useState, useEffect } from 'react'
import MovieGrid from '@/components/MovieGrid'
import { mockMovies } from '@/data/mockMovies'

interface LibrarySection {
  id: string
  title: string
  description: string
  movies: typeof mockMovies
  emptyMessage: string
  gradientClass: string
}

export default function LibraryPage() {
  const [watchedMovies, setWatchedMovies] = useState<number[]>([])
  const [favorites, setFavorites] = useState<number[]>([])
  const [classics, setClassics] = useState<number[]>([])
  const [watchLater, setWatchLater] = useState<number[]>([])

  useEffect(() => {
    // Load data from localStorage
    const loadFromLocalStorage = () => {
      try {
        const watched = JSON.parse(localStorage.getItem('moviesWatched') || '[]')
        const favs = JSON.parse(localStorage.getItem('favorites') || '[]')
        const cls = JSON.parse(localStorage.getItem('classics') || '[]')
        const later = JSON.parse(localStorage.getItem('watchLater') || '[]')
        
        setWatchedMovies(watched)
        setFavorites(favs)
        setClassics(cls)
        setWatchLater(later)
      } catch (error) {
        console.error('Failed to load data from localStorage:', error)
      }
    }

    loadFromLocalStorage()
    
    // Listen for storage changes
    const handleStorageChange = () => {
      loadFromLocalStorage()
    }
    
    window.addEventListener('storage', handleStorageChange)
    return () => window.removeEventListener('storage', handleStorageChange)
  }, [])

  // Filter movies for each section
  const getMoviesByIds = (ids: number[]) => {
    return mockMovies.filter(movie => ids.includes(movie.id))
  }

  const librarySections: LibrarySection[] = [
    {
      id: 'watched',
      title: 'Watched Movies',
      description: 'Movies you have marked as watched',
      movies: getMoviesByIds(watchedMovies),
      emptyMessage: 'No movies marked as watched yet. Start watching!',
      gradientClass: 'from-primary/20 to-secondary/20'
    },
    {
      id: 'favorites',
      title: 'Favorites',
      description: 'Your all-time favorite movies',
      movies: getMoviesByIds(favorites),
      emptyMessage: 'No favorite movies yet. Add some to your favorites!',
      gradientClass: 'from-pink-500/20 to-rose-500/20'
    },
    {
      id: 'classics',
      title: 'Classics',
      description: 'Timeless movies worth watching again',
      movies: getMoviesByIds(classics),
      emptyMessage: 'No classic movies added yet. Discover some classics!',
      gradientClass: 'from-amber-500/20 to-orange-500/20'
    },
    {
      id: 'watch-later',
      title: 'Watch Later',
      description: 'Movies you plan to watch',
      movies: getMoviesByIds(watchLater),
      emptyMessage: 'Your watch later list is empty. Add some movies to watch!',
      gradientClass: 'from-cyan-500/20 to-blue-500/20'
    }
  ]

  return (
    <div className="max-w-7xl mx-auto">
      {/* Page Header */}
      <div className="mb-10">
        <h1 className="text-4xl font-bold text-text mb-4">My Library</h1>
        <p className="text-text-secondary text-lg">
          Browse your watched movies, favorites, classics, and watch later list
        </p>
      </div>

      {/* Library Sections */}
      <div className="space-y-12">
        {librarySections.map((section) => (
          <div key={section.id} className="relative">
            {/* Section Header with Gradient Accent */}
            <div className={`mb-6 p-6 rounded-2xl bg-gradient-to-r ${section.gradientClass}`}>
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-text mb-2">{section.title}</h2>
                  <p className="text-text-secondary">{section.description}</p>
                </div>
                <div className="text-3xl font-bold text-primary">
                  {section.movies.length}
                </div>
              </div>
            </div>

            {/* Movie Grid for Section */}
            <div className="px-2">
              <MovieGrid 
                movies={section.movies}
                emptyMessage={section.emptyMessage}
              />
            </div>

            {/* Section Divider */}
            {section.id !== 'watch-later' && (
              <div className="absolute -bottom-6 left-1/4 right-1/4 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
            )}
          </div>
        ))}
      </div>

      {/* Stats Summary */}
      <div className="mt-12 bg-card-background rounded-2xl p-8">
        <h3 className="text-xl font-bold text-text mb-6">Library Stats</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="text-center">
            <div className="text-4xl font-bold text-primary mb-2">{watchedMovies.length}</div>
            <div className="text-text-secondary">Watched</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-pink-500 mb-2">{favorites.length}</div>
            <div className="text-text-secondary">Favorites</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-amber-500 mb-2">{classics.length}</div>
            <div className="text-text-secondary">Classics</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-cyan-500 mb-2">{watchLater.length}</div>
            <div className="text-text-secondary">Watch Later</div>
          </div>
        </div>
        <div className="mt-6 pt-6 border-t border-primary/20 text-center">
          <p className="text-text-secondary">
            Total movies in library: {new Set([...watchedMovies, ...favorites, ...classics, ...watchLater]).size}
          </p>
        </div>
      </div>
    </div>
  )
}
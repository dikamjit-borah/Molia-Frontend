'use client'

import { useParams } from 'next/navigation'
import { useState, useEffect } from 'react'
import { mockMovies } from '@/data/mockMovies'
import AddToListModal from '@/components/AddToListModal'
import Link from 'next/link'

export default function MovieDetailsPage() {
  const params = useParams()
  const movieId = params?.id ? parseInt(params.id as string) : null
  
  const [movie, setMovie] = useState<typeof mockMovies[0] | null>(null)
  const [isAddToListModalOpen, setIsAddToListModalOpen] = useState(false)
  const [isWatched, setIsWatched] = useState(false)

  useEffect(() => {
    if (movieId) {
      const foundMovie = mockMovies.find(m => m.id === movieId)
      setMovie(foundMovie || null)
      
      // Check watched status from localStorage
      const watchedMovies = JSON.parse(localStorage.getItem('moviesWatched') || '[]')
      setIsWatched(watchedMovies.includes(movieId))
    }
  }, [movieId])

  const handleToggleWatched = () => {
    if (!movieId) return
    
    const watchedMovies = JSON.parse(localStorage.getItem('moviesWatched') || '[]')
    let newWatchedMovies
    
    if (isWatched) {
      newWatchedMovies = watchedMovies.filter((id: number) => id !== movieId)
    } else {
      newWatchedMovies = [...watchedMovies, movieId]
    }
    
    localStorage.setItem('moviesWatched', JSON.stringify(newWatchedMovies))
    setIsWatched(!isWatched)
  }

  if (!movie) {
    return (
      <div className="max-w-7xl mx-auto py-12 text-center">
        <h1 className="text-4xl font-bold text-primary mb-6">Movie Not Found</h1>
        <p className="text-text-secondary text-lg mb-8">
          The movie you're looking for doesn't exist in our database.
        </p>
        <Link 
          href="/"
          className="inline-block px-6 py-3 bg-primary text-white rounded-2xl hover:bg-primary/80 transition-colors"
        >
          Back to Home
        </Link>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto">
      {/* Back Button */}
      <div className="mb-6">
        <Link 
          href="/"
          className="inline-flex items-center text-text-secondary hover:text-text transition-colors"
        >
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to Home
        </Link>
      </div>

      {/* Hero Section with Backdrop */}
      <div className="relative rounded-2xl overflow-hidden mb-8">
        <div 
          className="h-96 bg-cover bg-center"
          style={{ backgroundImage: `url(${movie.backdrop})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent" />
        </div>
        
        <div className="absolute bottom-0 left-0 right-0 p-8">
          <div className="flex items-end">
            {/* Poster */}
            <div className="w-48 h-72 rounded-2xl overflow-hidden shadow-2xl mr-8">
              <img 
                src={movie.poster} 
                alt={movie.title}
                className="w-full h-full object-cover"
              />
            </div>
            
            {/* Movie Info */}
            <div className="flex-1">
              <h1 className="text-5xl font-bold text-white mb-2">{movie.title}</h1>
              <div className="flex items-center space-x-4 mb-4">
                <span className="text-xl text-white/90">{movie.year}</span>
                <div className="flex items-center">
                  <svg className="w-6 h-6 text-yellow-400 mr-1" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  <span className="text-xl text-white">{movie.rating.toFixed(1)}/10</span>
                </div>
              </div>
              
              {/* Action Buttons */}
              <div className="flex space-x-4">
                <button
                  onClick={handleToggleWatched}
                  className={`px-6 py-3 rounded-2xl font-semibold transition-colors ${
                    isWatched 
                      ? 'bg-green-500 hover:bg-green-600 text-white' 
                      : 'bg-primary hover:bg-primary/80 text-white'
                  }`}
                >
                  {isWatched ? '✓ Watched' : 'Mark as Watched'}
                </button>
                
                <button
                  onClick={() => setIsAddToListModalOpen(true)}
                  className="px-6 py-3 bg-secondary text-background rounded-2xl font-semibold hover:bg-secondary/80 transition-colors"
                >
                  Add to List
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Overview Section */}
      <div className="bg-card-background rounded-2xl p-8 mb-8">
        <h2 className="text-2xl font-bold text-text mb-4">Overview</h2>
        <p className="text-text-secondary text-lg leading-relaxed">
          {movie.overview}
        </p>
      </div>

      {/* Additional Info */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-card-background rounded-2xl p-6">
          <h3 className="text-lg font-semibold text-text-secondary mb-2">Movie ID</h3>
          <p className="text-2xl font-bold text-primary">#{movie.id}</p>
        </div>
        
        <div className="bg-card-background rounded-2xl p-6">
          <h3 className="text-lg font-semibold text-text-secondary mb-2">Release Year</h3>
          <p className="text-2xl font-bold text-secondary">{movie.year}</p>
        </div>
        
        <div className="bg-card-background rounded-2xl p-6">
          <h3 className="text-lg font-semibold text-text-secondary mb-2">Rating</h3>
          <div className="flex items-center">
            <span className="text-2xl font-bold text-accent mr-2">{movie.rating.toFixed(1)}</span>
            <span className="text-text-secondary">/10</span>
          </div>
        </div>
      </div>

      {/* Add to List Modal */}
      {movie && (
        <AddToListModal
          movie={movie}
          isOpen={isAddToListModalOpen}
          onClose={() => setIsAddToListModalOpen(false)}
        />
      )}
    </div>
  )
}
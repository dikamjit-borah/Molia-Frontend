import { Movie } from '@/types';
import Link from 'next/link';
import { useState } from 'react';

interface MovieCardProps {
  movie: Movie;
  showWatchedBadge?: boolean;
  compact?: boolean;
}

export default function MovieCard({ movie, showWatchedBadge = false, compact = false }: MovieCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  
  // In a real implementation, this would come from the movie store
  const [isWatched, setIsWatched] = useState(false);
  
  const handleWatchedToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsWatched(!isWatched);
    // In real implementation: useMovieStore.getState().toggleWatched(movie.id);
  };
  
  const handleAddToList = (e: React.MouseEvent) => {
    e.stopPropagation();
    // In real implementation: open AddToListModal
    console.log('Add to list clicked for movie:', movie.id);
  };
  
  const cardContent = (
    <div 
      className={`
        relative overflow-hidden rounded-2xl transition-all duration-300
        ${isHovered ? 'transform scale-[1.02] shadow-2xl shadow-primary/20' : 'shadow-lg'}
        ${compact ? 'h-48' : 'h-64'}
        bg-card-background
      `}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Poster background */}
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${movie.poster})` }}
      >
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
      </div>
      
      {/* Content overlay */}
      <div className="relative z-10 h-full flex flex-col justify-end p-4">
        {/* Title and year */}
        <div className="mb-2">
          <h3 className="text-white font-bold text-lg line-clamp-1">{movie.title}</h3>
          <p className="text-text-secondary text-sm">{movie.year}</p>
        </div>
        
        {/* Rating */}
        <div className="flex items-center mb-3">
          <span className="text-accent font-semibold">{movie.rating.toFixed(1)}</span>
          <span className="text-text-secondary text-sm ml-1">/10</span>
        </div>
        
        {/* Action buttons */}
        <div className="flex gap-2">
          <button
            onClick={handleWatchedToggle}
            className={`
              flex-1 py-2 px-3 rounded-lg text-sm font-medium transition-colors
              ${isWatched 
                ? 'bg-secondary text-black' 
                : 'bg-primary/20 text-primary hover:bg-primary/30'
              }
            `}
          >
            {isWatched ? '✓ Watched' : 'Mark Watched'}
          </button>
          
          <button
            onClick={handleAddToList}
            className="flex-1 py-2 px-3 rounded-lg text-sm font-medium bg-accent/20 text-accent hover:bg-accent/30 transition-colors"
          >
            Add to List
          </button>
        </div>
      </div>
      
      {/* Watched badge */}
      {showWatchedBadge && isWatched && (
        <div className="absolute top-3 right-3 z-20">
          <div className="bg-secondary text-black text-xs font-bold py-1 px-2 rounded-full">
            ✓ Watched
          </div>
        </div>
      )}
      
      {/* Hover glow effect */}
      {isHovered && (
        <div className="absolute inset-0 rounded-2xl border-2 border-primary/30 pointer-events-none" />
      )}
    </div>
  );
  
  // Wrap in Link for navigation to movie details page
  return (
    <Link href={`/movie/${movie.id}`} className="block">
      {cardContent}
    </Link>
  );
}
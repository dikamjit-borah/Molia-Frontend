import { Movie } from '@/types';
import MovieCard from './MovieCard';

interface MovieGridProps {
  movies: Movie[];
  emptyMessage?: string;
}

export default function MovieGrid({ movies, emptyMessage = 'No movies found' }: MovieGridProps) {
  if (movies.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <div className="text-text-secondary text-lg mb-2">{emptyMessage}</div>
        <div className="text-text-secondary/60 text-sm">
          Try adjusting your search or filters
        </div>
      </div>
    );
  }
  
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
      {movies.map((movie) => (
        <MovieCard 
          key={movie.id} 
          movie={movie}
          showWatchedBadge={false}
          compact={false}
        />
      ))}
    </div>
  );
}
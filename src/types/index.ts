// Movie entity
export interface Movie {
  id: number;
  title: string;
  year: number;
  poster: string;
  backdrop: string;
  overview: string;
  rating: number;
}

// Custom list structure
export interface CustomList {
  id: string;
  name: string;
  movieIds: number[];
  createdAt: number;
}

// Theme palette structure
export interface ThemePalette {
  name: string;
  colors: {
    background: string;
    backgroundSecondary: string;
    cardBackground: string;
    primary: string;
    secondary: string;
    accent: string;
    text: string;
    textSecondary: string;
  };
}

// Movie store state
export interface MovieStoreState {
  // Data
  movies: Movie[];
  watchedMovies: number[];
  favorites: number[];
  classics: number[];
  watchLater: number[];
  customLists: CustomList[];
  
  // Actions
  toggleWatched: (movieId: number) => void;
  addToFavorites: (movieId: number) => void;
  removeFromFavorites: (movieId: number) => void;
  addToClassics: (movieId: number) => void;
  removeFromClassics: (movieId: number) => void;
  addToWatchLater: (movieId: number) => void;
  removeFromWatchLater: (movieId: number) => void;
  createCustomList: (name: string) => void;
  renameCustomList: (listId: string, newName: string) => void;
  deleteCustomList: (listId: string) => void;
  addToCustomList: (listId: string, movieId: number) => void;
  removeFromCustomList: (listId: string, movieId: number) => void;
  getMovieById: (id: number) => Movie | undefined;
  isMovieWatched: (movieId: number) => boolean;
  isMovieInList: (listId: string, movieId: number) => boolean;
}

// Theme store state
export interface ThemeStoreState {
  currentTheme: string;
  setTheme: (themeName: string) => void;
}
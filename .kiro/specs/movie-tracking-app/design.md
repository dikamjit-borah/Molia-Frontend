# Design Document: Movie Tracking App

## Overview

The Movie Tracking App is a frontend-only Next.js application that provides a funky Netflix-inspired interface for browsing, tracking, and organizing movies. The application uses the Next.js App Router, TypeScript, Tailwind CSS, and Zustand for state management. All user data persists in browser LocalStorage, making the app fully functional without a backend.

The design emphasizes a colorful, cyberpunk-pop aesthetic with flexible theming through CSS variables, allowing users to switch between predefined color palettes. The architecture follows a component-based approach with clear separation between UI components, state management, and data persistence layers.

## Architecture

### High-Level Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                        Next.js App                          │
├─────────────────────────────────────────────────────────────┤
│  Pages (App Router)                                         │
│  ├── / (Home)                                               │
│  ├── /movie/[id] (Movie Details)                            │
│  ├── /library (Library)                                     │
│  └── /lists (Lists Management)                              │
├─────────────────────────────────────────────────────────────┤
│  Components Layer                                           │
│  ├── MovieCard, MovieGrid                                   │
│  ├── SidebarNav, ThemeToggle                                │
│  └── AddToListModal, ListCard                               │
├─────────────────────────────────────────────────────────────┤
│  State Management (Zustand)                                 │
│  ├── Movie Store                                            │
│  ├── Theme Store                                            │
│  └── LocalStorage Middleware                                │
├─────────────────────────────────────────────────────────────┤
│  Data Layer                                                 │
│  ├── Mock Movie Data                                        │
│  └── LocalStorage Persistence                               │
└─────────────────────────────────────────────────────────────┘
```

### Technology Stack

- **Framework**: Next.js 14+ (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS with CSS Variables
- **State Management**: Zustand with persist middleware
- **Data Storage**: Browser LocalStorage
- **Routing**: Next.js App Router file-based routing

### Directory Structure

```
src/
├── app/
│   ├── layout.tsx                 # Root layout with theme provider
│   ├── page.tsx                   # Home page
│   ├── movie/
│   │   └── [id]/
│   │       └── page.tsx           # Movie details page
│   ├── library/
│   │   └── page.tsx               # Library page
│   └── lists/
│       └── page.tsx               # Lists management page
├── components/
│   ├── MovieCard.tsx              # Individual movie card
│   ├── MovieGrid.tsx              # Grid layout for movies
│   ├── SidebarNav.tsx             # Navigation sidebar
│   ├── ThemeToggle.tsx            # Theme switcher
│   ├── AddToListModal.tsx         # Modal for adding to lists
│   └── ListCard.tsx               # Custom list card
├── store/
│   ├── movieStore.ts              # Zustand store for movies/lists
│   └── themeStore.ts              # Zustand store for theme
├── theme/
│   ├── theme.ts                   # Theme palette definitions
│   └── globals.css                # Global styles with CSS variables
├── data/
│   └── mockMovies.ts              # Mock movie data
└── types/
    └── index.ts                   # TypeScript type definitions
```

## Components and Interfaces

### Core Types

```typescript
// Movie entity
interface Movie {
  id: number;
  title: string;
  year: number;
  poster: string;
  backdrop: string;
  overview: string;
  rating: number;
}

// Custom list structure
interface CustomList {
  id: string;
  name: string;
  movieIds: number[];
  createdAt: number;
}

// Theme palette structure
interface ThemePalette {
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
interface MovieStoreState {
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
interface ThemeStoreState {
  currentTheme: string;
  setTheme: (themeName: string) => void;
}
```

### Component Specifications

#### MovieCard Component

**Purpose**: Display a single movie with poster, title, year, and action buttons.

**Props**:
```typescript
interface MovieCardProps {
  movie: Movie;
  showWatchedBadge?: boolean;
  compact?: boolean;
}
```

**Behavior**:
- Displays movie poster as background image
- Shows title and year overlay
- Provides quick action buttons (watched toggle, add to list)
- Applies hover effect with soft glow
- Indicates watched status with visual badge
- Links to movie details page on click

#### MovieGrid Component

**Purpose**: Render a responsive grid of MovieCard components.

**Props**:
```typescript
interface MovieGridProps {
  movies: Movie[];
  emptyMessage?: string;
}
```

**Behavior**:
- Responsive grid: 1 column (mobile), 2-3 columns (tablet), 4-5 columns (desktop)
- Handles empty state with custom message
- Applies consistent spacing and alignment

#### AddToListModal Component

**Purpose**: Modal dialog for selecting lists to add a movie to.

**Props**:
```typescript
interface AddToListModalProps {
  movie: Movie;
  isOpen: boolean;
  onClose: () => void;
}
```

**Behavior**:
- Displays all predefined lists (Favorites, Classics, Watch Later)
- Displays all custom lists
- Shows checkmarks for lists that already contain the movie
- Allows toggling movie membership in each list
- Provides "Create New List" option
- Closes on outside click or ESC key

#### SidebarNav Component

**Purpose**: Navigation sidebar with links to main pages.

**Props**: None (uses Next.js router for active state)

**Behavior**:
- Displays navigation links: Home, Library, Lists
- Highlights active page
- Includes ThemeToggle component
- Responsive: full sidebar on desktop, collapsed/hamburger on mobile

#### ThemeToggle Component

**Purpose**: UI control for switching between theme palettes.

**Props**: None (connects to theme store)

**Behavior**:
- Displays current theme name
- Provides dropdown or toggle for theme selection
- Applies theme change immediately
- Persists selection to LocalStorage

#### ListCard Component

**Purpose**: Display a custom list with movie count and management actions.

**Props**:
```typescript
interface ListCardProps {
  list: CustomList;
  onRename: (listId: string, newName: string) => void;
  onDelete: (listId: string) => void;
  onClick: (listId: string) => void;
}
```

**Behavior**:
- Shows list name and movie count
- Provides rename and delete actions
- Navigates to list detail view on click
- Confirms before deletion

## Data Models

### Mock Movie Data

The application uses a static array of mock movies for the MVP. Each movie contains:

```typescript
const mockMovies: Movie[] = [
  {
    id: 1,
    title: "The Matrix",
    year: 1999,
    poster: "/path/to/poster.jpg",
    backdrop: "/path/to/backdrop.jpg",
    overview: "A computer hacker learns...",
    rating: 8.7
  },
  // ... more movies
];
```

**Data Source**: Hardcoded in `src/data/mockMovies.ts` with 20-30 diverse movies covering various genres and years.

### LocalStorage Schema

**Key: `movie-tracker-storage`**

```json
{
  "state": {
    "watchedMovies": [1, 5, 12],
    "favorites": [1, 3],
    "classics": [2, 7],
    "watchLater": [15, 20],
    "customLists": [
      {
        "id": "uuid-1",
        "name": "Marvel Marathon",
        "movieIds": [4, 8, 11],
        "createdAt": 1704067200000
      }
    ]
  },
  "version": 0
}
```

**Key: `theme-storage`**

```json
{
  "state": {
    "currentTheme": "FunkyFlix"
  },
  "version": 0
}
```

### Theme Configuration

**File: `src/theme/theme.ts`**

```typescript
export const themes: Record<string, ThemePalette> = {
  FunkyFlix: {
    name: "FunkyFlix",
    colors: {
      background: "#1a0b2e",           // Deep purple
      backgroundSecondary: "#16213e",  // Midnight blue
      cardBackground: "#2d1b4e",       // Purple card
      primary: "#ff006e",              // Neon pink
      secondary: "#00f5ff",            // Electric cyan
      accent: "#fb5607",               // Warm orange
      text: "#f8f9fa",                 // Off-white
      textSecondary: "#adb5bd"         // Gray
    }
  },
  SunsetPop: {
    name: "SunsetPop",
    colors: {
      background: "#2d1b4e",           // Deep purple
      backgroundSecondary: "#3d2963",  // Medium purple
      cardBackground: "#4a3575",       // Light purple
      primary: "#ff9e00",              // Sunset orange
      secondary: "#ff006e",            // Hot pink
      accent: "#8338ec",               // Purple accent
      text: "#ffffff",                 // Pure white
      textSecondary: "#d4a5ff"         // Light purple
    }
  }
};
```

**CSS Variables in `globals.css`**:

```css
:root {
  --color-background: #1a0b2e;
  --color-background-secondary: #16213e;
  --color-card-background: #2d1b4e;
  --color-primary: #ff006e;
  --color-secondary: #00f5ff;
  --color-accent: #fb5607;
  --color-text: #f8f9fa;
  --color-text-secondary: #adb5bd;
}
```

**Tailwind Configuration**:

```javascript
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      colors: {
        background: 'var(--color-background)',
        'background-secondary': 'var(--color-background-secondary)',
        'card-background': 'var(--color-card-background)',
        primary: 'var(--color-primary)',
        secondary: 'var(--color-secondary)',
        accent: 'var(--color-accent)',
        text: 'var(--color-text)',
        'text-secondary': 'var(--color-text-secondary)',
      }
    }
  }
}
```

## Correctness Properties

*A property is a characteristic or behavior that should hold true across all valid executions of a system—essentially, a formal statement about what the system should do. Properties serve as the bridge between human-readable specifications and machine-verifiable correctness guarantees.*


### Property 1: Movie Card Rendering Completeness

*For any* movie, when rendered as a MovieCard or on a details page, the output should contain the movie's poster, title, year, and rating.

**Validates: Requirements 1.2, 7.1**

### Property 2: Search Filter Correctness

*For any* list of movies and any search query string, all movies returned by the search filter should have titles that contain the search query (case-insensitive), and all movies whose titles contain the search query should be returned.

**Validates: Requirements 2.1, 2.3**

### Property 3: Watched Status Toggle

*For any* movie, toggling the watched status twice should return the movie to its original watched state.

**Validates: Requirements 3.1**

### Property 4: List Operations Persistence Round-Trip

*For any* list (predefined or custom) and any movie, after adding the movie to the list, serializing to LocalStorage, then deserializing from LocalStorage, the movie should still be present in that list.

**Validates: Requirements 4.1, 4.4, 6.1, 12.1, 12.2**

### Property 5: List Operations Removal Round-Trip

*For any* list (predefined or custom) and any movie that exists in that list, after removing the movie from the list, serializing to LocalStorage, then deserializing from LocalStorage, the movie should no longer be present in that list.

**Validates: Requirements 4.2, 6.2, 12.1, 12.2**

### Property 6: No Duplicate Movies in Lists

*For any* list (predefined or custom) and any movie, adding the same movie to the list multiple times should result in the movie appearing exactly once in that list.

**Validates: Requirements 4.3, 6.3**

### Property 7: Custom List Lifecycle Persistence

*For any* valid custom list name, after creating a custom list, serializing to LocalStorage, then deserializing from LocalStorage, a list with that name should exist.

**Validates: Requirements 5.1, 5.5, 12.1, 12.2**

### Property 8: Custom List Rename Preserves Contents

*For any* custom list with movies, renaming the list should preserve the list ID and all movie IDs while updating only the name.

**Validates: Requirements 5.2**

### Property 9: Custom List Deletion Completeness

*For any* custom list, after deleting the list, serializing to LocalStorage, then deserializing from LocalStorage, the list should not exist in the application state.

**Validates: Requirements 5.3, 12.1, 12.2**

### Property 10: Whitespace-Only List Names Rejected

*For any* string composed entirely of whitespace characters (spaces, tabs, newlines), attempting to create a custom list with that name should be rejected, and no new list should be created.

**Validates: Requirements 5.6**

### Property 11: Add To List Modal Completeness

*For any* application state with predefined lists and custom lists, the Add To List Modal should display all predefined lists (Favorites, Classics, Watch Later) and all custom lists.

**Validates: Requirements 6.4**

### Property 12: List Independence

*For any* two different lists and any movie, adding the movie to one list should not affect the movie's membership in the other list.

**Validates: Requirements 6.5**

### Property 13: Library Section Accuracy

*For any* library section (Watched, Favorites, Classics, Watch Later), the movies displayed in that section should exactly match the movies that belong to that category in the application state.

**Validates: Requirements 8.2**

### Property 14: Custom List Movie Count Accuracy

*For any* custom list, the displayed movie count should equal the actual number of movie IDs in that list.

**Validates: Requirements 9.1**

### Property 15: Custom List Display Accuracy

*For any* custom list, when displaying the list's contents, the movies shown should exactly match the movie IDs stored in that list.

**Validates: Requirements 9.5**

### Property 16: Theme Persistence Round-Trip

*For any* valid theme name, after setting the theme, serializing to LocalStorage, then deserializing from LocalStorage, the active theme should be the selected theme.

**Validates: Requirements 10.4, 10.5, 12.1, 12.2**

### Property 17: Theme Switch Completeness

*For any* theme palette, when switching to that theme, all CSS variables defined in the theme should be applied to the :root element.

**Validates: Requirements 10.3**

### Property 18: Corrupted LocalStorage Graceful Handling

*For any* invalid or corrupted JSON string, attempting to deserialize it from LocalStorage should result in the application initializing with empty default state without crashing.

**Validates: Requirements 12.3**

## Error Handling

### LocalStorage Errors

**Quota Exceeded**: If LocalStorage quota is exceeded, the application should:
- Display a user-friendly error message
- Continue functioning with in-memory state only
- Warn user that data will not persist

**Corrupted Data**: If LocalStorage contains invalid JSON or unexpected data structure:
- Log error to console
- Initialize with empty default state
- Continue normal operation

**Browser Restrictions**: If LocalStorage is disabled or unavailable:
- Detect unavailability on initialization
- Display warning to user
- Function normally with in-memory state only

### State Management Errors

**Invalid Movie ID**: If a movie ID in a list doesn't correspond to an existing movie:
- Filter out invalid IDs when rendering
- Log warning to console
- Continue displaying valid movies

**Duplicate List Names**: If user attempts to create a custom list with a name that already exists:
- Append a number to make the name unique (e.g., "My List (2)")
- Create the list with the modified name
- Notify user of the name change

### Theme Errors

**Invalid Theme Name**: If LocalStorage contains an invalid theme name:
- Fall back to default theme (FunkyFlix)
- Log warning to console
- Continue with default theme

**Missing CSS Variables**: If a theme palette is missing required color definitions:
- Use fallback colors from default theme
- Log error to console
- Continue rendering with available colors

## Testing Strategy

### Dual Testing Approach

The application will use both unit tests and property-based tests to ensure comprehensive coverage:

**Unit Tests**: Focus on specific examples, edge cases, and integration points
- Specific movie data examples
- Empty state handling
- Error conditions (corrupted data, missing movies)
- Component integration
- Routing behavior

**Property-Based Tests**: Verify universal properties across all inputs
- List operations with randomly generated movies and lists
- Search filtering with random queries
- Persistence round-trips with random state
- Theme switching with random theme selections
- Input validation with random strings

### Property-Based Testing Configuration

**Library**: Use `fast-check` for TypeScript property-based testing

**Configuration**:
- Minimum 100 iterations per property test
- Each test tagged with: `Feature: movie-tracking-app, Property {number}: {property_text}`
- Custom generators for Movie, CustomList, and theme data
- Shrinking enabled for minimal failing examples

**Example Test Structure**:
```typescript
// Feature: movie-tracking-app, Property 4: List Operations Persistence Round-Trip
it('should persist list additions through LocalStorage round-trip', () => {
  fc.assert(
    fc.property(
      fc.array(movieGenerator()),
      fc.integer({ min: 0, max: 100 }),
      listNameGenerator(),
      (movies, movieIndex, listName) => {
        // Test implementation
      }
    ),
    { numRuns: 100 }
  );
});
```

### Test Coverage Goals

- **Unit Test Coverage**: 80%+ line coverage for business logic
- **Property Test Coverage**: All 18 correctness properties implemented
- **Integration Tests**: Key user flows (add to list, create custom list, search)
- **Component Tests**: All reusable components with React Testing Library

### Testing Priorities

1. **Critical Path**: List operations, persistence, search (Properties 4-6, 2)
2. **Data Integrity**: No duplicates, list independence (Properties 6, 12)
3. **Persistence**: All round-trip properties (Properties 4, 5, 7, 9, 16)
4. **Input Validation**: Whitespace rejection, corrupted data (Properties 10, 18)
5. **UI Correctness**: Rendering completeness, display accuracy (Properties 1, 13-15)

### Mock Data for Testing

**Movie Generator**:
```typescript
const movieGenerator = (): fc.Arbitrary<Movie> =>
  fc.record({
    id: fc.integer({ min: 1, max: 10000 }),
    title: fc.string({ minLength: 1, maxLength: 100 }),
    year: fc.integer({ min: 1900, max: 2024 }),
    poster: fc.webUrl(),
    backdrop: fc.webUrl(),
    overview: fc.lorem({ maxCount: 3 }),
    rating: fc.double({ min: 0, max: 10 })
  });
```

**Custom List Generator**:
```typescript
const customListGenerator = (): fc.Arbitrary<CustomList> =>
  fc.record({
    id: fc.uuid(),
    name: fc.string({ minLength: 1, maxLength: 50 }),
    movieIds: fc.array(fc.integer({ min: 1, max: 10000 })),
    createdAt: fc.integer({ min: 1600000000000, max: 1800000000000 })
  });
```

## Implementation Notes

### State Management with Zustand

Use Zustand with persist middleware for automatic LocalStorage synchronization:

```typescript
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useMovieStore = create<MovieStoreState>()(
  persist(
    (set, get) => ({
      // Initial state
      movies: mockMovies,
      watchedMovies: [],
      favorites: [],
      classics: [],
      watchLater: [],
      customLists: [],
      
      // Actions
      toggleWatched: (movieId) =>
        set((state) => ({
          watchedMovies: state.watchedMovies.includes(movieId)
            ? state.watchedMovies.filter((id) => id !== movieId)
            : [...state.watchedMovies, movieId]
        })),
      
      // ... other actions
    }),
    {
      name: 'movie-tracker-storage',
      version: 0
    }
  )
);
```

### Theme Implementation

Use a custom hook to apply theme changes:

```typescript
export const useTheme = () => {
  const { currentTheme, setTheme } = useThemeStore();
  
  useEffect(() => {
    const theme = themes[currentTheme];
    if (theme) {
      Object.entries(theme.colors).forEach(([key, value]) => {
        document.documentElement.style.setProperty(
          `--color-${key}`,
          value
        );
      });
    }
  }, [currentTheme]);
  
  return { currentTheme, setTheme, availableThemes: Object.keys(themes) };
};
```

### Performance Considerations

**Memoization**: Use React.memo for MovieCard components to prevent unnecessary re-renders

**Virtual Scrolling**: If movie list grows beyond 100 items, consider implementing virtual scrolling with `react-window`

**Debounced Search**: Debounce search input by 300ms to reduce filter operations

**LocalStorage Throttling**: Throttle LocalStorage writes to max once per 100ms to prevent excessive I/O

### Accessibility

- All interactive elements have proper ARIA labels
- Keyboard navigation support for all features
- Focus management in modals
- Color contrast ratios meet WCAG AA standards
- Screen reader announcements for state changes

### Future Enhancements

- Export/import lists as JSON
- Share lists via URL
- Movie ratings and reviews
- Integration with real movie API (TMDB)
- Watched date tracking
- Statistics dashboard
- Animated transitions with Framer Motion
- Drag-and-drop list reordering

# Implementation Plan: Movie Tracking App

## Overview

This implementation plan breaks down the Movie Tracking App into incremental coding tasks. The app will be built using Next.js 14+ with App Router, TypeScript, Tailwind CSS, and Zustand for state management. The implementation follows a bottom-up approach: starting with data models and state management, then building reusable components, and finally assembling pages and features.

## Tasks

- [x] 1. Project setup and configuration
  - Initialize Next.js project with TypeScript and App Router
  - Configure Tailwind CSS with custom color variables
  - Set up project directory structure (app/, components/, store/, theme/, data/, types/)
  - Install dependencies: zustand, fast-check (dev), @testing-library/react (dev)
  - Configure TypeScript with strict mode
  - _Requirements: 15.1_

- [ ] 2. Define core types and mock data
  - [ ] 2.1 Create TypeScript type definitions in src/types/index.ts
    - Define Movie, CustomList, ThemePalette, MovieStoreState, ThemeStoreState interfaces
    - Export all types for use across the application
    - _Requirements: 1.1, 5.1, 10.2_
  
  - [ ] 2.2 Create mock movie data in src/data/mockMovies.ts
    - Define array of 20-30 diverse movies with all required fields (id, title, year, poster, backdrop, overview, rating)
    - Include variety of genres and years (1970s-2024)
    - Use placeholder image URLs or public domain images
    - _Requirements: 1.1_

- [-] 3. Implement theme system
  - [x] 3.1 Create theme configuration in src/theme/theme.ts
    - Define FunkyFlix theme palette (deep purple, neon pink, electric cyan)
    - Define SunsetPop theme palette (sunset orange, hot pink, purple)
    - Export themes object with both palettes
    - _Requirements: 10.2, 10.7, 11.2, 11.3, 11.4_
  
  - [x] 3.2 Create global CSS with variables in src/theme/globals.css
    - Define :root CSS variables for all theme colors
    - Set default values to FunkyFlix palette
    - Add base styles with no black backgrounds
    - Include rounded-2xl utility classes
    - _Requirements: 10.1, 11.1, 11.6_
  
  - [ ] 3.3 Configure Tailwind to use CSS variables in tailwind.config.js
    - Extend theme colors to reference CSS variables
    - Configure responsive breakpoints
    - Add custom utilities for gradients and glows
    - _Requirements: 10.6, 11.5_
  
  - [ ] 3.4 Create theme store with Zustand in src/store/themeStore.ts
    - Implement ThemeStoreState with currentTheme and setTheme
    - Add persist middleware for LocalStorage
    - Use storage key "theme-storage"
    - _Requirements: 10.4, 10.5, 12.7, 15.1_
  
  - [ ]* 3.5 Write property test for theme persistence round-trip
    - **Property 16: Theme Persistence Round-Trip**
    - **Validates: Requirements 10.4, 10.5, 12.1, 12.2**
  
  - [ ]* 3.6 Write property test for theme switch completeness
    - **Property 17: Theme Switch Completeness**
    - **Validates: Requirements 10.3**
  
  - [ ]* 3.7 Write unit test for invalid theme fallback
    - Test that invalid theme name falls back to FunkyFlix
    - **Validates: Requirements 10.5**

- [ ] 4. Implement movie store with Zustand
  - [ ] 4.1 Create movie store in src/store/movieStore.ts
    - Initialize state with mockMovies, empty arrays for watched/favorites/classics/watchLater/customLists
    - Implement toggleWatched action
    - Implement addToFavorites, removeFromFavorites actions
    - Implement addToClassics, removeFromClassics actions
    - Implement addToWatchLater, removeFromWatchLater actions
    - Add persist middleware with storage key "movie-tracker-storage"
    - _Requirements: 3.1, 4.1, 4.2, 12.4, 12.5, 15.1, 15.2_
  
  - [ ] 4.2 Add custom list management actions to movie store
    - Implement createCustomList action (generate UUID, validate name)
    - Implement renameCustomList action
    - Implement deleteCustomList action
    - Implement addToCustomList action
    - Implement removeFromCustomList action
    - Add duplicate prevention logic for all list operations
    - _Requirements: 5.1, 5.2, 5.3, 6.1, 6.2, 4.3, 6.3, 12.6_
  
  - [ ] 4.3 Add helper methods to movie store
    - Implement getMovieById selector
    - Implement isMovieWatched selector
    - Implement isMovieInList selector
    - _Requirements: 3.1, 4.1, 6.4_
  
  - [ ]* 4.4 Write property test for watched status toggle
    - **Property 3: Watched Status Toggle**
    - **Validates: Requirements 3.1**
  
  - [ ]* 4.5 Write property test for list operations persistence round-trip
    - **Property 4: List Operations Persistence Round-Trip**
    - **Validates: Requirements 4.1, 4.4, 6.1, 12.1, 12.2**
  
  - [ ]* 4.6 Write property test for list operations removal round-trip
    - **Property 5: List Operations Removal Round-Trip**
    - **Validates: Requirements 4.2, 6.2, 12.1, 12.2**
  
  - [ ]* 4.7 Write property test for no duplicate movies in lists
    - **Property 6: No Duplicate Movies in Lists**
    - **Validates: Requirements 4.3, 6.3**
  
  - [ ]* 4.8 Write property test for custom list lifecycle persistence
    - **Property 7: Custom List Lifecycle Persistence**
    - **Validates: Requirements 5.1, 5.5, 12.1, 12.2**
  
  - [ ]* 4.9 Write property test for custom list rename preserves contents
    - **Property 8: Custom List Rename Preserves Contents**
    - **Validates: Requirements 5.2**
  
  - [ ]* 4.10 Write property test for custom list deletion completeness
    - **Property 9: Custom List Deletion Completeness**
    - **Validates: Requirements 5.3, 12.1, 12.2**
  
  - [ ]* 4.11 Write property test for whitespace-only list names rejected
    - **Property 10: Whitespace-Only List Names Rejected**
    - **Validates: Requirements 5.6**
  
  - [ ]* 4.12 Write property test for list independence
    - **Property 12: List Independence**
    - **Validates: Requirements 6.5**
  
  - [ ]* 4.13 Write property test for corrupted LocalStorage graceful handling
    - **Property 18: Corrupted LocalStorage Graceful Handling**
    - **Validates: Requirements 12.3**
  
  - [ ]* 4.14 Write unit tests for edge cases
    - Test empty state initialization
    - Test invalid movie ID handling
    - Test duplicate list name handling
    - _Requirements: 12.3_

- [ ] 5. Checkpoint - Ensure all tests pass
  - Ensure all tests pass, ask the user if questions arise.

- [x] 6. Build reusable UI components
  - [x] 6.1 Create MovieCard component in src/components/MovieCard.tsx
    - Accept movie, showWatchedBadge, compact props
    - Display poster as background image with title/year overlay
    - Add watched toggle button and add-to-list button
    - Implement hover effect with soft glow (Tailwind classes)
    - Link to movie details page on card click
    - Show watched badge when showWatchedBadge is true
    - _Requirements: 1.2, 1.4, 3.1, 3.4_
  
  - [ ]* 6.2 Write property test for movie card rendering completeness
    - **Property 1: Movie Card Rendering Completeness**
    - **Validates: Requirements 1.2, 7.1**
  
  - [x] 6.3 Create MovieGrid component in src/components/MovieGrid.tsx
    - Accept movies array and emptyMessage props
    - Render responsive grid (grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5)
    - Map movies to MovieCard components
    - Display emptyMessage when movies array is empty
    - _Requirements: 1.1, 1.3, 8.4_
  
  - [x] 6.4 Create AddToListModal component in src/components/AddToListModal.tsx
    - Accept movie, isOpen, onClose props
    - Display modal overlay with backdrop click to close
    - Show all predefined lists (Favorites, Classics, Watch Later) with checkboxes
    - Show all custom lists with checkboxes
    - Indicate which lists already contain the movie
    - Implement toggle functionality for each list
    - Add "Create New List" input field
    - Handle ESC key to close
    - _Requirements: 4.1, 4.2, 6.1, 6.2, 6.4_
  
  - [ ]* 6.5 Write property test for add to list modal completeness
    - **Property 11: Add To List Modal Completeness**
    - **Validates: Requirements 6.4**
  
  - [ ]* 6.6 Write unit test for modal interactions
    - Test ESC key closes modal
    - Test backdrop click closes modal
    - Test create new list functionality
    - _Requirements: 6.4_
  
  - [x] 6.7 Create ListCard component in src/components/ListCard.tsx
    - Accept list, onRename, onDelete, onClick props
    - Display list name and movie count
    - Add rename button with inline edit functionality
    - Add delete button with confirmation
    - Make card clickable to view list contents
    - Apply rounded-2xl styling with gradient accents
    - _Requirements: 9.1, 9.2, 9.3, 9.4_
  
  - [ ]* 6.8 Write property test for custom list movie count accuracy
    - **Property 14: Custom List Movie Count Accuracy**
    - **Validates: Requirements 9.1**

- [ ] 7. Build navigation components
  - [ ] 7.1 Create ThemeToggle component in src/components/ThemeToggle.tsx
    - Display current theme name
    - Provide dropdown or toggle button for theme selection
    - Show all available themes from theme store
    - Call setTheme on selection
    - Apply funky styling with gradient background
    - _Requirements: 10.2, 10.3_
  
  - [ ] 7.2 Create SidebarNav component in src/components/SidebarNav.tsx
    - Display navigation links: Home (/), Library (/library), Lists (/lists)
    - Highlight active page using usePathname hook
    - Include ThemeToggle component
    - Implement responsive behavior (full sidebar on desktop, hamburger on mobile)
    - Apply deep purple/midnight blue background with neon accents
    - _Requirements: 14.1, 14.2, 14.4, 11.2, 11.3_
  
  - [ ]* 7.3 Write unit tests for navigation
    - Test navigation links are present
    - Test active page highlighting
    - Test theme toggle integration
    - _Requirements: 14.1, 14.2_

- [ ] 8. Implement search functionality
  - [ ] 8.1 Create search utility function in src/utils/search.ts
    - Implement case-insensitive title search
    - Return filtered movie array
    - Handle empty search query (return all movies)
    - _Requirements: 2.1, 2.2, 2.3_
  
  - [ ]* 8.2 Write property test for search filter correctness
    - **Property 2: Search Filter Correctness**
    - **Validates: Requirements 2.1, 2.3**
  
  - [ ]* 8.3 Write unit test for empty search edge case
    - Test that empty string returns all movies
    - _Requirements: 2.2_

- [x] 9. Build page components
  - [x] 9.1 Create root layout in src/app/layout.tsx
    - Set up HTML structure with theme provider
    - Include SidebarNav component
    - Import global CSS
    - Configure metadata (title, description)
    - Apply background color from theme
    - _Requirements: 10.1, 11.1, 14.1_
  
  - [x] 9.2 Create home page in src/app/page.tsx
    - Add hero header with app title and tagline
    - Implement search bar with state management
    - Filter movies based on search query
    - Render MovieGrid with filtered movies
    - Apply funky gradient to header
    - _Requirements: 1.1, 2.1, 2.4, 11.5_
  
  - [ ]* 9.3 Write unit test for home page structure
    - Test hero header is present
    - Test search bar is present
    - Test movie grid is rendered
    - _Requirements: 1.1, 2.1_
  
  - [x] 9.4 Create movie details page in src/app/movie/[id]/page.tsx
    - Extract movie ID from params
    - Fetch movie using getMovieById from store
    - Display backdrop image as hero
    - Display poster, title, year, rating, overview
    - Add watched toggle button
    - Add "Add to List" button that opens AddToListModal
    - Handle movie not found case
    - _Requirements: 7.1, 7.2, 7.3, 7.4_
  
  - [ ]* 9.5 Write unit test for movie details page
    - Test all movie fields are displayed
    - Test action buttons are present
    - Test movie not found handling
    - _Requirements: 7.1, 7.2_
  
  - [x] 9.6 Create library page in src/app/library/page.tsx
    - Create sections for Watched Movies, Favorites, Classics, Watch Later
    - Fetch movies for each section from store
    - Render MovieGrid for each section with section headers
    - Display empty state message when section is empty
    - Apply section dividers with gradient accents
    - _Requirements: 8.1, 8.2, 8.3, 8.4_
  
  - [ ]* 9.7 Write property test for library section accuracy
    - **Property 13: Library Section Accuracy**
    - **Validates: Requirements 8.2**
  
  - [ ]* 9.8 Write unit test for library page structure
    - Test all four sections are present
    - Test empty state handling
    - _Requirements: 8.1, 8.4_
  
  - [x] 9.9 Create lists page in src/app/lists/page.tsx
    - Display "Create New List" input and button at top
    - Fetch all custom lists from store
    - Render ListCard for each custom list
    - Implement list creation with validation
    - Handle rename and delete actions
    - Add click handler to navigate to list detail view
    - Display empty state when no custom lists exist
    - _Requirements: 9.1, 9.2, 9.3, 9.4, 9.5, 9.6_
  
  - [ ]* 9.10 Write property test for custom list display accuracy
    - **Property 15: Custom List Display Accuracy**
    - **Validates: Requirements 9.5**
  
  - [ ]* 9.11 Write unit tests for lists page
    - Test create list UI is present
    - Test list cards are rendered
    - Test empty state handling
    - _Requirements: 9.2, 9.6_

- [ ] 10. Checkpoint - Ensure all tests pass
  - Ensure all tests pass, ask the user if questions arise.

- [ ] 11. Implement custom list detail view
  - [ ] 11.1 Create list detail page in src/app/lists/[id]/page.tsx
    - Extract list ID from params
    - Fetch custom list from store
    - Display list name as header
    - Fetch movies in the list using movie IDs
    - Render MovieGrid with list movies
    - Add "Remove from List" button on each MovieCard
    - Handle list not found case
    - _Requirements: 9.5, 6.2_
  
  - [ ]* 11.2 Write unit test for list detail page
    - Test list name is displayed
    - Test movies are rendered
    - Test remove functionality
    - _Requirements: 9.5_

- [ ] 12. Add responsive design refinements
  - [ ] 12.1 Enhance mobile responsiveness
    - Adjust MovieCard sizing for mobile (full width on xs screens)
    - Implement hamburger menu for SidebarNav on mobile
    - Ensure touch targets are minimum 44x44 pixels
    - Test on various viewport sizes
    - _Requirements: 13.1, 13.2, 13.4_
  
  - [ ] 12.2 Optimize tablet layout
    - Adjust grid columns for tablet breakpoint
    - Optimize modal sizing for tablets
    - Test navigation on tablet devices
    - _Requirements: 13.3_

- [ ] 13. Polish UI and add finishing touches
  - [ ] 13.1 Add hover effects and transitions
    - Implement soft glow on MovieCard hover
    - Add smooth transitions for theme changes
    - Add button hover states with color shifts
    - Ensure no black backgrounds anywhere
    - _Requirements: 1.4, 11.1, 11.5_
  
  - [ ] 13.2 Implement error boundaries
    - Create error boundary component for graceful error handling
    - Wrap main app sections with error boundaries
    - Display user-friendly error messages
    - _Requirements: 12.3_
  
  - [ ] 13.3 Add accessibility improvements
    - Add ARIA labels to all interactive elements
    - Implement keyboard navigation for modals
    - Add focus management for modal open/close
    - Test with screen reader
    - Ensure color contrast meets WCAG AA
    - _Requirements: 13.4_
  
  - [ ] 13.4 Add LocalStorage error handling
    - Detect LocalStorage availability on init
    - Handle quota exceeded errors
    - Display warnings when LocalStorage is unavailable
    - Implement fallback to in-memory state
    - _Requirements: 12.3_

- [ ] 14. Final checkpoint - Ensure all tests pass
  - Ensure all tests pass, ask the user if questions arise.

- [ ] 15. Create README and documentation
  - [ ] 15.1 Write comprehensive README.md
    - Document project setup and installation
    - Explain tech stack and architecture
    - Provide usage instructions
    - Document theme system and customization
    - Include screenshots or demo GIF
    - List available scripts (dev, build, test)
    - _Requirements: All_
  
  - [ ] 15.2 Add code comments and JSDoc
    - Document complex functions with JSDoc
    - Add inline comments for non-obvious logic
    - Document component props with TypeScript
    - _Requirements: All_

## Notes

- Tasks marked with `*` are optional property-based and unit tests that can be skipped for faster MVP
- Each task references specific requirements for traceability
- Checkpoints ensure incremental validation at key milestones
- Property tests validate universal correctness properties with 100+ iterations
- Unit tests validate specific examples, edge cases, and integration points
- The implementation follows a bottom-up approach: data layer → components → pages
- All LocalStorage operations are handled automatically by Zustand persist middleware
- Theme switching is reactive through CSS variable updates
- The app is fully functional without a backend, using mock data and LocalStorage

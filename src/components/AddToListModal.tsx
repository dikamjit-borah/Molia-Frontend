import { Movie, CustomList } from '@/types';
import { useEffect, useState, useRef } from 'react';

interface AddToListModalProps {
  movie: Movie;
  isOpen: boolean;
  onClose: () => void;
}

// Mock data for predefined lists (in real app, these would come from store)
const predefinedLists = [
  { id: 'favorites', name: 'Favorites' },
  { id: 'classics', name: 'Classics' },
  { id: 'watch-later', name: 'Watch Later' },
];

export default function AddToListModal({ movie, isOpen, onClose }: AddToListModalProps) {
  const [customLists, setCustomLists] = useState<CustomList[]>([
    { id: '1', name: 'Marvel Marathon', movieIds: [9], createdAt: Date.now() },
    { id: '2', name: 'Sci-Fi Classics', movieIds: [1, 2, 3], createdAt: Date.now() },
  ]);
  
  const [selectedLists, setSelectedLists] = useState<Set<string>>(new Set());
  const [newListName, setNewListName] = useState('');
  const [isCreatingList, setIsCreatingList] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  
  // Initialize selected lists based on movie membership
  useEffect(() => {
    if (!isOpen) return;
    
    const selected = new Set<string>();
    
    // Check predefined lists (mock logic)
    if (movie.id === 9) selected.add('favorites'); // Example: Avengers: Endgame is in favorites
    if (movie.id === 1 || movie.id === 2 || movie.id === 3) selected.add('classics'); // Example: Matrix, Inception, Interstellar are classics
    
    // Check custom lists
    customLists.forEach(list => {
      if (list.movieIds.includes(movie.id)) {
        selected.add(list.id);
      }
    });
    
    setSelectedLists(selected);
    setNewListName('');
    setIsCreatingList(false);
  }, [isOpen, movie.id, customLists]);
  
  // Handle ESC key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);
  
  // Handle backdrop click
  const handleBackdropClick = (e: React.MouseEvent) => {
    if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
      onClose();
    }
  };
  
  const toggleList = (listId: string) => {
    const newSelected = new Set(selectedLists);
    if (newSelected.has(listId)) {
      newSelected.delete(listId);
    } else {
      newSelected.add(listId);
    }
    setSelectedLists(newSelected);
    
    // In real implementation: update store here
    console.log(`Toggled list ${listId} for movie ${movie.id}, now selected:`, newSelected.has(listId));
  };
  
  const handleCreateList = () => {
    if (!newListName.trim()) return;
    
    const newList: CustomList = {
      id: `custom-${Date.now()}`,
      name: newListName.trim(),
      movieIds: [movie.id],
      createdAt: Date.now(),
    };
    
    setCustomLists([...customLists, newList]);
    setSelectedLists(new Set([...selectedLists, newList.id]));
    setNewListName('');
    setIsCreatingList(false);
    
    // In real implementation: useMovieStore.getState().createCustomList(newListName.trim());
    // useMovieStore.getState().addToCustomList(newList.id, movie.id);
    console.log(`Created new list: ${newListName} with movie ${movie.id}`);
  };
  
  const handleSave = () => {
    // In real implementation: save all changes to store
    console.log('Saving list selections:', Array.from(selectedLists));
    onClose();
  };
  
  if (!isOpen) return null;
  
  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70"
      onClick={handleBackdropClick}
    >
      <div 
        ref={modalRef}
        className="bg-card-background rounded-2xl w-full max-w-md max-h-[80vh] overflow-hidden shadow-2xl"
      >
        {/* Header */}
        <div className="p-6 border-b border-white/10">
          <h2 className="text-xl font-bold text-white">Add to Lists</h2>
          <p className="text-text-secondary mt-1">{movie.title} ({movie.year})</p>
        </div>
        
        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[50vh]">
          {/* Predefined Lists */}
          <div className="mb-6">
            <h3 className="text-white font-semibold mb-3">Predefined Lists</h3>
            <div className="space-y-2">
              {predefinedLists.map((list) => (
                <label 
                  key={list.id}
                  className="flex items-center p-3 rounded-lg hover:bg-white/5 cursor-pointer transition-colors"
                >
                  <input
                    type="checkbox"
                    checked={selectedLists.has(list.id)}
                    onChange={() => toggleList(list.id)}
                    className="w-4 h-4 text-primary bg-white/10 border-white/20 rounded focus:ring-primary focus:ring-2"
                  />
                  <span className="ml-3 text-white">{list.name}</span>
                  {selectedLists.has(list.id) && (
                    <span className="ml-auto text-xs text-secondary">✓ Added</span>
                  )}
                </label>
              ))}
            </div>
          </div>
          
          {/* Custom Lists */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-white font-semibold">Your Lists</h3>
              <button
                onClick={() => setIsCreatingList(true)}
                className="text-sm text-primary hover:text-primary/80 transition-colors"
              >
                + New List
              </button>
            </div>
            
            {customLists.length > 0 ? (
              <div className="space-y-2">
                {customLists.map((list) => (
                  <label 
                    key={list.id}
                    className="flex items-center p-3 rounded-lg hover:bg-white/5 cursor-pointer transition-colors"
                  >
                    <input
                      type="checkbox"
                      checked={selectedLists.has(list.id)}
                      onChange={() => toggleList(list.id)}
                      className="w-4 h-4 text-primary bg-white/10 border-white/20 rounded focus:ring-primary focus:ring-2"
                    />
                    <span className="ml-3 text-white">{list.name}</span>
                    <span className="ml-auto text-xs text-text-secondary">
                      {list.movieIds.length} movie{list.movieIds.length !== 1 ? 's' : ''}
                    </span>
                  </label>
                ))}
              </div>
            ) : (
              <p className="text-text-secondary text-sm text-center py-4">
                You haven't created any custom lists yet.
              </p>
            )}
          </div>
          
          {/* Create New List */}
          {isCreatingList && (
            <div className="mb-6 p-4 rounded-lg bg-white/5">
              <h4 className="text-white font-semibold mb-2">Create New List</h4>
              <div className="flex gap-2">
                <input
                  ref={inputRef}
                  type="text"
                  value={newListName}
                  onChange={(e) => setNewListName(e.target.value)}
                  placeholder="Enter list name"
                  className="flex-1 px-3 py-2 rounded-lg bg-white/10 border border-white/20 text-white placeholder:text-white/40 focus:outline-none focus:border-primary"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') handleCreateList();
                    if (e.key === 'Escape') setIsCreatingList(false);
                  }}
                  autoFocus
                />
                <button
                  onClick={handleCreateList}
                  disabled={!newListName.trim()}
                  className="px-4 py-2 rounded-lg bg-primary text-white font-medium disabled:opacity-50 disabled:cursor-not-allowed hover:bg-primary/90 transition-colors"
                >
                  Create
                </button>
                <button
                  onClick={() => setIsCreatingList(false)}
                  className="px-4 py-2 rounded-lg bg-white/10 text-white font-medium hover:bg-white/20 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}
        </div>
        
        {/* Footer */}
        <div className="p-6 border-t border-white/10 flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-lg text-white font-medium hover:bg-white/10 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-5 py-2 rounded-lg bg-primary text-white font-medium hover:bg-primary/90 transition-colors"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}
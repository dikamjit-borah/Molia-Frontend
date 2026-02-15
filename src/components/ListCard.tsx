import { CustomList } from '@/types';
import { useState, useRef, useEffect } from 'react';

interface ListCardProps {
  list: CustomList;
  onRename: (listId: string, newName: string) => void;
  onDelete: (listId: string) => void;
  onClick: (listId: string) => void;
}

export default function ListCard({ list, onRename, onDelete, onClick }: ListCardProps) {
  const [isRenaming, setIsRenaming] = useState(false);
  const [newName, setNewName] = useState(list.name);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  
  useEffect(() => {
    if (isRenaming && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [isRenaming]);
  
  const handleRenameStart = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsRenaming(true);
    setNewName(list.name);
  };
  
  const handleRenameSave = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (newName.trim() && newName.trim() !== list.name) {
      onRename(list.id, newName.trim());
    }
    setIsRenaming(false);
  };
  
  const handleRenameCancel = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsRenaming(false);
    setNewName(list.name);
  };
  
  const handleDeleteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowDeleteConfirm(true);
  };
  
  const handleDeleteConfirm = (e: React.MouseEvent) => {
    e.stopPropagation();
    onDelete(list.id);
    setShowDeleteConfirm(false);
  };
  
  const handleDeleteCancel = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowDeleteConfirm(false);
  };
  
  const handleCardClick = () => {
    if (!isRenaming && !showDeleteConfirm) {
      onClick(list.id);
    }
  };
  
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleRenameSave(e as any);
    } else if (e.key === 'Escape') {
      handleRenameCancel(e as any);
    }
  };
  
  return (
    <div 
      onClick={handleCardClick}
      className={`
        relative p-5 rounded-2xl cursor-pointer transition-all duration-300
        bg-gradient-to-br from-card-background to-white/5
        border border-white/10 hover:border-primary/30
        hover:shadow-xl hover:shadow-primary/10
        ${showDeleteConfirm ? 'border-accent/30' : ''}
      `}
    >
      {/* List info */}
      <div className="mb-4">
        {isRenaming ? (
          <div className="flex items-center gap-2">
            <input
              ref={inputRef}
              type="text"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              onKeyDown={handleKeyDown}
              className="flex-1 px-3 py-1 rounded-lg bg-white/10 border border-primary text-white focus:outline-none focus:border-primary"
              onClick={(e) => e.stopPropagation()}
            />
            <button
              onClick={handleRenameSave}
              className="px-3 py-1 rounded-lg bg-primary text-white text-sm hover:bg-primary/90 transition-colors"
            >
              Save
            </button>
            <button
              onClick={handleRenameCancel}
              className="px-3 py-1 rounded-lg bg-white/10 text-white text-sm hover:bg-white/20 transition-colors"
            >
              Cancel
            </button>
          </div>
        ) : (
          <h3 className="text-white font-bold text-lg truncate">{list.name}</h3>
        )}
        
        <div className="flex items-center mt-2">
          <span className="text-text-secondary text-sm">
            {list.movieIds.length} movie{list.movieIds.length !== 1 ? 's' : ''}
          </span>
          <span className="mx-2 text-text-secondary/40">•</span>
          <span className="text-text-secondary text-sm">
            Created {new Date(list.createdAt).toLocaleDateString()}
          </span>
        </div>
      </div>
      
      {/* Action buttons */}
      <div className="flex gap-2">
        <button
          onClick={handleRenameStart}
          className="flex-1 py-2 px-3 rounded-lg text-sm font-medium bg-white/10 text-white hover:bg-white/20 transition-colors"
          disabled={isRenaming || showDeleteConfirm}
        >
          Rename
        </button>
        
        <button
          onClick={handleDeleteClick}
          className="flex-1 py-2 px-3 rounded-lg text-sm font-medium bg-accent/20 text-accent hover:bg-accent/30 transition-colors"
          disabled={isRenaming || showDeleteConfirm}
        >
          Delete
        </button>
      </div>
      
      {/* Delete confirmation overlay */}
      {showDeleteConfirm && (
        <div 
          className="absolute inset-0 rounded-2xl bg-black/80 backdrop-blur-sm flex flex-col items-center justify-center p-4"
          onClick={(e) => e.stopPropagation()}
        >
          <p className="text-white text-center mb-4">
            Delete "{list.name}"?<br />
            <span className="text-text-secondary text-sm">
              This will remove {list.movieIds.length} movie{list.movieIds.length !== 1 ? 's' : ''} from the list.
            </span>
          </p>
          <div className="flex gap-2">
            <button
              onClick={handleDeleteConfirm}
              className="px-4 py-2 rounded-lg bg-accent text-white font-medium hover:bg-accent/90 transition-colors"
            >
              Delete List
            </button>
            <button
              onClick={handleDeleteCancel}
              className="px-4 py-2 rounded-lg bg-white/20 text-white font-medium hover:bg-white/30 transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
      
      {/* Gradient accent corners */}
      <div className="absolute top-0 left-0 w-2 h-2 bg-gradient-to-br from-primary to-transparent rounded-tl-2xl" />
      <div className="absolute top-0 right-0 w-2 h-2 bg-gradient-to-bl from-secondary to-transparent rounded-tr-2xl" />
      <div className="absolute bottom-0 left-0 w-2 h-2 bg-gradient-to-tr from-accent to-transparent rounded-bl-2xl" />
      <div className="absolute bottom-0 right-0 w-2 h-2 bg-gradient-to-tl from-primary to-transparent rounded-br-2xl" />
    </div>
  );
}
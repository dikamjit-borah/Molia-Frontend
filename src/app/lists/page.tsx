'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import ListCard from '@/components/ListCard'
import { CustomList } from '@/types'

export default function ListsPage() {
  const router = useRouter()
  const [customLists, setCustomLists] = useState<CustomList[]>([])
  const [newListName, setNewListName] = useState('')
  const [isCreating, setIsCreating] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    loadCustomLists()
  }, [])

  const loadCustomLists = () => {
    try {
      const lists = JSON.parse(localStorage.getItem('customLists') || '[]')
      setCustomLists(lists)
    } catch (error) {
      console.error('Failed to load custom lists:', error)
      setCustomLists([])
    }
  }

  const handleCreateList = () => {
    if (!newListName.trim()) {
      setError('List name cannot be empty')
      return
    }

    if (newListName.trim().length === 0) {
      setError('List name cannot be only whitespace')
      return
    }

    // Check for duplicate names
    const normalizedNewName = newListName.trim().toLowerCase()
    const hasDuplicate = customLists.some(list => 
      list.name.toLowerCase() === normalizedNewName
    )

    if (hasDuplicate) {
      setError('A list with this name already exists')
      return
    }

    const newList: CustomList = {
      id: `list-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      name: newListName.trim(),
      movieIds: [],
      createdAt: Date.now()
    }

    const updatedLists = [...customLists, newList]
    localStorage.setItem('customLists', JSON.stringify(updatedLists))
    setCustomLists(updatedLists)
    setNewListName('')
    setError('')
    setIsCreating(false)
  }

  const handleRenameList = (listId: string, newName: string) => {
    if (!newName.trim()) {
      setError('List name cannot be empty')
      return
    }

    const updatedLists = customLists.map(list => 
      list.id === listId ? { ...list, name: newName.trim() } : list
    )
    
    localStorage.setItem('customLists', JSON.stringify(updatedLists))
    setCustomLists(updatedLists)
  }

  const handleDeleteList = (listId: string) => {
    if (!confirm('Are you sure you want to delete this list? This action cannot be undone.')) {
      return
    }

    const updatedLists = customLists.filter(list => list.id !== listId)
    localStorage.setItem('customLists', JSON.stringify(updatedLists))
    setCustomLists(updatedLists)
  }

  const handleListClick = (listId: string) => {
    router.push(`/lists/${listId}`)
  }

  return (
    <div className="max-w-7xl mx-auto">
      {/* Page Header */}
      <div className="mb-10">
        <h1 className="text-4xl font-bold text-text mb-4">My Lists</h1>
        <p className="text-text-secondary text-lg">
          Create and manage your custom movie lists
        </p>
      </div>

      {/* Create New List Section */}
      <div className="bg-card-background rounded-2xl p-8 mb-10">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-text mb-2">Create New List</h2>
            <p className="text-text-secondary">
              Organize movies into custom collections
            </p>
          </div>
          <div className="text-3xl font-bold text-primary">
            {customLists.length}
          </div>
        </div>

        {isCreating ? (
          <div className="space-y-4">
            <div>
              <input
                type="text"
                value={newListName}
                onChange={(e) => {
                  setNewListName(e.target.value)
                  setError('')
                }}
                placeholder="Enter list name (e.g., 'Marvel Marathon', 'Christmas Movies')"
                className="w-full px-4 py-3 bg-background rounded-2xl border-2 border-primary/30 focus:border-primary focus:outline-none text-text placeholder:text-text-secondary/60"
                autoFocus
              />
              {error && (
                <p className="mt-2 text-red-400 text-sm">{error}</p>
              )}
            </div>
            <div className="flex space-x-4">
              <button
                onClick={handleCreateList}
                className="px-6 py-3 bg-primary text-white rounded-2xl font-semibold hover:bg-primary/80 transition-colors"
              >
                Create List
              </button>
              <button
                onClick={() => {
                  setIsCreating(false)
                  setNewListName('')
                  setError('')
                }}
                className="px-6 py-3 bg-background-secondary text-text rounded-2xl font-semibold hover:bg-background-secondary/80 transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        ) : (
          <button
            onClick={() => setIsCreating(true)}
            className="w-full p-8 border-2 border-dashed border-primary/30 rounded-2xl hover:border-primary hover:bg-primary/5 transition-all duration-200 group"
          >
            <div className="flex flex-col items-center justify-center">
              <div className="w-16 h-16 mb-4 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-text mb-2">Create New List</h3>
              <p className="text-text-secondary text-center max-w-md">
                Click here to create a new custom list for organizing your movies
              </p>
            </div>
          </button>
        )}
      </div>

      {/* Lists Grid */}
      {customLists.length > 0 ? (
        <div>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-text">Your Lists</h2>
            <p className="text-text-secondary">
              {customLists.length} list{customLists.length !== 1 ? 's' : ''}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {customLists.map((list) => (
              <ListCard
                key={list.id}
                list={list}
                onRename={handleRenameList}
                onDelete={handleDeleteList}
                onClick={handleListClick}
              />
            ))}
          </div>
        </div>
      ) : (
        /* Empty State */
        <div className="text-center py-16">
          <div className="w-32 h-32 mx-auto mb-6 rounded-full bg-card-background flex items-center justify-center">
            <svg className="w-16 h-16 text-text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
          </div>
          <h3 className="text-2xl font-bold text-text mb-4">No Custom Lists Yet</h3>
          <p className="text-text-secondary max-w-md mx-auto mb-8">
            Create your first custom list to start organizing movies into personalized collections.
          </p>
          <button
            onClick={() => setIsCreating(true)}
            className="px-8 py-4 bg-primary text-white rounded-2xl font-semibold hover:bg-primary/80 transition-colors text-lg"
          >
            Create Your First List
          </button>
        </div>
      )}

      {/* Help Section */}
      <div className="mt-12 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-2xl p-8">
        <h3 className="text-xl font-bold text-text mb-4">How to Use Lists</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-background/50 rounded-2xl p-6">
            <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center mb-4">
              <span className="text-primary font-bold">1</span>
            </div>
            <h4 className="font-semibold text-text mb-2">Create Lists</h4>
            <p className="text-text-secondary text-sm">
              Create custom lists for any theme, genre, or occasion
            </p>
          </div>
          <div className="bg-background/50 rounded-2xl p-6">
            <div className="w-12 h-12 rounded-full bg-secondary/20 flex items-center justify-center mb-4">
              <span className="text-secondary font-bold">2</span>
            </div>
            <h4 className="font-semibold text-text mb-2">Add Movies</h4>
            <p className="text-text-secondary text-sm">
              Add movies to your lists from any movie card or details page
            </p>
          </div>
          <div className="bg-background/50 rounded-2xl p-6">
            <div className="w-12 h-12 rounded-full bg-accent/20 flex items-center justify-center mb-4">
              <span className="text-accent font-bold">3</span>
            </div>
            <h4 className="font-semibold text-text mb-2">Manage & Share</h4>
            <p className="text-text-secondary text-sm">
              Rename, delete, or view your lists anytime
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
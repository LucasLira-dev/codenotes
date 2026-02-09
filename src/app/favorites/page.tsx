'use client'

import { FavoritesNotes } from "@/components/NotesComponents/FavoritesNotes/favoritesNotes"
import { NotesProvider } from "@/contexts/NotesContext"

export default function FavoritesNotesPage() {
  return (
    <NotesProvider>
      <main className="min-h-screen bg-[var(--background)] py-8 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-[var(--foreground)] mb-2">
              Notas Favoritas
            </h1>
            <p className="text-[var(--muted-foreground)]">
              Explore suas notas favoritas
            </p>
          </div>
          <FavoritesNotes/>
        </div>
      </main>
    </NotesProvider>
  )
}

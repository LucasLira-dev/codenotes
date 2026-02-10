'use client'

import { PublicNotes } from "@/components/NotesComponents/PublicNotes/publicNotes"
import { NotesProvider } from "@/contexts/NotesContext"

export default function PublicNotesPage() {
  return (
    <NotesProvider>
      <main className="min-h-screen bg-[var(--background)] py-8 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-[var(--foreground)] mb-2">
              Notas Públicas
            </h1>
            <p className="text-[var(--muted-foreground)]">
              Explore notas compartilhadas pela comunidade
            </p>
          </div>
          <PublicNotes />
        </div>
      </main>
    </NotesProvider>
  )
}

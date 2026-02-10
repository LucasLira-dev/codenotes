'use client'

import { PublicNotes } from "@/components/NotesComponents/PublicNotes/publicNotes"
import { NotesProvider } from "@/contexts/NotesContext"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"

export default function PublicNotesPage() {
  return (
    <NotesProvider>
      <main className="min-h-screen bg-[var(--background)] py-8 px-4">
        <div className="max-w-6xl mx-auto">
          <Breadcrumb className="mb-4 text-sm text-[var(--muted-foreground)]">
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink href="/">Home</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbLink href="/dashboard"> Dashboard </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage className="font-medium text-[var(--primary)]">Notas Públicas</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
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

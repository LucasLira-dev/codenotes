'use client'

import Loading from "@/components/Loading/loading"
import { FavoritesNotes } from "@/components/NotesComponents/FavoritesNotes/favoritesNotes"
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb"
import { NotesProvider } from "@/contexts/NotesContext"
import { authClient } from "@/lib/auth-client"
import { useRouter } from "next/navigation"
import { useEffect } from "react"

export default function FavoritesNotesPage() {

    const { data: session, isPending } = authClient.useSession()
      const router = useRouter()
    
      useEffect(() => {
        if (!isPending && !session) {
          router.push("/login")
        }
      }, [isPending, router, session])
    
      if (isPending) {
        return <Loading />
      }

  return (
    <NotesProvider>
      <main className="min-h-screen bg-[var(--background)] py-8 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="mb-8">
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
                  <BreadcrumbPage className="font-medium text-[var(--primary)]">Notas Favoritas</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
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

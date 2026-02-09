'use client'

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Heart } from "lucide-react"
import { Highlight, themes } from "prism-react-renderer"
import { useNotes } from "@/contexts/NotesContext"
import { PublicNotesSkeleton } from "./publicNotesSkeleton"


export const PublicNotes = () => {
  
  const { publicNotes, addFavorite, isPublicLoading } = useNotes();


  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return new Intl.DateTimeFormat("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit"
    }).format(date)
  }

  if (isPublicLoading) {
    return <PublicNotesSkeleton />
  }

  return (
    <article className="flex flex-col gap-4">
      {publicNotes.map((note) => (
        <Card
          key={note.id}
          className="flex flex-col justify-between bg-[var(--card)] border-[var(--border)] shadow-md w-full"
        >
          <CardHeader>
            <div className="flex flex-col gap-3">
              <div className="flex justify-between items-start w-full gap-4">
                <div className="flex items-center gap-3 flex-1 min-w-0">
                  <Avatar className="h-10 w-10 flex-shrink-0">
                    <AvatarImage src={note.author.image ?? undefined} alt={note.author.name} />
                    <AvatarFallback className="bg-[var(--primary)] text-white text-sm">
                      {note.author.name.split(' ').map(n => n[0]).join('').toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div className="min-w-0">
                    <p className="font-semibold text-[var(--foreground)] text-sm">
                      {note.author.name}
                    </p>
                    <p className="text-xs text-[var(--muted-foreground)]">
                      {formatDate(note.createdAt)}
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => addFavorite(note.id)}
                  className="flex items-center gap-2 px-3 py-2 rounded-lg bg-[var(--input)] hover:bg-[var(--muted)] transition-colors flex-shrink-0"
                  aria-label={note.isFavorited ? "Remover dos favoritos" : "Adicionar aos favoritos"}
                >
                  <Heart
                    className={`w-4 h-4 ${
                      note.isFavorited 
                        ? "fill-[var(--primary)] text-[var(--primary)]" 
                        : "text-[var(--foreground)]"
                    }`}
                  />
                </button>
              </div>

              <div className="flex flex-col gap-2">
                <CardTitle className="text-[var(--foreground)] text-[18px] leading-normal">
                  {note.title}
                </CardTitle>
                <div className="inline-flex items-center gap-2 rounded-full px-3 py-1 bg-[var(--primary)] bg-opacity-10 border border-[var(--primary)] w-fit">
                  <span className="text-xs font-medium text-[var(--foreground)]">
                    {note.language}
                  </span>
                </div>
              </div>
            </div>
          </CardHeader>

          <CardContent>
            <Highlight
              code={note.code}
              language={note.language}
              theme={themes.dracula}
            >
              {({
                className,
                style,
                tokens,
                getLineProps,
                getTokenProps,
              }) => (
                <pre
                  className={`rounded-md p-4 text-sm font-mono overflow-x-auto ${className}`}
                  style={style}
                >
                  {tokens.map((line, i) => (
                    <div key={i} {...getLineProps({ line })}>
                      {line.map((token, key) => (
                        <span key={key} {...getTokenProps({ token })} />
                      ))}
                    </div>
                  ))}
                </pre>
              )}
            </Highlight>
          </CardContent>
        </Card>
      ))}
    </article>
  )
}

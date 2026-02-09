'use client'

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Highlight, themes } from "prism-react-renderer"

import { useNotes } from "@/contexts/NotesContext"
import type { Note } from "@/hooks/notes"

import { useState } from "react"
import { Pencil, Trash } from "lucide-react"
import { NotesModal } from "@/components/NotesComponents/NotesModal/notesModal"



export const AllNotes = () => {

    const { notes, updateNote, deleteNote, togglePublic } = useNotes()

    const [modalOpen, setModalOpen] = useState(false)
    const [modalAction, setModalAction] = useState<"edit" | "delete">("edit")
    const [selectedNote, setSelectedNote] = useState<Note>()

    const handleEdit = (note: Note) => {
      setSelectedNote(note);
      setModalAction("edit");
      setModalOpen(true);
    };

    const handleDelete = (note: Note) => {
      setSelectedNote(note);
      setModalAction("delete");
      setModalOpen(true);
    };

    return (
      <article className="flex flex-col gap-2">
        {notes.length > 0 &&
          notes.map((note, idx) => (
            <Card
              className="flex flex-col justify-between bg-[var(--card)] border-[var(--border)] shadow-md w-full "
              key={idx}
            >
              <CardHeader>
                <div className="flex flex-col gap-1 min-w-0">
                  <div className="flex justify-between items-center w-full gap-4">
                    <CardTitle className="text-[var(--foreground)] text-[18px] leading-normal flex-1 min-w-0 truncate">
                      {note.title}
                    </CardTitle>
                    
                  </div>
                  <div className="inline-flex items-center gap-2 rounded-full px-3 py-1 bg-[var(--primary)] bg-opacity-10 border border-[var(--primary)] w-fit">
                      <span className="text-xs font-medium text-[var(--foreground)]">{note.language}</span>
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
                      className={`rounded-md p-4 text-sm font-mono overflow-x-auto mb-2 ${className}`}
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

                <p className="text-sm text-gray-400">
                  {note.createdAt && !isNaN(new Date(note.createdAt).getTime())
                    ? new Intl.DateTimeFormat("pt-BR", {
                        day: "2-digit",
                        month: "2-digit",
                        year: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      }).format(new Date(note.createdAt))
                    : "Data inválida"}
                </p>
              </CardContent>
              <div className="flex gap-3 items-center flex-shrink-0 justify-end px-4 py-2 border-t border-[var(--border)]">
                <div className="flex items-center gap-2">
                  <span className="text-xs text-gray-400">Público</span>
                  <button
                    type="button"
                    onClick={() => { togglePublic(note.id, !note.isPublic) }}
                    role="switch"
                    aria-checked={note.isPublic}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${note.isPublic ? 'bg-[var(--primary)]' : 'bg-red-900'
                      }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${note.isPublic ? 'translate-x-6' : 'translate-x-1'
                        }`}
                    />
                  </button>
                </div>
                <button
                  type="button"
                  onClick={() => handleEdit(note)}
                  aria-label="Editar nota"
                >
                  <Pencil className="text-[var(--foreground)] cursor-pointer w-5 h-5" />
                </button>
                <button
                  type="button"
                  onClick={() => handleDelete(note)}
                  aria-label="Excluir nota"
                >
                  <Trash className="text-[var(--foreground)] cursor-pointer w-5 h-5" />
                </button>
              </div>
            </Card>
          ))}

        <NotesModal
          open={modalOpen}
          onClose={() => setModalOpen(false)}
          note={selectedNote}
          action={modalAction}
          onSave={(title, code) => {
            updateNote(selectedNote!.id, title, code);
            setModalOpen(false);
          }}
          onDelete={() => {
            deleteNote(selectedNote!.id);
            setModalOpen(false);
          }}
        />
      </article>
    );
}
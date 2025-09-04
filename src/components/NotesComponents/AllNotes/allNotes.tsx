'use client'

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Highlight, themes } from "prism-react-renderer"

import { Note, useNotes} from "@/contexts/NotesContext"

import { useState } from "react"
import { Pencil, Trash } from "lucide-react"
import { NotesModal } from "@/components/NotesComponents/NotesModal/notesModal"

export const AllNotes = () => {

    const { notes, updateNote, deleteNote } = useNotes()

    const [modalOpen, setModalOpen] = useState(false)
    const [modalAction, setModalAction] = useState<"edit" | "delete">("edit")
    const [selectedNote, setSelectedNote] = useState<Note | undefined>()

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
              <CardHeader
              >
              <div
              className="flex justify-between">
                <div>
                  <CardTitle className="text-[var(--foreground)] text-[18px]">
                    {note.title}
                  </CardTitle>
                  <p 
                  className="text-sm text-gray-400">
                    {note.language}
                  </p>
                </div>
                <div
                className="flex gap-2 text[16px]">
                  <button
                    onClick={() => {
                      handleEdit(note);
                    }}
                  >
                    <Pencil className=" text-[var(--foreground)] cursor-pointer" />
                  </button>
                  <button
                    onClick={() => {
                      handleDelete(note);
                    }}
                  >
                    <Trash
                      className="text-[var(--foreground)] cursor-pointer"
                    />
                  </button>
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
                            <span
                              key={key}
                              {...getTokenProps({ token })}
                            />
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
            onDelete={()=>{
              deleteNote(selectedNote!.id);
              setModalOpen(false);
            }}
          />
      </article>
    );
}
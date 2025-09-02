'use client'

import { Clock, FileText } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "../../ui/card"
import { useNotes } from "@/contexts/NotesContext"

export const LatestNotes = () => {

    const { notes } = useNotes()

    return (
      <Card className="flex flex-col justify-between bg-[var(--card)] border-[var(--border)] shadow-md w-full">
        <CardHeader className="p-4 text-[var(--foreground)]">
          <div className="flex flex-row items-center justify-between">
            <CardTitle>Notas Recentes</CardTitle>
            <div>
              <Clock />
            </div>
          </div>
          <p className="text-sm text-gray-400">Suas últimas anotações</p>
        </CardHeader>
          { notes.slice(0, 2).map(note => (
            <CardContent key={note.id} className="flex flex-col items-center justify-center p-4 gap-2">
              <div className="flex justify-between bg-[var(--card)] border-1 border-[var(--border)] shadow-md rounded-md p-4 w-full">
                <div className="text-[var(--foreground)]">
                  <p className="font-bold">{note.title}</p>
                  <span className="text-sm text-gray-400">
                    {new Intl.DateTimeFormat("pt-BR", {
                      day: "2-digit",
                      month: "2-digit",
                      year: "numeric",
                      hour: "2-digit",
                      minute: "2-digit"
                    }).format(new Date(note.createdAt))}
                  </span>
                </div>
                <FileText className="text-[var(--foreground)]" />
              </div>
            </CardContent>
          ))}
      </Card>
    );
}
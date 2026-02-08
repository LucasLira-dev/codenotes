'use client'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

import { FileText, Code2} from "lucide-react"
import { AllNotes } from "../AllNotes/allNotes"
import { QuickActions } from "../QuickActions/quickActions"
import { LatestNotes } from "../LatestNotes/latestNotes"
import { useNotes } from "@/contexts/NotesContext"
import { EmptyNotes } from "../EmptyNotes/emptyNotes"
import Loading from "@/components/Loading/loading"


export default function NoteInformations() {

    const { notes, isLoading } = useNotes()

    // Calcula linguagem mais usada
    const languageCounts: Record<string, number> = {};
        notes.forEach(note => {
            if (note.language) {
                languageCounts[note.language] = (languageCounts[note.language] || 0) + 1;
            }
        });
    const mostUsedLanguage = Object.entries(languageCounts)
        .sort(([, a], [, b]) => b - a)[0]?.[0] || "Nenhuma";
    const mostUsedLanguageCount = languageCounts[mostUsedLanguage] || 0;

    // Calcula notas da última semana
    const notesThisWeek = notes.filter(note => {
        const created = new Date(note.createdAt)
        const weekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
        return created >= weekAgo
    }).length

    if (isLoading) {
        return <Loading />
    }

    return (
        notes.length > 0 ? (
            <section className="p-4 flex flex-col gap-2">
                <article className="flex flex-col gap-2 md:flex-row">
                    <Card className="flex flex-col justify-between bg-[var(--card)] border-[var(--border)] shadow-md w-full sm:max-w-md">
                        <CardHeader className=" p-4 text-[var(--foreground)]">
                            <div className="flex flex-row items-center justify-between">
                                <CardTitle>
                                    Total de Anotações
                                </CardTitle>
                                <div>
                                    <FileText />
                                </div>
                            </div>
                        </CardHeader>
                        <CardContent className="flex flex-col p-4">
                            <span className="text-2xl font-bold text-[var(--foreground)]">{notes.length}</span>
                            <span className="text-sm text-gray-400"> + {notesThisWeek} essa semana </span>
                        </CardContent>
                    </Card>

                    <Card className="flex flex-col justify-between bg-[var(--card)] border-[var(--border)] shadow-md w-full sm:max-w-md">
                        <CardHeader className=" p-4 text-[var(--foreground)]">
                            <div className="flex flex-row items-center justify-between">
                                <CardTitle>
                                    Linguagem mais utilizada
                                </CardTitle>
                                <div>
                                    <Code2 />
                                </div>
                            </div>
                        </CardHeader>
                        <CardContent className="flex flex-col p-4">
                            <span className="text-2xl font-bold text-[var(--foreground)]">
                                {mostUsedLanguageCount}
                            </span>
                            <span className="text-sm text-gray-400"> 
                                 linguagem: {mostUsedLanguage}
                            </span>
                        </CardContent>
                    </Card>

                    <QuickActions />
                </article>

                <AllNotes />
                
                <article className="flex flex-col gap-2 md:flex-row">
                    <LatestNotes />
                </article>
            </section>
        ) : (
            <EmptyNotes />
        )
    )
}

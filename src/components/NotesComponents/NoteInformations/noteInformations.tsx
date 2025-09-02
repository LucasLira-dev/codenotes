'use client'
import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

import { FileText, Code2} from "lucide-react"
import { AllNotes } from "../AllNotes/allNotes"
import { QuickActions } from "../QuickActions/quickActions"
import { LatestNotes } from "../LatestNotes/latestNotes"
import { useNotes } from "@/contexts/NotesContext"
import { EmptyNotes } from "../EmptyNotes/emptyNotes"
import Loading from "@/components/Loading/loading"


export default function NoteInformations() {

    const { notes } = useNotes()
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        // Simula carregamento (substitua por lógica real se necessário)
        const timer = setTimeout(() => setLoading(false), 3000)
        return () => clearTimeout(timer)
    }, [])

    if (loading) {
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
                            <span className="text-sm text-gray-400"> + 0 essa semana </span>
                        </CardContent>
                    </Card>

                    <Card className="flex flex-col justify-between bg-[var(--card)] border-[var(--border)] shadow-md w-full sm:max-w-md">
                        <CardHeader className=" p-4 text-[var(--foreground)]">
                            <div className="flex flex-row items-center justify-between">
                                <CardTitle>
                                    Blocos de Códigos
                                </CardTitle>
                                <div>
                                    <Code2 />
                                </div>
                            </div>
                        </CardHeader>
                        <CardContent className="flex flex-col p-4">
                            <span className="text-2xl font-bold text-[var(--foreground)]">0</span>
                            <span className="text-sm text-gray-400"> 
                                 linguagem: python
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

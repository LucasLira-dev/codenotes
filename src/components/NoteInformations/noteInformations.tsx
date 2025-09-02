

// import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
// import { Button } from "@/components/ui/button"
// import Link from "next/link"
// import {
//   Code2,
//   FileText,
//   Plus,
//   TrendingUp,
//   Settings,
//   LogOut,
//   Menu,
//   X,
//   BarChart3,
//   Clock,
//   Zap,
//   BookOpen,
// } from "lucide-react"

import { FileText, Code2} from "lucide-react"
import { AllNotes } from "../AllNotes/allNotes"
import { QuickActions } from "../QuickActions/quickActions"
import { LatestNotes } from "../LatestNotes/latestNotes"

// interface Note {
//   id: string
//   title: string
//   content: string
//   createdAt: string
//   updatedAt: string
//   codeBlocks?: { language: string; code: string }[]
// }

// interface DashboardStats {
//   totalNotes: number
//   totalCodeBlocks: number
//   notesThisWeek: number
//   mostUsedLanguage: string
// }

export default function NoteInformations() {
    return(
        <section
        className="p-4 flex flex-col gap-2">
            <article
            className="flex flex-col gap-2 md:flex-row">
                <Card
                className="flex flex-col justify-between bg-[var(--card)] border-[var(--border)] shadow-md w-full sm:max-w-md">
                    <CardHeader
                    className=" p-4 text-[var(--foreground)]">
                        <div
                        className="flex flex-row items-center justify-between">
                            <CardTitle>
                                Total de Anotações
                            </CardTitle>
                            <div>
                                <FileText />
                            </div>
                        </div>
                    </CardHeader>
                    <CardContent
                    className="flex flex-col p-4">
                        <span className="text-2xl font-bold text-[var(--foreground)]">0</span>
                        <span className="text-sm text-gray-400"> + 0 essa semana </span>
                    </CardContent>
                </Card>

                <Card
                className="flex flex-col justify-between bg-[var(--card)] border-[var(--border)] shadow-md w-full sm:max-w-md">
                    <CardHeader
                    className=" p-4 text-[var(--foreground)]">
                        <div
                        className="flex flex-row items-center justify-between">
                            <CardTitle>
                                Blocos de Códigos
                            </CardTitle>
                            <div>
                                <Code2 />
                            </div>
                        </div>
                    </CardHeader>
                    <CardContent
                    className="flex flex-col p-4">
                        <span className="text-2xl font-bold text-[var(--foreground)]">0</span>
                        <span className="text-sm text-gray-400"> 
                             linguagem: python
                        </span>
                    </CardContent>
                </Card>

                <QuickActions />
            </article>

            <AllNotes />
            
            <article
            className="flex flex-col gap-2 md:flex-row">
                <LatestNotes />
            </article>

        </section>
    )
}

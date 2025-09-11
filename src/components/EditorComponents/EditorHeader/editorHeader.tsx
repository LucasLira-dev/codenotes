import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import { FaCode } from "react-icons/fa"
import { LuNotebookText } from "react-icons/lu";
import { FaRegSave } from "react-icons/fa";


import { useEditor } from '@/contexts/EditorContext'

export const EditorHeader = () => {

    const {saveNote, saving, title, code, language} = useEditor();
    // Verifica se algum campo está vazio
    const isDisabled = !title?.trim() || !code?.trim() || !language?.trim();

    return (
        <header
        className="flex bg-[var(--header)] justify-between items-center p-4 border-b-1 border-b-[var(--border)]"
        >
            <div>
                <Link
                href="/"
                className="inline-flex items-center gap-2 text-[var(--muted-foreground)] hover:text-[var(--foreground)] transition-colors"
                >
                    <ArrowLeft className="h-4 w-4" />
                    Voltar <span className="hidden sm:block"> ao início </span>
                </Link>
            </div>

            <div
            className="hidden md:flex items-center gap-2 text-2xl font-bold sm:ml-10 sm:mr-10 md:ml-15 md:mr-15">
                <FaCode
                className="text-[var(--primary)]"
                />
                <span
                className="text-[var(--foreground)]">
                    CodeNotes
                </span>
            </div>

            <div
            className="flex gap-4">
                <Link
                href="/notes"
                className="bg-[var(--background)] border-1 border-[var(--border)] text-[var(--foreground)] hover:brightness-90 py-1 px-3 rounded cursor-pointer flex items-center gap-1"
                >
                    <LuNotebookText className="h-4 w-4" />
                    Ver Notas
                </Link>
                <button
                className="bg-[var(--primary)] text-[var(--background)] hover:brightness-90 py-1 px-3 rounded cursor-pointer flex items-center gap-1"
                onClick={saveNote}
                disabled={isDisabled || saving}>
                    <FaRegSave className="h-4 w-4" />
                    {saving ? "Salvando..." : "Salvar"}
                </button>
            </div>
        </header>
    )
}
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import { FaCode } from "react-icons/fa"
import { FaRegSave } from "react-icons/fa";


import { useEditorDemo } from "@/contexts/DemoContext";

export const EditorHeaderDemo = () => {

    const {saveNoteDemo, savingDemo, titleDemo, codeDemo, languageDemo} = useEditorDemo();
    // Verifica se algum campo está vazio
    const isDisabled = !titleDemo?.trim() || !codeDemo?.trim() || !languageDemo?.trim();

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
                <button
                className="bg-[var(--primary)] text-black hover:brightness-90 py-1 px-3 rounded cursor-pointer flex items-center gap-1"
                onClick={saveNoteDemo}
                disabled={isDisabled || savingDemo}>
                    <FaRegSave className="h-4 w-4" />
                    {savingDemo ? "Salvando..." : "Salvar"}
                </button>
            </div>
        </header>
    )
}
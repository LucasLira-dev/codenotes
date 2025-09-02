import { Code2, Plus } from "lucide-react";
import Link from "next/link";
import { FiBookOpen } from "react-icons/fi";

export const EmptyNotes = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center space-y-6">
      <div className="w-24 h-24 bg-[var(--muted)] rounded-full flex items-center justify-center">
        <FiBookOpen className="h-12 w-12 text-[var(--muted-foreground)]" />
      </div>
      <div className="space-y-2">
        <h2 className="text-2xl font-bold text-[var(--foreground)]">
          Nenhuma nota ainda
        </h2>
        <p className="text-[var(--muted-foreground)] max-w-md">
          Comece criando sua primeira anotação! Organize seus códigos, ideias e
          conhecimentos em um só lugar.
        </p>
      </div>
      <div className="flex flex-col sm:flex-row gap-3">
        <button
        className="bg-[var(--primary)] text-[var(--chart5-primary)] hover:brightness-90 py-1 px-3 rounded cursor-pointer">
          <Link 
          href="/editor"
          className="flex items-center gap-2"
          >
            <Plus className="h-4 w-4" />
            Criar Primeira Nota
          </Link>
        </button>
        <button
        className="bg-[var(--background)] border-1 border-[var(--border)] text-[var(--foreground)] hover:brightness-90 py-1 px-3 rounded cursor-pointer   justify-center">
          <Link 
          href="/demo"
        className="flex items-center justify-center gap-2">
            <Code2 className="h-4 w-4" />
            Ver Demo
          </Link>
        </button>
      </div>
    </div>
  ); 
}
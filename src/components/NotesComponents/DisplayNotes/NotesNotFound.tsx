import React from 'react';
import { FileText, Search } from 'lucide-react';
import Link from 'next/link';

interface NotesNotFoundProps {
    NotesType: "favorites" | "public";
}

export const NotesNotFound: React.FC<NotesNotFoundProps> = ({ NotesType }) => {
    return (
        <div className="flex flex-col items-center justify-center min-h-[400px] bg-[var(--card)]/39 rounded-lg p-8">
            <div className="mb-6">
                <Search className="w-16 h-16 text-gray-400" />
            </div>
            
            <h2 className="text-2xl font-bold text-[var(--foreground)] mb-4">Nenhuma nota encontrada</h2>
            
            <p className="text-[var(--foreground)]/80 text-center mb-8 max-w-md bg-[var(--card)] rounded-lg p-4 border border-[var(--border)]">
                {NotesType === 'favorites'
                    ? "Você ainda não adicionou nenhuma nota aos favoritos. Explore as notas públicas e adicione suas favoritas para acessá-las rapidamente aqui."
                    : "Parece que você ainda não tem notas públicas. Crie e compartilhe suas notas para que outros possam vê-las aqui."}
            </p>
            
            <Link 
            href={NotesType === 'favorites' ? "/notes" : "/favorites"} 
            className="flex items-center gap-2 text-[var(--foreground)] bg-[var(--primary)]/70 hover:bg-[var(--primary)]/60 transition-colors rounded-lg px-4 py-2">
                <FileText className="w-5 h-5" />
                <span className="text-sm">Explorar notas</span>
            </Link>
        </div>
    );
};

export default NotesNotFound;
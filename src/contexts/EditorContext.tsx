import { createContext, useState, ReactNode, useContext } from 'react';
import { useSession } from 'next-auth/react'
import { NotesService } from '@/service/notesService'

interface EditorContextType {
    title: string
    setTitle: (title: string) => void
    code: string
    setCode: (code: string) => void
    language: string
    setLanguage: (language: string) => void

    saveNote: () => Promise<void>
    saving: boolean
}

const EditorContext = createContext<EditorContextType | undefined>(undefined);

interface EditorProviderProps {
    children: ReactNode
}
export const EditorProvider = ({ children }: EditorProviderProps) => {
    const [title, setTitle] = useState("");
    const [code, setCode] = useState("console.log(\"Hello, world!\");");
    const [language, setLanguage] = useState("javascript");
    const [saving, setSaving] = useState(false);

    const { data: session } = useSession()

    const saveNote = async () => {
        if (!session?.accessToken) {
            console.error("Usuário não autenticado");
            return;
        }

        setSaving(true);
        try {
            const notesService = new NotesService();
            await notesService.createNote({
                title,
                code: code,
                language,
                token: session.accessToken
            });
            alert("Nota salva com sucesso!");
        } catch (error) {
            console.error("Erro ao salvar nota:", error);
            alert("Erro ao salvar nota. Tente novamente.");
        } finally {
            setSaving(false);
        }
    };

    return (
        <EditorContext.Provider value={{ title, setTitle, code, setCode, language, setLanguage, saveNote, saving }}>
            {children}
        </EditorContext.Provider>
    );
};

export const useEditor = () => {
    const context = useContext(EditorContext);
    if (!context) {
        throw new Error("useEditor must be used within an EditorProvider");
    }
    return context;
};

import { createContext, useState, ReactNode, useContext, useCallback } from 'react';
import { authClient } from '@/lib/auth-client'
import { useCreateNoteMutation } from '@/hooks/notes'
import { CustomToast } from '@/components/Toast/toast';

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

    const [toastOpen, setToastOpen] = useState(false);
    const [toastType, setToastType] = useState<"success" | "error">("success");
    const [toastTitle, setToastTitle] = useState("");
    const [toastDesc, setToastDesc] = useState("");
    

    const { data: session } = authClient.useSession();
    const createNoteMutation = useCreateNoteMutation();

    const saveNote = useCallback(async () => {
        if (!session) {
            console.error("Usuário não autenticado");
            return;
        }

        if (title.trim().length < 3) {
            setToastOpen(true)
            setToastType("error")
            setToastTitle("Título muito curto...")
            setToastDesc("O título deve ter pelo menos 3 caracteres.")
            return;
        }

        setSaving(true);
        try {
            await createNoteMutation.mutateAsync({
                title: title.trim(),
                code,
                language,
            });
            setToastOpen(true)
            setToastType("success")
            setToastTitle("Booaaa!")
            setToastDesc("Anotação criada com sucesso!")
        } catch (error) {
            console.error("Erro ao salvar nota:", error);
            setToastOpen(true)
            setToastType("error")
            setToastTitle("Erro ao salvar nota...")
            setToastDesc("Tente novamente.")
        } finally {
            setSaving(false);
        }
    }, [title, code, language, session, createNoteMutation]);

    return (
        <EditorContext.Provider value={{ title, setTitle, code, setCode, language, setLanguage, saveNote, saving }}>
            {children}
            <CustomToast
            open={toastOpen}
            type={toastType}
            title={toastTitle}
            description={toastDesc}
            onOpenChange={setToastOpen}
             />
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

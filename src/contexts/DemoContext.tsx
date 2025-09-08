import { useContext, useState, ReactNode, createContext } from 'react'

interface Note {
    title: string;
    code: string;
    language: string;
}

interface DemoContextType {
    titleDemo: string
    setTitleDemo: (title: string) => void
    codeDemo: string
    setCodeDemo: (code: string) => void
    languageDemo: string
    setLanguageDemo: (language: string) => void

    saveNoteDemo: () => Promise<void>
    savingDemo: boolean

    notes: Note[]
    setNotes: (notes: Note[]) => void
}

const DemoContext = createContext<DemoContextType | undefined>(undefined);

interface DemoProviderProps {
    children: ReactNode;
}

export const DemoProvider = ({ children }: DemoProviderProps) => {
    const [titleDemo, setTitleDemo] = useState("Exemplo de Nota");
    const [codeDemo, setCodeDemo] = useState("console.log(\"Hello, world!\");");
    const [languageDemo, setLanguageDemo] = useState("javascript");
    const [savingDemo, setSavingDemo] = useState(false);
    const [notes, setNotes ] = useState([] as Note[]);

    const saveNoteDemo = async () => {
        // Função de simulação de salvamento
        setSavingDemo(true);
        return new Promise<void>((resolve) => {
            setTimeout(() => {
                setNotes((prevNotes) => [...prevNotes, { title: titleDemo, code: codeDemo, language: languageDemo }]);
                setSavingDemo(false);
                resolve();
            }, 2000);
        });
    };

    return (
        <DemoContext.Provider value={{ titleDemo, setTitleDemo, codeDemo, setCodeDemo, languageDemo, setLanguageDemo, saveNoteDemo, savingDemo, notes, setNotes}}>
            {children}
        </DemoContext.Provider>
    );
}

export const useEditorDemo = () => {
    const context = useContext(DemoContext);
    if (context === undefined) {
        throw new Error('useEditorDemo must be used within a DemoProvider');
    }
    return context;
}
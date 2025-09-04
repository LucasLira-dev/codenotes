import { createContext, useState, ReactNode, useContext, useEffect } from 'react';
import { useSession } from 'next-auth/react'
import { NotesService } from '@/service/notesService'

// Define a Note interface to specify the shape of a note object
export interface Note {
  id: number;
  title: string;
  code: string;
  language: string;
  createdAt: string;
  updatedAt: string;
  // Add other fields as needed
}

// Define the NotesContextType interface according to your context's value shape
export interface NotesContextType {
  notes: Note[];
  setNotes: (notes: Note[]) => void;
  updateNote: (id: number, title: string, code: string) => Promise<void>;
  deleteNote: (id: number) => Promise<void>;
}

const NotesContext = createContext<NotesContextType | undefined>(undefined);

interface NotesContextProps {
    children: ReactNode;
}


export const NotesProvider = ({ children }: NotesContextProps) => {
  const [notes, setNotes] = useState<Note[]>([]);

  const { data: session } = useSession();

  useEffect(() => {
    if (session?.accessToken) {
      const notesService = new NotesService();
      notesService.getNotes(session.accessToken).then(fetchedNotes => {
        setNotes(fetchedNotes);
      }).catch(error => {
        console.error("Erro ao buscar notas:", error);
      });
    }
  }, [session?.accessToken]);

  // Função para editar nota
  const updateNote = async (id: number, title: string, code: string) => {
    if (!session?.accessToken) return;
    const notesService = new NotesService();
    try {
      const updated = await notesService.editNote(id, { title, code, token: session.accessToken });
      setNotes((prev) =>
        prev.map((note) =>
          note.id === id
            ? { ...note, ...updated, language: updated.language ?? note.language }
            : note
        )
      );

    } catch (error) {
      console.error("Erro ao editar nota:", error);
    }
  };

  // Função para deletar nota
  const deleteNote = async (id: number) => {
    if (!session?.accessToken) return;
    const notesService = new NotesService();
    try {
      await notesService.deleteNote(id, session.accessToken);
      setNotes(prev => prev.filter(note => note.id !== id));
    } catch (error) {
      console.error("Erro ao deletar nota:", error);
    }
  };

  return (
    <NotesContext.Provider value={{ notes, setNotes, updateNote, deleteNote }}>
      {children}
    </NotesContext.Provider>
  );
};

export const useNotes = () => {
    const context = useContext(NotesContext);
    if (!context) {
        throw new Error("useNotes must be used within a NotesProvider");
    }
    return context;
};
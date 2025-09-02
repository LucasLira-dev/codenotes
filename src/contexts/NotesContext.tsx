import { createContext, useState, ReactNode, useContext } from 'react';
import { useSession } from 'next-auth/react'
import { NotesService } from '@/service/notesService'

// Define a Note interface to specify the shape of a note object
export interface Note {
  id: number;
  title: string;
  code: string;
  language: string;
  createdAt: Date;
  updatedAt: Date;
  // Add other fields as needed
}

// Define the NotesContextType interface according to your context's value shape
export interface NotesContextType {
  notes: Note[];
  setNotes: (notes: Note[]) => void;
  // Add other properties/methods as needed
}

const NotesContext = createContext<NotesContextType | undefined>(undefined);

interface NotesContextProps {
    children: ReactNode;
}


export const NotesProvider = ({ children }: NotesContextProps) => {
  const [notes, setNotes] = useState<Note[]>([]);

  const { data: session } = useSession();

  try {
    if (session?.accessToken) {
      const notesService = new NotesService();
      notesService.getNotes(session.accessToken).then(fetchedNotes => {
        setNotes(fetchedNotes);
      }).catch(error => {
        console.error("Erro ao buscar notas:", error);
      });
    }
  } catch (error) {
    console.error("Erro ao buscar notas:", error);
  }

  return (
    <NotesContext.Provider value={{ notes, setNotes }}>
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
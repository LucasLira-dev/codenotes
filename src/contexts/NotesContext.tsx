"use client";

import {
  createContext,
  useCallback,
  ReactNode,
  useContext,
  useState,
} from "react";
import { CustomToast } from "@/components/Toast/toast";
import {
  useNotesQuery,
  useUpdateNoteMutation,
  useDeleteNoteMutation,
  type Note,
} from "@/hooks/notes";

export type { Note };

export interface NotesContextType {
  notes: Note[];
  isLoading: boolean;
  isError: boolean;
  updateNote: (id: string, title: string, code: string) => Promise<void>;
  deleteNote: (id: string) => Promise<void>;
}

const NotesContext = createContext<NotesContextType | undefined>(undefined);

interface NotesProviderProps {
  children: ReactNode;
}

export function NotesProvider({ children }: NotesProviderProps) {
  const [toastOpen, setToastOpen] = useState(false);
  const [toastType, setToastType] = useState<"success" | "error">("success");
  const [toastTitle, setToastTitle] = useState("");
  const [toastDesc, setToastDesc] = useState("");

  const { data: notes = [], isLoading, isError } = useNotesQuery();
  const updateMutation = useUpdateNoteMutation();
  const deleteMutation = useDeleteNoteMutation();

  const updateNote = useCallback(
    async (id: string, title: string, code: string) => {
      try {
        await updateMutation.mutateAsync({ id, title, code });
        setToastType("success");
        setToastTitle("Nota editada com sucesso!");
        setToastDesc("Sua nota foi atualizada.");
        setToastOpen(true);
      } catch (error) {
        console.error("Erro ao editar nota:", error);
        setToastType("error");
        setToastTitle("Erro ao editar nota");
        setToastDesc("Ocorreu um erro ao editar sua nota.");
        setToastOpen(true);
      }
    },
    [updateMutation]
  );

  const deleteNote = useCallback(
    async (id: string) => {
      try {
        await deleteMutation.mutateAsync(id);
        setToastType("success");
        setToastTitle("Nota deletada com sucesso!");
        setToastDesc("Sua nota foi removida.");
        setToastOpen(true);
      } catch (error) {
        console.error("Erro ao deletar nota:", error);
        setToastType("error");
        setToastTitle("Erro ao deletar nota");
        setToastDesc("Ocorreu um erro ao deletar sua nota.");
        setToastOpen(true);
      }
    },
    [deleteMutation]
  );

  return (
    <NotesContext.Provider value={{ notes, isLoading, isError, updateNote, deleteNote }}>
      {children}
      <CustomToast
        open={toastOpen}
        type={toastType}
        title={toastTitle}
        description={toastDesc}
        onOpenChange={setToastOpen}
      />
    </NotesContext.Provider>
  );
}

export function useNotes() {
  const context = useContext(NotesContext);
  if (!context) {
    throw new Error("useNotes must be used within a NotesProvider");
  }
  return context;
}

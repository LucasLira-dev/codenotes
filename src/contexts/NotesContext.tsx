"use client";

import {
  createContext,
  useCallback,
  ReactNode,
  useContext,
  useState,
} from "react";
import { CustomToast } from "@/components/Toast/toast";
import { authClient } from "@/lib/auth-client";
import {
  useNotesQuery,
  useUpdateNoteMutation,
  useDeleteNoteMutation,
  type Note,
  useTogglePublicNoteMutation,
  usePublicNotesQuery,
  PublicNote,
  useAddFavoriteMutation,
  useMyFavoritesQuery,
  FavoriteNote,
} from "@/hooks/notes";

export type { Note };

export interface NotesContextType {
  notes: Note[];
  publicNotes: PublicNote[];
  favoritesNotes: FavoriteNote[];
  isFavoritesLoading: boolean;
  isFavoritesError: boolean;
  isPublicLoading: boolean;
  isPublicError: boolean; 
  isLoading: boolean;
  isError: boolean;
  updateNote: (id: string, title: string, code: string) => Promise<void>;
  deleteNote: (id: string) => Promise<void>;
  togglePublic: (id: string, isPublic: boolean) => Promise<void>;
  addFavorite: (id: string) => Promise<void>;
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

  const { data: session } = authClient.useSession();
  const isAuthenticated = !!session?.user;

  const { data: notes = [], isLoading, isError } = useNotesQuery(isAuthenticated);
  const { data: publicNotes = [], isLoading: isPublicLoading, isError: isPublicError } = usePublicNotesQuery();
  const { data: favoritesNotes = [], isLoading: isFavoritesLoading, isError: isFavoritesError } = useMyFavoritesQuery(isAuthenticated);
  
  const updateMutation = useUpdateNoteMutation();
  const deleteMutation = useDeleteNoteMutation();
  const togglePublicMutation = useTogglePublicNoteMutation();
  const addFavoriteMutation = useAddFavoriteMutation();

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

  const togglePublic = useCallback(
    async (id: string, isPublic: boolean) => {
      try {
        await togglePublicMutation.mutateAsync({ id, isPublic });
        setToastType("success");
        setToastTitle("Visibilidade alterada com sucesso!");
        setToastDesc(`Sua nota agora é ${isPublic ? "pública" : "privada"}.`);
        setToastOpen(true);
      } catch (error) {
        console.error("Erro ao alterar visibilidade da nota:", error);
        setToastType("error");
        setToastTitle("Erro ao alterar visibilidade");
        setToastDesc("Ocorreu um erro ao alterar a visibilidade da nota.");
        setToastOpen(true);
      }
    }, [togglePublicMutation]
  )

  const addFavorite = useCallback(
    async (id: string) => {
      try {
        await addFavoriteMutation.mutateAsync(id);
        setToastType("success");
        setToastTitle("Favorito alterado com sucesso!");
        setToastDesc("Sua nota foi adicionada ou removida dos favoritos.");
        setToastOpen(true);
      } catch (error) {
        console.error("Erro ao alterar favorito da nota:", error);
        setToastType("error");
        setToastTitle("Erro ao alterar favorito");
        setToastDesc("Ocorreu um erro ao alterar o favorito da nota.");
        setToastOpen(true);
      }
    }, [addFavoriteMutation]
  )

  return (
    <NotesContext.Provider value={{ notes, isLoading, isError, updateNote, deleteNote, togglePublic, publicNotes, isPublicLoading, isPublicError, addFavorite, favoritesNotes, isFavoritesLoading, isFavoritesError }}>
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

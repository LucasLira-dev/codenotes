import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { NotesService } from "@/service/notesService";

export const notesKeys = {
  all: ["notes"] as const,
};

export interface Note {
  id: string;
  title: string;
  code: string;
  language: string;
  createdAt: string;
  updatedAt: string;
}

export function useNotesQuery() {
  return useQuery({
    queryKey: notesKeys.all,
    queryFn: () => {
      const notesService = new NotesService();
      return notesService.getNotes();
    },
  });
}

export function useCreateNoteMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      title,
      code,
      language,
    }: {
      title: string;
      code: string;
      language: string;
    }) => {
      const notesService = new NotesService();
      return notesService.createNote({
        title,
        code,
        language,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: notesKeys.all });
    },
  });
}

export function useUpdateNoteMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      title,
      code,
    }: {
      id: string;
      title: string;
      code: string;
    }) => {
      const notesService = new NotesService();
      return notesService.editNote(id, {
        title,
        code,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: notesKeys.all });
    },
  });
}

export function useDeleteNoteMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => {
      const notesService = new NotesService();
      return notesService.deleteNote(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: notesKeys.all });
    },
  });
}

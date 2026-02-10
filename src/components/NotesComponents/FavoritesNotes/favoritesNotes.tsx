'use client';

import { useNotes } from "@/contexts/NotesContext";
import { DisplayNotes } from "../DisplayNotes/displayNotes"

export const FavoritesNotes = () => {

    const { isFavoritesLoading } = useNotes();

    return (
        <DisplayNotes
        notesType="favorites"
        isLoading={isFavoritesLoading}
         />
    )
}
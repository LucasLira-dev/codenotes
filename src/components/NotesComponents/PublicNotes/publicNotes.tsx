'use client';

import { useNotes } from "@/contexts/NotesContext";
import { DisplayNotes } from "../DisplayNotes/displayNotes"

export const PublicNotes = () => {

    const { isPublicLoading } = useNotes();

    return (
        <DisplayNotes
        notesType="public"
        isLoading={isPublicLoading}
         />
    )
}
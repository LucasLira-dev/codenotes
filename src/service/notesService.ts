interface CreateNoteData {
    title: string;
    code: string;
    language: string;
}

interface UpdateNoteData {
    title: string;
    code: string;
    language: string;
}

export class NotesService {

    async createNote(data: CreateNoteData) {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/notes`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                title: data.title,
                code: data.code,
                language: data.language
            }),
            credentials: "include",
        });

        if (!res.ok) {
            throw new Error("Failed to create note");
        }

        return await res.json();
    }

    async getNotes() {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/notes`, {
            method: "GET",
            credentials: "include",
        });

        if (!res.ok) {
            throw new Error("Failed to fetch notes");
        }

        return await res.json();
    }

    async editNote(id: string, data: Partial<UpdateNoteData>) {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/notes/${id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
            credentials: "include",
        });

        if (!res.ok) {
            throw new Error("Failed to edit note");
        }

        return await res.json();
    }

    deleteNote(id: string) {
        return fetch(`${process.env.NEXT_PUBLIC_API_URL}/notes/${id}`, {
            method: "DELETE",
            credentials: "include",
        });
    }

    searchNotes(query: string) {
        return fetch(`${process.env.NEXT_PUBLIC_API_URL}/notes/search?search=${encodeURIComponent(query)}`, {
            method: "GET",
            credentials: "include",
        });
    }

    async togglePublic(id: string, isPublic: boolean) {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/notes/${id}/visibility`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ isPublic }),
            credentials: "include",
        });

        if (!res.ok) {
            throw new Error("Failed to toggle public status");
        }

        return await res.json();
    }

    async getPublicNotes() {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/notes/publicNotes`, {
            method: "GET",
            credentials: "include",
        });

        if (!res.ok) {
            throw new Error("Failed to fetch public notes");
        }

        return await res.json();
    }

    async addFavorite(notedId: string) {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/favorites`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ noteId: notedId }),
            credentials: "include",
        });

        if (!res.ok) {
            throw new Error("Failed to add favorite");
        }

        return await res.json();
    }
    
    async getMyFavorites(){
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/favorites`, {
            method: "GET",
            credentials: "include",
        });

        if (!res.ok) {
            throw new Error("Failed to fetch favorite notes");
        }

        return await res.json();
    }
}

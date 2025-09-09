interface CreateNoteData {
    title: string;
    code: string;
    language: string;
    token: string;
}

interface UpdateNoteData {
    title: string;
    code: string;
    language: string;
    token: string;
}

export class NotesService {

    async createNote(data: CreateNoteData) {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/note`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${data.token}`
            },
            body: JSON.stringify({
                title: data.title,
                code: data.code,
                language: data.language
            })
        });

        if (!res.ok) {
            throw new Error("Failed to create note");
        }

        return await res.json();
    }

    async getNotes(token: string) {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/note/my-notes`, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${token}`
            }
        });

        if (!res.ok) {
            throw new Error("Failed to fetch notes");
        }

        return await res.json();
    }

    async editNote(id: number, data: Partial<UpdateNoteData>) {
        const {token, ...fields} = data
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/note/${id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify(fields)
        });

        if (!res.ok) {
            throw new Error("Failed to edit note");
        }

        return await res.json();
    }

    deleteNote(id: number, token: string) {
        return fetch(`${process.env.NEXT_PUBLIC_API_URL}/note/${id}`, {
            method: "DELETE",
            headers: {
                "Authorization": `Bearer ${token}`
            }
        });
    }

    searchNotes(query: string, token: string) {
        return fetch(`${process.env.NEXT_PUBLIC_API_URL}/note/search/${encodeURIComponent(query)}`, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${token}`
            }
        });
    }
}
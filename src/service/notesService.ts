interface CreateNoteData {
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

}
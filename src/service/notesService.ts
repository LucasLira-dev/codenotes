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

}
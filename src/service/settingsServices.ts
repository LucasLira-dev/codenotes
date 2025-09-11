
export class SettingsService {

    async updateEmail(token: string, newEmail: string) {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/updateEmail`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify({
                email: newEmail
            })
        });

        if (!res.ok) {
            throw new Error("Erro ao atualizar email");
        }

        return await res.json();
    }

    async updatePassword(token: string, currentPassword: string, newPassword: string) {
        console.log("enviando para api:", {token, currentPassword, newPassword });
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/updatePassword`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify({
                currentPassword,
                newPassword
            })
        });

        if (!res.ok) {
            const errorJson = await res.json();
            throw new Error(errorJson.message || "Erro ao atualizar senha");
        }

        return await res.json();
    }

    async deleteAccount(token: string){
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/deleteAccount`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }
        });

        if (!res.ok) {
            const errorJson = await res.json();
            throw new Error(errorJson.message || "Erro ao deletar conta");
        }

        return await res.json();
    }
}
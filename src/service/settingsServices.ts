export class SettingsService {

    async updateEmail(newEmail: string, password: string) {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/updateEmail`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email: newEmail,
                password: password
            }),
            credentials: "include",
        });

        const data = await res.json();

        if (!res.ok) {
            throw new Error(data.message || "Erro ao atualizar email");
        }

        return data
    }

    async updatePassword(currentPassword: string, newPassword: string) {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/updatePassword`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                currentPassword,
                newPassword
            }),
            credentials: "include",
        });

        if (!res.ok) {
            const errorJson = await res.json();
            throw new Error(errorJson.message || "Erro ao atualizar senha");
        }

        return await res.json();
    }

    async deleteAccount(){
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/deleteAccount`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "include",
        });

        if (!res.ok) {
            const errorJson = await res.json();
            throw new Error(errorJson.message || "Erro ao deletar conta");
        }

        return await res.json();
    }
}

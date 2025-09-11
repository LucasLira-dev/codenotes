'use client'

import { FaRegTrashAlt } from "react-icons/fa";

import { useState } from "react";
import { DeleteAccountModal } from "../DeleteAccountModal/deleteAccountModal";
import { SettingsService } from "@/service/settingsServices";
import { useSession, signOut, } from "next-auth/react";
import { useRouter } from "next/navigation";

export const DeleteAccount = () => {

    const [isOpen, setIsOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const { data: session } = useSession();
    const router = useRouter();

    const handleDeleteAccount = async () => {
        setIsLoading(true);
        if (!session?.accessToken) return;

        try {
            const settingsService = new SettingsService();
            await settingsService.deleteAccount(session?.accessToken);
            await signOut({ redirect: false });
            router.push("/login");
            setIsLoading(false);
        }
        catch{
            alert("Erro ao deletar conta");
            setIsLoading(false);
        }
    }

    return(
        <section
        className="bg-[var(--card)] p-6 rounded-lg w-full flex flex-col gap-6 border border-[var(--destructive)] shadow-sm">
            <DeleteAccountModal 
            open={isOpen} 
            onClose={() => setIsOpen(false)} 
            onConfirm={() => handleDeleteAccount()} 
            isLoading={isLoading} />
            <div
            className="flex flex-col">
                <div
                className="flex items-center gap-2 text-[var(--destructive)]">
                    <h2
                    className="text-xl font-semibold mb-4">
                        Deletar Conta
                    </h2>
                </div>
                <p
                    className="text-sm text-[var(--muted-foreground)]">
                    Deletar sua conta é uma ação permanente e irreversível. Todos os seus dados serão perdidos.
                </p>
            </div>

            <button
            className="px-2 py-2 bg-[var(--destructive)] text-white rounded-md hover:bg-red-700 transition max-w-[180px] flex items-center justify-center gap-2 cursor-pointer font-semibold"
            aria-label="Deletar conta"
            onClick={() => setIsOpen(true)}>
                <FaRegTrashAlt />
                Deletar Conta
            </button>
        </section>
    )
}
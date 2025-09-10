import { ArrowLeft } from "lucide-react";
import Link from "next/link";

import { EmailSettings } from '@/components/SettingsComponents/EmailSettings/emailSettings'
import { PasswordSettings } from '@/components/SettingsComponents/PasswordSettings/passwordSettings'
import { DeleteAccount } from "@/components/SettingsComponents/DeleteAccount/deleteAccount";

export default function Settings(){
    return(
        <>
            <header
            className="flex bg-[var(--header)] justify-start items-center p-4 border-b-1 border-b-[var(--border)] w-full gap-6">
                <Link
                href="/"
                className="inline-flex items-center gap-2 text-[var(--muted-foreground)] hover:text-[var(--foreground)] transition-colors"
                >
                    <ArrowLeft className="h-4 w-4" />
                    Voltar
                </Link>
                <div
                className="flex flex-col">
                    <h1
                    className="text-2xl font-bold text-[var(--foreground)]">
                        Configurações
                    </h1>
                    <p
                    className="text-[var(--muted-foreground)]">
                        Gerencie sua conta e segurança
                    </p>
                </div>
            </header>
            <main className="flex flex-col items-center min-h-screen p-4 bg-[var(--background)] gap-4">
                 <div className="flex flex-col w-full gap-4 md:max-w-5xl">
                    <EmailSettings />
                    <PasswordSettings />
                    <DeleteAccount />
                </div>
            </main>
        </>
    )
}
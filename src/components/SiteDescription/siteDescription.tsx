'use client'

import { authClient } from "@/lib/auth-client";
import Link from "next/link"

export const SiteDescription = () => {

    const { data, isPending } = authClient.useSession();
    
    const getDestination = () => {
        if (isPending) return "/login";
        return data ? "/editor" : "/login";
      };

    return(
        <section
        className="flex flex-col justify-center items-center px-4 py-10 mt-10 max-w-4xl mx-auto">
            <p
            className="bg-[var(--accent)] hover:brightness-90 rounded-full px-3 mb-4 text-[13px] font-normal text-[var(--background)]">
                Plataforma para Programadores
            </p>
            <h2
            className="text-4xl md:text-6xl font-bold text-foreground mb-6 text-[var(--foreground)]">
                Organize seus <span className="text-[var(--primary)]">estudos de programação </span> em um só lugar
            </h2>
            <p
            className="text-center text-[16px] md:text-[18px] text-[var(--muted-foreground)] max-w-2xl mb-6">
                CodeNotes combina um editor de anotações rico com um editor de código interativo, permitindo documentar conceitos e ilustrá-los com exemplos práticos.
            </p>
            <div
            className="flex items-center gap-4">
                <Link
                href={getDestination()}
                className="bg-[var(--primary)] text-[var(--background)] hover:brightness-90 py-1 px-3 rounded cursor-pointer">
                    Começar agora
                </Link>
                <Link
                href="/demo"
                className="bg-[var(--background)] border-1 border-[var(--border)] text-[var(--foreground)] hover:brightness-90 py-1 px-3 rounded cursor-pointer">
                    Ver Demo
                </Link>
            </div>
        </section>
    )
}
'use client'

import { Chatbot } from "@/components/Chatbot/chatbot";
import Loading from "@/components/Loading/loading";
import { SearchInformations } from "@/components/SearchComponents/SearchInformations/searchInformations";
import { ArrowLeft } from "lucide-react";
import { authClient } from "@/lib/auth-client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { FaCode } from "react-icons/fa";

export default function Search() {

    const { data: session, isPending } = authClient.useSession();
    const router = useRouter();

    useEffect(() => {
      if (!isPending && !session) {
        router.push("/login");
      }
    }, [isPending, router, session]);

    if (isPending) {
      return <Loading />;
    }

    if (!session) {
      router.push("/login");
    }

    return (
      <div
      className="bg-[var(--background)] min-h-screen w-full flex flex-col">
        <header className="flex gap-3 md:gap-1 bg-[var(--header)] items-center p-4 border-b-1 border-b-[var(--border)]">
          <div>
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-[var(--muted-foreground)] hover:text-[var(--foreground)] transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              Voltar <span className="hidden sm:block"> ao início </span>
            </Link>
          </div>

          <div className="flex items-center gap-2 text-2xl font-bold sm:ml-10 sm:mr-10 md:ml-15 md:mr-15">
            <FaCode className="text-[var(--primary)]" />
            <span className="text-[var(--foreground)]">CodeNotes</span>
          </div>
        </header>
        <main className="bg-[var(--background)] flex flex-col items-center min-h-screen w-full max-w-[1000px] mx-auto px-4">
          <Chatbot />
          <section className="flex flex-col items-center w-full py-16 gap-4">
                <article>
                <h1 className="text-3xl font-bold text-[var(--foreground)] mb-2">
                    Buscar Anotações
                </h1>
                <p className="text-[var(--muted-foreground)]">
                    Encontre suas anotações salvas rapidamente.
                </p>
                </article>
                <SearchInformations
                />  
            </section>
        </main>
      </div>
    );
}
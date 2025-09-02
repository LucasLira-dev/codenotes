'use client'

import Loading from "@/components/Loading/loading";
import  NoteInformations from "@/components/NotesComponents/NoteInformations/noteInformations"
import { NotesMenu } from "@/components/NotesComponents/NotesMenu/notesMenu";
import { NotesProvider } from "@/contexts/NotesContext";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FaBars, FaPlus } from "react-icons/fa";

export default function Notes(){

    const [menuOpen, setMenuOpen] = useState(false);
    const [isDesktop, setIsDesktop] = useState(false);

  // Detecta se é desktop (md: 768px ou maior)
  useEffect(() => {
    const checkScreen = () => setIsDesktop(window.innerWidth >= 768);
    checkScreen();
    window.addEventListener("resize", checkScreen);
    return () => window.removeEventListener("resize", checkScreen);
  }, []);

  const { data: session, status } = useSession()
    const router = useRouter()
  
    useEffect(() => {
      if (status === "unauthenticated") {
        router.push("/login")
      }
    }, [status, router, session?.accessToken])
  
    if (status === "loading") {
      return <Loading />
    }
  
    if (status === "unauthenticated" || !session?.accessToken) {
      router.push("/login")
    }

    return (
      <NotesProvider>
        {!isDesktop && menuOpen && (
          <div className="fixed inset-0 z-50">
            <NotesMenu 
            onClose={() => setMenuOpen(false)} 
            isDesktop={isDesktop}/>
            {/* Overlay para fechar ao clicar fora */}
            <div
              className="fixed inset-0 bg-black/40"
              onClick={() => setMenuOpen(false)}
            />
          </div>
        )}

        {isDesktop && (
          <NotesMenu onClose={() => {}} isDesktop={isDesktop} />
        )}

      <div
      className={isDesktop ? "ml-56" : ""}>
        <header className="bg-[var(--header)] flex justify-between items-center p-4 border-b-1 border-b-[var(--border)]">
          <div className="flex gap-2 text-white items-center">
            {
              !isDesktop && (
                  <button
                  className="p-2 rounded hover:bg-[var(--chart2-secondary)] transition-colors cursor-pointer"
                  onClick={() => setMenuOpen(true)}
                  >
                    <FaBars size={14} />
                  </button>
              )
            }
            <div className="flex flex-col">
              <h1
              className="text-lg font-bold">
                Dashboard
              </h1>
              <p
              className="text-sm text-gray-400">
                Gerencie suas anotações e códigos
              </p>
            </div>
          </div>
          <button
          className="bg-[var(--primary)] text-[var(--chart5-primary)] hover:brightness-90 py-1 px-3 rounded cursor-pointer flex items-center gap-3">
            <FaPlus size={14} />
            <span
              className="font-semibold text-[var(--chart5-primary)]"
            >
              <span className="md:hidden"> Nova </span> 
              <span className="hidden md:block"> Nova Nota </span>
            </span>
          </button>
        </header>
        <main className="bg-[var(--background)] min-h-screen">
          {/* <EmptyNotes /> */}
          <NoteInformations />
        </main>
      </div>
      </NotesProvider>
    );
}
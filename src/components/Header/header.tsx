'use client'

import { FaCode } from "react-icons/fa";
import { useSession } from 'next-auth/react'
import Link from "next/link";

export const Header = () => {

  const { data, status } = useSession();

  // Função para determinar o destino do botão
  const getDestination = () => {
    if (status === "loading") return "/login"; // Enquanto carrega
    if (status === "unauthenticated") return "/login"; // Não logado
    if (data?.accessToken) return "/editor"; // Logado com token válido
    return "/login"; // Logado mas sem token (expirado)
  };

  return (
    <header
    className="bg-[var(--header)] flex justify-between items-center p-4 border-b-1 border-b-[var(--border)]">
      <div
      className="flex items-center gap-2 text-2xl font-bold sm:ml-10 sm:mr-10 md:ml-15 md:mr-15">
        <FaCode
        className="text-[var(--primary)]"
         />
        <span
        className="text-[var(--foreground)]">
            CodeNotes
        </span>
      </div>
      <div
      className="flex gap-3 sm:ml-10 sm:mr-10 md:ml-15 md:mr-15 text-[14px] font-normal">
        <Link
        href={data?.accessToken ? "/search" : "/login"}
        className="text-[var(--foreground)] hover:bg-[var(--chart1-primary)] hover:text-black py-1 px-3 rounded cursor-pointer">
            Buscar
        </Link>
        <Link
        className="bg-[var(--primary)] text-black hover:brightness-90 py-1 px-3 rounded cursor-pointer"
        href={getDestination()}>
            Começar
        </Link>
      </div>
    </header>
  );
};
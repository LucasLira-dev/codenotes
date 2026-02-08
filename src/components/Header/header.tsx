'use client'

import { FaCode } from "react-icons/fa";
import { authClient } from "@/lib/auth-client";
import Link from "next/link";

export const Header = () => {

  const { data, isPending } = authClient.useSession();

  const getDestination = () => {
    if (isPending) return "/login";
    return data ? "/editor" : "/login";
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
        href={data ? "/search" : "/login"}
        className="text-[var(--foreground)] hover:bg-[var(--chart1-primary)] hover:text-[var(--background)] py-1 px-3 rounded cursor-pointer">
            Buscar
        </Link>
        <Link
        className="bg-[var(--primary)] text-[var(--background)] hover:brightness-90 py-1 px-3 rounded cursor-pointer"
        href={getDestination()}>
            Começar
        </Link>
      </div>
    </header>
  );
};
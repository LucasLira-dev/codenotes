'use client'

import { FaCode, FaPlus } from 'react-icons/fa'
import { LuNotebookText } from "react-icons/lu";
import { CiSettings } from "react-icons/ci";
import { MdOutlineExitToApp } from "react-icons/md";
import Link from 'next/link';

import { authClient } from "@/lib/auth-client";
import { Button } from '@/components/ui/button';

interface NotesMenuProps {
    onClose: () => void,
    isDesktop: boolean
}

export const NotesMenu = ({ onClose, isDesktop }: NotesMenuProps) => {
    return (
        <aside className="fixed left-0 top-0 h-full max-h-screen w-56 bg-[#1E293B] flex flex-col border-r border-[var(--border)] z-50 overflow-y-auto ">
            <div className="flex justify-between items-center mb-6 mt-6 px-4 pb-2 border-b-1 border-b-[var(--border)]">
                <div className="flex gap-2 text-[16px]">
                    <FaCode className="text-[var(--primary)] mt-1" />
                    <span className="font-bold text-[var(--foreground)]">
                        CodeNotes
                    </span>
                </div>
                { !isDesktop && (
                    <button
                        onClick={onClose}
                        className="text-[var(--foreground)] text-lg px-2 py-1 rounded hover:bg-[var(--chart2-secondary)] transition-colors"
                        aria-label="Fechar menu"
                    >
                        x
                    </button>
                )}
            </div>
            <nav className="flex flex-col h-full justify-between gap-4 px-4">
                <div
                className="flex flex-col">
                    <div
                    className="flex gap-3 px-3 py-2  items-center hover:bg-[var(--chart2-secondary)] rounded">
                        <LuNotebookText className="text-[var(--foreground)]" />
                        <a href="/notes" className="text-[var(--foreground)]">Minhas notas</a>
                    </div>
                    <Link
                    href="/editor"
                    aria-label='Ir para página do editor'
                    className='flex gap-1 px-3 items-center hover:bg-[var(--chart2-secondary)] rounded cursor-pointer'>
                        <FaPlus className="text-[var(--foreground)] " />
                        <Button
                        className="text-[var(--foreground)] cursor-pointer"
                        >
                            Editor
                        </Button>
                    </Link>
                    
                </div>

                <div
                className="flex flex-col mb-6 border-t-1 border-t-[var(--border)]">
                    <Link
                    href="/settings"
                    aria-label='Ir para página de configurações'
                    className='flex px-3 items-center hover:bg-[var(--chart2-secondary)] rounded cursor-pointer'>
                        <CiSettings className="text-[var(--foreground)]" />
                        <Button
                        className="text-[var(--foreground)] cursor-pointer"
                        aria-label='Ir para página de configurações'>
                            Configurações
                        </Button>
                    </Link>
                    <div
                    className='flex gap-3 items-center px-3 py-1 hover:bg-[var(--chart2-secondary)] rounded cursor-pointer'>
                        <MdOutlineExitToApp className="text-[var(--foreground)]" />
                        <button 
                        className="text-[var(--foreground)]"
                        onClick={() => authClient.signOut()}
                        aria-label='Sair'
                        > Sair </button>
                    </div>
                </div>

            </nav>
        </aside>
    )
}
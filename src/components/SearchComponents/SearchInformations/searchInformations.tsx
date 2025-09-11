'use client'

import { useState } from 'react'
import { IoIosSearch } from "react-icons/io";

import { NotesService } from '@/service/notesService';
import { useSession } from 'next-auth/react';
import { SearchResults } from '../SearchResults/searchResults';

export const SearchInformations = () => {

    const { data: session } = useSession();

    const [notes, setNotes] = useState([])
    const [searching, setSearching] = useState(false)
    const [searchTerm, setSearchTerm] = useState('')
    const [showResults, setShowResults] = useState(false)
    const isDisabled = searchTerm.trim() === ''

    const handleSearchTermChange = () => {
        if (!session?.accessToken) return;
        setSearching(true)
        const notesService = new NotesService();
        notesService.searchNotes(searchTerm.trim(), session.accessToken)
        .then(response => response.json())
        .then(data => {
            setNotes(data);
            setSearching(false);
            setShowResults(true)
        })
    }

    return(
        <article
        className="flex flex-col items-center w-full gap-4 mt-8">
            <div
            className="flex items-center gap-2 text-[var(--foreground)] mb-8">
                <div
                className="w-full relative">
                    <IoIosSearch
                    className="absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-400"
                    />
                    <input
                    type="text"
                    placeholder="Pesquise por titulo, linguagem ou código..."
                    className="w-full pl-10 px-4 py-2 border border-[var(--border)] rounded bg-[var(--input)] text-[var(--foreground)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)]"
                    onChange={(e) => setSearchTerm(e.target.value)}
                    value={searchTerm}
                    />
                </div>
                <button
                className={isDisabled ? `px-4 py-2 bg-[var(--chart1-primary)] text-white rounded cursor-not-allowed` : `px-4 py-2 bg-[var(--primary)] text-white rounded hover:bg-[var(--chart2-primary)] transition-colors cursor-pointer`}
                disabled={isDisabled}
                onClick={handleSearchTermChange}>
                    { searching ? 'Buscando...' : 'Buscar' }
                </button>
            </div>

            <div
            className="flex flex-col items-center gap-2 text-[var(--foreground)] mb-10">
                <div
                className="rounded-full bg-[var(--muted)] w-[65px] h-[65px] flex items-center justify-center font-bold">
                    <IoIosSearch
                    className="w-10 h-10 text-[var(--muted-foreground)]" />
                </div>
                <h3
                className="text-2xl font-bold">
                    Comece sua busca
                </h3>
                <p
                className="text-center text-[var(--muted-foreground)] max-w-md"
                >
                    Digite um termo no campo acima para encontrar suas anotações. A busca procura em títulos, descrições e códigos.
                </p>
            </div>

            { showResults && (
                <SearchResults
                searchTerm={searchTerm}
                notes={notes}
                />
            )}
        </article>
    )
}
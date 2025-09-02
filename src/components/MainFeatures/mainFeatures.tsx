import { LuFileText, LuZap } from "react-icons/lu";
import { FaCode } from "react-icons/fa";
import { BsTags } from "react-icons/bs";
import { IoSearch } from "react-icons/io5";
import { FiUsers } from "react-icons/fi";
import { CardFeature } from "./cardFeature";


const cardInformations = [
    {
        icone: <LuFileText className="h-10 w-10 text-[var(--primary)] mb-2"/>,
        title: 'Editor de Anotações',
        description: 'Crie notas com formatação rica, listas, links e imagens para documentar seus estudos'
    },
    {
        icone: <FaCode className="h-10 w-10 text-[var(--primary)] mb-2"/>,
        title: 'Editor de Código',
        description: 'Syntax highlighting para múltiplas linguagens e editor interativo integrado'
    },
    {
        icone: <BsTags className="h-10 w-10 text-[var(--primary)] mb-2"/>,
        title: 'Organização',
        description: 'Tags e categorias para classificar notas por linguagem ou tema'
    },
    {
        icone: <IoSearch className="h-10 w-10 text-[var(--primary)] mb-2"/>,
        title: 'Busca Rápida',
        description: 'Encontre rapidamente suas anotações e exemplos de código'
    },
    {
        icone: <FiUsers className="h-10 w-10 text-[var(--primary)] mb-2"/>,
        title: 'Multi-usuário',
        description: 'Cada usuário possui seu próprio caderno de anotações personalizado'
    },
    {
        icone: <LuZap className="h-10 w-10 text-[var(--primary)] mb-2"/>,
        title: 'Interface Moderna',
        description: 'Design inspirado no Notion e Obsidian com modo claro e escuro'
    },
]

export const MainFeatures = () =>{
    return(
        <section
        className="flex flex-col items-center justify-center mt-15">
            <h2
            className="font-bold text-2xl text-[var(--foreground)] mb-4">
                Funcionalidades Principais
            </h2>
            <p
            className="text-center text-[16px] md:text-[18px] text-[var(--muted-foreground)] max-w-2xl mb-6">
                Tudo que você precisa para organizar e documentar seu aprendizado em programação
            </p>
            <article
            className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-6xl px-4">
                { cardInformations.map((card, index) =>(
                    <CardFeature
                        key={index}
                        icon={card.icone}
                        title={card.title}
                        description={card.description}
                    />
                ))}
            </article>
        </section>
    )
}
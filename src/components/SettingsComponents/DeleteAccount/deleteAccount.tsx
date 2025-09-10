import { FaRegTrashAlt } from "react-icons/fa";

export const DeleteAccount = () => {
    return(
        <section
        className="bg-[var(--card)] p-6 rounded-lg w-full flex flex-col gap-6 border border-[var(--destructive)] shadow-sm">
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
            className="px-2 py-2 bg-[var(--destructive)] text-white rounded-md hover:bg-red-700 transition max-w-[180px] flex items-center justify-center gap-2 cursor-pointer font-semibold">
                <FaRegTrashAlt />
                Deletar Conta
            </button>
        </section>
    )
}
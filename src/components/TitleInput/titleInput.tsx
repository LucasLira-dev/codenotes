import { useEditor } from "@/contexts/EditorContext";

export const TitleInput = () => {
    const { title, setTitle } = useEditor();

    return (
    <>
        <h3
        className="text-[var(--foreground)] mb-1 font-semibold">
            Descrição
        </h3>
        <textarea
        value={title}
        className="border-1 border-[var(--border)] bg-[var(--background)] text-[var(--foreground)] py-1 px-2 rounded w-full h-30"
        placeholder="Descreva sua nota aqui..."
        onChange={(e) => setTitle(e.target.value)}
        />
      </> 
    );
};

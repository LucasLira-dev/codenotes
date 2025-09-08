import { useEditorDemo } from "@/contexts/DemoContext";


export const TitleInputDemo = () => {
    const { titleDemo, setTitleDemo } = useEditorDemo();

    return (
    <>
        <h3
        className="text-[var(--foreground)] mb-1 font-semibold">
            Descrição
        </h3>
        <textarea
        value={titleDemo}
        className="border-1 border-[var(--border)] bg-[var(--background)] text-[var(--foreground)] py-1 px-2 rounded w-full h-30"
        placeholder="Descreva sua nota aqui..."
        onChange={(e) => setTitleDemo(e.target.value)}
        minLength={3}
        />
      </> 
    );
};

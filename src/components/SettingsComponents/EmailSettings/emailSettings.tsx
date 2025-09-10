import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { MdOutlineEmail } from "react-icons/md";

export const EmailSettings = () => {
    return(
        <section
        className="bg-[var(--card)] p-6 rounded-lg w-full flex flex-col gap-6 border border-[var(--border)] shadow-sm">
            <div
            className="flex flex-col">
                <div
                className="flex items-center gap-2 text-[var(--foreground)]">
                    <MdOutlineEmail />
                    <h2
                    className="text-xl font-semibold">
                        Informações da conta
                    </h2>
                </div>
                <p
                className="text-sm text-[var(--muted-foreground)]">
                    Atualize suas informações básicas
                </p>
            </div>

            <div className="space-y-2">
                <Label 
                htmlFor="email"
                className="text-[var(--foreground)]"
                >
                    Email
                </Label>
                <Input
                id="email"
                name="email"
                type="email"
                placeholder="seu@email.com"
                className="bg-[var(--input)] border-[var(--border)] text-[var(--foreground)]"
                />
            </div>

            <button
            className="px-4 py-2 bg-[var(--primary)] text-[var(--background)] rounded-md hover:bg-[var(--secondary)] transition max-w-[180px] cursor-pointer font-semibold">
                Atualizar Email
            </button>
        </section>
    )
}
'use client'

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { MdOutlineEmail } from "react-icons/md";

import { useSession, signIn } from "next-auth/react";

import { useState } from "react";
import { SettingsService } from "@/service/settingsServices";
import { CustomToast } from '@/components/Toast/toast';

export const EmailSettings = () => {
    const { data: session } = useSession();
    const [isLoading, setIsLoading] = useState(false);
    const [toastOpen, setToastOpen] = useState(false);
    const [toastType, setToastType] = useState<"success" | "error">("success");
    const [toastTitle, setToastTitle] = useState("");
    const [toastDesc, setToastDesc] = useState("");

    const [email, setEmail] = useState<string | null | undefined>(session?.user.email);
    const [password, setPassword] = useState("");

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    const handleUpdateEmail = async () => {
        if (!email || email === session?.user.email) return;
        if (!password) {
            setToastOpen(true);
            setToastType("error");
            setToastTitle("Senha obrigatória");
            setToastDesc("Digite sua senha para confirmar a alteração.");
            return;
        }

        if (!emailRegex.test(email)) {
            setToastOpen(true);
            setToastType("error");
            setToastTitle("Email inválido");
            setToastDesc("Por favor, insira um email válido.");
            return;
        }

        try {
          setIsLoading(true);
          const settingsService = new SettingsService();
          if (session?.accessToken && email && password) {
            // Chama a API para atualizar o email
            await settingsService.updateEmail(
              session.accessToken,
              email,
              password
            );

            // Agora, tenta relogar para atualizar session
            const signInResult = await signIn("credentials", {
              email,
              password,
              redirect: false,
            });

            if (signInResult?.error) {
              setToastOpen(true);
              setToastType("error");
              setToastTitle("Erro ao fazer login");
              setToastDesc(
                "O e-mail foi alterado, mas não foi possível atualizar sua sessão. Faça login novamente."
              );
              setIsLoading(false);
              return;
            }

            setToastOpen(true);
            setToastType("success");
            setToastTitle("Email atualizado!");
            setToastDesc("Seu email foi atualizado com sucesso.");
            setPassword("");
          } else {
            throw new Error("No access token, email ou senha");
          }
        } catch (error) {
          setToastOpen(true);
          setToastType("error");
          setToastTitle("Erro ao atualizar email");
          setToastDesc("Senha incorreta ou erro ao atualizar seu email.");
          console.error("Erro ao atualizar email:", error);
          console.log(password);
        } finally {
          setIsLoading(false);
        }

    }

    return(
        <section
        className="bg-[var(--card)] p-6 rounded-lg w-full flex flex-col gap-6 border border-[var(--border)] shadow-sm">
            <CustomToast
            open={toastOpen}
            type={toastType}
            title={toastTitle}
            description={toastDesc}
            onOpenChange={setToastOpen}
            />
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
                value={email || ''}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="seu@email.com"
                className="bg-[var(--input)] border-[var(--border)] text-[var(--foreground)]"
                />
            </div>

            <div className="space-y-2">
                <Label 
                htmlFor="password"
                className="text-[var(--foreground)]"
                >
                    Senha atual
                </Label>
                <Input
                id="password"
                name="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Digite sua senha atual"
                className="bg-[var(--input)] border-[var(--border)] text-[var(--foreground)]"
                />
                <p className="text-xs text-[var(--muted-foreground)]">
                    Digite sua senha para confirmar a alteração do email
                </p>
            </div>

            <button
            className="px-4 py-2 bg-[var(--primary)] text-[var(--background)] rounded-md hover:bg-[var(--secondary)] transition max-w-[180px] cursor-pointer font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={!email || email === session?.user.email || !password || isLoading}
            aria-label="Atualizar email"
            onClick={handleUpdateEmail}>
                {isLoading ? 'Atualizando...' : 'Atualizar email'}
            </button>
        </section>
    )
}
'use client'

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useState } from "react";
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";
import { LuKey } from "react-icons/lu";

import { useSession } from "next-auth/react";

import { CustomToast } from "@/components/Toast/toast";
import { SettingsService } from "@/service/settingsServices";

export const PasswordSettings = () => {

  const { data: session } = useSession();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");

  const [toastOpen, setToastOpen] = useState(false);
  const [toastType, setToastType] = useState<"success" | "error">("success");
  const [toastTitle, setToastTitle] = useState("");
  const [toastDesc, setToastDesc] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const strongPasswordRegex = /^(?=(?:.*[A-Za-z]){5,})(?=.*[^A-Za-z0-9]).+$/;


  const handleUpdatePassword = async () => {

    if (newPassword !== confirmNewPassword) {
      setToastOpen(true);
      setToastType("error");
      setToastTitle("As senhas não coincidem");
      setToastDesc("Por favor, verifique se as senhas digitadas são iguais.");
      return;
    }

    if (!strongPasswordRegex.test(newPassword)) {
      setToastOpen(true);
      setToastType("error");
      setToastTitle("Senha fraca");
      setToastDesc("A senha deve conter pelo menos 5 letras e 1 caractere especial.");
      return;
    }

    try {
      setIsLoading(true);
      const settingsService = new SettingsService();
      if (session?.accessToken) {
          await settingsService.updatePassword(session.accessToken, currentPassword, newPassword);
          setIsLoading(false);
          setToastOpen(true)
          setToastType("success")
          setToastTitle("Senha atualizada!")
          setToastDesc("Sua senha foi atualizada com sucesso.")
      } else {
          setIsLoading(false);
          throw new Error("No access token");
      }
    } 
    catch(error: unknown) {
      let errorMsg = "Ocorreu um erro ao atualizar sua senha. Verifique se a senha atual está correta.";
      if (error instanceof Error && error.message) {
        errorMsg = error.message;
      } else if (
        typeof error === "object" &&
        error !== null &&
        "response" in error &&
        typeof (error as { response?: { text?: () => Promise<string> } }).response?.text === "function"
      ) {
        errorMsg = await (error as { response: { text: () => Promise<string> } }).response.text();
      }
      setToastOpen(true);
      setToastType("error");
      setToastTitle("Erro ao atualizar senha");
      setToastDesc(errorMsg);
      setIsLoading(false);
    }
  }

    return (
      <section className="bg-[var(--card)] p-6 rounded-lg w-full flex flex-col gap-6 border border-[var(--border)] shadow-sm">
        <CustomToast
          open={toastOpen}
          onOpenChange={setToastOpen}
          type={toastType}
          title={toastTitle}
          description={toastDesc}
        />
        <div className="flex flex-col">
          <div className="flex items-center gap-2 text-[var(--foreground)]">
            <LuKey />
            <h2 className="text-xl font-semibold">Segurança</h2>
          </div>
          <p className="text-sm text-[var(--muted-foreground)]">
            Atualize sua senha para manter sua conta segura
          </p>
        </div>

        <div className="space-y-2">
          <Label htmlFor="passwordAtual" className="text-[var(--foreground)]">
            Senha atual
          </Label>
          <div className="relative">
          <Input
            id="passwordAtual"
            name="passwordAtual"
            type={showCurrentPassword ? "text" : "password"}
            placeholder="********"
            className="bg-[var(--input)] border-[var(--border)] text-[var(--foreground)]"
            onChange={(e) => setCurrentPassword(e.target.value)}
          />
          <button
            type="button"
            onClick={() => setShowCurrentPassword(!showCurrentPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--muted-foreground)] hover:text-[var(--foreground)] transition-colors cursor-pointer"
            tabIndex={-1}
            >
              {showCurrentPassword ? <IoEyeOffOutline size={20} /> : <IoEyeOutline size={20} />}
            </button>
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="newPassword" className="text-[var(--foreground)]">
            Nova Senha
          </Label>
          <div className="relative">
            <Input
              id="newPassword"
              name="newPassword"
              type={showPassword ? "text" : "password"}
              placeholder="********"
              className="bg-[var(--input)] border-[var(--border)] text-[var(--foreground)]"
              onChange={(e) => setNewPassword(e.target.value)}
            />

            <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--muted-foreground)] hover:text-[var(--foreground)] transition-colors cursor-pointer"
            tabIndex={-1}
            >
              {showPassword ? <IoEyeOffOutline size={20} /> : <IoEyeOutline size={20} />}
            </button>
          </div>
        </div>

        <div className="space-y-2">
          <Label
            htmlFor="confirmNewPassword"
            className="text-[var(--foreground)]"
          >
            Confirmar Nova Senha
          </Label>
          <div className="relative">
            <Input
            id="confirmNewPassword"
            name="confirmNewPassword"
            type={showConfirmPassword ? "text" : "password"}
            placeholder="********"
            className="bg-[var(--input)] border-[var(--border)] text-[var(--foreground)]"
            onChange={(e) => setConfirmNewPassword(e.target.value)}
          />
            <button
            type="button"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--muted-foreground)] hover:text-[var(--foreground)] transition-colors cursor-pointer"
            tabIndex={-1}
            >
              {showConfirmPassword ? <IoEyeOffOutline size={20} /> : <IoEyeOutline size={20} />}
            </button>
          </div>
        </div>

        <button 
        className="px-4 py-2 bg-[var(--primary)] text-[var(--background)] rounded-md hover:bg-[var(--secondary)] transition max-w-[180px] cursor-pointer font-semibold"
        disabled={!currentPassword || !newPassword || !confirmNewPassword || isLoading}
        onClick={handleUpdatePassword}
        aria-label="Atualizar senha"
        >
          {isLoading ? 'Atualizando...' : 'Atualizar senha'}
        </button>
      </section>
    );
}
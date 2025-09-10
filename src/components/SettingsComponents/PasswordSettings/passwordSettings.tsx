'use client'

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useState } from "react";
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";
import { LuKey } from "react-icons/lu";

export const PasswordSettings = () => {

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);

    return (
      <section className="bg-[var(--card)] p-6 rounded-lg w-full flex flex-col gap-6 border border-[var(--border)] shadow-sm">
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

        <button className="px-4 py-2 bg-[var(--primary)] text-[var(--background)] rounded-md hover:bg-[var(--secondary)] transition max-w-[180px] cursor-pointer font-semibold">
          Atualizar Senha
        </button>
      </section>
    );
}
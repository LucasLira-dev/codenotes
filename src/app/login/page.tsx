"use client";

import type React from "react";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Code2, ArrowLeft } from "lucide-react";
import Link from "next/link";

import { IoEyeOutline, IoEyeOffOutline } from "react-icons/io5";

import { authClient } from "@/lib/auth-client";
import Loading from "@/components/Loading/loading";
import SocialLoginButtons from "@/components/AuthComponents/SocialLoginButtons/socialLoginButtons";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const { data: session, isPending } = authClient.useSession();

  useEffect(() => {
    if (!isPending && session) {
      router.push("/");
    }
  }, [isPending, router, session]);

  if (isPending) {
    return <Loading />;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const { error: signInError } = await authClient.signIn.email({
        email,
        password,
        callbackURL: `${process.env.NEXT_PUBLIC_FRONTEND_URL}/editor`,
      });

      if (signInError) {
        setError("Email ou senha inválidos");
      } else {
        router.push("/editor");
      }
    } catch (err) {
      setError("Erro ao fazer login. Tente novamente.");
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[var(--background)] via-[var(--card)] to-[var(--background)] flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-[var(--muted-foreground)] hover:text-[var(--foreground)] transition-colors mb-4"
          >
            <ArrowLeft className="h-4 w-4" />
            Voltar ao início
          </Link>
          <div className="flex items-center justify-center gap-2 mb-4">
            <Code2 className="h-8 w-8 text-[var(--primary)]" />
            <h1 className="text-2xl font-bold text-[var(--foreground)]">
              CodeNotes
            </h1>
          </div>
          <h2 className="text-xl font-semibold text-[var(--foreground)]">
            Bem-vindo de volta
          </h2>
          <p className="text-[var(--muted-foreground)]">
            Entre na sua conta para continuar
          </p>
        </div>

        {/* Login Form */}
        <Card className="border-[var(--border)] shadow-lg">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl text-center text-[var(--foreground)]">
              Entrar
            </CardTitle>
            <CardDescription className="text-center text-[var(--muted-foreground)]">
              Digite seu email e senha para acessar sua conta
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {error && (
              <div className="p-3 text-sm text-red-600 bg-red-50 border border-red-200 rounded-md">
                {error}
              </div>
            )}

            <SocialLoginButtons />

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-[var(--border)]" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-[var(--card)] px-2 text-[var(--muted-foreground)]">
                  ou continue com email
                </span>
              </div>
            </div>

            <form className="space-y-4" onSubmit={handleSubmit}>
              <div className="space-y-2">
                <Label htmlFor="email" className="text-[var(--foreground)]">
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="seu@email.com"
                  className="bg-[var(--input)] border-[var(--border)] text-[var(--foreground)]"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2 relative">
                <Label htmlFor="password" className="text-[var(--foreground)]">
                  Senha
                </Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    className="bg-[var(--input)] border-[var(--border)] text-[var(--foreground)]"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--muted-foreground)] hover:text-[var(--foreground)] transition-colors cursor-pointer"
                    tabIndex={-1}
                  >
                    {showPassword ? (
                      <IoEyeOffOutline size={20} />
                    ) : (
                      <IoEyeOutline size={20} />
                    )}
                  </button>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <input
                    id="remember"
                    type="checkbox"
                    className="rounded border-[var(--border)]"
                  />
                  <Label
                    htmlFor="remember"
                    className="text-sm text-[var(--muted-foreground)]"
                  >
                    Lembrar de mim
                  </Label>
                </div>
              </div>
              <Button
                type="submit"
                className="w-full text-[var(--foreground)] bg-[var(--primary)]"
                disabled={isLoading}
              >
                {isLoading ? "Entrando..." : "Entrar"}
              </Button>
            </form>

            <div className="text-center text-sm text-[var(--muted-foreground)]">
              <span>Não tem uma conta? </span>
              <Link
                href="/register"
                className="text-[var(--primary)] hover:underline"
              >
                Criar conta
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

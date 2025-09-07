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

import { signIn, useSession } from "next-auth/react";
import Loading from "@/components/Loading/loading";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const { data: session, status } = useSession();

  useEffect(() => {
    if (status === "authenticated") {
      router.push("/");
    }
  }, [status, router, session?.accessToken]);

  if (status === "loading") {
    return <Loading />;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      // Login via NextAuth
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
        callbackUrl: "/editor",
      });

      if (result?.error) {
        setError("Email ou senha inválidos");
      } else if (result?.ok || result?.url) {
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
                {/* <Link href="/forgot-password" className="text-sm text-[var(--primary)] hover:underline">
                  Esqueceu a senha?
                </Link> */}
              </div>
              <Button
                type="submit"
                className="w-full text-[var(--foreground)] bg-[var(--primary)]"
                disabled={isLoading}
              >
                {isLoading ? "Entrando..." : "Entrar"}
              </Button>
            </form>

            {/* <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-border" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-[var(--card)] px-2 text-[var(--muted-foreground)]">Ou continue com</span>
              </div>
            </div>

            <Button variant="outline" className="w-full bg-transparent text-[var(--foreground)] border-[var(--border)]">
              <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24">
                <path
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  fill="#4285F4"
                />
                <path
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  fill="#FBBC05"
                />
                <path
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  fill="#EA4335"
                />
              </svg>
              Entrar com Google
            </Button> */}

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

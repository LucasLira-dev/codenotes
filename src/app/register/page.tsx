'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Code2, ArrowLeft } from "lucide-react"
import Link from "next/link"
import CadastrarUsuario from "./action"
import { useRouter } from 'next/navigation'

export default function RegisterPage() {

  const router = useRouter()

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
            <h1 className="text-2xl font-bold text-[var(--foreground)]">CodeNotes</h1>
          </div>
          <h2 className="text-xl font-semibold text-[var(--foreground)]">Criar sua conta</h2>
          <p className="text-[var(--muted-foreground)]">Comece a organizar seus estudos hoje</p>
        </div>

        {/* Register Form */}
  <Card className="border-[var(--border)] shadow-lg">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl text-center text-[var(--foreground)]">Registrar</CardTitle>
            <CardDescription className="text-center text-[var(--muted-foreground)]">Crie sua conta gratuita para começar</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <form 
            className="space-y-4"
            onSubmit={
                async(e)=> {
                    e.preventDefault();
                    const form = e.currentTarget;
                    const formData = new FormData(form);
                    const result = await CadastrarUsuario({
                    userEmail: String(formData.get('email') ?? ''),
                    userPassword: String(formData.get('password') ?? ''),
                })
                if (result) {
                    router.push('/editor')
                }
            }}>
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
                  required
                />
              </div>
              <div className="space-y-2">
                <Label 
                htmlFor="password"
                className="text-[var(--foreground)]"
                >Senha</Label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="••••••••"
                  className="bg-[var(--input)] border-[var(--border)] text-[var(--foreground)]"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label 
                htmlFor="confirmPassword"
                className="text-[var(--foreground)]">
                    Confirmar senha
                </Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  placeholder="••••••••"
                  className="bg-[var(--input)] border-[var(--border)] text-[var(--foreground)]"
                  required
                />
              </div>
              <div className="flex items-center space-x-2">
                <input id="terms" type="checkbox" className="rounded border-[var(--border)]" required />
                <Label htmlFor="terms" className="text-sm text-[var(--muted-foreground)]">
                  Aceito os{" "}
                  <Link href="/terms" className="text-[var(--primary)] hover:underline">
                    termos de uso
                  </Link>{" "}
                  e{" "}
                  <Link href="/privacy" className="text-[var(--primary)] hover:underline">
                    política de privacidade
                  </Link>
                </Label>
              </div>
              <Button type="submit" className="w-full text-[var(--foreground)] bg-[var(--primary)]">
                Criar conta
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

            <Button 
            variant="outline" 
            className="w-full bg-transparent text-[var(--foreground)] border-[var(--border)]"
            onClick={() => signIn("google")}>
              <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24">
                <path
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  fill="#4285F4"
                />
                <path
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  fill="#34A853"
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
              Registrar com Google
            </Button> */}

            <div className="text-center text-sm text-[var(--muted-foreground)]">
              <span>Já tem uma conta? </span>
              <Link href="/login" className="text-[var(--primary)] hover:underline">
                Fazer login
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
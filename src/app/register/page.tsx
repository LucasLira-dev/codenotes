'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Code2, ArrowLeft } from "lucide-react"
import Link from "next/link"
import { useRouter } from 'next/navigation'
import { useEffect, useState } from "react"

import { IoEyeOutline, IoEyeOffOutline } from "react-icons/io5";
import { authClient } from "@/lib/auth-client"
import Loading from "@/components/Loading/loading"
import SocialLoginButtons from "@/components/AuthComponents/SocialLoginButtons/socialLoginButtons"


export default function RegisterPage() {

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const router = useRouter()
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const strongPasswordRegex = /^(?=(?:.*[A-Za-z]){5,})(?=.*[^A-Za-z0-9]).+$/;

  const { data: session, isPending } = authClient.useSession();
  
    useEffect(() => {
      if (!isPending && session) {
        router.push("/");
      }
    }, [isPending, router, session]);
  
    if (isPending) {
      return <Loading />;
    }

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
            {error && <p className="p-3 text-sm text-red-600 bg-red-50 border border-red-200 rounded-md">{error}</p>}

            <SocialLoginButtons />

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-[var(--border)]" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-[var(--card)] px-2 text-[var(--muted-foreground)]">
                  ou crie com email
                </span>
              </div>
            </div>

            <form 
            className="space-y-4"
            onSubmit={
                async(e)=> {
                    e.preventDefault();
                    setIsLoading(true)
                    const form = e.currentTarget;
                    const formData = new FormData(form);
                    const email = String(formData.get('email') ?? '').trim();
                    const password = String(formData.get('password') ?? '').trim();
                    const confirmPassword = String(formData.get('confirmPassword') ?? '').trim();

                    if (!emailRegex.test(email)) {
                      setError("Digite um email válido.");
                      setIsLoading(false);
                      return;
                    }

                    if (!strongPasswordRegex.test(password)) {
                      setError("A senha deve ter pelo menos 5 letras e 1 caractere especial.");
                      setIsLoading(false);
                      return;
                    }

                    if (password !== confirmPassword) {
                      setError("As senhas não conferem.");
                      setIsLoading(false);
                      return;
                    }

                    try {
                      const { error: signUpError } = await authClient.signUp.email({
                        email,
                        password,
                        name: email.split("@")[0],
                      });
                      if (signUpError) {
                        setError(signUpError.message || "Erro ao registrar. Tente novamente.");
                      } else {
                        router.push('/editor');
                      }
                    } catch (err) {
                      setError("Erro ao registrar. Tente novamente.");
                      console.log(err)
                    } finally {
                      setIsLoading(false);
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
              <div className="space-y-2 relative">
                <Label 
                htmlFor="password"
                className="text-[var(--foreground)]"
                >Senha</Label>
                <div
                className="relative">
                  <Input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  className="bg-[var(--input)] border-[var(--border)] text-[var(--foreground)]"
                  required
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
              <div className="space-y-2 relative">
                <Label 
                htmlFor="confirmPassword"
                className="text-[var(--foreground)]">
                    Confirmar senha
                </Label>
                <div
                className="relative">
                  <Input
                  id="confirmPassword"
                  name="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="••••••••"
                  className="bg-[var(--input)] border-[var(--border)] text-[var(--foreground)]"
                  required
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
              <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
                <input id="terms" type="checkbox" className="rounded border-[var(--border)]" required />
                <Label htmlFor="terms" className="text-sm text-[var(--muted-foreground)] break-words">
                  <span
                  className="hidden sm:block">
                    Aceito os{" "}
                  </span>
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
                {isLoading ? "Registrando..." : "Criar conta"}
              </Button>
            </form>

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
import { signIn } from "next-auth/react";

export default async function CadastrarUsuario({ userEmail, userPassword }: { userEmail: string; userPassword: string }) {
  if (!process.env.NEXT_PUBLIC_API_URL) {
    throw new Error("NEXT_PUBLIC_API_URL is not defined");
  }
  
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      email: userEmail,
      password: userPassword,
    }),
  });

  const data = await res.json();
  
  if (!res.ok) {
    throw new Error(data.message || "Email já está em uso ou erro no registro");
  }
  
  if (data.token && data.expiresIn) {
    const loginResult = await signIn("credentials", {
      email: userEmail,
      password: userPassword,
      redirect: false,
    });
    
    return {
      success: true,
      user: data,
      loginResult
    };
  }
  
  // Caso de sucesso mas sem token (não deveria acontecer)
  throw new Error("Registro realizado mas token não recebido");
}
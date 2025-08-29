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
  
  // Se o registro foi bem-sucedido e retornou token
  if (res.ok && data.token && data.expiresIn) {
    // Fazer login automático usando as mesmas credenciais
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
  
  return { success: false, error: data.message || "Erro no registro" };
}
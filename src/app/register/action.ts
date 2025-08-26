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
  return data; // pode retornar o usuário criado ou mensagem de sucesso
}
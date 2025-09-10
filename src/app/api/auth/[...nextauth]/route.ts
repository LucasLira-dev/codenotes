import NextAuth, { type NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Senha", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;

        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/login`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: credentials.email,
            password: credentials.password,
          }),
        });

        if (!res.ok) return null;
        const data = await res.json();

        // esperado: { token: string, expiresIn: number, userId: number }
        if (!data?.token || !data?.expiresIn) return null;

        console.log(data)

        return {
          id: String(data.userId), // o NextAuth exige string
          email: credentials.email,
          token: data.token,
          expiresAt: Date.now() + data.expiresIn * 1000, // calcula timestamp de expiração
          refreshToken: data.refreshToken,
        };
      },
    }),
  ],

  session: {
    strategy: "jwt",
  },

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.accessToken = user.token;
        token.expiresAt = user.expiresAt;
        token.refreshToken = user.refreshToken;
        token.id = user.id;
        return token;
      }

      if (token.expiresAt && Date.now() > token.expiresAt) {
        // token expirado, tentar refresh
        try {
          const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/refresh`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              // enviar refreshToken se tiver
              refreshToken: token.refreshToken,
            }),
          });

          if (!res.ok) throw new Error("Failed to refresh token");
          const data = await res.json();

          if (data?.token && data?.expiresIn) {
            token.accessToken = data.token;
            token.expiresAt = Date.now() + data.expiresIn * 1000;
            token.refreshToken = data.refreshToken || token.refreshToken; // atualizar se veio novo
            token.id = data.userId ? String(data.userId) : token.id; // <-- mantém o id antigo se não vier novo
          } else {
            throw new Error("Invalid refresh response");
          }
        } catch (error) {
          console.error("Erro ao renovar token:", error);
          // falha no refresh, limpar dados de autenticação
          delete token.accessToken;
          delete token.expiresAt;
          delete token.refreshToken;
          return token;
        }
      }

      return token;
    },

    async session({ session, token }) {
      if (!token.accessToken) {
        // Sessão inválida, pode retornar null ou apenas o objeto padrão
        return session;
      }
      session.accessToken = token.accessToken;
      session.expiresAt = token.expiresAt;
      return session;
      },
  },

  pages: {
    signIn: "/login",
  },

  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };

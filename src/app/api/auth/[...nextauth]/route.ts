import NextAuth, { type NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions = {
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
        return token;
      }

      if (token.expiresAt && Date.now() > token.expiresAt) {
        // expirou → remove accessToken
        delete token.accessToken;
        return token;
      }

      return token;
    },

    async session({ session, token }) {
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

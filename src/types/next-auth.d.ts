// import { DefaultSession } from "next-auth";

// declare module "next-auth" {
//   interface Session {
//     user: {
//       id: string;
//     } & DefaultSession["user"];
//     accessToken?: string;
//   }

//   interface User {
//     id: string;
//     token?: string;
//   }
// }

// declare module "next-auth/jwt" {
//   interface JWT {
//     id: string;
//     accessToken?: string;
//   }
// }


import type { DefaultSession, DefaultUser } from "next-auth";
import type { JWT as DefaultJWT } from "next-auth/jwt";

declare module "next-auth" {
  interface Session {
    accessToken?: string;
    expiresAt?: number;
    user: DefaultSession["user"] & {
      id?: string;
      email?: string | null;
    };
  }

  interface User extends DefaultUser {
    token: string;
    expiresAt: number;
  }
}

declare module "next-auth/jwt" {
  interface JWT extends DefaultJWT {
    accessToken?: string;
    expiresAt?: number;
  }
}
